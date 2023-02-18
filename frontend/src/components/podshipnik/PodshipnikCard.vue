<template>
  <div
    v-if="showCard"
    class="podshipnik-card d-flex flex-column pa-2 rounded-lg"
    :class="`pod-card-${number}`"
  >
    <div class="text-h6">{{ number }} ПС</div>
    <v-divider></v-divider>
    <PodshipnikProp :label="'T, C'" :value="'220'" />
  </div>
</template>

<script>
import PodshipnikProp from "./PodshipnikProp.vue";

export default {
  name: "PodshipnikCard",
  components: {
    PodshipnikProp,
  },
  props: {
    number: Number,
    showCard: Boolean,
  },
};
</script>

<style scoped>
.podshipnik-card {
  border: 1px solid #e6e6e6;
  width: 169px;
  position: absolute;
}
</style>
