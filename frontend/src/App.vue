<template>
  <v-app class="app-container">
    <NavBar />
    <div class="content-container pa-2" style="height: 100%">
      <router-view />
    </div>
    <Modal />
  </v-app>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import Modal from "./components/Modal.vue";

export default {
  components: {
    NavBar,
    Modal
  },
    async mounted() {
    const response = await this.$http.get('/metrics/find-last');
    this.$store.commit('setAllExhausters', response.data);
  }
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
