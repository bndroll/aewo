<template>
  <div
    class="chip-container mx-1 pa-1 d-flex align-center justify-space-between"
  >
    <span>T</span>
    <v-icon x-small color="#868686">mdi-thermometer</v-icon>
  </div>
</template>

<script>
export default {
  name: "Chip", //eslint-disable-line
};
</script>

<style>
.chip-container {
  width: 34px;
  height: fit-content;
  background: #f4f4f4;
  border: 1px solid #cccccc;
  border-radius: 2px;
  font-weight: 300;
  font-size: 13px;
  line-height: 15px;
}
</style>
