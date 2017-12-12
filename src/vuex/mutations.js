
import { CITIES_UPDATE, CITIES_DELETE } from './mutation-types';

export default {
  [CITIES_UPDATE](state, obj) {
    state.cities.push(obj);  // eslint-disable-line
  },
  [CITIES_DELETE](state, obj) {
    state.cities.splice(obj, 1);
  },
};
