<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\Category;

class CategoryController extends Controller
{
    public function store(Request $request) 
    {   
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:191|unique:categories|string',
            'slug' => 'required|max:191|string',
            'meta_title' => 'required|max:191|string'
        ]);

        if ($validator->fails())
        {
            return response()->json([
                'status' => 400,
                'errors' => $validator->messages()
            ]);
        }
        else 
        {
            $category = new Category;
            $category->name = $request->input('name');
            $category->slug = $request->input('slug');
            $category->description = $request->input('description');
            $category->status = $request->input('status');
            $category->meta_title = $request->input('meta_title');
            $category->meta_keyword = $request->input('meta_keyword');
            $category->meta_desc = $request->input('meta_desc');
            $category->save();

            return response()->json([
                'status' => 200,
                'message' => 'Category created successfully.'
            ]);
        }
    }
}
