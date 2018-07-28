<template>
  <div class="list">
    <el-table
      :data="tableData"
      style="width: 70%; margin: 0 auto;"
      stripe
      :row-style="rowClass">
      <el-table-column
        prop="number"
        label="学号"
        width="400">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="400">
      </el-table-column>
      <el-table-column
        prop="situation"
        label="状态"
        width="300">
      </el-table-column>
      <el-table-column
        label="操作"
        width="215">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">{{mode}}</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'watchList',
  data () {
    return {
      tableData: [{
        number: '1507020109',
        name: '杜文杰',
        situation: '黑名单'
      }, {
        number: '1507020122',
        name: '杜文杰',
        situation: '黑名单'
      }, {
        number: '1507020122',
        name: '杜文杰',
        situation: '黑名单'
      }, {
        number: '1507020122',
        name: '杜文杰',
        situation: '黑名单'
      }],
      mode: '移入白名单'
    }
  }
}
</script>

<style scoped lang="stylus">
  .list
    width 100%
    min-height 200px
    overflow auto
    margin 0 auto
</style>
