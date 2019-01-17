<template>
  <div id="app">
    <GeoHashForm msg="Convert from GeoHash to kml"/>
  </div>
</template>

<script>
import GeoHashForm from './components/GeoHashForm.vue'

export default {
  name: 'app',
  components: {
    GeoHashForm
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
