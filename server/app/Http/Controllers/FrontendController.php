<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\Product;

class FrontendController extends Controller
{
    /**
     * GetAllCategoires
     * Returns all the categories
     */
    public function getAllCategories()
    {
        $categories = Category::all();
        return response()->json([
            'status' => 200,
            'categories' => $categories
        ]);
    }

    /**
     * GetProductsByCategorySlug
     * Returns all products by category id
     */
    public function getProductsByCategorySlug($slug)
    {
        $category = Category::where('slug', $slug)->first();

        if ($category)
        {
            $products = Product::where('category_id', $category->id)->get();
            if ($products->count() > 0)
            {
                return response()->json([
                    'status' => 200,
                    'category' => $category,
                    'products' => $products
                ]);
            }
            else 
            {
                return response()->json([
                    'status' => 404,
                    'message' => 'Sorry, category was not found.'
                ]);
            }
        }   
        else 
        {
            return response()->json([
                'status' => 404,
                'message' => 'Sorry, category was not found.'
            ]);
        }
    }

    /**
     * GetProductBySlug
     * Returns a category by category slug
     * Returns a sigle product by product slug
     * URL should look like => /view-product/category/product
     */
    public function getProductBySlug($category_slug, $product_slug)
    {
        $category = Category::where('slug', $category_slug)->first();

        if ($category)
        {
            $product = Product::where('slug', $product_slug)->first();
            if ($product)
            {
                return response()->json([
                    'status' => 200,
                    'category' => $category,
                    'product' => $product
                ]);
            }
            else 
            {
                return response()->json([
                    'status' => 404,
                    'message' => 'Sorry, category was not found.'
                ]);
            }
        }
        else
        {
            return response()->json([
                'status' => 404,
                'message' => 'Sorry, category was not found.'
            ]);
        }
    }

}
