import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Products() {

    const [productList, setProducts] = useState([]);

    useEffect(() => {
        axios.get(`/api/products`).then(res => {
            if (res.data.status === 200) {
                setProducts(res.data.products);
            }
        });
    }, []);

    // Create a table
    var viewProduct_HTMLTABLE = "";
    viewProduct_HTMLTABLE = productList.map((item) => {
        return (
            <tr key={item.id} scope="row">
                <td>{item.name}</td>
                <td>{item.slug}</td>
                <td>{item.meta_title}</td>
                <td>
                    <Link to={`/edit_category/${item.id}`} className="btn btn-primary mx-1" >
                        <i className="fa fa-edit"></i>
                    </Link>
                    <button className="btn btn-danger mx-1">
                        <i className="fa fa-trash"></i>
                    </button>
                </td>
            </tr>
        );
    });

    return (
        <div className="container">
            <div className="card my-3">
                <div className="card-header">
                    <h3>
                        All products
                        <Link to="/add_product" className="btn btn-primary float-end">Add product</Link>
                    </h3>
                </div>
                <div className="card-body">
                    <table className="table table-hover table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Slug</th>
                                <th scope="col">Meta title</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {viewProduct_HTMLTABLE}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Products;
