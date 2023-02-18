<template>
  <div class="aglomachine-container pa-2">
    <div class="aglomachine-header px-4 py-2 mb-2">
      <span>Агломашина 1</span>
    </div>
    <div class="exhausters-container">
      <Exhauster />
      <Exhauster />
    </div>
  </div>
</template>

<script>
import Exhauster from "./Exhauster.vue";

export default {
  name: "AgloMachine",
  components: {
    Exhauster,
  },
};
</script>

<style scoped>
.aglomachine-container {
  width: 100%;
  height: fit-content;
  border: 1px solid #e6e6e6;
  border-radius: 16px;
  background-color: white;
}

.aglomachine-header {
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: #6e6e6d;
  background: #f5f5f5;
  border: 1px solid #e6e6e6;
  border-radius: 8px;
}

.exhausters-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 8px;
}
</style>
