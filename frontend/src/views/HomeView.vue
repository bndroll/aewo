<template>
  <div>
    <LegendMain />
    <div class="machines-container">
      <AgloMachine />
      <AgloMachine />
      <AgloMachine />
    </div>
  </div>
</template>

<script>
import AgloMachine from "../components/AgloMachine.vue";
import LegendMain from "../components/LegendMain.vue";

export default {
  name: "HomeView",
  components: { AgloMachine, LegendMain },
  mounted() {
    this.$ws.emit("get_metrics");
  },
};
</script>
<style scoped>
.machines-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 16px;
}
</style>
