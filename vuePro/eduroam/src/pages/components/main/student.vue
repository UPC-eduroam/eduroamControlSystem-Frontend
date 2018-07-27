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
              </ul>
            </div>
          </el-col>
          <el-col :span="9" >
            <span class="tip" :class="situation==='已提交' ? 'submit' : 'yet'">{{situation}}</span>
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
      situation: '未提交',
    }
  },
  computed: {
    time () {
      let time = new Date()
      let year = time.getFullYear().toString();
      let date = time.getDate().toString();
      let month = time.getMonth().toString();
      return year+"--"+(Number(month)+1).toString()+"--"+date
    },
    getName () {
      return this.data.userId
    },
    ...mapState(['data'])
  },
  methods: {
    submit () {
      this.situation = '已提交';
      console.log(this.form)
    },
    reform () {
      this.situation = '未提交';
      this.form={}
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
    margin-left 20px
    display block
    width 100%
    height 300px
    line-height 300px
    text-align center
    font-size 100px
    color white
    &.submit
      background rgba(154,255,154,0.5)
    &.yet
      background rgba(194,194,194,0.5)
  .stuForm
    margin-top 40px
    .reason
      width 100%
      height auto
      padding 20px
      background rgba(255, 255, 255, 0.2)
      .begin
        margin-right 40px
</style>
