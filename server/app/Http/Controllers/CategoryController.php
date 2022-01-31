<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\Category;

class CategoryController extends Controller
{
    /**
     * Index
     * Returns all categoires
     */
    public function index()
    {
        $categories = Category::all();
        return response()->json([
            'status' => 200,
            'categories' => $categories
        ]);
    }

    /**
     * Store 
     * Validates input data
     * Creates a new category
     */
    public function store(Request $request) 
    {   
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:191|unique:categories|string',
            'slug' => 'required|max:191|unique:categories|string',
            'meta_title' => 'required|max:191|unique:categories|string',
            'meta_keyword' => 'required|max:191|unique:categories|string',
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

    /**
     * Edit
     * Gets a specific category by id
     * Returns that category to frontend
     */
    public function edit($id)
    {
        $category = Category::find($id);
        if($category)
        {
            return response()->json([
                'status' => 200,
                'category' => $category
            ]);
        }
        else 
        {
            return response()->json([
                'status' => 404,
                'message' => 'Category id not found.'
            ]);
        }
    }

    /**
     * Update
     * Validates data
     * Updated the category by id
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:191|unique:categories|string',
            'slug' => 'required|max:191|unique:categories|string',
            'meta_title' => 'required|max:191|unique:categories|string',
            'meta_keyword' => 'required|max:191|unique:categories|string',
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
            $category = Category::find($id);
            if($category)
            {
                $category->name = $request->input('name');
                $category->slug = $request->input('slug');
                $category->description = $request->input('description');
                $category->meta_title = $request->input('meta_title');
                $category->meta_keyword = $request->input('meta_keyword');
                $category->meta_desc = $request->input('meta_desc');
                $category->save();

                return response()->json([
                    'status' => 200,
                    'message' => 'Category updated successfully.'
                ]);
            }
            else 
            {
                return response()->json([
                    'status' => 404,
                    'message' => 'Category not found.'
                ]);
            }                     
        }
    } 

    /**
     * Delete
     * Deletes category by id
     */
    public function delete($id)
    {
        $category = Category::find($id);
        if ($category)
        {
            $category->delete();
            return response()->json([
                'status' => 200,
                'message' => 'Deleted succesfully'
            ]);
        }
        else 
        {
            return response()->json([
                'status' => 404,
                'message' => 'Category not found.'
            ]);
        }
    }
}
