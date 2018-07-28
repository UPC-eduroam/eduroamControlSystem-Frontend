<template>
  <div class="toggle" :class="situation === '白名单' ? 'white' : 'black'" style="height: 100%; width: 50%; margin: 0 auto">
    <p class="situation">当前在{{situation}}模式下</p>
    <span class="toggleButton" @click="handleToggle">点击切换模式</span>
  </div>
</template>

<script>
export default {
  name: 'toggleButton',
  data () {
    return {
      situation: '白名单'
    }
  },
  methods: {
    handleToggle () {
      if (this.situation === '白名单') {
        this.situation = '黑名单'
      } else {
        this.situation = '白名单'
      }
      localStorage.setItem('situation', this.situation)
    }
  }
}
</script>

<style scoped lang="stylus">
  .toggle
    cursor pointer
    border-radius 10px
    box-shadow 3px 3px 3px #aaaaaa
    text-align center
    box-sizing border-box
    padding-top 50px
    &.white
      background url("./imgs/white.jpg")
      color black
    &.black
      background url("./imgs/black.jpg")
      color white
    .situation
      font-size 40px
      margin-top 50px
    .toggleButton
      margin 100px auto 0 auto
      text-align center
      line-height 200px
      font-size 30px
      color white
      background cornflowerblue
      width 200px
      height 200px
      border-radius 50%
      display block
</style>
