<template>
  <div class="machines-container">
    <AgloMachine />
    <AgloMachine />
    <AgloMachine />
  </div>
</template>

<script>
import AgloMachine from "../components/AgloMachine.vue";

export default {
  name: "HomeView",
  components: { AgloMachine },
};
</script>
<style scoped>
.machines-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 16px;
}
</style>
