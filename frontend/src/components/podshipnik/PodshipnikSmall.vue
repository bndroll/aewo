<template>
  <div>
    <div
      @click="toggleCard"
      class="podshipnik-small rounded-lg d-flex justify-center align-center"
      :class="`pod-${number}`"
    >
      <div class="text-h6">{{ number }}</div>
    </div>
    <PodshipnikCard :number="number" :showCard="showCard" :data="data" />
  </div>
</template>

<script>
import PodshipnikCard from "./PodshipnikCard.vue";

export default {
  name: "PodshipnikSmall",
  components: {
    PodshipnikCard,
  },
  props: {
    number: Number,
    data: Object
  },
  data() {
    return {
      showCard: true,
    };
  },
  methods: {
    toggleCard() {
      this.showCard = !this.showCard;
    },
  },
};
</script>

<style scoped lang="scss">
.podshipnik-small {
  width: 40px;
  height: 40px;
  border: 1px solid #e6e6e6;
  position: absolute;
  background-color: white;

  &:hover {
    cursor: pointer;
  }
}
</style>
