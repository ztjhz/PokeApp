import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './containers/Home';
import Login from './containers/Login';
import Signup from './containers/Signup';
import Collection from './containers/Collection';
import Catch from './containers/Catch';

import Layout from './hocs/Layout';

import { Provider } from 'react-redux';
import store from './store';

const App = () => (
  <Provider store={store}>
    <Router>
      <Layout>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/signup' element={<Signup />} />
          <Route exact path='/collection' element={<Collection />} />
          <Route exact path='/catch' element={<Catch />} />
        </Routes>
      </Layout>
    </Router>
  </Provider>
);

export default App;
