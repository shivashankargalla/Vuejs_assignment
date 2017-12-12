import Vue from 'vue';
import Router from 'vue-router';
import citiesComponent from '@/components/Cities';
import reportComponent from '@/components/Report';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/cities',
      name: 'cities',
      component: citiesComponent,
    },
    {
      path: '/cities/:cityName',
      name: 'report',
      component: reportComponent,
    },
    {
      path: '/',
      redirect: { name: 'cities' },
    },
  ],
});
