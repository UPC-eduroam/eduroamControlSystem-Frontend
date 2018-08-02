<template>
    <div class="operation">
      <el-row :gutter="20">
        <el-col :span="20">
          <el-input v-model="findId" placeholder="输入要查找的ID" prefix-icon="el-icon-search"></el-input>
        </el-col>
        <el-col :span="4"><el-button type="primary" @click="findAdmin">查找</el-button></el-col>
      </el-row>
      <el-table
        :data="data"
        style="width: 100%; margin-top: 20px">
        <el-table-column
          prop="operatingTime"
          label="修改日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="adminId"
          label="操作人"
          width="180">
        </el-table-column>
        <el-table-column
          prop="operation"
          label="操作">
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'operationRecord',
  data () {
    return {
      findId: '',
      data: []
    }
  },
  methods: {
    findAdmin () {
      const token = localStorage.getItem('token')
      const findId = this.findId
      const currentId = localStorage.getItem('userId')
      axios.get('http://182.254.133.79:8081/AdminOperationLogController/GetAllAdminOperationLogsByAdminId',
        {
          params: {
            Authorization: token,
            userId: currentId,
            objectId: findId
          }
        }
      ).then(res => {
        this.data = res.data
      }).catch(e => [
        console.log(e)
      ])
    }
  }
}
</script>

<style scoped lang="stylus">
  .operation
    width 90%
    margin 0 auto
</style>
