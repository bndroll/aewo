<template>
  <div>
    <LegendMain />
    <div class="machines-container" v-if="all">
      <AgloMachine
        :number="1"
        :exhausters="[
          { name: 'У-171', id: 1, rotor: 22, data: all.exhauster1, lastChange: '14', prognozis: '20' },
          { name: 'У-172', id: 2, rotor: 29, data: all.exhauster2, lastChange: '20', prognozis: '30' },
        ]"
      />
      <AgloMachine
        :number="2"
        :exhausters="[
          { name: 'Ф-171', id: 3, rotor: 37, data: all.exhauster3, lastChange: '15', prognozis: '25' },
          { name: 'Ф-172', id: 4, rotor: 27, data: all.exhauster4, lastChange: '13', prognozis: '23' },
        ]"
      />
      <AgloMachine
        :number="3"
        :exhausters="[
          { name: 'Х-171', id: 5, rotor: 39, data: all.exhauster5, lastChange: '17', prognozis: '24' },
          { name: 'Х-172', id: 6, rotor: 45, data: all.exhauster6, lastChange: '18', prognozis: '29' },
        ]"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import AgloMachine from "../components/AgloMachine.vue";
import LegendMain from "../components/LegendMain.vue";

export default {
  name: "HomeView",
  components: { AgloMachine, LegendMain },
  data() {
    return {
      all: null
    }
  },
  mounted() {
    this.all = this.$store.state.allExhausters;
  },
    computed: {
    ...mapState({
      allExhausters: state => state.allExhausters,
    })
  },
  watch: {
    allExhausters(data) {
      this.all = data;
    },
  }
};
</script>
<style scoped>
.machines-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 16px;
}
</style>
