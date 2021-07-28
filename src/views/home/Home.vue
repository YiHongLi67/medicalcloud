<template>
  <!-- 页面主体区域 -->
  <el-container class="home-container">
    <!-- 侧边栏 -->
    <el-aside :width="isCollapse ? '64px' : '260px'" class="home-aside">
      <!-- 收缩展开左侧侧边栏 -->
      <div @click="toggleCollapse" class="toggle-button">|||</div>
      <!-- 侧边栏菜单区域 -->
      <el-menu
        background-color="rgb(9, 9, 56)"
        text-color="#fff"
        active-text-color="#ffd04b"
        :collapse="isCollapse"
        :collapse-transition="false"
      >
        <!-- 一级菜单 -->
        <el-submenu
          v-for="item in stairList"
          :key="item.id"
          :index="item.id + ''"
          class="stair-list"
        >
          <!-- 一级菜单的模板区域 -->
          <template slot="title">
            <!-- 小图标 -->
            <i :class="item.icon"></i>
            <!-- 文本 -->
            <span>{{ item.name }}</span>
          </template>
          <!-- 二级菜单 -->
          <el-menu-item
            v-for="subItem in item.children"
            :key="subItem.childrenId"
            :index="subItem.childrenId + ''"
            class="sub-list"
          >
            <template slot="title">
              <!-- 小图标 -->
              <i :class="subItem.childrenIcon"></i>
              <!-- 文本 -->
              <span>{{ subItem.childrenName }}</span>
            </template>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <!-- 头部 -->
      <el-header>Header</el-header>
      <el-header>Header</el-header>
      <!-- 右侧内容主体 -->
      <el-main>
        <ProvinceActive></ProvinceActive>
        <!-- <CityActive></CityActive> -->
        <!-- <AreaActive></AreaActive> -->
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import ProvinceActive from "../dataStatistics/ProvinceActive";
// import CityActive from "../dataStatistics/CityActive";
// import AreaActive from "../dataStatistics/AreaActive";
export default {
  name: "Home",
  components: {
    ProvinceActive,
    // CityActive,
    // AreaActive,
  },
  // 定义属性
  data() {
    return {
      // 是否折叠
      isCollapse: false,
      // 一级列表
      stairList: [
        {
          id: 0,
          icon: "iconfont icon-shujutongjifenxibingtu",
          name: "数据统计",
          children: [
            {
              childrenId: 1,
              childrenIcon: "el-icon-menu",
              childrenName: "大客户专员列表0",
            },

            {
              childrenId: 2,
              childrenIcon: "el-icon-menu",
              childrenName: "订单列表0",
            },

            {
              childrenId: 3,
              childrenIcon: "el-icon-menu",
              childrenName: "设置0",
            },
          ],
        },
        {
          id: 1,
          icon: "iconfont icon-qiahao",
          name: "卡号管理",
          children: [
            {
              childrenId: 11,
              childrenIcon: "el-icon-menu",
              childrenName: "大客户专员列表1",
            },
            {
              childrenId: 22,
              childrenIcon: "el-icon-menu",
              childrenName: "订单列表1",
            },
            {
              childrenId: 33,
              childrenIcon: "el-icon-menu",
              childrenName: "设置1",
            },
          ],
        },
        {
          id: 2,
          icon: "iconfont icon-wode",
          name: "大客户专员专区",
          children: [
            {
              childrenId: 111,
              childrenIcon: "el-icon-menu",
              childrenName: "大客户专员列表2",
            },
            {
              childrenId: 222,
              childrenIcon: "el-icon-menu",
              childrenName: "订单列表2",
            },
            {
              childrenId: 333,
              childrenIcon: "el-icon-menu",
              childrenName: "设置2",
            },
          ],
        },
        {
          id: 3,
          icon: "iconfont icon-caiwu",
          name: "财务管理",
          children: [
            {
              childrenId: 1111,
              childrenIcon: "el-icon-menu",
              childrenName: "大客户专员列表3",
            },
            {
              childrenId: 2222,
              childrenIcon: "el-icon-menu",
              childrenName: "订单列表3",
            },
            {
              childrenId: 3333,
              childrenIcon: "el-icon-menu",
              childrenName: "设置3",
            },
          ],
        },
        {
          id: 4,
          icon: "iconfont icon-xitong",
          name: "系统管理",
          children: [
            {
              childrenId: 11111,
              childrenIcon: "el-icon-menu",
              childrenName: "大客户专员列表",
            },
            {
              childrenId: 22222,
              childrenIcon: "el-icon-menu",
              childrenName: "订单列表",
            },
            {
              childrenId: 33333,
              childrenIcon: "el-icon-menu",
              childrenName: "设置",
            },
          ],
        },
      ],
    };
  },
  // 计算属性，会监听依赖属性值随之变化
  computed: {},
  // 方法集合
  methods: {
    //   点击按钮，切换 左侧侧边栏 收缩 展开
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
  },
  beforeCreate() {}, // 生命周期 - 创建之前
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  beforeMount() {}, // 生命周期 - 挂载之前
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeUpdate() {}, // 生命周期 - 更新之前
  updated() {}, // 生命周期 - 更新之后
  beforeDestroy() {}, // 生命周期 - 销毁之前
  destroyed() {}, // 生命周期 - 销毁完成
  activated() {}, // 如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
/* 自定义属性添加 */
.home-container {
  height: 100%;
}
.stair-list {
  text-align: left;
}
.el-submenu .el-menu-item {
  min-width: 100%;
}
.home-aside {
  background-color: rgb(9, 9, 56);
}
.el-menu {
  width: 100%;
}
.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  cursor: pointer;
  letter-spacing: 0.2em;
}
.iconfont {
  margin-right: 15px;
}
</style>
