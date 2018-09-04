<template>
  <div class="teacher" style="height: 100%; width: 100%">
    <el-container style="height: 100%; width: 100%">
      <el-header style="margin: 0; padding: 0">
        <el-menu
          :default-active="activeIndex2"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item index="1">查看消息</el-menu-item>
          <el-menu-item index="2">查看黑名单</el-menu-item>
          <el-menu-item index="4">绑定邮箱</el-menu-item>
          <el-menu-item index="5" @click = 'dialogFormVisible = true'>修改密码</el-menu-item>
          <el-submenu index="3" style="float: right">
            <template slot="title">欢迎, {{getAdmin}}</template>
            <el-menu-item index="3-1">操作记录</el-menu-item>
            <el-menu-item index="3-2">登出</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-header>
      <el-main style="height: 100%; width: 100%">
        <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
          <el-form :model="changePwdForm">
            <el-form-item label="原密码" :label-width="formLabelWidth">
              <el-input v-model="changePwdForm.oldPassword" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="新密码" :label-width="formLabelWidth">
              <el-input v-model="changePwdForm.newPassword" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认新密码" :label-width="formLabelWidth">
              <el-input v-model="changePwdForm.confirmNewPassword" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="changePwd">确 定</el-button>
          </div>
        </el-dialog>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import axios from 'axios'

axios.interceptors.request.use(config => { // 设置监听器给加上请求头
  let token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
}, error => {
  return Promise.reject(error)
})

export default {
  name: 'teacher',
  data () {
    return {
      activeIndex: '1',
      activeIndex2: '1',
      dialogFormVisible: false,
      changePwdForm: {
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: ''
      },
      formLabelWidth: '120px'
    }
  },
  created () {
    setInterval(function () {
      axios.get('http://182.254.133.79:8081/token/refresh').then(res => {
        const newToken = res.data
        localStorage.setItem('token', newToken)
        console.log('refresh over')
      }).catch(e => {
        console.log(e)
      })
    }, 600000)
  },
  computed: {
    getAdmin () {
      return localStorage.getItem('userId')
    }
  },
  methods: {
    handleSelect (key) {
      if (key === '1') {
        this.$router.push(
          {
            path: '/home/teacher/read'
          }
        )
      }  else if (key === '2') {
        this.$router.push(
          {
            path: '/home/teacher/watch'
          }
        )
      } else if (key === '3-2') {
        this.$router.push(
          {
            path: '/'
          }
        )
      } else if (key === '3-1') {
        this.$router.push(
          {
            path: '/home/teacher/operation'
          }
        )
      } else if (key === '4') {
        this.$prompt('请输入邮箱', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
          inputErrorMessage: '邮箱格式不正确'
        }).then(({ value }) => {
          this.$http.post('http://182.254.133.79:8081/UserController/BindEmail', {
            emailAddress: value
          }, {emulateJSON: true}).then((data) => {
            this.$message({
              type: 'info',
              message: '邮箱绑定成功'
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          })
        })
      } else if (key === '5') {

      }
    },
    changePwd () {
      this.$http.post('http://182.254.133.79:8081/UserController/ResetPassword', {
        oldPassword: this.changePwdForm.oldPassword,
        newPassword: this.changePwdForm.newPassword,
        confirmNewPassword: this.changePwdForm.confirmNewPassword
      }, {emulateJSON: true}).then((data) => {
        console.log(data)
        this.dialogFormVisible = false
      })
    }
  }
}
</script>

<style scoped lang="stylus">
  .blackForm
    width 100%
    min-height 200px
    background rgba(255,255,255,0.5)
    padding 10px
  .detail
    width 100%
    min-height: 200px
    background rgba(255,255,255,0.5)
    padding 10px
    box-sizing border-box
    .chosen
      display block
      height 20px
      line-height 20px
      font-size 20px
      margin-bottom 10px
    .chosenText
      width 600px
      height 100px
      margin-bottom 10px
    .btn
      display block
</style>
