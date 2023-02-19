<template>
  <div class="main-drive d-flex flex-column pa-2">
    <div class="text-h6">Главный привод</div>
    <v-divider></v-divider>
    <div class="d-flex justify-space-between my-2">
      <div class="d-flex">
        <div class="text-caption font-weight-bold">Ток ротора,</div>
        <div class="text-caption font-weight-thin font-italic">А</div>
      </div>
      <div class="text-caption font-weight-bold">45</div>
    </div>
    <div class="d-flex justify-space-between mb-2">
      <div class="d-flex">
        <div class="text-caption font-weight-bold">Ток стартера,</div>
        <div class="text-caption font-weight-thin font-italic">А</div>
      </div>
      <div class="text-caption font-weight-bold">{{ data.statorCurrent.toFixed(2) }}</div>
    </div>
    <div class="d-flex justify-space-between mb-2">
      <div class="d-flex">
        <div class="text-caption font-weight-bold">Напряжение ротора,</div>
        <div class="text-caption font-weight-thin font-italic">кВт</div>
      </div>
      <div class="text-caption font-weight-bold">45</div>
    </div>
    <div class="d-flex justify-space-between mb-2">
      <div class="d-flex">
        <div class="text-caption font-weight-bold">Напряжение стартера,</div>
        <div class="text-caption font-weight-thin font-italic">кВт</div>
      </div>
      <div class="text-caption font-weight-bold">45</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainDrive",
  props: {
    data: Object
  }
};
</script>

<style scoped>
.main-drive {
  position: absolute;
  top: 214px;
  left: 1054px;
  width: 241px;
}
</style>
