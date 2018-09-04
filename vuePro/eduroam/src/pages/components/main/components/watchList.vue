<template>
  <div class="list">
    <el-table
      :data="tableData"
      style="width: 70%; margin: 0 auto;"
      stripe
      :row-style="rowClass">
      <el-table-column
        prop="userId"
        label="学号"
        width="400">
      </el-table-column>
      <el-table-column
        prop="situation"
        label="操作"
        width="400">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'watchList',
  data () {
    return {
      tableData: []
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      const token = localStorage.getItem('token')
      const userId = localStorage.getItem('userId')
      axios.get('http://182.254.133.79:8081/BlackListController/GetAllUsersFromBlacklist?userId=devAdmin', {
        params: {
          userId: userId
        },
        headers: {
          Authorization: token
        }
      }).then(res => {
        this.tableData = res.data
      }).catch((e) => {
        console.log(e)
      })
    },
    handleClick (row) {
      console.log(row)
      this.$http.post('http://182.254.133.79:8081/BlackListController/DeleteUserFromBlackList', {
        objectId: row.userId
      }, { emulateJSON: true }).then((data) => {
        this.init()
      }, (e) => {
        console.log('error')
      })
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
