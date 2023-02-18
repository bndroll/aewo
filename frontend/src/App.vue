<template>
  <v-app class="app-container">
    <NavBar />
    <div class="content-container pa-2" style="height: 100%">
      <router-view />
    </div>
  </v-app>
</template>

<script>
import NavBar from "./components/NavBar.vue";

export default {
  components: {
    NavBar,
  },
};
</script>

<style lang="scss">
body {
  font-family: "Roboto", sans-serif;
  background-color: #f5f5f5;
}

.v-application {
  background-color: #f5f5f5 !important;
}
</style>
