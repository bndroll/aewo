<template>
  <div class="cooler">
    <div class="text-h6">Охладитель</div>
    <div class="in-1 d-flex flex-column align-center">
      <v-chip
        class="pa-2 d-flex justify-center align-center"
        small
        style="width: 63px"
        >233 C</v-chip
      >
      <v-icon>mdi-arrow-down-thin</v-icon>
    </div>
    <div class="out-1 d-flex flex-column align-center">
      <v-chip
        class="pa-2 d-flex justify-center align-center"
        small
        style="width: 63px"
        >233 C</v-chip
      >
      <v-icon>mdi-arrow-up-thin</v-icon>
    </div>
    <v-chip
      class="in-2 pa-2 d-flex justify-center align-center"
      small
      style="width: 63px"
      >233 C</v-chip
    >
    <v-chip
      class="out-2 pa-2 d-flex justify-center align-center"
      small
      style="width: 63px"
      >233 C</v-chip
    >
  </div>
</template>

<script>
export default {
  name: "Cooler", // eslint-disable-line
};
</script>

<style scoped>
.cooler {
  position: absolute;
  top: 52px;
  left: 1052px;
}

.in-1 {
  top: -47px;
  left: -22px;
  position: absolute;
}

.out-1 {
  top: -47px;
  left: 65px;
  position: absolute;
}

.in-2 {
  top: 4px;
  left: -101px;
  position: absolute;
}

.out-2 {
  top: 53px;
  left: 25px;
  position: absolute;
}
</style>
