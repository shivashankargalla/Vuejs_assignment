import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cities: [],
  },
  getters,
  mutations,
  actions,
  plugins: [vuexLocal.plugin],
});
