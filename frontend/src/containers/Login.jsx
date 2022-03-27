import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions/auth';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const { username, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    login(username, password);
  };

  // is the user authenticated?
  // redirect them to the home page
  if (isAuthenticated) {
    return <Navigate to='/' />;
  }
  return (
    <div className='container mt-5'>
      <h1>Sign In</h1>
      <p>Sign into your account</p>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className='form-group mb-2'>
          <input
            type='username'
            placeholder='Username'
            name='username'
            value={username}
            onChange={(e) => onChange(e)}
            required
            className='form-control'
          />
        </div>
        <div className='form-group mb-2'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={(e) => onChange(e)}
            minLength='5'
            required
            className='form-control'
          />
        </div>
        <button className='btn btn-primary' type='submit'>
          Login
        </button>
      </form>
      <p className='mt-3'>
        Don't have an account? <Link to='/signup'>Sign Up</Link>
      </p>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { login })(Login);
