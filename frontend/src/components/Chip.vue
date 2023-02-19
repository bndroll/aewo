<template>
  <div
    :class=[status]
    class="chip-container mx-1 pa-1 d-flex align-center justify-space-between"
  >
    <span>{{ data.label }}</span>
    <v-icon x-small color="#868686">{{ data.icon }}</v-icon>
  </div>
</template>

<script>
export default {
  name: "Chip", //eslint-disable-line
  props: {
    data: Object,
    status: String,
  }
};
</script>

<style>
.chip-container {
  width: 34px;
  height: fit-content;
  background: #f4f4f4;
  border: 1px solid #cccccc;
  border-radius: 2px;
  font-weight: 300;
  font-size: 13px;
  line-height: 15px;
}

.warning {
  background-color: #FAB82E;
}

.alarm {
  background-color: #CD2B37;
}

</style>
