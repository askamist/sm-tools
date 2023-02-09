<template>
  <div id="app">
    <router-view></router-view>
    <footer class="footer">
      Made with <b-icon class="love" icon="heart-multiple"></b-icon> by MA
    </footer>
  </div>
</template>

<script>
export default {
  name: "app",
};
</script>

<style scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  margin-bottom: 152px;
}
.love {
  color: #f14668;
}

footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  text-align: center;
  padding: 2rem 1.5rem;
  z-index: 4;
  border-top: 1px solid #7957d5;
}
</style>
