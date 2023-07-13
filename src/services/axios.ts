import axios from 'axios';

export const $api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNTgyOTdmMmE3YTUwZWY3NTI1NGE5ZjNlNTdkMzg3NiIsInN1YiI6IjY0YWIxMTk4YjY4NmI5MDBhZjllNTlkNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T9Z9dt5-RyfUQD3j4CDuOdEW5NPCHDObFwMq9hmhORk',
  },
});
