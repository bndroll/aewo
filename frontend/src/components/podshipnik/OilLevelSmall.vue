<template>
  <div class="podshipnik-container d-flex justify-space-between pa-2 mb-1">
    <span>Уровень масла</span>
    <div class="d-flex align-center justify-space-between">
      <Chip :data="{ label: 'L', icon: 'mdi-water-outline' }" :status="oilLevelStatusStatus" />
    </div>
  </div>
</template>

<script>
import Chip from "../Chip.vue";

export default {
  components: { Chip },
  name: "OilLevelSmall", //eslint-disable-line
  props: {
    number: Number,
    data: Object
  },
  computed: {
    oilLevelStatusStatus() {
      if (this.data.oilLevel < 10) {
        return "alarm";
      }
      if (this.data.oilLevel < 20) {
        return "warning";
      }
      return '';
    },
  },
  watch: {
    oilLevelStatusStatus(val) {
      if (val === 'alarm') {
        this.$emit('alarm', { item: 'oil', event: 'oil level' })
      }
  }
  },
};
</script>

<style>
.podshipnik-container {
  background: #fafafa;
  border-radius: 4px;
}
</style>
