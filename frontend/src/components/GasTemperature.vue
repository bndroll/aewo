<template>
  <div class="gas-temperature pa-2 d-flex flex-column">
    <div class="d-flex justify-space-between mb-2">
      <div class="text-caption">ТЕМПЕРАТУРА ГАЗА, C</div>
      <div class="text-caption font-weight-bold">{{ data.temperature.toFixed(2) }}</div>
    </div>
    <div class="d-flex justify-space-between mb-2">
      <div class="d-flex">
        <div class="text-caption font-weight-bold">Разряжение,</div>
        <div class="text-caption font-weight-thin font-italic">мм.в.ст</div>
      </div>
      <div class="text-caption font-weight-bold">{{ data.underpressure.toFixed(2) }}</div>
    </div>
    
  </div>
</template>

<script>
export default {
  name: "GasTemperature",
  props: {
    data: Object
  }
};
</script>

<style scoped>
.gas-temperature {
  position: absolute;
  width: 200px;
  top: 35px;
  left: 30px;
}
</style>
