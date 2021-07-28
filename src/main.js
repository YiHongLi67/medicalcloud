import Vue from "vue";
// 引用App跟组件
import App from "./App.vue";
// 引用路由
import router from "./router";
// 引用vuex
import store from "./store";
// 引用element-ui
import "./element/elements";
// 引用axios.js
import "./axios/axios";
// 引入echarts
import "./echarts/echarts";

// 引入省市区三级联动的模板
// import {
//   provinceAndCityData,
//   regionData,
//   provinceAndCityDataPlus,
//   regionDataPlus,
//   CodeToText,
//   TextToCode,
// } from "element-china-area-data";

import axios from "axios";
Vue.prototype.$axios = axios;
Vue.$axios = axios;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  // mode: "history",
  render: (h) => h(App),
}).$mount("#app");
