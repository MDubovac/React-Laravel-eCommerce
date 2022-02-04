<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Product;
use File;

class ProductController extends Controller
{
    /**
     * Index
     * Get all products
     */
    public function index()
    {
        $products = Product::all();
        return response()->json([
            'status' => 200,
            'products' => $products
        ]);
    }

    /**
     * getById
     * Gets a single record by id
     */
    public function getById($id)
    {
        $product = Product::find($id);
        return response()->json([
            'status' => 200,
            'product' => $product
        ]);
    }

    /**
     * Store
     * Validates the data
     * Creates a new product
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'category_id' => 'required|max:191',
            'name' => 'required|max:191',
            'slug' => 'required|max:191',
            'brand' => 'required|max:40',
            'qty' => 'required|max:4',
            'meta_title' => 'required|max:191',
            'selling_price' => 'required|max:20',
            'original_price' => 'required|max:20',
            'image' => 'required|image|mimes:jpeg,png,jpg|max:2048'
        ]);

        if ($validator->fails())
        {
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages()
            ]);
        }
        else 
        {
            $product = new Product;

            $product->category_id = $request->input('category_id');
            $product->name = $request->input('name');
            $product->slug = $request->input('slug');
            $product->description = $request->input('description');
            $product->brand = $request->input('brand');
            $product->selling_price = $request->input('selling_price');
            $product->original_price = $request->input('original_price');
            $product->qty = $request->input('qty');

            $product->meta_title = $request->input('meta_title');
            $product->meta_keyword = $request->input('meta_keyword');
            $product->meta_desc = $request->input('meta_desc');
        
            if ($request->hasFile('image'))
            {
                $file = $request->file('image');
                $extensions = $file->getClientOriginalExtension();
                $filename = time() . '.' . $extensions;
                $file->move('uploads/product/', $filename);
                $product->image = 'uploads/product/' . $filename;
            }

            $product->save();

            return response()->json([
                'status' => 200,
                'message' => 'Product created successfully.'
            ]);
        }
    }

    /**
     * Update
     * Validates the data
     * Updates a product
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'category_id' => 'required|max:191',
            'name' => 'required|max:191',
            'slug' => 'required|max:191',
            'brand' => 'required|max:40',
            'qty' => 'required|max:4',
            'meta_title' => 'required|max:191',
            'selling_price' => 'required|max:20',
            'original_price' => 'required|max:20'
        ]);

        if ($validator->fails())
        {
            return response()->json([
                'status' => 422,
                'errors' => $validator->messages()
            ]);
        }
        else 
        {
            $product = Product::find($id);

            if ($product)
            {
                $product->category_id = $request->input('category_id');
                $product->name = $request->input('name');
                $product->slug = $request->input('slug');
                $product->description = $request->input('description');
                $product->brand = $request->input('brand');
                $product->selling_price = $request->input('selling_price');
                $product->original_price = $request->input('original_price');
                $product->qty = $request->input('qty');
                
                $product->meta_title = $request->input('meta_title');
                $product->meta_keyword = $request->input('meta_keyword');
                $product->meta_desc = $request->input('meta_desc');
                
                if ($request->hasFile('image'))
                {
                    $path = $product->image;
                    if (File::exists($path))
                    {
                        File::delete($path);
                    }
                    $file = $request->file('image');
                    $extensions = $file->getClientOriginalExtension();
                    $filename = time() . '.' . $extensions;
                    $file->move('uploads/product/', $filename);
                    $product->image = 'uploads/product/' . $filename;
                }
                
                $product->update();
                
                return response()->json([
                    'status' => 200,
                    'message' => 'Product updated successfully.'
                ]);
            }
            else 
            {
                return response()->json([
                    'status' => 404,
                    'message' => 'Product not found.'
                ]);
            }
        }
    }

    /**
     * Delete
     * Deletes a product by id
     */
    public function delete($id)
    {
        $product = Product::find($id);
        if ($product)
        {
            if ($product->image)
            {
                File::delete($product->image);
            }
            $product->delete();
            return response()->json([
                'status' => 200,
                'message' => 'Product deleted successfully.'
            ]);
        }
        else 
        {
            return response()->json([
                'status' => 404,
                'message' => 'Product not found.'
            ]);
        }
    }
}
