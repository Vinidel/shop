import request from './request';

export function register({email, password}) {
  return request().post('users/signup', {email, password});
}

export default {
  register
};