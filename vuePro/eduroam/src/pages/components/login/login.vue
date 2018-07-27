<template>
  <div class="login">
    <div class="loginFrame">
      <el-form  label-position="left" label-width="60px" :model="person" ref="person">
        <el-form-item label="用户名">
          <el-input v-model="person.username" ref="username" type = "text" auto-complete = "off" ></el-input>
        </el-form-item>
        <el-form-item label="密码" >
          <el-input v-model="person.password" ref="password" type = "password"  auto-complete = "off" ></el-input>
        </el-form-item>
        <el-form-item >
          <el-button @click="submitForm()" type = "primary">登录</el-button>
          <el-button @click="resetForm('person')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'login',
  data () {
    return {
      person: {
        username: '',
        password: ''
      }
    }
  },
  computed: {
    ...mapState(['data'])
  },
  methods: {
    submitForm() {
      const person = this.person
      this.$http.post('http://182.254.133.79:8081/user/login',{
        username: person.username,
        password: person.password
      }, {emulateJSON:true} ).then((res)=>{
        const respond = res.data
        localStorage.setItem( "token",respond.token)
        this.isLogin(respond.user)
        if(this.data.userId === 'devUser') {
          this.$router.push({
            path: '/home/student'
          })
        } else {
          this.$router.push({
            path: '/home/teacher'
          })
        }
      }, (e)=>{
        person.password=''
        person.username=''
        console.log(e)
      })
    },
    resetForm(formName) {
      this.person= {}
      this.$refs[formName].resetFields();
    },
    ...mapMutations({
      isLogin: 'isLogin'
    }),
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
      padding 40px
      margin 200px auto 0 auto
      background rgba(255,255,255,0.8)
      .users
        font-size 20px
        color cornflowerblue
        margin-bottom 20px
</style>
