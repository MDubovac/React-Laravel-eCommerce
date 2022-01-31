import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

function AdminSidebar() {

    const navigate = useNavigate();

    const logoutSubmit = (e) => {
        e.preventDefault();

        axios.post(`/api/logout`).then(res => {
            if (res.data.status === 200) {
                localStorage.clear();
                swal({
                    title: "Success!",
                    text: "You have logged out successfully!",
                    icon: "success",
                });
                navigate('/');
            }
        });
    }

    return (
        <>
            <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                <div className="sb-sidenav-menu">
                    <div className="nav">

                        <div className="sb-sidenav-menu-heading">Actions</div>

                        <Link className="nav-link" to="/dashboard">
                            <div className="sb-nav-link-icon"></div>
                            <i className="fas fa-tools sb-nav-link-icon"></i>
                            Dashboard
                        </Link>

                        <Link className="nav-link" to="/categories">
                            <div className="sb-nav-link-icon"></div>
                            <i className="fas fa-list sb-nav-link-icon"></i>
                            Categories
                        </Link>

                        <Link className="nav-link" to="/products">
                            <div className="sb-nav-link-icon"></div>
                            <i className="fas fa-tags sb-nav-link-icon"></i>
                            Products
                        </Link>
                        
                        <div className="sb-sidenav-menu-heading">User Actions</div>
                        <a className="nav-link" href="charts.html">
                            <div className="sb-nav-link-icon"><i className="fas fa-user"></i></div>
                            Profile
                        </a>
                        <a onClick={logoutSubmit} className="nav-link" href="charts.html">
                            <div className="sb-nav-link-icon"><i className="fa fa-power-off"></i></div>
                            Logout
                        </a>
                    </div>
                </div>
                <div className="sb-sidenav-footer">
                    <div className="small">Logged in as:</div>
                    {localStorage.getItem('auth_name')}
                </div>
            </nav>
        </>
    );
}

export default AdminSidebar;
