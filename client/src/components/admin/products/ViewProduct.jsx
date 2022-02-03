import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Categories from '../categories/Categories';

function ViewProduct() {

    let { id } = useParams();
    const [product, setProduct] = useState({});
    const [category, setCategory] = useState({});

    useEffect(() => {
        axios.get(`/api/products/${id}`).then(res => {
            if (res.data.status === 200) {
                setProduct(res.data.product);
                setCategory(res.data.category);
            }
        });
    }, []);

    return (
        <div className="container my-3">
            <Link to="/products" className="btn btn-outline-primary my-1">
                Go back
            </Link>
            <h1>{product.name}</h1>  
            <div className="row">
                <div className="col-md-6">
                    <h4><b>Category: </b> {category.name} </h4>
                    <h4><b>Slug: </b> {product.slug} </h4>
                    <h4><b>Quantity: </b> {product.qty} </h4>
                    <h4><b>Current Price: </b> ${product.selling_price} USD </h4>
                    <img src={`http://127.0.0.1:8000/${product.image}`} width="100%" />
                </div>    
                <div className="col-md-6">
                </div>  
            </div>          
        </div>
    );
}

export default ViewProduct;
