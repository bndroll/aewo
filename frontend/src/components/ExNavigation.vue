<template>
  <div class="ex-navigation pa-1 rounded d-flex">
    <v-btn
      :color="$route.name === 'exhauster' ? '#FAB82E' : '#F5F5F5'"
      class="mr-1"
      width="160"
      elevation="0"
      @click="() => $router.go(-1)"
      >МНЕМОСХЕМА</v-btn
    >
    <v-btn
      :color="$route.name === 'dashboard' ? '#FAB82E' : '#F5F5F5'"
      width="160"
      elevation="0"
      @click="() => $router.push({ name: 'dashboard' })"
      >ГРАФИК</v-btn
    >
  </div>
</template>

<script>
export default {
  name: "ExNavigation",
};
</script>

<style scoped>
.ex-navigation {
  border: 1px solid #e6e6e6;
}
</style>
