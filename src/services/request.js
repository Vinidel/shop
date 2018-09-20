import axios from 'axios';

const BASE_URl = 'http://localhost:8081/'; 

export default () => {
  const token = localStorage.getItem('usertoken');
  return axios.create({baseURL: BASE_URl, headers: {Authorization: `Bearer ${token}`}});
};