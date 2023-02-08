import Vue from "vue";
import io from "socket.io-client";

const WS_URL = "http://localhost:9000/";

const socket = io(WS_URL);

export default {
  install() {
    Vue.prototype.$ws = socket;
  },
};
