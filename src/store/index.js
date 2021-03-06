import Vue from 'vue';
import Vuex from 'vuex';
import router from '@/router';
import auth from '@/services/authentication';
import product from '@/services/product';


Vue.use(Vuex);
export const store = new Vuex.Store({
  state: {
    appTitle: 'Your Awesome App',
    user: null,
    products: {
      list: [],
      count: 0
    },
    error: null,
    loading: false,
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload;
    },
    setError (state, payload) {
      state.error = payload;
    },
    setLoading (state, payload) {
      state.loading = payload;
    },
    setProducts (state, payload) {
      state.products.list = payload.data.products;
      state.products.count = payload.data.count;
    }
  },
  actions: {
    userSignUp ({commit}, payload) {
      commit('setLoading', true);
      auth.register({email: payload.email, password: payload.password})
      .then(response => {
       commit('setUser', {email: response.data.email, token: response.data.token});
       commit('setLoading', false);
       commit('setError', null);
       localStorage.setItem("useremail", response.data.email);
       localStorage.setItem("usertoken", response.data.token); 
       router.push('/home');
      })
      .catch(error => {
       commit('setError', error.response.data.message);
       commit('setLoading', false);
      });
    },
    userSignIn ({commit}, payload) {
      commit('setLoading', true);
      auth.login({email: payload.email, password: payload.password})
        .then(response => {
          commit('setUser', {email: response.data.email, token: response.data.token});
          commit('setLoading', false);
          commit('setError', null);
          localStorage.setItem("useremail", response.data.email);
          localStorage.setItem("usertoken", response.data.token);
          router.push('/home');
        })
        .catch(error => {
          commit('setError', error.response.data.message);
          commit('setLoading', false);
        });
    },
    autoSignIn ({commit}) {
      commit('setUser', {email: localStorage.getItem('useremail'), token: localStorage.getItem('usertoken')});
    },
    userSignOut ({commit}) {
      auth.logout()
        .then( ()=> {
          localStorage.removeItem('useremail');
          localStorage.removeItem('usertoken');
          commit('setUser', null);
          router.push('/');
        })
        .catch(error => {
          commit('setError', error.response.data.message);
          commit('setLoading', false);
        });
    },
    getProducts({commit}) {
      commit('setLoading', true);
      product.getProducts()
        .then(result => {
          commit('setLoading', false);
          commit('setError', null);
          commit('setProducts', result);
        })
        .catch(error => {
          commit('setError', error.response.data.message);
          commit('setLoading', false);
        });
    }
  },  
  getters: {
    isAuthenticated (state) {
      return state.user !== null && state.user !== undefined;
    }
  }
});
