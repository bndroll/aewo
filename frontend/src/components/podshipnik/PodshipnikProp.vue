<template>
  <div
    class="mt-1 pa-1 rounded d-flex flex-row justify-space-between"
    :class="{ warning: isWarning, alarm: isAlarm }"
  >
    <div>{{ label }}</div>
    <div class="text-bold">{{ value }}</div>
  </div>
</template>

<script>
export default {
  name: "PodshipnikProp",
  props: {
    label: String,
    value: String,
    restrictions: Object,
  },
  computed: {
    isWarning() {
      return false;
    },
    isAlarm() {
      return false;
    },
  },
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
