import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getCurrentUser } from '../api/user';

const getUserPokemon = async () => {
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
    }/pokemon/mypokemon/`,
    body,
    config
  );
  return res.data;
};

const releasePokemon = async (releasePokeData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${localStorage.getItem('access')}`,
      Accept: 'application/json',
    },
  };
  const body = JSON.stringify({
    token: localStorage.getItem('access'),
    ...releasePokeData,
  });

  const res = await axios.post(
    `${
      process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : ''
    }/pokemon/releasepokemon/`,
    body,
    config
  );
  return res.data;
};
const Collection = () => {
  const [userPokemon, setUserPokemon] = useState(null);
  const [releasePokeData, setReleasePokeData] = useState({
    pokemon: '',
    username: '',
    id: -1,
  });

  useEffect(() => {
    getUserPokemon().then((res) => setUserPokemon(res));
    getCurrentUser().then((res) =>
      setReleasePokeData((prev) => {
        return { ...prev, username: res.username };
      })
    );
  }, []);

  return (
    <div className='container mt-5'>
      <h1>Collection</h1>
      <div className='mt-3'>
        <table className='table table-hover table-bordered table-responsive'>
          <thead className='table-primary'>
            <tr>
              <th scope='col'>ID</th>
              <th scope='col'>Name</th>
              <th scope='col'>Level</th>
              <th scope='col'>HP</th>
              <th scope='col'>Attack</th>
              <th scope='col'>Defense</th>
              <th scope='col'>Type</th>
            </tr>
          </thead>
          <tbody>
            {userPokemon &&
              userPokemon.map((pokemon, index) => {
                return (
                  <tr key={index}>
                    <td>{pokemon.id}</td>
                    <td>
                      <span>{pokemon.name}</span>
                      <button
                        className='btn btn-danger btn-sm float-end'
                        data-bs-toggle='modal'
                        data-bs-target='#confirmModal'
                        onClick={() => {
                          setReleasePokeData((prev) => {
                            return {
                              ...prev,
                              pokemon: pokemon.name,
                              id: pokemon.id,
                            };
                          });
                        }}
                      >
                        Release
                      </button>
                    </td>
                    <td>{pokemon.level}</td>
                    <td>{(pokemon.hp * pokemon.level) / 100}</td>
                    <td>{(pokemon.attack * pokemon.level) / 100}</td>
                    <td>{(pokemon.defense * pokemon.level) / 100}</td>
                    <td>{pokemon.type}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      {/* -------------------- Modal Start -------------------- */}
      <div
        className='modal fade'
        id='confirmModal'
        tabIndex='-1'
        aria-labelledby='confirmModal'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='confirmModalLabel'>
                Are you sure?
              </h5>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body'>
              Are you ready to say goodbye to{' '}
              <span className='text-danger fw-bold'>
                {releasePokeData.pokemon} [id: {releasePokeData.id}]?
              </span>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary'
                data-bs-dismiss='modal'
              >
                Close
              </button>
              <button
                type='button'
                className='btn btn-danger'
                onClick={() => {
                  releasePokemon(releasePokeData);
                  window.location.reload();
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* -------------------- Modal End -------------------- */}
    </div>
  );
};

export default Collection;
