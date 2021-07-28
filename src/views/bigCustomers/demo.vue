<template>
  <div>
      <h2>11</h2>
  </div>
</template>
<script>
export default {
  name: "component_name",
 // 定义属性
  data () {
    return {
    };
  },
  // 计算属性，会监听依赖属性值随之变化
  computed: {
  },
  // 方法集合
  methods: {
    
  },
  beforeCreate() {}, // 生命周期 - 创建之前
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    
  },
  beforeMount() {}, // 生命周期 - 挂载之前
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    
  },
  beforeUpdate() {}, // 生命周期 - 更新之前
  updated() {}, // 生命周期 - 更新之后
  beforeDestroy() {}, // 生命周期 - 销毁之前
  destroyed() {}, // 生命周期 - 销毁完成
  activated() {} // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style scoped>
</style>