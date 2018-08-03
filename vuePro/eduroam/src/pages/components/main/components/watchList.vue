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
import axios from 'axios'
export default {
  name: 'watchList',
  data () {
    return {
      tableData: [{
        number: 1,
        name: 'john'
      }],
      mode: '移出黑名单'
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      const token = localStorage.getItem('token')
      const userId = localStorage.getItem('userId')
      axios.get('http://182.254.133.79:8081/BlackListController/GetAllUsersFromBlacklist', {
        params: {
          userId: userId
        },
        headers: {
          Authorization: token,
        }
      }).then(res => {
        console.log(res.data)
        this.tableData = res.data
      })
    },
    handleClick (data) {
      axios.post('http://182.254.133.79:8081/BlackListController/DeleteUserFromBlackList', {
        userId: localStorage.getItem('userId'),
        objectId: data.number
      }, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      }).then(res => {
        console.log(res)
        this.init()
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
