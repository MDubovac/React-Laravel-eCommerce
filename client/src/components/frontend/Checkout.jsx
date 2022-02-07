import React, { useEffect, useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';


function Checkout() {

    const navigate = useNavigate();

    const [cart, setCart] = useState([]);

    // Use this var to get value of subtotal && grandtotal
    var totalCartPrice = 0;

    useEffect(() => {
        if (!localStorage.getItem('auth_token')) {
            navigate('/login');
        }

        axios.get(`/api/view-cart`).then(res => {
            if (res.data.status === 200) {
                setCart(res.data.cart);
            } else if (res.data.status === 401) {
                navigate('/login');
                swal({
                    title: '401!',
                    text: res.data.message,
                    icon: 'warning',
                });
            }
        });
    }, []);

    var viewCart_HTMLTABLE = '';
    viewCart_HTMLTABLE = cart.map((item => {
        totalCartPrice += item.product.selling_price * item.product_qty;
        return (
            <tr key={item.id}>
                <td>{item.product.name}</td>
                <td>${item.product.selling_price}</td>
                <td>{item.product_qty}</td>
                <td>${item.product.selling_price * item.product_qty}</td>
            </tr>
        )
    }));

    return (
        <>
            <div className="jumbotron jumbotron-fluid bg-warning">
                <div className="container">
                    <h5 className="py-4">Checkout</h5>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-8">
                        <div className="card my-3">
                            <div className="card-header">
                                <h3 className="pt-1">Shipping Information</h3>
                            </div>
                            <div className="card-body">

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group mb-3">
                                            <label htmlFor="first_name">First name</label>
                                            <input name="first_name" type="text" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-3">
                                            <label htmlFor="last_name">Last name</label>
                                            <input name="first_name" type="text" className="form-control" />
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group mb-3">
                                            <label htmlFor="phone_number">Phone Number</label>
                                            <input name="phone_number" type="number" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-3">
                                            <label htmlFor="email">Email Address</label>
                                            <input name="email" type="email" className="form-control" />
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group mb-3">
                                            <label htmlFor="full_address">Full Address</label>
                                            <textarea name="full_address" id="full_address" cols="30" rows="3" className="form-control"></textarea>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="form-group mb-3">
                                            <label htmlFor="state">State</label>
                                            <input name="state" type="text" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group mb-3">
                                            <label htmlFor="city">City</label>
                                            <input name="city" type="text" className="form-control" />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group mb-3">
                                            <label htmlFor="zip">ZIP Code</label>
                                            <input name="zip" type="number" className="form-control" />
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <button className="btn btn-primary">Place Order</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="table-responsive">
                            <table className="table table-hover table-bordered my-3">
                                <thead>
                                    <tr>
                                        <th width="50%">Product</th>
                                        <th>Price</th>
                                        <th>Qty</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {viewCart_HTMLTABLE}
                                    <tr>
                                        <td colSpan="2">
                                            <b>Grand Total</b>
                                        </td>
                                        <td colSpan="2">
                                            <b>${totalCartPrice}</b>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Checkout;
