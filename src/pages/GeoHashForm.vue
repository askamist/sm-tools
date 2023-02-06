<template>
  <div class="container">
    <h1 class="has-text-centered is-size-3">
      <HomeButton></HomeButton> {{ msg }}
    </h1>
    <b-tabs>
      <b-tab-item label="From geoStrings">
        <b-field label="Enter a list GeoHash-s separated by space">
          <b-input
            v-model="geoHashString"
            maxlength="7000"
            type="textarea"
          ></b-input>
        </b-field>
        <button class="button" v-on:click="generateKMLfromHashList">
          Download kml files as zip
        </button>
      </b-tab-item>
      <b-tab-item label="From LatLng">
        <form @submit.prevent="generateKMLfromCorners">
          <b-field label="Filename (optional)">
            <b-input v-model="name"></b-input>
          </b-field>
          <b-field grouped>
            <b-field expanded label="Nort East Lat">
              <b-input
                v-model="ne.lat"
                name="nelat"
                v-validate="'required|between:-85.000001,85.999999'"
              ></b-input>
            </b-field>
            <b-field expanded label="Nort East Lng">
              <b-input
                v-model="ne.lon"
                name="nelng"
                v-validate="'required|between:-180.000001,180.999999'"
              ></b-input>
            </b-field>
          </b-field>
          <b-field grouped>
            <b-field expanded label="South West Lat">
              <b-input
                v-model="sw.lat"
                name="swlat"
                v-validate="'required|between:-85.000001,85.999999'"
              ></b-input>
            </b-field>
            <b-field expanded label="South West Lng">
              <b-input
                v-model="sw.lon"
                name="swlng"
                v-validate="'required|between:-180.000001,180.999999'"
              ></b-input>
            </b-field>
          </b-field>
          <button class="button">Download kml</button>
        </form>
      </b-tab-item>
    </b-tabs>
    <b-loading
      :is-full-page="false"
      :active.sync="isLoading"
      :can-cancel="false"
    ></b-loading>
  </div>
</template>

<script>
import GeoHash from "latlon-geohash";
import JsZip from "jszip";
import { saveAs } from "file-saver";
import { northEastSouthWestToKml } from "../LatLngToKML";
import HomeButton from "../components/HomeButton.vue";

export default {
  name: "GeoHashForm",
  data() {
    return {
      geoHashString: "tepfg tepfz",
      msg: "Generate kml from geoHash or LatLng",
      isLoading: false,
      name: "customKmlFromCorners",
      ne: {
        lat: null,
        lon: null,
      },
      sw: {
        lat: null,
        lon: null,
      },
    };
  },
  methods: {
    generateKMLfromHashList() {
      this.isLoading = true;
      let hashes = new Set(this.geoHashString.split(" ").map((x) => x.trim()));
      let zipFile = new JsZip().folder("all-kml-files");
      hashes.forEach((geohash) => {
        if (!geohash) return;
        const corners = GeoHash.bounds(geohash);
        let kml = northEastSouthWestToKml(corners.ne, corners.sw, geohash);
        zipFile.file(`${geohash}.kml`, kml, {
          unixPermissions: "644",
        });
      });
      zipFile.generateAsync({ type: "blob" }).then((spongebob) => {
        this.isLoading = false;
        saveAs(spongebob, `all-kml-files.zip`);
        zipFile = null;
      });
    },
    generateKMLfromCorners() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          const name = this.name || "customKmlFromCorners";
          saveAs(
            new Blob([northEastSouthWestToKml(this.ne, this.sw, name)], {
              type: "text/plain;charset=utf-8",
            }),
            `${name}.kml`
          );
        } else {
          this.$toast.open({
            message: "Form is not valid! Please check the fields.",
            type: "is-danger",
            position: "is-bottom",
          });
        }
      });
    },
  },
  components: { HomeButton },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
