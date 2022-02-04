import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

function Login() {

    const navigate = useNavigate();

    const [loginInput, setLogin] = useState({
        email: '',
        password: '',
        error_list: []
    });

    const handleInput = (e) => {
        e.persist();
        setLogin({ ...loginInput, [e.target.name]: e.target.value })
    }

    const loginSubmit = (e) => {
        e.preventDefault();

        const data = {
            email: loginInput.email,
            password: loginInput.password
        };

        axios.get(`/sanctum/csrf-cookie`).then(response => {
            axios.post(`/api/login`, data).then(res => {
                if (res.data.status === 200) {
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.username);
                    localStorage.setItem('auth_role', res.data.role);

                    if (res.data.role === 'admin') {
                        navigate('/dashboard');
                    } else {
                        navigate('/');
                    }

                    swal({
                        title: 'Success!',
                        text: 'You have logged in successfully!',
                        icon: 'success',
                    });
                } else if (res.data.status === 401) {
                    swal({
                        title: 'Invalid credentials!',
                        text: 'User does not exist. Please try again.',
                        icon: 'error',
                    });
                } else {
                    setLogin({ ...loginInput, error_list: res.data.validation_errors })
                }
            });
        });
    }

    return (
        <>
            <div className='container my-3'>
                <h1>Login</h1>
                <form onSubmit={loginSubmit}>
                    <div className='form-group my-3'>
                        <label htmlFor='email'>E-mail address</label>
                        <input defaultValue={loginInput.email} onChange={handleInput} type='email' name='email' className='form-control' />
                        <span className='text-danger'><b>{loginInput.error_list.email}</b></span>
                    </div>

                    <div className='form-group my-3'>
                        <label htmlFor='password'>Password</label>
                        <input defaultValue={loginInput.password} onChange={handleInput} type='password' name='password' className='form-control' />
                        <span className='text-danger'><b>{loginInput.error_list.password}</b></span>
                    </div>

                    <p className='disclaimer'>
                        The data you enter into this form will remain private, please enter valid information.
                        <br />
                        Not registered? <Link to='/register'>Click here</Link> to register!
                    </p>

                    <button type='submit' className='btn btn-primary my-1'>Login</button>
                </form>
            </div>
        </>
    );
}

export default Login;
