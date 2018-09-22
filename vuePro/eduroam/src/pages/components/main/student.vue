<template>
  <div class="student">
    <el-container>
      <el-main>
        <el-row>
          <!--<li class="intro">欢迎使用eduroam</li>-->
          <el-col :span="24">
            <div class="info">
              <el-button type="primary" @click="loginOut" style="float:right">登出</el-button>
              <img src="./imgs/header.jpg">
              <ul class="perInfo">
                <li>姓名: {{getName}}</li>
                <li>登入时间: {{time}}</li>
              </ul >
                <div class="btn">
                  <el-button type="primary" @click="dialogFormVisible = true">修改密码</el-button>
                  <el-button type="primary" @click="bindMail" style="margin-top: 10px">绑定邮箱</el-button>
                </div>

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
            </div><br><br>
          </el-col>
        </el-row>
        <el-col :span="6">
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
          <br>
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
        <el-col span="1"><br></el-col>
        <el-row class="stuForm">
          <el-col :span="17">
            <el-form ref="form" :model="form" label-width="80px" class="reason">
              <el-form-item label="外出理由">
                <el-input v-model="form.reason"></el-input>
              </el-form-item>
              <el-form-item label="外出时间">
                <el-col :span="11" class="begin">
                  <el-date-picker type="date" v-model="form.beginTime" placeholder="选择日期"
                                  style="width: 100%;"></el-date-picker>
                </el-col>
                <el-col :span="11">
                  <el-date-picker type="date" v-model="form.endTime" placeholder="选择日期"
                                  style="width: 100%;"></el-date-picker>
                </el-col>
              </el-form-item>
              <el-form-item label="备注">
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
  import {mapState} from 'vuex'
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
    name: 'student',
    data() {
      return {
        form: {
          reason: '',
          beginTime: '',
          endTime: '',
          desc: ''
        },
        reason: '暂无未读消息',
        pass: false,
        unpass: false,
        black: false,
        sub: false,
        dialogFormVisible: false,
        changePwdForm: {
          oldPassword: '',
          newPassword: '',
          confirmNewPassword: ''
        },
        formLabelWidth: '120px'
      }
    },
    mounted() {
      axios.get('http://182.254.133.79:8081/NotificationController/GetAllNotificationsSentToMe', {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      }).then((data) => {
        if (!data.data[0].viewed) {
          this.$http.post('http://182.254.133.79:8081/NotificationController/MarkAsViewed', {
            notificationId: data.data[0].id
          }, {emulateJSON: true}).then((data) => {
            console.log(data)
          })
          let mes = data.data[0].message.split(';')
          if (mes[0] === 'agree') {
            this.pass = true
          } else {
            this.unpass = true
            this.reason = '理由：' + mes[1]
          }
        }
      })
    },
    created() {
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
      time() {
        let time = new Date()
        let year = time.getFullYear().toString()
        let date = time.getDate().toString()
        let month = time.getMonth().toString()
        return year + '--' + (Number(month) + 1).toString() + '--' + date
      },
      getName() {
        const userId = localStorage.getItem('userId')
        return userId
      },
      ...mapState(['data'])
    },
    methods: {
      submit() {
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
          message: this.form.reason + ';' + this.form.beginTime + ';' + this.form.endTime + ';' + this.form.desc
        }, {emulateJSON: true}).then((data) => {
          if (data.body.state === 0) {
            this.sub = true
          }
        }, (e) => {
          console.log('error')
        })
      },
      reform() {
        this.form = {}
      },
      loginOut() {
        this.$router.push('/')
      },
      changePwd() {
        this.$http.post('http://182.254.133.79:8081/UserController/ResetPassword', {
          oldPassword: this.changePwdForm.oldPassword,
          newPassword: this.changePwdForm.newPassword,
          confirmNewPassword: this.changePwdForm.confirmNewPassword
        }, {emulateJSON: true}).then((data) => {
          console.log(data)
          this.dialogFormVisible = false
        })
      },
      bindMail() {
        this.$prompt('请输入邮箱', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
          inputErrorMessage: '邮箱格式不正确'
        }).then(({value}) => {
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
      }
    }
  }
</script>

<style scoped lang="stylus">
  .info
    width 100%
    //height 450px
    background rgba(255, 255, 255, 0.2)
    box-sizing border-box
    padding 10px
    img
      //display inline-block
      margin-left 42%
      height 180px
      width 180px
      border-radius 50%
    .perInfo
      margin-left 45%
      //display inline-blockdi
      //vertical-align top
      box-sizing border-box
      padding 5px
      font-size 15px
      line-height 15px
      color white

     // width 50%
      //height 100%
      .intro
        font-weight 700
        font-size 20px
        color coral
        margin-bottom 20px
      li
        margin 10px 0
    .btn
      margin-left 42%
  .tip
    box-sizing border-box
    margin-left 0px
    width 100%
    height 300px
    background rgba(255, 255, 255, 0.2)
    .reason
      width 90%
      height 120px
      display block
      box-sizing border-box
      padding 10px
      margin 100px auto
      font-size 20px

  .stuForm
    margin-top 0px
    .reason
      width 100%
      height 300px
      padding 20px
      background rgba(255, 255, 255, 0.2)
      box-sizing border-box
      .begin
        margin-right 10px
</style>
