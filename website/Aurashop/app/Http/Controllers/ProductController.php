<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Requests\ProductRequest;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::all()->map(function ($product) {
            // You can log or inspect the image field to check the value
            Log::info($product->image);  // Check the exact path being returned
            return $product;
        });

        return response()->json($products);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(ProductRequest $request)
    {
        // Handle the validated data
        $data = $request->validated();

        // Default image path
        $imagePath = null;

        // Check if the request has an image file
        if ($request->hasFile('image')) {
            // Store the image in the 'public/productImg' directory
            $imagePath = $request->file('image')->store('productImg', 'public');
        }

        // Create the product
        $product = Product::create([
            'name' => $data['name'],
            'description' => $data['description'],
            'price' => $data['price'],
            'category_id' => $data['category_id'],
            'image' => $imagePath, // Store the relative image path
        ]);

        // Optionally log the image path for debugging
        Log::info('Image path: ' . $product->image);

        return response()->json($product, 201); // Return the created product
    }
    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        try {
            // Delete the product
            $product->delete();
            return response()->json(['message' => 'Product deleted successfully.'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to delete product: ' . $e->getMessage()], 500);
        }
    }


    public function getProductsByCategory($categoryId)
    {
        $products = Product::where('category_id', $categoryId)->get();
        return response()->json($products);
    }
}
