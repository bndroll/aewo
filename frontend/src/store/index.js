import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    selectedExhauster: {},
    allExhausters: {},
    lastUpdateTime: +new Date(),
    alarmModal: {
      isOpen: false,
      data: null,
    }
  },
  getters: {},
  mutations: {
    ["setSelectedExhauster"](state, payload) {
      state.selectedExhauster = payload;
    },
    ['setExhauster'](state, payload) {
      state.allExhausters = { ...state.allExhausters, [`exhauster${payload.id}`]: payload.data }
    },
    ['setAllExhausters'](state, payload) {
      state.allExhausters = {
        exhauster1: payload[1],
        exhauster2: payload[2],
        exhauster3: payload[3],
        exhauster4: payload[4],
        exhauster5: payload[5],
        exhauster6: payload[6],
      }
    },
    ['setLastTimeUpdate'](state, payload) {
      state.lastUpdateTime = payload
    },
    ['setAlarmModal'](state, payload) {
      state.alarmModal = {
        isOpen: payload.isOpen,
        data: payload.data
      }
    } 
  },
  actions: {},
  modules: {},
});
