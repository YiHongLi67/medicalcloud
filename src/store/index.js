import Vue from "vue";
import Vuex from "vuex";
import { CodeToText } from "element-china-area-data";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    radio: 1, //默认选中第一个
    sortData: [], //排序后的数据
    showData: [], //当前页面展示的数据
    originData: [], //未排序过的原始数据
    currentPage: 1, //默认开始页面
    pagesize: 5, //每页的数据条数
    total: 0, //默认数据总数
    yearVal: "", //选择的年份
    monthVal: "", //选择的月份
    selectedOptions: [], //当前选中的地区
    province: "", //默认选中的省份
  },
  mutations: {
    rendershowData(state, payload) {
      // vue实例创建后获取总的数据条数
      state.total = payload.data.len;
      // 更新currentPage
      payload.currentPage && (state.currentPage = payload.currentPage);
      // 清空showData
      state.showData = [];
      // 更新showData
      if (payload.data.result.length && payload.data.result[0].area) {
        payload.data.result.forEach((item) => {
          const temp = {};
          temp.province = item.province;
          temp.city = item.city;
          temp.area = item.area;
          temp.active =
            item.clickMenu +
            item.readArticle +
            item.forwardArticle +
            item.register +
            item.partner;
          state.showData.push(temp);
        });
        return;
      }
      if (payload.data.result.length && payload.data.result[0]._id.city) {
        payload.data.result.forEach((item) => {
          const temp = {};
          temp.province = item._id.province;
          temp.city = item._id.city;
          temp.active =
            item.clickMenu +
            item.readArticle +
            item.forwardArticle +
            item.register +
            item.partner;
          state.showData.push(temp);
        });
        return;
      }
      if (payload.data.result.length && payload.data.result[0]._id) {
        payload.data.result.forEach((item) => {
          const temp = {};
          temp.province = item._id;
          temp.active =
            item.clickMenu +
            item.readArticle +
            item.forwardArticle +
            item.register +
            item.partner;
          state.showData.push(temp);
        });
      }
      // 保存一份未排序的原始数据
      state.originData = [...state.showData];
    },
    sort(state, column) {
      // 深拷贝当前页面的showData
      state.sortData = [...state.showData];
      if (column.order === "ascending") {
        // 选中升序对应的按钮
        state.radio = 3;
        // 升序排序
        state.sortData.sort(function (a, b) {
          return a.active - b.active;
        });
        state.showData = state.sortData;
      } else if (column.order === "descending") {
        // 选中降序对应的按钮
        state.radio = 2;
        // 降序排序
        state.sortData.sort(function (a, b) {
          return b.active - a.active;
        });
        state.showData = state.sortData;
      } else {
        // 选中默认排序对应的按钮
        state.radio = 1;
        // 原始数据（默认排序）
        state.showData = state.originData;
      }
    },
    yearValue(state) {
      state.yearVal = "";
    },
    monthValue(state) {
      state.monthVal = "";
    },
    updatePage(state) {
      state.currentPage = 1;
    },
  },
  actions: {
    // actions可处理异步请求
    getshowData(context, obj) {
      // 定义actions，自动接收context参数
      Vue.$axios("http://127.0.0.1:5000/get-showData", {
        params: {
          page: context.state.currentPage,
          pagesize: context.state.pagesize,
          name: obj.name,
        },
      }).then((res) => {
        context.commit("rendershowData", {
          // 异步操作里面改变数据，改变数据又要用commit提交mutation
          data: res.data,
        });
      });
    },
    changeCurPage(context, obj) {
      Vue.$axios("http://127.0.0.1:5000/get-showData", {
        params: {
          page: obj.page,
          pagesize: context.state.pagesize,
          name: obj.name,
        },
      }).then((res) => {
        context.commit("rendershowData", {
          // 异步操作里面改变数据，改变数据又要用commit提交mutation
          data: res.data,
          currentPage: obj.page,
        });
      });
    },
    getsortShowData(context, column) {
      context.commit("sort", column);
    },
    changeYear(context) {
      context.commit("yearValue");
    },
    changeMonth(context) {
      context.commit("monthValue");
    },
    requestData(context) {
      context.commit("updatePage");
      const area = [];
      if (context.state.province) {
        area.push(context.state.province);
      } else {
        context.state.selectedOptions.forEach((i) => {
          area.push(CodeToText[i]);
        });
      }
      Vue.$axios("http://127.0.0.1:5000/select-showData", {
        params: {
          page: context.state.currentPage,
          pagesize: context.state.pagesize,
          condition: {
            areaData: area,
            yearVal: context.state.yearVal.slice(0, 4),
            monthVal: context.state.monthVal.slice(0, 7),
          },
        },
      }).then((res) => {
        context.commit("rendershowData", {
          // 异步操作里面改变数据，改变数据又要用commit提交mutation
          data: res.data,
        });
      });
    },
  },
  getters: {},
  modules: {},
  watch: {},
});
