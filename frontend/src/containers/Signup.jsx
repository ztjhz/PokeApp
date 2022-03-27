import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { signup } from '../actions/auth';

const Signup = ({ signup, isAuthenticated }) => {
  const [accountCreated, setAccountCreated] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    re_password: '',
  });

  const { username, password, re_password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password === re_password) {
      signup(username, password, re_password);
      setAccountCreated(true);
    }
  };

  // is the user authenticated?
  // redirect them to the home page
  if (isAuthenticated) {
    return <Navigate to='/' />;
  }
  if (accountCreated) {
    return <Navigate to='/login' />;
  }
  return (
    <div className='container mt-5'>
      <h1>Sign Up</h1>
      <p>Create your account</p>
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
        <div className='form-group mb-2'>
          <input
            type='password'
            placeholder='Confirm Password'
            name='re_password'
            value={re_password}
            onChange={(e) => onChange(e)}
            minLength='5'
            required
            className='form-control'
          />
        </div>
        <button className='btn btn-primary' type='submit'>
          Register
        </button>
      </form>
      <p className='mt-3'>
        Already have an account? <Link to='/login'>Sign In</Link>
      </p>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { signup })(Signup);
