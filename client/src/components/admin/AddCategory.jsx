import axios from 'axios';
import React, { useState } from 'react';
import swal from 'sweetalert';

function AddCategory() {

    const [categoryInput, setCategory] = useState({
        name: '',
        slug: '',
        description: '',
        status: null,
        meta_title: '',
        meta_keyword: '',
        meta_desc: '',
        error_list: []
    });

    const handleInput = (e) => {
        e.persist();
        setCategory({ ...categoryInput, [e.target.name]: e.target.value });
    }

    const categorySubmit = (e) => {
        e.preventDefault();

        const data = {
            name: categoryInput.name,
            slug: categoryInput.slug,
            description: categoryInput.description,
            status: categoryInput.status,
            meta_title: categoryInput.meta_title,
            meta_keyword: categoryInput.meta_keyword,
            meta_desc: categoryInput.meta_desc
        };

        axios.post(`/api/categories`, data).then(res => {
            if (res.data.status === 200) {
                swal({
                    title: 'Success!',
                    text: 'Category created successfully!',
                    icon: 'success',
                });
            } else {
                setCategory({ ...categoryInput, error_list: res.data.errors });
            }
        });

    }

    return (
        <div className="container">
            <form onSubmit={categorySubmit}>
                <h1 className="mt-3">Add Category</h1>
                <div className="form-group my-3">
                    <label htmlFor="name">Name</label>
                    <input onChange={handleInput} defaultValue={categoryInput.name} type="text" name="name" className="form-control" />
                    <span className="text-danger"><b>{ categoryInput.error_list.name }</b></span>
                </div>
                <div className="form-group my-3">
                    <label htmlFor="slug">Slug</label>
                    <input onChange={handleInput} defaultValue={categoryInput.slug} type="text" name="slug" className="form-control" />
                    <span className="text-danger"><b>{ categoryInput.error_list.slug }</b></span>
                </div>
                <div className="form-group my-3">
                    <label htmlFor="description">Description</label>
                    <textarea onChange={handleInput} defaultValue={categoryInput.description} name="description" id="description" cols="30" rows="10" className="form-control"></textarea>
                    <span className="text-danger"><b>{ categoryInput.error_list.description }</b></span>
                </div>
                <div className="form-group my-3">
                    <label htmlFor="meta_title">Meta title</label>
                    <input onChange={handleInput} defaultValue={categoryInput.meta_title} type="text" name="meta_title" className="form-control" />
                    <span className="text-danger"><b>{ categoryInput.error_list.meta_title }</b></span>
                </div>
                <div className="form-group my-3">
                    <label htmlFor="meta_keyword">Meta keyword</label>
                    <input onChange={handleInput} defaultValue={categoryInput.meta_keyword} type="text" name="meta_keyword" className="form-control" />
                    <span className="text-danger"><b>{ categoryInput.error_list.meta_keyword }</b></span>
                </div>
                <div className="form-group my-3">
                    <label htmlFor="meta_desc">Meta Desc</label>
                    <input onChange={handleInput} defaultValue={categoryInput.meta_desc} type="text" name="meta_desc" className="form-control" />
                    <span className="text-danger"><b>{ categoryInput.error_list.meta_desc }</b></span>
                </div>
                <div className="form-group my-3">
                    <label htmlFor="status">Status</label>
                    <select onChange={handleInput} defaultValue={categoryInput.status} name="status" id="status" className="form-control">
                        <option value="0">Disabled</option>
                        <option value="1">Enabled</option>
                    </select>
                    <span className="text-danger"><b>{ categoryInput.error_list.status }</b></span>
                </div>
                <button type="submit" className="btn btn-primary my-3">Add Category</button>
            </form>
        </div>
    );
}

export default AddCategory;
