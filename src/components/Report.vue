<template>
  <div class="report">
    <nav class="navbar navbar-inverse">
      <div class="container">
        <div class="row main-header" href="#">
          <div class="col-lg-4 col-md-4 col-sm-4">
            <router-link class="btn btn-warning" :to="{ name: 'cities'}">Add Cities</router-link>
          </div>
          <div class="col-lg-4 col-md-4 col-sm-4 text-center">{{cityName.toUpperCase()}}</div>
          <div class="col-lg-4 col-md-4 col-sm-4 text-center">
          <select class="form-control" v-model="cityName" v-on:change="changeRoute(cityName)">
            <option v-for="city in getCities" :value="city.city">{{city.city}}</option>
          </select></div>
        </div>
      </div>
    </nav>
    <div class="container">
      <div class="row text-right">
        <a class="btn" v-on:click="gridStyle = true" :class="{ 'btn-primary': gridStyle }">Grid</a>
        <a class="btn" v-on:click="gridStyle = false" :class="{ 'btn-primary': !gridStyle }">List</a>
      </div>
      <div class="fs-20 fw-bold">Current weather report of selected date and city:</div>
      <div class="row main-card p-0 m-0">
        <div class="col-lg-4 text-center fs-20 fw-bold">
        <div>
          <div class="temp-main">{{selectedCity.date | moment('MMMM Do YYYY, h:mm:ss a')}}</div>
          <div class="temp p-0">{{selectedCity.type}}</div>
        </div>
        <img class="main-icon" :src='"http://openweathermap.org/img/w/" + selectedCity.icon + ".png"' alt="">
        </div>
        <div class="col-lg-4 temp-current text-center fs-60">{{selectedCity.current | filterTemp(selectedCity.current)}}&deg;c</div>
        <div class="col-lg-4 text-center">
          <div class="temp">
          {{selectedCity.min | filterTemp(selectedCity.min)}}&deg;c min
          <div>&nbsp{{selectedCity.max | filterTemp(selectedCity.max)}}&deg;c max</div>
          </div>
        </div>
      </div>
      <div class="fs-20 fw-bold">Weather report for every 3 hrours for 5 days of selected city:</div>
      <div class="row pt-20">
        <div class="pt-20 cursor-pointer" :class="{'col-lg-12': !gridStyle, 'col-lg-3 col-md-3 col-sm-3': gridStyle }" v-on:click="changeTime(report)" v-for="(report, index) in reports">
          <div class="row card" :class="{'bg-active': selectedCity.date === report.date }">
            <div class="col-lg-4 p-0">
              <div class="date-class" :class="{'bg-active': selectedCity.date === report.date }">{{report.date | moment('MMMM Do YYYY, h:mm:ss a')}}</div>
              <img class="icon-class" :src='"http://openweathermap.org/img/w/" + report.icon + ".png"' alt="">
            </div>
            <div class="col-lg-4 pt-20">{{report.current | filterTemp(report.current) }}&deg;c</div>
            <div class="col-lg-4 pt-20" >
              <div> {{report.min | filterTemp(report.min)}}&deg;c min</div>
              <div>{{report.max | filterTemp(report.max)}}&deg;c max</div>
            </div>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';

export default {
  name: 'report',
  data() {
    return {
      gridStyle: true,
      selectedCity: {
        min: null,
        max: null,
        current: null,
        date: null,
        icon: null,
        type: null,
      },
      cityName: '',
      reports: [],
      cities: [],
    };
  },
  mounted() {
    this.cityName = this.$route.params.cityName;
    this.getWeatherReport();
  },
  filters: {
    filterTemp(value) {
      return Math.round(Number(value));
    },
  },
  methods: {
    changeRoute(cityName) {
      this.$router.push({ name: 'report', params: { cityName } });
      this.getWeatherReport();
    },
    getWeatherReport() {
      const url = 'http://api.openweathermap.org/data/2.5/forecast?q=' + this.cityName + '&units=metric&APPID=024b0cd9d9731d995daa14d8469b44e3';// eslint-disable-line
      this.$http.get(url).then((response) => {
        window.console.log(response);
        if (response.body && response.body.list.length > 0) {
          this.reports = [];
          this.loopWeatherReport(response.body.list);
        }
      }, (error) => {
        window.console.log(error);
      });
    },
    loopWeatherReport(list) {
      const self = this;
      _.forEach(list, function(o) { //eslint-disable-line
        self.reports.push({
          min: o.main.temp_min,
          max: o.main.temp_max,
          current: o.main.temp,
          date: o.dt_txt,
          icon: o.weather[0].icon,
          type: o.weather[0].main,
        });
      });
      if (this.reports.length > 0) {
        this.selectedCity = this.reports[0];
      }
    },
    changeTime(report) {
      this.selectedCity = report;
    },
  },
  computed: {
    getCities() {
      return this.$store.getters.getCities;
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
.card {
  background-color: #f7f9fb;
  border: 1px solid grey;
  margin: 1px;
  font-weight: bold;
  font-size: 16px;
  padding: 5px;
  color: #727d76;
}
.main-card {
  background-color: rgb(37, 66, 129);
  border: 1px solid grey;
  padding: 20px 0px !important;
  margin: 30px 1px !important;
}
.date-class {
  border: 1px solid grey;
  padding: 2px 8px;
  font-size: 10px;
  background-color: #d6e3d6;
}
.icon-class {
  width: 40px;
  height: 40px;
}
.main-icon {
  width: 100px;
  height: 100px;
}
.toggle {
  font-size: 18px;
}
.temp {
  font-size: 40px !important;
  font-weight: bold;
  padding-top: 50px;
  color:#b4b350;
}
.temp-current {
  font-size: 150px !important;
  color:#f5eaea;
}
.temp-main {
  font-size: 30px !important;
  color:#94d24c;
}
.bg-active {
  background-color: #497158;
  color: #fff;
}
</style>
