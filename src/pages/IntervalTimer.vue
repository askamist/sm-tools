<template>
  <div class="container">
    <h1 class="has-text-centered is-size-3">
      <home-button />
      Interval Timer
    </h1>
    <div class="main-content">
      <div class="tile is-ancestor is-vertical">
        <div class="tile" v-for="(interval, index) in intervals" :key="index">
          <div class="button-space"></div>
          <timestamp-input v-model="interval.start" placeholder="Start Time"></timestamp-input>
          <div class="button-space">
            <b-button icon-right="delete" type="is-danger" @click="deleteInterval(index)"
              v-if="intervals.length > 1"></b-button>
          </div>
        </div>
        <div class="tile buttons">
          <b-button icon-right="plus-thick" type="is-info" @click="addInterval"></b-button>
          <b-button icon-right="close-thick" type="is-danger" @click="reset"></b-button>
        </div>
        <div class="tile">
          <div class="button-space"></div>
          <timestamp-input v-model="intervals[0].duration" placeholder="Duration"></timestamp-input>
          <div class="button-space"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import HomeButton from "../components/HomeButton.vue";

export default {
  components: { HomeButton },
  data() {
    return {
      intervals: [
        { start: null, end: null, duration: null },
      ],
    };
  },
  methods: {
    reset() {
      this.intervals = [
        { start: null, end: null, duration: null },
      ];
    },
    addInterval() {
      this.intervals.push({ start: null, end: null, duration: null });
    },
    deleteInterval(index) {
      if (this.intervals.length > 1) {
        this.intervals.splice(index, 1);
      }
    },
  },
};
</script>
<style scoped>
.main-content {
  min-width: 400px;
  width: 40vw;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  margin-top: 40px;
}

.tile {
  display: flex;
  justify-content: center;
  margin: 1em;
}

.button-space {
  margin-left: 12px;
  width: 36px;
}
</style>
