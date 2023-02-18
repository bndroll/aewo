<template>
  <div class="oil-level d-flex flex-column pa-2">
    <div class="text-h6">Маслобак</div>
    <v-divider></v-divider>
    <div class="my-2 d-flex justify-space-between mb-2">
      <div class="text-caption">УРОВЕНЬ МАСЛА, %</div>
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
  name: "OilLevel",
  data() {
    return {
      value: 45,
    };
  },
};
</script>

<style scoped>
.oil-level {
  position: absolute;
  width: 342px;
  top: 2px;
  left: 577px;
}
</style>
