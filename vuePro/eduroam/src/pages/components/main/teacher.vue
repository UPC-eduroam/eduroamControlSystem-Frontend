<template>
  <div class="teacher">
    <el-container>
      <el-main>
        <el-row  style="width: 80%; margin: 0 auto; padding: 20px">
          <el-col :span="24" >
            <el-table class="blackForm" :data="table">
            <el-table-column
              label="学号"
              prop="number"
            ></el-table-column>
            <el-table-column
              label="姓名"
              prop="name"
            ></el-table-column>
            <el-table-column label="操作">
              <template  slot-scope="scope">
                <el-button
                  size="mini" @click="check(scope.row)"
                >编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
          </el-col>
        </el-row>
        <el-row style="width: 80%; margin: 0 auto; padding: 20px">
          <el-col :span="24">
            <div class="detail">
              <span class="chosen">123445</span>
              <textarea class="chosenText"></textarea>
              <el-button type="primary" size="medium" class="btn">同意</el-button>
            </div>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'teacher',
  data () {
    return {
      table: [
        {
          name: '杜文杰',
          number: '15151515151'
        }
      ]
    }
  },
  methods: {
    check (row) {
      console.log(row.name)
    }
  }
}
</script>

<style scoped lang="stylus">
  .blackForm
    width 100%
    min-height 200px
    background rgba(255,255,255,0.5)
    padding 10px
  .detail
    width 100%
    min-height: 200px
    background rgba(255,255,255,0.5)
    padding 10px
    box-sizing border-box
    .chosen
      display block
      height 20px
      line-height 20px
      font-size 20px
      margin-bottom 10px
    .chosenText
      width 600px
      height 100px
      margin-bottom 10px
    .btn
      display block
</style>
