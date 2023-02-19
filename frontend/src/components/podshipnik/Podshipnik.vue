<template>
  <div class="podshipnik-container d-flex justify-space-between pa-2 mb-1">
    <span>{{ number }} п-к</span>
    <div class="d-flex align-center justify-space-between">
      <Chip :data="{ label: 'T', icon: 'mdi-thermometer' }"  :status="temperatureStatus" />
      <Chip v-if="data.vibration" :data="{ label: 'V', icon: 'mdi-access-point' }" :status="vibrationStatus" />
    </div>
  </div>
</template>

<script>
import Chip from "../Chip.vue";

export default {
  components: { Chip },
  name: "Podshipnik", //eslint-disable-line
  props: {
    number: Number,
    data: Object
  },
  computed: {
    temperatureStatus() {
      if (this.data.temperature.value > this.data.temperature.alarmMax) {
        return 'alarm';
      } else {
        if (this.data.temperature.value > this.data.temperature.warningMax && this.data.temperature.value < this.data.temperature.alarmMax) {
          return'warning';
        }
      }

      return '';
    },
    vibrationStatus() {
      if (this.data.vibration) {
        if (this.data.vibration.axis.value > this.data.vibration.axis.alarmMax) {
        return 'alarm';
      } else {
          if (this.data.vibration.axis.value > this.data.vibration.axis.warningMax && this.data.vibration.axis.value < this.data.vibration.axis.alarmMax) {
            return'warning';
          }
        }
      }
      return '';
    }
  },
  watch: {
    vibrationStatus(val) {
      if (val === 'alarm') {
        this.$emit('alarm', { pod: this.number, event: 'vibration' })
      }
      if (val === 'warning') {
        this.$emit('warning')
      }
    },
    temperatureStatus(val) {
      if (val === 'alarm') {
        this.$emit('alarm', { pod: this.number, event: 'temperature' })
      }
      if (val === 'alarm') {
        this.$emit('warning')
      }
    },
  }
};
</script>

<style>
.podshipnik-container {
  background: #fafafa;
  border-radius: 4px;
}
</style>
