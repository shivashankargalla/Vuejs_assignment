<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.text-center {
  text-align: center !important;
}
.pt-20 {
  padding-top: 20px !important;
}
.pt-10 {
  padding-top: 10px !important;
}
.pb-20 {
  padding-bottom: 20px;
}
.pl-20 {
  padding-left: 20px;
}
.p-0 {
  padding: 0px !important
}
.m-0 {
  margin: 0px;
}
.mt-20 {
  margin: 0px;
}
.pr-60 {
  padding-left:60px;
}
.fs-20 {
  font-size: 20px;
}
.fs-12 {
  font-size: 12px;
}
.fw-bold {
  font-weight: bold;
}
.cursor-pointer {
  cursor: pointer;
}

.color-red {
  color: red;
}
</style>
