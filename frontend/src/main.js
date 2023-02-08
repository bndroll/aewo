import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "@babel/polyfill";
import ws from "./plugins/ws";
import http from "./plugins/axios";

Vue.config.productionTip = false;
Vue.use(ws);
Vue.use(http);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
