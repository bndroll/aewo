<template>
  <div class="exhauster-container overflow-hidden">
    <div
      class="exhauster-header pa-3 d-flex justify-space-between"
      @click="onExhausterClick()"
    >
      <div class="d-flex align-center">
        <div class="exhauster-status" :class="[status]"></div>
        <span class="exhauster-name ml-2">Эксгаустер {{ exhauster.name }}</span>
      </div>

      <v-icon> mdi-chevron-right </v-icon>
    </div>

    <div class="d-flex flex-column">
      <div class="pa-1 mb-4">
        <span class="info-text">Основная информация:</span>

        <div class="d-flex justify-space-between mt-2">
          <div
            class="info-lastchange-container d-flex flex-column justify-space-between pa-2"
          >
            <span class="info-text">Последняя замена</span>
            <span class="info-days">{{ exhauster.lastChange }} суток</span>
          </div>

          <div
            class="info-nextchange-container d-flex flex-column justify-space-between pa-2"
          >
            <div class="d-flex align-center">
              <span class="info-text">Прогноз</span>
              <v-icon x-small color="red" class="ml-1">mdi-information</v-icon>
            </div>
            <span class="info-days">{{ exhauster.prognozis }} суток</span>
          </div>
        </div>
      </div>

      <div class="scheme d-flex align-center justify-center align-self-center">
        <img src="../assets/scheme.png" class="scheme-image pa-2" />
      </div>

      <v-expansion-panels multiple class="mt-2" v-model="items">
        <v-expansion-panel v-if="warnings.length">
          <v-expansion-panel-header>Предупреждения</v-expansion-panel-header>
          <v-expansion-panel-content>

          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>Все подшипники</v-expansion-panel-header>
          <v-expansion-panel-content v-if="exhauster.data" >
            <Podshipnik :number="1" :data="exhauster.data.pod1" @alarm="($e) => onAlarm($e)" @warning="() => onWarning()"  />
            <Podshipnik :number="2" :data="exhauster.data.pod2" @alarm="($e) => onAlarm($e)" @warning="() => onWarning()"/>
            <Podshipnik :number="3" :data="exhauster.data.pod3" @alarm="($e) => onAlarm($e)" @warning="() => onWarning()"/>
            <Podshipnik :number="4" :data="exhauster.data.pod4" @alarm="($e) => onAlarm($e)" @warning="() => onWarning()"/>
            <Podshipnik :number="5" :data="exhauster.data.pod5" @alarm="($e) => onAlarm($e)" @warning="() => onWarning()"/>
            <Podshipnik :number="6" :data="exhauster.data.pod6" @alarm="($e) => onAlarm($e)" @warning="() => onWarning()"/>
            <Podshipnik :number="7" :data="exhauster.data.pod7" @alarm="($e) => onAlarm($e)" @warning="() => onWarning()"/>
            <Podshipnik :number="8" :data="exhauster.data.pod8" @alarm="($e) => onAlarm($e)" @warning="() => onWarning()"/>
            <Podshipnik :number="9" :data="exhauster.data.pod9" @alarm="($e) => onAlarm($e)" @warning="() => onWarning()"/>
            <OilLevelSmall :data="exhauster.data.oilSystem" @alarm="($e) => onAlarm($e)" />
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
  </div>
</template>

<script>
import Podshipnik from "./podshipnik/Podshipnik";
import OilLevelSmall from './podshipnik/OilLevelSmall'

export default {
  components: { Podshipnik, OilLevelSmall },
  name: "exhauster-component",
  props: {
    exhauster: Object,
  },
  data() {
    return {
      items: [0, 1],
      warnings: [],
      status: 'success'
    }
  },
  methods: {
    onExhausterClick() {
      this.$store.commit("setSelectedExhauster", this.exhauster);
      this.$router.push({
        name: "exhauster",
        params: { id: this.exhauster.id },
      });
    },
    onAlarm(event) {
      this.$store.commit('setAlarmModal', { isOpen: true, data: { ...event, ...this.exhauster } });
      this.status = 'alarm'
    },
    onWarning() {
      this.status = 'warning'
    }
  },
};
</script>

<style>
.exhauster-container {
  width: 100%;
  height: fit-content;
  background: #ffffff;
  border: 1px solid #e6e6e6;
  border-radius: 16px;
}

.exhauster-header {
  background-color: #e6e6e6;
  cursor: pointer;
}

.exhauster-name {
  color: #000000;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
}

.exhauster-status {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #35B733;
}

.success {
  background-color: #35B733;
}

.warning {
  background-color: #EE6B33;
}

.alarm {
  background-color: #CD2B37;
}

hr {
  height: 0;
  border: 1px solid #eaeaea;
}

.button-info {
  width: 26px;
  height: 26px;
  background: #fafafa;
  border: 1px solid #eaeaea;
  border-radius: 4px;
}

.rotor-container {
  border-bottom: 1px solid #e6e6e6;
}

.rotor {
  color: #464646;
  font-weight: 500;
  font-size: 15px;
  line-height: 17px;
}

.scheme {
  width: 268px;
  height: 146px;
  background: #f5f5f5;
  border: 1px solid #e6e6e6;
  border-radius: 6px;
}

.scheme-image {
  width: 100%;
  height: 118px;
}

.date {
  font-weight: 400;
  font-size: 10px;
  line-height: 20px;
  background: rgba(0, 0, 0, 0.12);
  border-radius: 10px;
}

.info-text {
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: #464646;
}

.info-days {
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
}

.info-lastchange-container,
.info-nextchange-container {
  width: 100%;
  max-width: 130px;
  height: 53px;
  border-radius: 8px;
}

.info-lastchange-container {
  background: #f5f5f5;
}

.info-nextchange-container {
  background: #fef1db;
}
</style>
