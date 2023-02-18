<template>
  <v-app>
    <router-view />
    <machine />
  </v-app>
</template>

<script>
import machine from './home/aglomachine.vue'

export default {
  components: { machine }
}
</script>


<style lang="scss">
body {
  font-family: "Roboto", sans-serif;
}
</style>
