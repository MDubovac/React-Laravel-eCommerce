import axios from 'axios';
import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

function AddProduct() {

    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);

    const [productInput, setProducts] = useState({
        category_id: '',
        name: '',
        slug: '',
        description: '',
        meta_title: '',
        meta_keyword: '',
        meta_desc: '',
        selling_price: '',
        original_price: '',
        qty: '',
        brand: '',
        featured: '',
        popular: ''
    });

    const [picture, setPicture] = useState([]);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        axios.get(`/api/categories`).then(res => {
            setCategories(res.data.categories);
        });
    }, []);

    const handleInput = (e) => {
        e.persist();
        setProducts({ ...productInput, [e.target.name]: e.target.value });
    }
    
    const handleImage = (e) => {
        setPicture({ image: e.target.files[0] });
    }

    const submitProduct = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('image', picture.image);

        formData.append('category_id', productInput.category_id);
        formData.append('slug', productInput.slug);
        formData.append('name', productInput.name);
        formData.append('description', productInput.description);

        formData.append('meta_title', productInput.meta_title);
        formData.append('meta_keyword', productInput.meta_keyword);
        formData.append('meta_desc', productInput.meta_desc);

        formData.append('selling_price', productInput.selling_price);
        formData.append('original_price', productInput.original_price);
        formData.append('brand', productInput.brand);
        formData.append('qty', productInput.qty);
        formData.append('featured', productInput.featured);
        formData.append('popular', productInput.popular);

        axios.post(`/api/products`, formData).then(res => {
            if (res.data.status === 200) {
                navigate('/products');
                swal({
                    title: 'Success!',
                    text: res.data.message,
                    icon: 'success',
                });
            } else {
                setErrors(res.data.errors);
            }
        });
    }

  return (
      <div className="container">
          <form onSubmit={submitProduct} encType="multipart/form-data">
            <h2 className="mt-3">Add Product</h2>

            <div className="form-group my-3">
                <label htmlFor="name">Name</label>
                <input type="text" onChange={handleInput} defaultValue={productInput.name} name="name" className="form-control" />
                <span className="text-danger"><b>{ errors.name }</b></span>
            </div>

            <div className="form-group my-3">
                <label htmlFor="slug">Slug</label>
                <input type="text" onChange={handleInput} defaultValue={productInput.slu} name="slug" className="form-control" />
                <span className="text-danger"><b>{ errors.slug }</b></span>
            </div>

            <div className="form-group my-3">
                <label htmlFor="description">Description</label>
                <textarea name="description" onChange={handleInput} defaultValue={productInput.description} id="description" cols="30" rows="5" className="form-control"></textarea>
                <span className="text-danger"><b>{ errors.description }</b></span>
            </div>

            <div className="form-group my-3">
                <label htmlFor="qty">Quantity</label>
                <input type="text" onChange={handleInput} defaultValue={productInput.qty} name="qty" className="form-control" />
                <span className="text-danger"><b>{ errors.qty }</b></span>
            </div>

            <div className="form-group my-3">
                <label htmlFor="brand">Brand</label>
                <input type="text" onChange={handleInput} defaultValue={productInput.brand} name="brand" className="form-control" />
                <span className="text-danger"><b>{ errors.brand }</b></span>
            </div>

            <div className="form-group my-3">
                <label htmlFor="meta_title">Meta title</label>
                <input type="text" onChange={handleInput} defaultValue={productInput.meta_title} name="meta_title" className="form-control" />
                <span className="text-danger"><b>{ errors.meta_title }</b></span>
            </div>

            <div className="form-group my-3">
                <label htmlFor="meta_keyword">Meta keyword</label>
                <input type="text" onChange={handleInput} defaultValue={productInput.meta_keyword} name="meta_keyword" className="form-control" />
                <span className="text-danger"><b>{ errors.meta_keyword }</b></span>
            </div>

            <div className="form-group my-3">
                <label htmlFor="meta_desc">Meta Description</label>
                <input type="text" onChange={handleInput} defaultValue={productInput.meta_desc} name="meta_desc" className="form-control" />
                <span className="text-danger"><b>{ errors.meta_desc }</b></span>
            </div>

            <div className="form-group my-3">
                <label htmlFor="original_price">Original Price</label>
                <input type="text" onChange={handleInput} defaultValue={productInput.original_price} name="original_price" className="form-control" />
                <span className="text-danger"><b>{ errors.original_price }</b></span>
            </div>

            <div className="form-group my-3">
                <label htmlFor="selling_price">Selling Price</label>
                <input type="text" onChange={handleInput} defaultValue={productInput.selling_price} name="selling_price" className="form-control" />
                <span className="text-danger"><b>{ errors.selling_price }</b></span>
            </div>

            <div className="form-group my-3">
                <label htmlFor="image">Image</label>
                <input type="file" onChange={handleImage} name="image" className="form-control" />
                <span className="text-danger"><b>{ errors.image }</b></span>
            </div>
            
            <div className="form-group my-3">
                <label htmlFor="category_id">Category</label>
                <select name="category_id" onChange={handleInput} defaultValue={productInput.category_id} id="category_id" className="form-control">
                    <option value="">-- Select Category --</option>
                    {
                        categories.map((cat) => {
                            return (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            )
                        })
                    }
                </select>
                <span className="text-danger"><b>{ errors.category_id }</b></span>
            </div>

            <div className="form-group my-3">
                <label htmlFor="featured">Featured</label>
                <input type="checkbox" name="featured" className="mx-2" />   
            </div>

            <div className="form-group my-3">
                <label htmlFor="popular">Popular</label>
                <input type="checkbox" name="popular" className="mx-2" />   
            </div>

            <button type="submit" className="btn btn-primary my-3">Add product</button>

          </form>
      </div>
  );
}

export default AddProduct;