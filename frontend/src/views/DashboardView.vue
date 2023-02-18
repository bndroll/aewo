<template>
  <div class="dashboard-container d-flex flex-column">
    <div class="d-flex my-6 justify-center">
      <ExNavigation />
    </div>

    <div class="dashboard">
      <Tree />
    </div>
  </div>
</template>

<script>
import ExNavigation from "../components/ExNavigation.vue";
import Tree from "@/components/Tree.vue";

export default {
  name: "DashboardView",
  components: {
    ExNavigation,
    Tree,
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

.dashboard {  
  height: 100%;
  border-top: 1px solid #E6E6E6;
}
</style>
