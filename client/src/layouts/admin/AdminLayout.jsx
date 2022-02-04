import React, { useEffect } from 'react';
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';
import AdminFooter from './AdminFooter';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios';

function AdminLayout(props) {

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('auth_token') || localStorage.getItem('auth_role') != 'admin') {
      navigate('/');
    }
  }, []);

  axios.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    if (error.response.status === 403) {
      swal({
        title: 'Forbidden!',
        text: error.response.data.message,
        icon: 'warning'
      });
      navigate('/403')
    }
    else if (error.response.status === 404) {
      swal({
        title: 'Forbidden!',
        text: error.response.data.message,
        icon: 'warning'
      });
      navigate('/404')
    }

    return Promise.reject(error);
  }
  );

  let Cmp = props.Cmp;

  return (
    <div className="sb-nav-fixed">
      <AdminHeader />
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <AdminSidebar />
        </div>
        <div id="layoutSidenav_content">
          <main>
            <Cmp />
          </main>
          <AdminFooter />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
