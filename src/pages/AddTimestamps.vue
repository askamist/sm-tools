<template>
  <div class="container">
    <h1 class="has-text-centered is-size-3">
      <HomeButton></HomeButton>
      Add Timestamps
    </h1>
    <div class="main-content">
      <div class="tile is-ancestor is-vertical">
        <div class="tile" v-for="(_, index) in timestamps" :key="index">
          <div class="button-space"></div>
          <timestamp-input v-model="timestamps[index]"></timestamp-input>
          <div class="button-space">
            <b-button
              icon-right="delete"
              type="is-danger"
              @click="deleteInput(index)"
              v-if="timestamps.length > 1"
            ></b-button>
          </div>
        </div>
        <div class="tile buttons">
          <b-button
            icon-right="plus-thick"
            type="is-danger"
            @click="addInput"
          ></b-button>
          <b-button
            icon-right="close-thick"
            type="is-danger"
            @click="reset"
          ></b-button>
        </div>
        <div class="tile">
          <div class="button-space"></div>
          <timestamp-input v-model="total" disabled></timestamp-input>
          <div class="button-space"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import HomeButton from "../components/HomeButton.vue";
import TimestampInput from "../components/TimestampInput.vue";

export default {
  components: { HomeButton, TimestampInput },
  data() {
    return {
      timestamps: [this.emptyTimestamp()],
    };
  },
  methods: {
    reset() {
      this.timestamps = [this.emptyTimestamp()];
    },
    addInput() {
      this.timestamps.push(this.emptyTimestamp());
    },
    deleteInput(index) {
      this.timestamps.splice(index, 1);
    },
    emptyTimestamp() {
      return {
        frames: 0,
        secs: 0,
        mins: 0,
        hours: 0,
      };
    },
  },
  computed: {
    total() {
      let frames = 0,
        secs = 0,
        mins = 0,
        hours = 0;

      this.timestamps.map((ts) => {
        frames += ts.frames;
        secs += ts.secs;
        mins += ts.mins;
        hours += ts.hours;
      });

      secs += Math.floor(frames / 24);
      frames = frames % 24;

      mins += Math.floor(secs / 60);
      secs = secs % 60;

      hours += Math.floor(mins / 60);
      mins = mins % 60;

      return {
        frames,
        secs,
        mins,
        hours,
      };
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
