import axios from 'axios';
import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';
import { useNavigate, Link } from 'react-router-dom';

function Cart() {

    const navigate = useNavigate();

    const [cart, setCart] = useState([]);

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
    
    // Send put request to server (update the quantity)
    const updateCartQuantity = (cart_id, scope) => {
        axios.put(`/api/cart-update-quantity/${cart_id}/${scope}`);
    }

    // Handle the quantity counter
    const handleDecrement = (cart_id) => {
        setCart(cart =>
            cart.map((item) =>
                cart_id === item.id ? { ...item, product_qty: item.product_qty - (item.product_qty > 1 ? 1 : 0) } : item
            )
        );
        updateCartQuantity(cart_id, 'dec');
    }

    const handleIncrement = (cart_id) => {
        setCart(cart =>
            cart.map((item) =>
                cart_id === item.id ? { ...item, product_qty: item.product_qty + (item.product_qty < 10 ? 1 : 0) } : item
            )
        );
        updateCartQuantity(cart_id, 'inc');
    }

    var viewCart_HTMLTABLE = "";
    viewCart_HTMLTABLE = cart.map((item) => {
        return (
            <tr key={item.id}>
                <td>
                    <img src={`http://127.0.0.1:8000/${item.product.image}`} width="100px" />
                </td>
                <td width="30%">{item.product.name}</td>
                <td width="10%">${item.product.selling_price}</td>
                <td width="17%">
                    <div className="input-group ">
                        <button onClick={() => handleDecrement(item.id)} className="input-group-text">-</button>
                        <div className="form-control text-center">{item.product_qty}</div>
                        <button onClick={() => handleIncrement(item.id)} className="input-group-text">+</button>
                    </div>
                </td>
                <td width="10%">
                    ${item.product.selling_price * item.product_qty}
                </td>
                <td>
                    <button className="btn btn-danger">Remove</button>
                </td>
            </tr>
        );
    });

    return (
        <>
            <div className="jumbotron jumbotron-fluid bg-warning">
                <div className="container">
                    <h5 className="py-4">Your Shopping Cart</h5>
                </div>
            </div>
            <div className="container my-4">
                {
                    cart.length > 0 ?
                        <>
                            <div className="table-responsive-md">
                                <table className="table table-hover table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Image</th>
                                            <th>Product</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Total Price</th>
                                            <th>Remove</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {viewCart_HTMLTABLE}
                                    </tbody>
                                </table>
                            </div>
                        </>
                        :
                        <>
                            <h1 className="text-center my-3">Shopping cart is empty</h1>
                            <h3 className="text-center">
                                <Link to="/collections">Click here</Link> to add products.
                            </h3>
                        </>
                }
            </div>
        </>
    );
}

export default Cart;