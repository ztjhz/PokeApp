import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { getCurrentUser } from '../api/user';

const getUnownedPokemon = async () => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${localStorage.getItem('access')}`,
      Accept: 'application/json',
    },
  };
  const body = JSON.stringify({
    token: localStorage.getItem('access'),
    username: (await getCurrentUser()).username,
  });

  const res = await axios.post(
    `${
      process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : ''
    }/pokemon/unownedpokemon/`,
    body,
    config
  );
  return res.data;
};

const getAllPokemon = async () => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${localStorage.getItem('access')}`,
      Accept: 'application/json',
    },
  };

  const res = await axios.get(
    `${
      process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : ''
    }/pokemon/allpokemon/`,
    config
  );
  return res.data;
};
const Home = () => {
  const [unownedPoke, setUnownedPoke] = useState(null);
  const [allPoke, setAllPoke] = useState(null);

  useEffect(() => {
    getUnownedPokemon().then((res) => setUnownedPoke(res));
    getAllPokemon().then((res) => setAllPoke(res));
  }, []);
  return (
    <div className='container mt-5'>
      <h1>Home</h1>
      <table
        id='unowned-pokemon-table'
        className='table table-hover table-bordered table-responsive mt-3'
      >
        <thead className='table-danger'>
          <tr>
            <th scope='col'>Unowned Pokemon</th>
          </tr>
        </thead>
        <tbody>
          {unownedPoke &&
            unownedPoke.map((pokemon, index) => {
              return (
                <tr key={index}>
                  <td>{pokemon}</td>
                </tr>
              );
            })}
        </tbody>
      </table>

      <table
        id='all-pokemon-table'
        className='table table-hover table-bordered table-responsive mt-3'
      >
        <thead className='table-primary'>
          <tr>
            <th scope='col'>All Pokemon</th>
          </tr>
        </thead>
        <tbody>
          {allPoke &&
            allPoke.map((pokemon, index) => {
              return (
                <tr
                  key={index}
                  className={
                    unownedPoke && !unownedPoke.includes(pokemon)
                      ? 'table-success'
                      : ''
                  }
                >
                  <td className='d-flex justify-content-between'>
                    <span>{pokemon}</span>
                    <span className='me-3'>
                      {unownedPoke &&
                        !unownedPoke.includes(pokemon) &&
                        'table-success' &&
                        '✔'}
                    </span>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
