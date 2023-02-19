<template>
  <div class="oil-pressure d-flex flex-column pa-2">
    <div class="my-2 d-flex justify-space-between mb-2">
      <div class="text-caption">ДАВЛЕНИЕ МАСЛА, кг/см2</div>
      <div class="text-caption font-weight-bold">{{ data.oilPressure.toFixed(2) }}</div>
    </div>
    <v-progress-linear
      v-model="modelValue"
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
  props: {
    data: Object
  },
  computed: {
    color() {
      if ((this.data.oilPressure / 6) * 100 < (0.5 / 6) * 100) {
        return "error";
      }
      if ((this.data.oilPressure / 6) * 100 < (0.2 / 6) * 100) {
        return "primary";
      }
      return "success";
    },
    modelValue() {
      return (this.data.oilPressure / 6) * 100;
    },
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
