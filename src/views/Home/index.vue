<!--
 * @Author: zhouyajuan
 * @Date: 2020-08-19 10:18:21
 * @LastEditTime: 2020-08-19 17:22:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-app\src\views\Home\index.vue
-->
<template>
  <div class="home-page">
    <div class="weui-flex home-page-header">
      <div class="weui-flex__item left wpgicon icon-ic_arrow_bac">X</div>
      <div class="weui-flex__item">掌上营业厅</div>
      <div class="weui-flex__item">...</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.home-page-header {
  line-height: 40px;
  height: 40px;
  .left {
    background-color: red;
  }
}
</style>
