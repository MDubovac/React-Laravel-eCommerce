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

    /**
     * View Cart
     * Returns all products by user and cart id
     */
    public function viewCart()
    {
        if (auth('sanctum')->check())
        {
            $user_id = auth('sanctum')->user()->id;
            $cartItems = Cart::where('user_id', $user_id)->get();

            return response()->json([
                'status' => 200,
                'cart' => $cartItems
            ]);
        }
        else 
        {
            return response()->json([
                'status' => 401,
                'message' => 'You need to login first.'
            ]);
        }
    }

    /**
     * Update quantity
     * Updates the product quantity in cart
     */
    public function updateQuantity($cart_id, $scope)
    {
        if (auth('sanctum')->check())
        {
            $user_id = auth('sanctum')->user()->id;
            $cartItem = Cart::where('id', $cart_id)->where('user_id', $user_id)->first();

            if ($scope == 'inc') 
            {
                $cartItem->product_qty += 1;
            }
            else if ($scope == "dec")
            {
                $cartItem->product_qty -= 1;
            }

            $cartItem->update();
            
            return response()->json([
                'status' => 200,
                'message' => 'Quantity updated'
            ]);
        }
        else 
        {
            return response()->json([
                'status' => 401,
                'message' => 'You need to login first.'
            ]);
        }
    }

    /**
     * Delete Cart Item
     * Removes a product from cart by product id
     */
    public function deleteCartItem($cart_id) 
    {
        
        if (auth('sanctum')->check())
        {
            $user_id = auth('sanctum')->user()->id;
            $cartItem = Cart::where('id', $cart_id)->where('user_id', $user_id)->first();
            
            if ($cartItem) 
            {
                $cartItem->delete();
                return response()->json([
                    'status' => 200,
                    'message' => 'Product removed successfully.'
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
        else 
        {
            return response()->json([
                'status' => 401,
                'message' => 'You need to login first.'
            ]);
        }
    }
}
