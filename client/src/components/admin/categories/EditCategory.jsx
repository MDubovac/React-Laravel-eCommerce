import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import swal from 'sweetalert';

function EditCategory() {

    const navigate = useNavigate();

    const [categoryInput, setCategory] = useState([]);
    const [errors, setError] = useState([]);

    let { id } = useParams();

    useEffect(() => {
        axios.get(`/api/edit_category/${id}`).then(res => {
            if (res.data.status === 200) {
                setCategory(res.data.category);
            } else {
                navigate("/categories");
                swal({
                    title: '404!',
                    text: 'Category not found!',
                    icon: 'error',
                });
            }
        });
    }, []);

    const handleInput = (e) => {
        e.persist();
        setCategory({ ...categoryInput, [e.target.name]: e.target.value });
    }

    const categorySubmit = (e) => {
        e.preventDefault();

        const data = {
            'name': categoryInput.name,
            'slug': categoryInput.slug,
            'description': categoryInput.description,
            'meta_title': categoryInput.meta_title,
            'meta_keyword': categoryInput.meta_keyword,
            'meta_desc': categoryInput.meta_desc
        };

        axios.put(`/api/update_category/${id}`, data).then(res => {
            if (res.data.status === 200) {
                navigate("/categories");
                swal({
                    title: 'Success!',
                    text: 'Category updated successfully!',
                    icon: 'success',
                });
            } else {
                setError(res.data.errors);
            }
        });
    }
    
    return (
        <div className="container">
            <Link to="/categories" className="btn btn-outline-primary my-3">Go Back</Link>
            <form onSubmit={categorySubmit}>
                <h1>Edit Category</h1>
                <div className="form-group my-3">
                    <label htmlFor="name">Name</label>
                    <input onChange={handleInput} defaultValue={categoryInput.name} type="text" name="name" className="form-control" />
                    <span className="text-danger"><b>{ errors.name }</b></span>
                </div>
                <div className="form-group my-3">
                    <label htmlFor="slug">Slug</label>
                    <input onChange={handleInput} defaultValue={categoryInput.slug} type="text" name="slug" className="form-control" />
                    <span className="text-danger"><b>{ errors.slug }</b></span>
                </div>
                <div className="form-group my-3">
                    <label htmlFor="description">Description</label>
                    <textarea onChange={handleInput} defaultValue={categoryInput.description} name="description" id="description" cols="30" rows="10" className="form-control"></textarea>
                    <span className="text-danger"><b>{ errors.description }</b></span>
                </div>
                <div className="form-group my-3">
                    <label htmlFor="meta_title">Meta title</label>
                    <input onChange={handleInput} defaultValue={categoryInput.meta_title} type="text" name="meta_title" className="form-control" />
                    <span className="text-danger"><b>{ errors.meta_title }</b></span>
                </div>
                <div className="form-group my-3">
                    <label htmlFor="meta_keyword">Meta keyword</label>
                    <input onChange={handleInput} defaultValue={categoryInput.meta_keyword} type="text" name="meta_keyword" className="form-control" />
                    <span className="text-danger"><b>{ errors.meta_keyword }</b></span>
                </div>
                <div className="form-group my-3">
                    <label htmlFor="meta_desc">Meta Desc</label>
                    <input onChange={handleInput} defaultValue={categoryInput.meta_desc} type="text" name="meta_desc" className="form-control" />
                    <span className="text-danger"><b>{ errors.meta_desc }</b></span>
                </div>
                <button type="submit" className="btn btn-primary my-3">Update</button>
            </form>
        </div>
    );
}

export default EditCategory;
