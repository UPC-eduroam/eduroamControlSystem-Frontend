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
          <el-menu-item index="2">变更模式</el-menu-item>
          <el-menu-item index="3">编辑名单</el-menu-item>
        </el-menu>
      </el-header>
      <el-main style="height: 100%; width: 100%">
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
      activeIndex2: '1'
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
  methods: {
    handleSelect (key) {
      if (key === '1') {
        this.$router.push(
          {
            path: '/home/teacher/read'
          }
        )
      } else if (key === '2') {
        this.$router.push(
          {
            path: '/home/teacher/toggle'
          }
        )
      } else if (key === '3') {
        this.$router.push(
          {
            path: '/home/teacher/watch'
          }
        )
      }
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
