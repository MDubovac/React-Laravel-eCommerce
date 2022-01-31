<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Product;

class ProductController extends Controller
{
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

            $product->featured = $request->input('featured') == true ? '1' : '0';
            $product->popular = $request->input('popular') == true ? '1' : '0';
        
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
}
