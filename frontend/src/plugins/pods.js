const pods = {
  1: {
    temperature: {
      label: "T, °С",
    },
    vibration: {
      horizontal: {
        label: "Г, мм/с",
      },
      vertical: {
        label: "В, мм/с",
      },
      axis: {
        label: "О, мм/с",
      },
    },
  },
  2: {
    temperature: {
      label: "T, °С",
    },
    vibration: {
      horizontal: {
        label: "Г, мм/с",
      },
      vertical: {
        label: "В, мм/с",
      },
      axis: {
        label: "О, мм/с",
      },
    },
  },
  3: {
    temperature: {
      label: "T, °С",
    },
  },
  4: {
    temperature: {
      label: "T, °С",
    },
  },
  5: {
    temperature: {
      label: "T, °С",
    },
  },
  6: {
    temperature: {
      label: "T, °С",
    },
  },
  7: {
    temperature: {
      label: "T, °С",
    },
    vibration: {
      horizontal: {
        label: "Г, мм/с",
      },
      vertical: {
        label: "В, мм/с",
      },
      axis: {
        label: "О, мм/с",
      },
    },
  },
  8: {
    temperature: {
      label: "T, °С",
    },
    vibration: {
      horizontal: {
        label: "Г, мм/с",
      },
      vertical: {
        label: "В, мм/с",
      },
      axis: {
        label: "О, мм/с",
      },
    },
  },
  9: {
    temperature: {
      label: "T, °С",
    },
  },
};

export default {
  install(Vue) {
    Vue.prototype.$pods = pods;
  },
};
