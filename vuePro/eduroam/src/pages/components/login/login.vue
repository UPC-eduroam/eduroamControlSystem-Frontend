<template>
  <div class="login">
    <div class="loginFrame">
      <el-form  label-position="left" label-width="60px">
        <el-tabs  class = "users" @tab-click="handleTabClick">
          <el-tab-pane label = "学生" name = "students">学生</el-tab-pane>
          <el-tab-pane label = "管理员" name = "teacher">管理员</el-tab-pane>
        </el-tabs>
        <el-form-item label="用户名">
          <el-input v-model="username" type = "text" auto-complete = "off" placeholder = "请输入您的账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" >
          <el-input v-model="password" type = "password"  auto-complete = "off" placeholder = "请输入密码"></el-input>
        </el-form-item>
        <el-form-item >
          <el-button @click="submit" type = "primary">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'login',
  data () {
    return {
      identity: '',
      username: '',
      password: ''
    }
  },
  methods: {
    handleTabClick: (tab, e) => {
      this.identity = e.target.getAttribute('id')
    },
    submit: () => {
      axios({
        method: 'get',
        url: '',
        data:{
         username: this.username,
         pssword: this.pssword
        }
      }).then(this.handleData)
    },
    handleData (res) {
    }
  }
}
</script>

<style scoped lang="stylus">
  .login
    position fixed
    width 100%
    height 100%
    background url("./imgs/loginBackground.jpg")
    background-repeat no-repeat
    background-size cover
    .loginFrame
      width 500px
      height 300px
      box-sizing border-box
      padding 20px
      margin 200px auto 0 auto
      background rgba(255,255,255,0.8)
      .users
        font-size 20px
        color cornflowerblue
        margin-bottom 20px
</style>
