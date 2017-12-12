<template>
  <div class="cities">
    <nav class="navbar navbar-inverse text-center">
      <div class="main-header" href="#">Weather App</div>
    </nav>
    <div v-show="error" class="alert alert-danger alert-dismissable">
      <a class="close" v-on:click="error = null">&times;</a>
      <strong>Danger!</strong>{{error}}
    </div>
    <div class="container">
    <div class="row header">Add a city:</div>
    <div class="row pt-20">
      <div class="col-lg-3 col-md-3 col-sm-3">
        <input class="form-control" type="text" v-model= "city">
      </div>
        <div class="col-lg-2 col-md-2 col-sm-2">
        <button class="btn btn-primary btn-block" :disabled="!city" v-on:click="addCities(city, true)">Enter City</button>
      </div>
    </div>
    <div class="row pt-20 pl-20">
      <table class="table table-striped table-bordered" v-if="getCities && getCities.length > 0">
       <thead>
         <tr>
           <th>City </th>
           <th>Forecast</th>
           <th></th>
         </tr>
       </thead>
       <tbody>
         <tr v-for="(citi, index) in getCities">
           <td class="pt-10">{{citi.city}}</td>
           <td class="">
             <button class="btn btn-link" v-on:click="changeRoute(citi.city)">Click here</button>
           </td>
           <td class="text-right pr-60">
             <button class="btn btn-link color-red" v-on:click="deleteCity(index)">Remove</button>
           </td>
         </tr>
       </tbody>
     </table>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'cities',
  data() {
    return {
      city: '',
      error: null,
    };
  },
  mounted() {
  },
  computed: {
    getCities() {
      return this.$store.getters.getCities.length > 0 ? this.$store.getters.getCities : this.cities(); //eslint-disable-line
    },
  },
  methods: {
    addCities(city) {
      const url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=metric&APPID=024b0cd9d9731d995daa14d8469b44e3';// eslint-disable-line
      this.$http.get(url).then((response) => {
        window.console.log(response);
        const loc = response.body.coord.lat + ' latitude ' + response.body.coord.lon + ' longitude'; //eslint-disable-line
        const val = { city, location: loc };
        this.city = '';
        this.$store.dispatch('updateCitiesAction', val);
      }, (error) => {
        this.error = error.body.message;
        window.console.log(this.error);
      });
    },
    changeRoute(city) {
      this.$router.push({ name: 'report', params: { cityName: city } });
    },
    cities() {
      const data = JSON.parse(window.localStorage.getItem('vuex'));
      return data && data.cities ? data.cities : [];
    },
    deleteCity(index) { //eslint-disable-line
      this.city = '';
      this.$store.dispatch('deleteCitiesAction', index);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main-header {
  margin-top: 20px;
  margin-bottom: 20px;
  color: #fff;
  font-size: 27px;
}
.navbar-inverse{
background-color: cadetblue !important;
border-color: cadetblue;
}
.enter-label {
  padding-top: 3px;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
}
.header {
  font-size: 20px;
  font-weight: bold;
  padding-left: 15px;
}
</style>
