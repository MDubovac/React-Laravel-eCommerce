import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';

function Register() {

    const navigate = useNavigate();

    const [registerInput, setRegister] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        error_list: []
    });

    const handleInput = (e) => {
        e.persist();
        setRegister({ ...registerInput, [e.target.name]: e.target.value });
    }

    const registerSubmit = (e) => {
        e.preventDefault();

        const data = {
            name: registerInput.name,
            email: registerInput.email,
            password: registerInput.password,
            password_confirmation: registerInput.password_confirmation,
        }

        axios.get(`/sanctum/csrf-cookie`).then(response => {
            axios.post(`/api/register`, data).then(res => {
                if (res.data.status === 200) {
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.username);
                    localStorage.setItem('auth_role', res.data.role);
                    navigate('/dashboard');
                    swal({
                        title: 'Success!',
                        text: 'You have registered successfully!',
                        icon: 'success',
                    });
                } else {
                    setRegister({ ...registerInput, error_list: res.data.validation_errors });
                }
            });
        });
    }

    return (
        <>
            <div className='container my-3'>
                <h1>Register</h1>
                <form onSubmit={registerSubmit}>
                    <div className='form-group my-3'>
                        <label htmlFor='name'>Name</label>
                        <input value={registerInput.name} onChange={handleInput} type='text' name='name' className='form-control' />
                        <span className='text-danger'><b>{registerInput.error_list.name}</b></span>
                    </div>

                    <div className='form-group my-3'>
                        <label htmlFor='email'>E-mail address</label>
                        <input value={registerInput.email} onChange={handleInput} type='email' name='email' className='form-control' />
                        <span className='text-danger'><b>{registerInput.error_list.email}</b></span>
                    </div>

                    <div className='form-group my-3'>
                        <label htmlFor='password'>Password</label>
                        <input value={registerInput.password} onChange={handleInput} type='password' name='password' className='form-control' />
                        <span className='text-danger'><b>{registerInput.error_list.password}</b></span>
                    </div>

                    <div className='form-group my-3'>
                        <label htmlFor='name'>Repeat password</label>
                        <input value={registerInput.password_confirmation} onChange={handleInput} type='password' name='password_confirmation' className='form-control' />
                        <span className='text-danger'><b>{registerInput.error_list.password_confirmation}</b></span>
                    </div>

                    <p className='disclaimer'>
                        The data you enter into this form will remain private, please enter valid information.
                        <br />
                        Already registered? <Link to='/login'>Click here</Link> to login!
                    </p>

                    <button type='submit' className='btn btn-primary my-1'>Register</button>
                </form>
            </div>
        </>
    );
}

export default Register;
