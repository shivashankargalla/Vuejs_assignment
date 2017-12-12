import { CITIES_UPDATE, CITIES_DELETE } from './mutation-types';

export default {
  updateCitiesAction({ commit }, obj) {
    commit(CITIES_UPDATE, obj);
  },
  deleteCitiesAction({ commit }, obj) {
    commit(CITIES_DELETE, obj);
  },
};
