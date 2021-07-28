<template>
  <div class="container">
    <div class="china-area">
      <el-cascader
        size="large"
        :options="options"
        v-model="$store.state.selectedOptions"
        @change="handleChange"
      >
      </el-cascader>
    </div>
    <div class="date">
      <span class="demonstration">按年</span>
      <el-date-picker
        v-model="$store.state.yearVal"
        type="year"
        placeholder="选择年"
        value-format="yyyy-MM-dd"
        @change="handleYear"
      >
      </el-date-picker>
      <span class="demonstration">按月</span>
      <el-date-picker
        v-model="$store.state.monthVal"
        type="month"
        placeholder="选择月"
        value-format="yyyy-MM-dd"
        @change="handleMonth"
      >
      </el-date-picker>
    </div>
    <div class="order-btn">
      <el-radio-group v-model="$store.state.radio">
        <el-radio :label="1" @change="sortChange({ prop: 'active' })"
          >全部</el-radio
        >
        <el-radio
          :label="2"
          @change="sortChange({ prop: 'active', order: 'descending' })"
          >降序</el-radio
        >
        <el-radio
          :label="3"
          @change="sortChange({ prop: 'active', order: 'ascending' })"
          >升序</el-radio
        >
      </el-radio-group>
    </div>
    <div class="table">
      <el-table
        :data="$store.state.showData"
        stripe
        @sort-change="sortChange"
        style="width: 100%"
        background="#B3C0D1"
      >
        <el-table-column prop="province" label="省" width="180">
        </el-table-column>
        <el-table-column prop="city" label="市" width="180"> </el-table-column>
        <el-table-column prop="active" label="活跃度" sortable>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        class="pagination"
        :page-size="$store.state.pagesize"
        @current-change="currentChange"
        :total="$store.state.total"
        :current-page="$store.state.currentPage"
        :page-count="$store.state.pageCount"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { provinceAndCityData, CodeToText } from "element-china-area-data";
export default {
  name: "CityActive",
  data() {
    return {
      options: provinceAndCityData,
    };
  },
  methods: {
    handleChange(value) {
      value.forEach((i) => {
        console.log(CodeToText[i]);
      });
      if (this.$store.state.monthVal || this.$store.state.yearVal) {
        this.$store.dispatch("requestData");
      }
    },
    handleYear(val) {
      // 选中日期后触发事件
      // 清空monthVal数据
      this.$store.dispatch("changeMonth");
      if (val && this.$store.state.selectedOptions.length) {
        this.$store.dispatch("requestData");
      }
    },
    handleMonth(val) {
      // 选中日期后触发事件
      // 清空monthVal数据
      this.$store.dispatch("changeYear");
      if (val && this.$store.state.selectedOptions.length) {
        this.$store.dispatch("requestData");
      }
    },
    tableRowClassName({ rowIndex }) {
      if (rowIndex === 0) {
        return "th";
      }
      return "";
    },
    currentChange: function (currentPage) {
      //更新当前显示的页码
      const obj = {
        page: currentPage,
        name: "city",
      };
      this.$store.dispatch("changeCurPage", obj);
    },
    sortChange(column) {
      // 当表格的排序条件发生变化的时候会触发该事件
      // column是自带的参数，它是个对象，具有两个属性prop order
      this.$store.dispatch("getsortShowData", column);
    },
  },
  computed: {},
  watch: {},
  beforeCreate() {}, // 生命周期 - 创建之前
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  beforeMount() {}, // 生命周期 - 挂载之前
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    // 挂载后初始化当前页码下的数据
    // 提交异步操作(请求表的数据)，要用dispatch分发action
    this.$store.dispatch("getshowData", { name: "city" });
  },
  beforeUpdate() {}, // 生命周期 - 更新之前
  updated() {}, // 生命周期 - 更新之后
  beforeDestroy() {}, // 生命周期 - 销毁之前
  destroyed() {}, // 生命周期 - 销毁完成
  activated() {}, // 如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style>
.table {
  height: 300px;
  overflow: hidden;
}
.container {
  line-height: 50px;
}
thead tr {
  line-height: 35px;
}
.order-btn {
  text-align: left;
}
</style>
