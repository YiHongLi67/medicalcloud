<template>
  <div class="container">
    <div class="china-area">
      <el-select
        v-model="$store.state.province"
        placeholder="请选择"
        @change="handleChange"
      >
        <el-option
          v-for="item in options"
          :key="item.name"
          :label="item.value"
          :value="item.name"
        >
        </el-option>
      </el-select>
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
export default {
  name: "ProvinceActive",
  data() {
    return {
      options: [
        {
          name: "北京市",
          value: "北京市",
        },
        {
          name: "天津市",
          value: "天津市",
        },
        {
          name: "河北省",
          value: "河北省",
        },
        {
          name: "山西省",
          value: "山西省",
        },
        {
          name: "辽宁省",
          value: "辽宁省",
        },
        {
          name: "吉林省",
          value: "吉林省",
        },
        {
          name: "黑龙江省",
          value: "黑龙江省",
        },
        {
          name: "江苏省",
          value: "江苏省",
        },
        {
          name: "浙江省",
          value: "浙江省",
        },
        {
          name: "上海市",
          value: "上海市",
        },
        {
          name: "重庆市",
          value: "重庆市",
        },
        {
          name: "安徽省",
          value: "安徽省",
        },
        {
          name: "福建省",
          value: "福建省",
        },
        {
          name: "江西省",
          value: "江西省",
        },
        {
          name: "山东省",
          value: "山东省",
        },
        {
          name: "河南省",
          value: "河南省",
        },
        {
          name: "湖北省",
          value: "湖北省",
        },
        {
          name: "湖南省",
          value: "湖南省",
        },
        {
          name: "广东省",
          value: "广东省",
        },
        {
          name: "海南省",
          value: "海南省",
        },
        {
          name: "四川省",
          value: "四川省",
        },
        {
          name: "贵州省",
          value: "贵州省",
        },
        {
          name: "云南省",
          value: "云南省",
        },
        {
          name: "陕西省",
          value: "陕西省",
        },
        {
          name: "甘肃省",
          value: "甘肃省",
        },
        {
          name: "青海省",
          value: "青海省",
        },
        {
          name: "台湾省",
          value: "台湾省",
        },
        {
          name: "内蒙古自治区",
          value: "内蒙古自治区",
        },
        {
          name: "广西壮族自治区",
          value: "广西壮族自治区",
        },
        {
          name: "西藏自治区",
          value: "西藏自治区",
        },
        {
          name: "宁夏回族自治区",
          value: "宁夏回族自治区",
        },
        {
          name: "新疆维吾尔自治区",
          value: "新疆维吾尔自治区",
        },
      ],
    };
  },
  methods: {
    handleChange() {
      if (this.$store.state.monthVal || this.$store.state.yearVal) {
        this.$store.dispatch("requestData");
      }
    },
    handleYear(val) {
      // 选中日期后触发事件
      // 清空monthVal数据
      this.$store.dispatch("changeMonth");
      if (
        val &&
        (this.$store.state.selectedOptions.length || this.$store.state.province)
      ) {
        this.$store.dispatch("requestData");
      }
    },
    handleMonth(val) {
      // 选中日期后触发事件
      // 清空monthVal数据
      this.$store.dispatch("changeYear");
      if (
        (val && this.$store.state.selectedOptions.length) ||
        this.$store.state.province
      ) {
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
      const obj = {
        page: currentPage,
        name: "province",
      };
      //更新当前显示的页码
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
    this.$store.dispatch("getshowData", { name: "province" });
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
