<template>
  <div class="message">
      <el-table
        :data="tableData"
        style="width: 70%; margin: 0 auto;"
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
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="detail">
        <textarea class="detailM" placeholder="未选取消息" readonly></textarea>
        <el-button type="success">同意</el-button>
        <el-button type="warning">不同意</el-button>
      </div>
  </div>
</template>

<script>
export default {
  name: 'readMes',
  data () {
    return {
      tableData: [{
        number: '1507020109',
        name: '杜文杰',
        situation: '未读'
      }, {
        number: '1507020122',
        name: '杜文杰',
        situation: '未读'
      }, {
        number: '1507020122',
        name: '杜文杰',
        situation: '未读'
      }, {
        number: '1507020122',
        name: '杜文杰',
        situation: '未读'
      }]
    }
  },
  methods: {
    handleClick (row) {
      console.log(row)
      row.situation = '已读'
    },
    rowClass (row, rowIndex) {
      if (row.row.situation === '未读') {
        return {'background-color': 'oldlace'}
      } else {
        return {'background-color': '#f0f9eb'}
      }
    }
  }
}
</script>

<style scoped lang="stylus">
  .detail
    width 70%
    min-height 200px
    margin 50px auto
    .detailM
      width 100%
      box-sizing border-box
      height 150px
      padding 10px
      margin-bottom 10px
      font-family "幼圆"
      font-size 24px
</style>
