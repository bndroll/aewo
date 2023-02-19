<template>
  <div
    class="mt-1 pa-1 rounded d-flex flex-row justify-space-between"
    :class="{ warning: status === 'warning', alarm: status === 'alarm' }"
  >
    <div>{{ label }}</div>
    <div class="text-bold">{{ data.value.toFixed(2) }}</div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: "PodshipnikProp",
  props: {
    label: String,
    data: Object,
    number: Number
  },

  computed: {
    ...mapState({
      selectedExhauster: state => state.selectedExhauster
    }),
    status() {
      if (this.data.value > this.data.alarmMax) {
        return 'alarm';
      } else {
        if (this.data.value > this.data.warningMax && this.data.value < this.data.alarmMax) {
          return'warning';
        }
      }
      return '';
    }
  },
  watch: {
    status(val) {
      if (val === 'alarm') {
        this.$emit('alarm', )
        this.$store.commit('setAlarmModal', { isOpen: true, data: { item: 'pod', number: this.number, event: 'temperature', name: this.selectedExhauster.name } });
      }
    }
  }
};
</script>

<style scoped lang="scss">
.warning {
  background-color: #ee6b33;
}

.alarm {
  background-color: #cd2b37;
}
</style>
