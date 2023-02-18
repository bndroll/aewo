<template>
  <div class="oil-pressure d-flex flex-column pa-2">
    <div class="my-2 d-flex justify-space-between mb-2">
      <div class="text-caption">ДАВЛЕНИЕ МАСЛА, кг/см3</div>
      <div class="text-caption font-weight-bold">{{ value }}</div>
    </div>
    <v-progress-linear
      v-model="value"
      color="primary"
      height="25"
      rounded
      class="mb-2"
      style="pointer-events: none"
    ></v-progress-linear>
  </div>
</template>

<script>
export default {
  name: "OilPressure",
  data() {
    return {
      value: 34,
    };
  },
};
</script>

<style scoped>
.oil-pressure {
  position: absolute;
  top: 69px;
  left: 1231px;
  width: 209px;
}
</style>
