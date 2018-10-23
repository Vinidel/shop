import request from './request';

function getProducts() {
  return request().get('products');
}

export default {
  getProducts
};
