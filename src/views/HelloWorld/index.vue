<!--
 * @Author: your name
 * @Date: 2020-08-19 10:17:31
 * @LastEditTime: 2020-08-19 17:06:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-app\src\views\HelloWorld\index.vue
-->
<template>
    <div class="weui-msg">
        <div class="weui-msg__icon-area"><i class="weui-icon-success weui-icon_msg"></i></div>
        <div class="weui-msg__text-area">
            <h2 class="weui-msg__title" @click="clickItem">操作成功</h2>
            <p class="weui-msg__desc">内容详情，可根据实际需要安排，如果换行则不超过规定长度，居中展现<a href="javascript:">文字链接</a></p>
        </div>
        <div class="weui-msg__opr-area">
            <p class="weui-btn-area">
                <a href="javascript:history.back();" class="weui-btn weui-btn_primary">推荐操作</a>
            </p>
        </div>
        <div class="weui-msg__tips-area">
          <p class="weui-msg__tips">提示详情，可根据实际需要安排，如果换行则不超过规定长度，居中展现<a href="javascript:">文字链接</a></p>
        </div>
        <div class="weui-msg__extra-area">
            <div class="weui-footer">
                <p class="weui-footer__links">
                    <a href="javascript:" class="weui-footer__link">底部链接文本</a>
                </p>
                <p class="weui-footer__text">Copyright &copy; 2008-2016 weui.io</p>
            </div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery' 

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  created(){

  },
  methods: {
    clickItem() {
      console.log('9999')
      this.$weui.dialog({
        title: '提示',
        content: '是否领取礼品',
        buttons: [{
          label: '取消',
          type: 'default',
          onClick: () => {
            alert('您已取消领取礼品！')
          }
        }, {
          label: '确定',
          type: 'primary',
          onClick: () => {
            alert('您已确定领取礼品！')
          }
        }]
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
