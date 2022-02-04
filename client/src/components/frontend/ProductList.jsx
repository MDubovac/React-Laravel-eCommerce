import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert';

function ProductList() {

    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);

    const navigate = useNavigate();

    let { id } = useParams();

    useEffect(() => {
        axios.get(`/api/all_products/${id}`).then(res => {
            if (res.data.status === 200) {
                setProducts(res.data.products);
                setCategory(res.data.currentCategory);
            } else if (res.data.status === 404) {
                navigate('/collections');
                swal({
                    title: 'Oops! 404',
                    text: res.data.message,
                    icon: 'warning',
                });
            }
        });
    }, []);

    var displayProducts = '';
    displayProducts = products.map((product) => {
        return (
            <div key={product.id} className="col-lg-4 col-md-6 col-sm-12 col-xs-12">
                <div className="card my-3">
                    <img className="card-img-top" src={`http://127.0.0.1:8000/${product.image}`} height="230px" />
                    <div className="card-body">
                        <h3 className="card-title">{product.name}</h3>
                        <div className="">
                            <h3>
                                <b>Price: </b> ${product.selling_price} USD
                            </h3>
                            <div className="d-flex">
                                <Link to={`/product/${product.id}`} className="btn btn-primary">Details</Link>
                                <Link to="#" className="mx-2 btn btn-warning">Add to cart</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    })

    return (
        <>
            <div className="jumbotron jumbotron-fluid bg-warning">
                <div className="container">
                    <h5 className="py-4">
                        {`Categories / ${category.name}`}
                    </h5>
                </div>
            </div>
            <div className="container">
                <Link to="/collections" className="btn btn-outline-primary my-2">Go back</Link>
                <h1>Product List</h1>
                <div className="row">
                    {displayProducts}
                </div>
            </div>
        </>
    );
}

export default ProductList;
