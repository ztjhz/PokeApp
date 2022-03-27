import axios from 'axios';

export const getCurrentUser = async () => {
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
    }/auth/users/me/`,
    config
  );
  return res.data;
};
