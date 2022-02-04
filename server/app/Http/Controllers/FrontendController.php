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
     * GetProductsByCategoryId
     * Returns all products by category id
     */
    public function getProductsByCategoryId($id)
    {
        $products = Product::where('category_id', $id)->get();
        $currentCategory = Category::find($id);
        if ($products->count() > 0)
        {
            return response()->json([
                'status' => 200,
                'products' => $products,
                'currentCategory' => $currentCategory
            ]);
        }
        else 
        {
            return response()->json([
                'status' => 404,
                'message' => 'Sorry, there are no products in this category.'
            ]);
        }
    }
}
