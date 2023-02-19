<template>
  <div
    class="ex-container d-flex justify-start align-center rounded-xl flex-column"
  >
    <LastUpdate />
    <div class="d-flex flex-column mt-4 mb-16 align-center">
      <ExNavigation class="mb-4" />
      <div class="d-flex justify-space-between">
        <div class="d-flex align-center">
          <div
            style="width: 12px; height: 12px; background-color: #fab82e"
            class="rounded mr-1"
          ></div>
          <div>Предупреждение</div>
        </div>
        <div class="d-flex align-center ml-3">
          <div
            style="width: 12px; height: 12px; background-color: #cd2b37"
            class="rounded mr-1"
          ></div>
          <div>Опасность</div>
        </div>
      </div>
    </div>
    <div class="image-container" v-if="exhauster">
      <PodshipnikSmall :number="9" :data="exhauster.pod9" />
      <PodshipnikSmall :number="8" :data="exhauster.pod8" />
      <PodshipnikSmall :number="7" :data="exhauster.pod7" />
      <PodshipnikSmall :number="6" :data="exhauster.pod6" />
      <PodshipnikSmall :number="5" :data="exhauster.pod5" />
      <PodshipnikSmall :number="4" :data="exhauster.pod4" />
      <PodshipnikSmall :number="3" :data="exhauster.pod3" />
      <PodshipnikSmall :number="2" :data="exhauster.pod2" />
      <PodshipnikSmall :number="1" :data="exhauster.pod1" />
      <GasTemperature  :data="exhauster.gasCollector" />
      <OilLevel :data="exhauster.oilSystem" />
      <OilPressure :data="exhauster.oilSystem" />
      <MainDrive :data="exhauster.mainDrive" />
      <Cooler :data="exhauster.cooler" />
      <img src="../assets/schema.png" alt="" />
    </div>
  </div>
</template>

<script>
import PodshipnikSmall from "../components/podshipnik/PodshipnikSmall";
import GasTemperature from "../components/GasTemperature";
import OilLevel from "../components/OilLevel";
import OilPressure from "../components/OilPressure.vue";
import MainDrive from "../components/MainDrive.vue";
import Cooler from "../components/Cooler.vue";
import ExNavigation from "../components/ExNavigation.vue";
import LastUpdate from "../components/LastUpdate.vue";
import { mapState } from 'vuex'

export default {
  name: "ExhausterView",
  components: {
    PodshipnikSmall,
    GasTemperature,
    OilLevel,
    OilPressure,
    MainDrive,
    Cooler,
    ExNavigation,
    LastUpdate
  },
  data() {
    return {
      exhauster: null
    }
  },
  mounted() {
    this.exhauster = this.$store.state.allExhausters[`exhauster${this.$route.params.id}`]
    this.$ws.emit("exhauster", this.$route.params.id);
    this.$ws.on("data", (data) => {
      this.$store.commit('setExhauster', { id: this.$route.params.id, data })
      this.$store.commit('setLastTimeUpdate', +new Date())
    });
  },
  computed: {
    ...mapState({
      allExhausters: state => state.allExhausters
    })
  },
  watch: {
    allExhausters(data) {
      this.exhauster = data[`exhauster${this.$route.params.id}`]
    },
  }
}
</script>
<style lang="scss">
.ex-container {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: white;
}

.image-container {
  position: relative;
}

.pod-9 {
  top: 276px;
  left: 10px;
}

.pod-card-9 {
  top: 171px;
  left: -107px;
}

.pod-8 {
  top: 326px;
  left: 10px;
}

.pod-card-8 {
  top: 379px;
  left: -109px;
}

.pod-7 {
  top: 326px;
  left: 210px;
}

.pod-card-7 {
  top: 379px;
  left: 200px;
}

.pod-6 {
  top: 327px;
  left: 546px;
}

.pod-card-6 {
  top: 381px;
  left: 411px;
}

.pod-5 {
  top: 327px;
  left: 601px;
}

.pod-card-5 {
  top: 381px;
  left: 607px;
}

.pod-4 {
  top: 273px;
  left: 546px;
}

.pod-card-4 {
  top: 173px;
  left: 411px;
}

.pod-3 {
  top: 273px;
  left: 601px;
}

.pod-card-3 {
  top: 173px;
  left: 607px;
}

.pod-2 {
  top: 237px;
  left: 828px;
}

.pod-card-2 {
  top: 346px;
  left: 818px;
}

.pod-1 {
  top: 237px;
  left: 1338px;
}

.pod-card-1 {
  top: 346px;
  left: 1329px;
}
</style>
