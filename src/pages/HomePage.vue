<template>
  <div class="container">
    <h1 class="has-text-centered is-size-3">
      <b-icon
        class="home-icon"
        icon="home"
        type="is-success"
        size="is-medium"
      ></b-icon>
      <code>i-s<span class="has-text-success">ma</span>ll</code> tools
    </h1>
    <div class="main-content">
      <!-- use the router-link component for navigation. -->
      <!-- specify the link by passing the `to` prop. -->
      <!-- `<router-link>` will render an `<a>` tag with the correct `href` attribute -->
      <router-link to="/geo-hash-to-kml">
        <b-button class="main-button" type="is-primary" expanded>
          GeoHash to kml
        </b-button>
      </router-link>
      <router-link to="/frames-to-timestamp">
        <b-button class="main-button" type="is-primary" expanded>
          Frames to Timestamp
        </b-button>
      </router-link>
      <router-link to="/add-timestamps">
        <b-button class="main-button" type="is-primary" expanded>
          Add Timestamps
        </b-button>
      </router-link>
    </div>
  </div>
</template>
<style scoped>
.home-icon {
  vertical-align: middle;
  margin-right: 16px;
}
.main-content {
  max-width: 400px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  margin-top: 40px;
}

.main-button {
  width: 100%;
  flex-grow: 1;
  margin-bottom: 0.5em;
}
</style>
