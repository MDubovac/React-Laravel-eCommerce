<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $table = 'products';
    protected $fillable = [
        'name', 'slug', 'description', 'meta_title', 'meta_keyword', 'meta_desc', 'selling_price', 'original_price', 'qty', 'brand', 'featured', 'popular', 'cateogry_id'
    ];

    protected $with = ['category'];
    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id', 'id');
    }
} 
