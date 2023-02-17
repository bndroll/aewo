<template>
  <div>
    <v-btn color="primary">Кнопка</v-btn>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  mounted() {
    console.log(this.$vuetify);
  },
};
</script>
