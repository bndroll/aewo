import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import ru from "vuetify/lib/locale/ru";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#FAB82E",
        secondary: "#FDC65F",
        accent: "#FEF1DB",
        error: "#CD2B37",
        info: "#2196F3",
        success: "#35B733",
        warning: "#EE6B33",
      },
    },
  },
  lang: {
    locales: { ru },
    current: "ru",
  },
});
