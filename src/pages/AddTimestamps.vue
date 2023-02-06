<template>
  <div class="container">
    <h1 class="has-text-centered is-size-3">
      <HomeButton></HomeButton>
      Add Timestamps
    </h1>
    <div class="main-content">
      <div class="tile is-ancestor is-vertical">
        <div class="tile">
          <div class="time-input">
            <b-field grouped position="is-centered">
              <b-select placeholder="00" v-model="time.hours">
                <option
                  v-for="hour in generateOptions(24)"
                  :value="hour.value"
                  :key="hour.value"
                >
                  {{ hour.label }}
                </option>
              </b-select>
              <span class="control is-colon">:</span>
              <b-select placeholder="00" v-model="time.mins">
                <option
                  v-for="minute in generateOptions(60)"
                  :value="minute.value"
                  :key="minute.value"
                >
                  {{ minute.label }}
                </option>
              </b-select>
              <span class="control is-colon">:</span>
              <b-select placeholder="00" v-model="time.secs">
                <option
                  v-for="second in generateOptions(60)"
                  :value="second.value"
                  :key="second.value"
                >
                  {{ second.label }}
                </option>
              </b-select>
              <span class="control is-colon">:</span>
              <b-select placeholder="00" v-model="time.frames">
                <option
                  v-for="frame in generateOptions(24)"
                  :value="frame.value"
                  :key="frame.value"
                >
                  {{ frame.label }}
                </option>
              </b-select>
            </b-field>
          </div>
        </div>
        <div class="tile buttons">
          <b-button
            icon-right="arrow-down-bold"
            type="is-info"
            @click="timeToFrames"
          ></b-button>
          <b-button
            icon-right="arrow-up-bold"
            type="is-info"
            @click="framesToTime"
          ></b-button>
          <b-button
            icon-right="close-thick"
            type="is-danger"
            @click="clear"
          ></b-button>
        </div>
        <div class="tile">
          <b-input placeholder="0" type="number" v-model="frames"></b-input>
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
      time: {
        hours: null,
        mins: null,
        secs: null,
        frames: null,
      },
      frames: null,
      framesPerSec: 24,
      framesPerMin: 60 * 24,
      framesPerHour: 60 * 60 * 24,
    };
  },
  methods: {
    resetTime() {
      this.time.frames = null;
      this.time.secs = null;
      this.time.mins = null;
      this.time.hours = null;
    },
    resetFrames() {
      this.frames = null;
    },
    formatNumber(value) {
      return (value < 10 ? "0" : "") + value;
    },
    generateOptions(till) {
      const options = [];
      for (let i = 0; i < till; i++) {
        options.push({
          label: this.formatNumber(i),
          value: i,
        });
      }
      return options;
    },
    clear() {
      this.resetFrames();
      this.resetTime();
    },
    framesToTime() {
      if (!this.framesEmpty) {
        let frames = this.frames;
        this.time.hours = Math.floor(frames / this.framesPerHour);
        frames = frames % this.framesPerHour;
        this.time.mins = Math.floor(frames / this.framesPerMin);
        frames = frames % this.framesPerMin;
        this.time.secs = Math.floor(frames / this.framesPerSec);
        frames = frames % this.framesPerSec;
        this.time.frames = frames;
      } else {
        this.$toast.open({
          message: "Empty form, please input something",
          type: "is-danger",
          position: "is-bottom",
        });
      }
    },
    timeToFrames() {
      if (!this.timeEmpty) {
        this.frames =
          this.time.frames +
          this.time.secs * 24 +
          this.time.mins * 60 * 24 +
          this.time.hours * 60 * 60 * 24;
      } else {
        this.$toast.open({
          message: "Empty form, please input something",
          type: "is-danger",
          position: "is-bottom",
        });
      }
    },
  },
  computed: {
    timeEmpty() {
      return (
        this.time.frames === null &&
        this.time.secs === null &&
        this.time.mins === null &&
        this.time.hours === null
      );
    },
    framesEmpty() {
      return this.frames === null;
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

.is-colon {
  font-size: 1.7rem;
  line-height: 1.9rem;
}
</style>
