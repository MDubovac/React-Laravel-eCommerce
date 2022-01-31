import React from 'react';
import { Link } from 'react-router-dom';

function Products() {
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
                            
                        </tbody>
                    </table>
                </div>
            </div>
      </div>
  );
}

export default Products;
