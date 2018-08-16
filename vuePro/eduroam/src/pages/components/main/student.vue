<template>
  <div class="student">
    <el-container>
      <el-main>
        <el-row>
          <el-col :span="10">
            <div class="info">
              <img src="./imgs/header.jpg">
              <ul class="perInfo">
                <li class="intro">欢迎使用eduroam</li>
                <li>姓名: {{getName}}</li>
                <li>登入时间: {{time}}</li>
                <li>
                  <el-button type="primary" @click="loginOut">登出</el-button>
                </li>
              </ul>
            </div>
          </el-col>
          <el-col :span="9" >
            <div class="tip">
              <el-alert
                title="提交成功"
                type="success"
                show-icon
                v-if="sub"
                style="margin-bottom: 10px"
              >
              </el-alert>
              <el-alert
              title="申请通过"
              type="success"
              show-icon
              v-if="pass"
              style="margin-bottom: 10px"
              >
              </el-alert>
              <el-alert
                title="申请未通过"
                type="error"
                show-icon
                v-if="unpass"
                style="margin-bottom: 10px"
              >
              </el-alert>
              <span class="reason">{{reason}}</span>
              <el-alert
                title="你被加入黑名单"
                type="error"
                show-icon
                v-if="black"
                style="margin-bottom: 10px"
              >
              </el-alert>
            </div>
          </el-col>
        </el-row>
        <el-row class="stuForm">
          <el-col :span="20">
            <el-form ref="form" :model="form" label-width="80px" class="reason">
              <el-form-item label="外出理由">
                <el-input v-model="form.reason"></el-input>
              </el-form-item>
              <el-form-item label="外出时间">
                <el-col :span="11" class="begin">
                  <el-date-picker type="date" v-model="form.beginTime" placeholder="选择日期" style="width: 100%;"></el-date-picker>
                </el-col>
                <el-col :span="11">
                  <el-date-picker type="date" v-model="form.endTime" placeholder="选择日期" style="width: 100%;"></el-date-picker>
                </el-col>
              </el-form-item>
              <el-form-item label="备注" >
                <el-input type="textarea" v-model="form.desc" class="textA"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submit">提交</el-button>
                <el-button @click="reform">重置</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </el-main>
      <el-footer></el-footer>
    </el-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'

axios.interceptors.request.use(config => { // 设置监听器给加上请求头
  let token = localStorage.getItem('token')
  if(token) {
    config.headers.Authorization = token
  }
  return config
}, error => {
  return Promise.reject(error)
})

export default {
  name: 'student',
  data () {
    return {
      form: {
        reason: '',
        beginTime: '',
        endTime: '',
        desc: ''
      },
      reason: '无未读消息',
      pass: false,
      unpass: false,
      black: false,
      sub: false
    }
  },
  mounted () {
    axios.get('http://182.254.133.79:8081/NotificationController/GetAllNotificationsSentToMe',{
      headers: {
        Authorization: localStorage.getItem('token')
      }
    }).then((data) => {
      if(!data.data[0].viewed) {
        this.$http.post('http://182.254.133.79:8081/NotificationController/MarkAsViewed', {
          notificationId: data.data[0].id
        }, { emulateJSON: true }).then((data) => {
          console.log(data)
        })
        let mes = data.data[0].message.split(';')
        if(mes[0]==='agree') {
          this.pass = true
        } else {
          this.unpass = true
          this.reason = '理由：' + mes[1]
        }
      }
    })
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
      // _this.$http.get('http://182.254.133.79:8081/token/refresh', {
      //   headers: {
      //     'Authorization': token
      //   }
      // }).then((res) => {
      //   console.log(res)
      // })
    }, 600000)
  },
  computed: {
    time () {
      let time = new Date()
      let year = time.getFullYear().toString()
      let date = time.getDate().toString()
      let month = time.getMonth().toString()
      return year + '--' + (Number(month) + 1).toString() + '--' + date
    },
    getName () {
      const userId = localStorage.getItem('userId')
      return userId
    },
    ...mapState(['data'])
  },
  methods: {
    submit () {
      // axios.post('http://182.254.133.79:8081/NotificationController/CreateNotification',{
      //   receiver: 'ADMIN',
      //   message: 'axios测试信息'
      // },{
      //   headers: {
      //     Authorization: localStorage.getItem('token')
      //   }
      // }).then((data) => {
      //   console.log(data)
      // }).catch((e) => {
      //   console.log(e)
      // })
      this.$http.post('http://182.254.133.79:8081/NotificationController/CreateNotification', {
        receiver: 'ADMIN',
        message: this.form.reason+';'+this.form.beginTime+';'+this.form.endTime+';'+this.form.desc
      }, { emulateJSON: true }).then((data) => {
        if(data.body.state === 0) {
          this.sub = true
        }
      }, (e) => {
        console.log('error')
      })
    },
    reform () {
      this.form = {}
    },
    loginOut () {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped lang="stylus">
  .info
    width 100%
    height 300px
    background rgba(255, 255, 255, 0.2)
    box-sizing border-box
    padding 10px
    img
      display inline-block
      height 100%
      width 45%
    .perInfo
      display inline-block
      vertical-align top
      box-sizing border-box
      padding 5px
      font-size 15px
      line-height 15px
      color white
      width 50%
      height 100%
      .intro
        font-weight 700
        font-size 20px
        color coral
        margin-bottom 20px
      li
        margin 10px 0
  .tip
    box-sizing border-box
    margin-left 45px
    width 100%
    height 300px
    background rgba(255, 255, 255, 0.2)
    .reason
      width 90%
      height 200px
      display block
      box-sizing border-box
      padding 10px
      margin 0 auto
      font-size 30px
  .stuForm
    margin-top 40px
    .reason
      width 100%
      height auto
      padding 20px
      background rgba(255, 255, 255, 0.2)
      box-sizing border-box
      .begin
        margin-right 40px
</style>
