<template>
  <div class="container">
    <h1 class="has-text-centered is-size-3">{{ msg }}</h1>
    <b-field label="Enter a list GeoHash-s seperated by space">
      <b-input v-model="geoHashString" maxlength="200" type="textarea">
      </b-input>
    </b-field>
    <button class="button" v-on:click="generateKML">Download kml files as zip</button>
    <b-loading :is-full-page="false" :active.sync="isLoading" :can-cancel="false"></b-loading>
  </div>
</template>

<script>
import GeoHash from 'latlon-geohash';
import JsZip from "jszip"
import { saveAs } from 'file-saver';
import getKMLString from '../LatLngToGeoHash';

export default {
  name: 'GeoHashForm',
  props: {
    msg: String
  },
  data() {
    return {
      geoHashString: 'tepfg tepfz',
      isLoading: false,
    };
  },
  methods: {
    generateKML() {
      this.isLoading = true;
      let hashes = new Set(this.geoHashString.split(' ').map((x) => x.trim()));
      let zipFile = (new JsZip()).folder('all-kml-files');
      hashes.forEach((geohash) => {
        if(!geohash) return;
        const corners = GeoHash.bounds(geohash)
        let kml = getKMLString(
          geohash,
          [
            {...corners.ne}, // NE
            {lat: corners.sw.lat, lon: corners.ne.lon}, // SE
            {...corners.sw}, // SW
            {lat: corners.ne.lat, lon: corners.sw.lon}, // NW
            {...corners.ne}, // NE
          ]
        )
        zipFile.file(`${geohash}.kml`, kml, {
          unixPermissions: "644"
        })
      });
      zipFile.generateAsync({type: 'blob'}).then((spongebob) => {
        this.isLoading = false;
        saveAs(spongebob, `all-kml-files.zip`);
        zipFile = null;
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
