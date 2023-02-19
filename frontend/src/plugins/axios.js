import axios from "axios";

const instance = axios.create({
  baseURL: 'http://localhost:3000',
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
