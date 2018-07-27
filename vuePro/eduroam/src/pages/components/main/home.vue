<template>
  <div class="home">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'home'
}
</script>

<style scoped lang="stylus">
  .home
    width 100%
    height 100%
    background url("./imgs/Sky.jpg")
    background-repeat no-repeat
    background-size cover
</style>
