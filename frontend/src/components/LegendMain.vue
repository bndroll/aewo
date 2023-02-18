<template>
  <div class="d-flex justify-end mb-3">
    <div class="d-flex mr-4 align-center">
      <div class="d-flex align-center mr-1">
        <span class="text-body-2">T</span>
        <v-icon small color="black">mdi-thermometer</v-icon>
      </div>
      <div class="text-body-2">Температура</div>
    </div>
    <div class="d-flex mr-4 align-center">
      <div class="d-flex align-center mr-1">
        <span class="text-body-2">V</span>
        <v-icon small color="black">mdi-access-point</v-icon>
      </div>
      <div class="text-body-2">Вибрация</div>
    </div>
    <div class="d-flex mr-4 align-center">
      <div class="d-flex align-center mr-1">
        <span class="text-body-2">L</span>
        <v-icon small color="black">mdi-water-outline</v-icon>
      </div>
      <div class="text-body-2">Уровень масла</div>
    </div>
    <div class="d-flex justify-space-between">
      <div class="d-flex align-center">
        <div
          style="width: 12px; height: 12px; background-color: #fab82e"
          class="rounded mr-1"
        ></div>
        <div class="text-body-2">Предупреждение</div>
      </div>
      <div class="d-flex align-center ml-3">
        <div
          style="width: 12px; height: 12px; background-color: #cd2b37"
          class="rounded mr-1"
        ></div>
        <div class="text-body-2">Опасность</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LegendMain",
};
</script>

<style scoped></style>
