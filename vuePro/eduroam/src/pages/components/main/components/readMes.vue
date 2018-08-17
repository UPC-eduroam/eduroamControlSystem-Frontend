<template>
  <div class="message">
      <el-table
        :data="tableData"
        style="width: 70%; margin: 0 auto;"
        :row-style="rowClass">
        <el-table-column
          prop="id"
          label="编号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="sender"
          label="姓名"
          width="200">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="日期"
          width="300">
        </el-table-column>
        <el-table-column
          label="操作"
          width="215">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="detail">
        <textarea class="detailM" placeholder="未选取消息" readonly>{{mes}}</textarea>
        <el-button type="success" @click = 'agree'>同意</el-button>
        <el-button type="warning" @click = 'disagree'>不同意</el-button>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'readMes',
  data () {
    return {
      tableData: [],
      mes: ''
    }
  },
  mounted () {
    this.init()
  },
  computed: {
    ...mapState(['id', 'user'])
  },
  methods: {
    init () {
      axios.get('http://182.254.133.79:8081/NotificationController/GetAllNotificationsSentToMe',{
        headers: {
          Authorization: localStorage.getItem('token')
        }
      }).then((data) => {
        this.tableData = data.data
      })
    },
    handleClick (row) {
      console.log(row)
      // axios.post('http://182.254.133.79:8081/NotificationController/MarkAsViewed', {
      //   notificationId: row.id
      // }, {
      //   headers: {
      //     Authorization: localStorage.getItem('token')
      //   }
      // }).then((data) => {
      //   console.log(data)
      // })
      this.$http.post('http://182.254.133.79:8081/NotificationController/MarkAsViewed', {
        notificationId: row.id
      }, { emulateJSON: true }).then((data) => {
        console.log(data)
        this.init()
      })
      let messArray = row.message.split(';')
      let beginTime = messArray[1].split(' ')[3]+'--'+messArray[1].split(' ')[1]+'--'+messArray[1].split(' ')[2]
      let endTime = messArray[2].split(' ')[3]+'--'+messArray[2].split(' ')[1]+'--'+messArray[2].split(' ')[2]
      this.mes ='理由:  '+ messArray[0] + ('\n') + '时间段:  ' + beginTime + '——' + endTime + ('\n') + '备注:  '+ messArray[3]
      this.changeId(row.id)
      this.changeUser(row.sender)
    },
    handleDelete (row) {
      this.$http.post('http://182.254.133.79:8081/NotificationController/DeleteNotification', {
        notificationId: row.id
      }, { emulateJSON: true }).then((data) => {
        console.log(data)
        if(data.body.state === 0) {
          this.init()
        }
      })
      this.init()
    },
    rowClass (row, rowIndex) {
      if (row.row.viewed) {
        return {'background-color': ' #FFFFE0'}
      } else {
        return {'background-color': '  #98FB98'}
      }
    },
    agree () {
      this.$http.post('http://182.254.133.79:8081/NotificationController/CreateNotification', {
        receiver: this.user,
        message: 'agree'
      }, { emulateJSON: true }).then((data) => {
        this.init()
        this.mes = ''
        this.$message('已同意')
      }, (e) => {
        console.log('error')
      })
    },
    disagree () {
      this.$prompt('请输入理由', '提示', {
        confirmButtonText: '发送',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        this.$http.post('http://182.254.133.79:8081/NotificationController/CreateNotification', {
          receiver: this.user,
          message: 'disagree;' + value
        }, { emulateJSON: true }).then((data) => {
          this.init()
          this.mes = ''
        }, (e) => {
          console.log('error')
        })
        this.$message({
          type: 'success',
          message: '发送成功'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '未发送'
        })
      })
    },
    ...mapMutations(['changeId', 'changeUser'])
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
