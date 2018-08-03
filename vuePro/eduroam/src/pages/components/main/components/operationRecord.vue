<template>
    <div class="operation">
      <el-row :gutter="20">
        <el-col :span="4">
          <el-input v-model="findId" placeholder="输入要查找的ID" prefix-icon="el-icon-search"></el-input>
        </el-col>
        <el-col :span="4">
          <el-date-picker
            v-model="beginTime"
            type="date"
            placeholder="选择开始日期"></el-date-picker>
        </el-col>
        <el-col :span="4" style="margin: 0 50px">
          <el-date-picker
            v-model="endTime"
            type="date"
            placeholder="选择结束日期"
            ></el-date-picker>
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
      data: [],
      beginTime: '',
      endTime: ''
    }
  },
  methods: {
    findAdmin () {
      const token = localStorage.getItem('token')
      const findId = this.findId
      const currentId = localStorage.getItem('userId')
      const beginTime = this.beginTime
      const endTime = this.endTime
      const finalEnd = endTime.getFullYear() + '-' +this.dealDate(endTime.getMonth()+1) + '-' + this.dealDate(endTime.getDate())
      const finalBegin = beginTime.getFullYear() + '-' +this.dealDate(beginTime.getMonth()+1) + '-' + this.dealDate(beginTime.getDate())
      axios.get('http://182.254.133.79:8081/AdminOperationLogController/GetAdminOperationLogsByAdminIdAndDate',
        {
          params: {
            userId: currentId,
            objectId: findId,
            startDate: finalBegin,
            endDate: finalEnd
          },
          headers: {
            Authorization: token
          }
        }
      ).then(res => {
        this.data = res.data
        console.log(this.data)
      }).catch(e => {
        console.log(e)
      })
    },
    dealDate (num) {
      if (Number(num) > 10) {
        return num
      } else {
        return '0' + num
      }
    }
  }
}
</script>

<style scoped lang="stylus">
  .operation
    width 90%
    margin 0 auto
</style>
