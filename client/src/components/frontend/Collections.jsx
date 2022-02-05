import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Collections() {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get(`/api/all_categories`).then(res => {
            if (res.data.status === 200) {
                setCategories(res.data.categories);
            }
        });
    }, []);

    var displayCategories = '';
    displayCategories = categories.map((category) => {
        return (
            <div key={category.id} className="col-md-4">
                <div className="card my-3">
                    <h2 className="text-center my-2">
                        <Link to={`/collections/${category.slug}`}>
                            {category.name}
                        </Link>
                    </h2>
                </div>
            </div>
        );
    })

    return (
        <>
            <div className="jumbotron jumbotron-fluid bg-warning">
                <div className="container">
                    <h5 className="py-4">Categories</h5>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    {displayCategories}
                </div>
            </div>
        </>
    );
}

export default Collections;
