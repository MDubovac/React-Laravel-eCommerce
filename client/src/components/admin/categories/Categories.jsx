import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

function Categories() {

    const [categoryList, setCategoryList] = useState([]);

    useEffect(() => {
        axios.get(`/api/categories`).then(res => {
            if (res.data.status === 200) {
                setCategoryList(res.data.categories);
            }
        });
    }, []);

    const deleteCategory = (e, id) => {
        e.preventDefault();

        const thisClicked = e.currentTarget;

        axios.delete(`/api/delete_category/${id}`).then(res => {
            if (res.data.status === 200) {   
                swal({
                    title: 'Success!',
                    text: res.data.message,
                    icon: 'success',
                });
                thisClicked.closest("tr").remove();
            } else {
                swal({
                    title: '404!',
                    text: res.data.message,
                    icon: 'error',
                });
            }   

        });

    }

    // Create a table
    var viewCategory_HTMLTABLE = "";
    viewCategory_HTMLTABLE = categoryList.map((item) => {
        return (
            <tr key={item.id} scope="row">
                <td>{item.name}</td>
                <td>{item.slug}</td>
                <td>{item.meta_title}</td>
                <td>
                    <Link to={`/edit_category/${item.id}`} className="btn btn-primary mx-1" >
                        <i className="fa fa-edit"></i>
                    </Link>
                    <button onClick={(e) => deleteCategory(e, item.id)} className="btn btn-danger mx-1">
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
                                <th scope="col"></th>
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
