import axios from 'axios';

const BASE_URl = 'http://localhost:8081/'; 

export default () => {
  return axios.create({baseURL: BASE_URl});
};