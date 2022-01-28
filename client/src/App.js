import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Frontend components
import MainPage from './layouts/frontend/MainPage';
import Home from './components/frontend/Home';
import Collections from './components/frontend/Collections';
import Login from './components/frontend/Login';
import Register from './components/frontend/Register';

// Admin page assets
import './assets/admin/css/styles.css';
import './assets/admin/js/scripts.js';

// Errors
import Page403 from './components/errors/Page403';
import Page404 from './components/errors/Page404';

// Axios Configuration
import axios from 'axios';
import AdminLayout from './layouts/admin/AdminLayout';
import Dashboard from './components/admin/Dashboard';
import AddCategory from './components/admin/AddCategory';
axios.defaults.baseURL = 'http://127.0.0.1:8000';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.withCredentials = true;
axios.interceptors.request.use(function(config) {
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          
          <Route path='/' element={ <MainPage Cmp={ Home } /> } />
          <Route path='/collections' element={ <MainPage Cmp={ Collections } /> } />
          <Route path='/login' element={ <MainPage Cmp={ Login } /> } />
          <Route path='/register' element={ <MainPage Cmp={ Register } /> } />

          
          <Route path='/dashboard' element={ <AdminLayout Cmp={ Dashboard } /> } />
          <Route path='/addCategory' element={ <AdminLayout Cmp={ AddCategory } /> } />

          <Route path='/403' element={ <Page403/> } />
          <Route path='/404' element={ <Page404/> } />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
