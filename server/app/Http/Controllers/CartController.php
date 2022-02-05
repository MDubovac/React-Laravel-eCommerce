<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cart;
use App\Models\Product;

class CartController extends Controller
{
    /**
     * AddToCart
     * Adds a product to the cart
     */
    public function addToCart(Request $request)
    {
        if (auth('sanctum')->check())
        {
            $user_id = auth('sanctum')->user()->id;
            $product_id = $request->product_id;
            $product_qty = $request->product_qty;

            $productCheck = Product::where('id', $product_id)->first();
            if ($productCheck)
            {
                if (Cart::where('product_id', $product_id)->where('user_id', $user_id)->exists())
                {
                    return response()->json([
                        'status' => 409,
                        'message' => $productCheck->name . ' is already in cart.'
                    ]);
                }
                else 
                {   
                    $cartItem = new Cart;
                    $cartItem->user_id = $user_id;
                    $cartItem->product_id = $product_id;
                    $cartItem->product_qty = $product_qty;
                    $cartItem->save();

                    return response()->json([
                        'status' => 201,
                        'message' => 'Product added successfully.'
                    ]);
                }
    
            }
            else 
            {
                return response()->json([
                    'status' => 404,
                    'message' => 'Product not found.'
                ]);
    
            }

           
        }
        else 
        {
            return response()->json([
                'status' => 401,
                'message' => 'You need to login first.'
            ]);
        }
    }
}
