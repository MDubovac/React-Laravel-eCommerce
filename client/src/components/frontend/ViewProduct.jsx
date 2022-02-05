import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import swal from 'sweetalert';

function ViewProduct() {

    const [product, setProduct] = useState([]);
    const [category, setCategory] = useState([]);
    const [qty, setQty] = useState(1);

    // Handle the quantity counter
    const handleDecrement = () => {
        if (qty > 1) {
            setQty(prevCount => prevCount - 1);
        }
    }
    
    const handleIncrement = () => {
        if (qty < 10) {
            setQty(prevCount => prevCount + 1);
        }
    }

    // Add to cart handler
    const submitAddToCart = (e) => {
        e.preventDefault();

        const data = {
            product_id: product.id,
            product_qty: qty
        }

        axios.post(`/api/add-to-cart`, data).then(res => {
            if (res.data.status === 201) {
                swal({
                    title: 'Success!',
                    text: res.data.message,
                    icon: 'success',
                });
            }
            else if (res.data.status === 401) {
                swal({
                    title: 'Error!',
                    text: res.data.message,
                    icon: 'error',
                });
            } 
            else if (res.data.status === 404) {
                swal({
                    title: 'Oops! 404',
                    text: res.data.message,
                    icon: 'error',
                });
            } else if (res.data.status === 409) {
                swal({
                    title: 'Already exists',
                    text: res.data.message,
                    icon: 'warning',
                });
            }
        })

    }

    let { category_slug, product_slug } = useParams();

    useEffect(() => {
        axios.get(`/api/view-product/${category_slug}/${product_slug}`).then(res => {
            if (res.data.status === 200) {
                setCategory(res.data.category);
                setProduct(res.data.product);
            }
        });
    }, []);

    return (
        <div className="container">
            <Link className="btn btn-outline-primary mt-4" to={`/collections/${category.slug}`}>Go back</Link>
            <div className="row my-4">
                <div className="col-md-6 col-sm-12">
                    <img src={`http://127.0.0.1:8000/${product.image}`} className="mb-2" />
                </div>
                <div className="col-md-6 col-sm-12">
                    <div className="d-flex justify-content-between">
                        <h3>{product.name}</h3>
                        <h5 className="brand">{product.brand}</h5>
                    </div>
                    <p className="desc">
                        {product.description}
                    </p>
                    <div className="price d-flex">
                        <h3>Price:</h3>
                        <h5 className="og_price mx-2">${product.original_price}</h5>
                        <h3 className="sell_price">${product.selling_price}</h3>
                    </div>
                    <div className="stock">
                        {
                            product.qty > 0 ?
                            <>
                                <h3 className="text-success">In Stock</h3>
                                <div className="row">
                                    <div className="col-md-6 my-2">
                                        <div className="input-group ">
                                            <button onClick={handleDecrement} className="input-group-text">-</button>
                                            <div className="form-control text-center">{qty}</div>
                                            <button onClick={handleIncrement} className="input-group-text">+</button>
                                        </div>
                                    </div>
                                    <div className="col-md-6 my-2">
                                        <button className="btn btn-primary" onClick={submitAddToCart}>Add to Cart</button>
                                    </div>
                                </div>
                            </>
                            :
                            <>
                                <h3 className="text-danger">Out of Stock</h3>
                            </>
                        }
                    </div>


                    <div className="wishlist">
                        <button className="btn btn-outline-primary my-2">
                            Add to Wishlist
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewProduct;
