import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getCurrentUser } from '../api/user';

const GAME_CEIL = 10;

const randomInt = (ceil) => {
  return Math.floor(Math.random() * ceil) + 1;
};

const getRandomPokemon = async () => {
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
  return res.data[randomInt(res.data.length)];
};

const addPokemon = async (username, pokemon) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${localStorage.getItem('access')}`,
      Accept: 'application/json',
    },
  };
  const body = JSON.stringify({
    token: localStorage.getItem('access'),
    username,
    pokemon,
  });

  const res = await axios.post(
    `${
      process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : ''
    }/pokemon/addpokemon/`,
    body,
    config
  );
  if (res.data === 'success') {
    return true;
  } else {
    return false;
  }
};

const Catch = () => {
  const [guess, setGuess] = useState(0);
  const [answer, setAnswer] = useState(randomInt(GAME_CEIL));
  const [tries, setTries] = useState(0);
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);
  const [randomPoke, setRandomPoke] = useState(null);
  const [resSuccess, setResSuccess] = useState(null);

  useEffect(() => {
    if (tries === 3 && answer !== guess) {
      restartGame();
    }
  }, [answer, guess, tries]);

  useEffect(() => {
    getRandomPokemon().then((res) => setRandomPoke(res));
  }, []);

  const restartGame = () => {
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const handleGuess = () => {
    setTries((prev) => prev + 1);
    if (Number(guess) === answer) {
      setFail(false);
      setSuccess(true);
      getCurrentUser().then((user) => {
        addPokemon(user.username, randomPoke).then((success) => {
          success ? setResSuccess(true) : setResSuccess(false);
        });
      });
    } else {
      setFail(true);
      setSuccess(false);
    }
  };
  return (
    <div className='container mt-5'>
      <h1>Catch Pokemon</h1>
      <h5 className='text-danger'>
        You encountered: <em>{randomPoke ? randomPoke : '...'}!</em> 🐕
      </h5>
      <p>Guess a number from 1 - 10</p>
      <p className='text-muted'>Answer is {answer}</p>

      <div className='form-group mb-2'>
        <input
          type='number'
          placeholder='Guess the number'
          name='guess'
          value={guess}
          min='0'
          max='10'
          onChange={(e) => setGuess(e.target.value)}
          required
          className='form-control'
        />
      </div>
      {resSuccess ? (
        <button className='btn btn-primary mb-3' disabled>
          Guess
        </button>
      ) : (
        <button
          className='btn btn-primary mb-3'
          type='submit'
          onClick={handleGuess}
        >
          Guess
        </button>
      )}
      <button className='btn btn-danger mb-3 ms-3' onClick={restartGame}>
        Restart game
      </button>

      {success && (
        <div class='alert alert-success' role='alert'>
          You guessed correctly!
        </div>
      )}
      {resSuccess && (
        <div class='alert alert-success' role='alert'>
          You successfully captured {randomPoke}!
        </div>
      )}
      {fail && (
        <div class='alert alert-danger' role='alert'>
          Wrong guess! {tries} / 3 tries {tries === 3 && '- Refreshing page...'}
        </div>
      )}
    </div>
  );
};

export default Catch;
