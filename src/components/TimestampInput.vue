<template>
  <b-field grouped position="is-centered">
    <b-select
      placeholder="00"
      :value="timestamp.hours"
      @input="(e) => emitValue(e, 'hours')"
      :disabled="disabled"
    >
      <option
        v-for="hour in generateOptions(24)"
        :value="hour.value"
        :key="hour.value"
      >
        {{ hour.label }}
      </option>
    </b-select>
    <span class="control is-colon">:</span>
    <b-select
      placeholder="00"
      :value="timestamp.mins"
      @input="(e) => emitValue(e, 'mins')"
      :disabled="disabled"
    >
      <option
        v-for="minute in generateOptions(60)"
        :value="minute.value"
        :key="minute.value"
      >
        {{ minute.label }}
      </option>
    </b-select>
    <span class="control is-colon">:</span>
    <b-select
      placeholder="00"
      :value="timestamp.secs"
      @input="(e) => emitValue(e, 'secs')"
      :disabled="disabled"
    >
      <option
        v-for="second in generateOptions(60)"
        :value="second.value"
        :key="second.value"
      >
        {{ second.label }}
      </option>
    </b-select>
    <span class="control is-colon">:</span>
    <b-select
      placeholder="00"
      :value="timestamp.frames"
      @input="(e) => emitValue(e, 'frames')"
      :disabled="disabled"
    >
      <option
        v-for="frame in generateOptions(24)"
        :value="frame.value"
        :key="frame.value"
      >
        {{ frame.label }}
      </option>
    </b-select>
  </b-field>
</template>
<script>
export default {
  props: {
    timestamp: {
      type: Object,
      required: true,
      // default: () => ({
      //   hours: null,
      //   mins: null,
      //   secs: null,
      //   frames: null,
      // }),
    },
    disabled: Boolean,
  },
  model: {
    prop: "timestamp",
    event: "update:timestamp",
  },
  methods: {
    emitValue(e, key) {
      this.$emit("update:timestamp", {
        ...this.timestamp,
        [key]: e,
      });
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
  },
};
</script>
<style scoped>
.is-colon {
  font-size: 1.7rem;
  line-height: 1.9rem;
}
</style>
