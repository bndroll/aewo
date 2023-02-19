<template>
  <div
    v-if="showCard"
    class="podshipnik-card d-flex flex-column pa-2 rounded-lg"
    :class="`pod-card-${number}`"
  >
    <div class="text-h6">{{ number }} ПК</div>
    <v-divider></v-divider>
    <PodshipnikProp :label="$pods[number].temperature.label" :data="data.temperature" :number="number" />
    <div v-if="$pods[number].vibration">
      <PodshipnikProp
        :label="$pods[number].vibration.horizontal.label"
        :data="data.vibration.horizontal"
        :number="number"
      />
      <PodshipnikProp
        :label="$pods[number].vibration.vertical.label"
        :data="data.vibration.vertical"
        :number="number"
      />
      <PodshipnikProp
        :label="$pods[number].vibration.axis.label"
        :data="data.vibration.axis"
        :number="number"
      />
    </div>
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
    data: Object
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
