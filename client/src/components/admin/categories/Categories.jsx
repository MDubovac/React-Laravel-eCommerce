import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Categories() {

    const [categoryList, setCategoryList] = useState([]);

    useEffect(() => {
        axios.get(`/api/categories`).then(res => {
            if (res.data.status === 200) {
                setCategoryList(res.data.categories);
            }
        });
    }, []);

    // Create a table
    var viewCategory_HTMLTABLE = "";
    viewCategory_HTMLTABLE = categoryList.map((item) => {
        return (
            <tr key={item.id} scope="row">
                <td>{item.name}</td>
                <td>{item.slug}</td>
                <td>{item.meta_title}</td>
                <td>
                    <Link to={`/edit_category/${item.id}`} className="btn btn-primary" >Edit</Link>
                </td>
                <td>
                    <button className="btn btn-danger">Delete</button>
                </td>
            </tr>
        );
    });

    return (
        <div className="container">
            <div className="card my-3">
                <div className="card-header">
                    <h3>
                        All categories
                        <Link to="/add_category" className="btn btn-primary float-end">Add category</Link>
                    </h3>
                </div>
                <div className="card-body">
                    <table className="table table-hover table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Slug</th>
                                <th scope="col">Meta title</th>
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {viewCategory_HTMLTABLE}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Categories;
