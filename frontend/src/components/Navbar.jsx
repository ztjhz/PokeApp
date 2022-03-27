import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';

const Navbar = ({ isAuthenticated, logout }) => {
  const [activeLink, setActiveLink] = useState('home');

  const guestLinks = () => {
    return (
      <>
        <Link className='nav-link' to='/login'>
          Login
        </Link>
        <Link className='nav-link' to='/signup'>
          Signup
        </Link>
      </>
    );
  };

  const authLinks = () => {
    return (
      <>
        <Link
          className={`nav-link ${activeLink === 'collection' ? 'active' : ''}`}
          onClick={() => {
            setActiveLink('collection');
          }}
          to='/collection'
        >
          Collection
        </Link>
        <Link
          className={`nav-link ${activeLink === 'catch' ? 'active' : ''}`}
          onClick={() => {
            setActiveLink('catch');
          }}
          to='/catch'
        >
          Catch Pokemon
        </Link>
        <a className='nav-link' href='#!' onClick={logout}>
          Logout
        </a>
      </>
    );
  };

  return (
    <nav className='navbar navbar-dark bg-primary navbar-expand-lg'>
      <div className='container-fluid'>
        <Link className='navbar-brand' to='/'>
          PokeApp
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarNavAltMarkup'
          aria-controls='navbarNavAltMarkup'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
          <div className='navbar-nav'>
            <Link
              className={`nav-link ${activeLink === 'home' ? 'active' : ''}`}
              aria-current='page'
              onClick={() => {
                setActiveLink('home');
              }}
              to='/'
            >
              Home
            </Link>
            {isAuthenticated ? authLinks() : guestLinks()}
          </div>
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(Navbar);
