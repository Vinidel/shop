import request from './request';

function register({email, password}) {
  return request().post('users/signup', {email, password});
}

function login({email, password}) {
  return request().post('users/login', {email, password});
}

function logout() {
  return request().delete('users/logout');
}


export default {
  register,
  login,
  logout
};