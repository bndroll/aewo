<template>
  <div class="last-update">
    <div>Время последнего обновления: {{ new Date(lastUpdateTime).toTimeString() }}</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: "LastUpdate",
  computed: {
    ...mapState({
      lastUpdateTime: state => state.lastUpdateTime
    })
  }
}
</script>

<style scoped>
.last-update {
  position: absolute;
  top: 10px;
  right: 40px;
}
</style>