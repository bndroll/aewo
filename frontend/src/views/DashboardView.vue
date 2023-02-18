<template>
  <div
    class="dashboard-container d-flex justify-start align-center rounded-xl flex-column"
  >
    <div class="d-flex flex-column mt-4 mb-16 align-center">
      <ExNavigation class="mb-4" />
    </div>
  </div>
</template>

<script>
import ExNavigation from "../components/ExNavigation.vue";

export default {
  name: "DashboardView",
  components: {
    ExNavigation,
  },
};
</script>

<style scoped>
.dashboard-container {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: white;
}
</style>
