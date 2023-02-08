import axios from "axios";

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
});

// instance.interceptors.request.use((config) => {
//   const authToken = localStorage.getItem('authToken');

//   if (authToken) {
//     config.headers.Authorization = `Bearer ${authToken}`;
//   }

//   return config;
// });

export default {
  install(Vue) {
    Vue.prototype.$http = instance;
  },
};
