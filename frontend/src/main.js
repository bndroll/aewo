import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "@babel/polyfill";
import ws from "./plugins/ws";
import http from "./plugins/axios";
import pods from "./plugins/pods";
import VueApexCharts from 'vue-apexcharts'

Vue.config.productionTip = false;
Vue.use(ws);
Vue.use(http);
Vue.use(pods);

Vue.use(VueApexCharts)

Vue.component('apexchart', VueApexCharts) //eslint-disable-line

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
