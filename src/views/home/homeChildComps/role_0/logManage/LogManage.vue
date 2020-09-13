<template>
  <div>
    <div class="main_header">
      <!-- 顶行 -->
      <top-line :topdata="topdata"></top-line>
      <!-- 中间行 -->
      <div class="log_center">
        <!-- 查询 -->
        <div class="log_center_top">
          <!-- query input -->
          <div class="query">
            <el-input
              placeholder="请输入查询的任务名称"
              v-model="input1">
              <i slot="suffix" class="el-input__icon el-icon-search"></i>
            </el-input>
          </div>
          <!-- download -->
          <div class="download">
            <div>随机数打包下载</div>
            <div>任务日志批量下载</div>
          </div>
        </div>
        <!-- table -->
        <el-table
          :data="tableData"
          style="width: 100%"
          border
          stripe
          class="log_table">
          <el-table-column
            prop="id"
            label="ID"
            sortable
            min-width="100">
          </el-table-column>
          <el-table-column
            prop="name"
            label="日志名称"
            sortable
            min-width="200">
          </el-table-column>
          <el-table-column
            prop="size"
            label="大小"
            sortable
            min-width="100">
          </el-table-column>
          <el-table-column
            prop="lastChangeTime"
            label="最后修改时间"
            sortable
            min-width="180">
          </el-table-column>
          <el-table-column
            min-width="180"
            align="center">
            <template>
              <el-button type="primary" size="mini">日志查看</el-button>
              <el-button type="success" size="mini">下载</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
         @size-change="handleSizeChange"
         @current-change="handleCurrentChange"
         :current-page="1"
         :page-sizes="[1, 3, 5, 10]"
         :page-size="100"
         layout="total, sizes, prev, pager, next, jumper"
         :total="15">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import TopLine from 'components/content/TopLine'
export default {
  name: 'log',
  components: {
    TopLine
  },
  data() {
    return {
      topdata: {
        left: '任务日志',
        center: '管理员日志',
        right: {
          info: ['首页','日志管理','日志管理'],
          path: ['/homePage']
        }
      },
      // 查询 v-model
      input1: '',
      // 任务日志 table
      tableData: [{
        id: '0',
        name: 'aaaa/service_debug.log',
        size: '2.9k',
        lastChangeTime: '2019-10-15 15:28:20',
      },{
        id: '1',
        name: 'bab/service_debug.log',
        size: '1.7k',
        lastChangeTime: '2019-10-15 16:28:35',
      }],
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(val);
    },
    handleCurrentChange(val) {
      console.log(val);
    }
  }
}

</script>
<style scoped>
  /* .main_header {
    margin: 20px 20px 0;
  } */
  .log_center {
    margin: 10px 5px 0;
  }
  .log_center_top {
    display: flex;
    justify-content: space-between;
  }
  .query {
    width: 220px;
  }
  .download {
    display: flex;
    justify-content: space-between;
  }
  .download div {
    color: #fff;
    background-color: #50b1da;
    padding: 7px 10px 5px;
    margin-left: 10px;
  }
  .log_table {
    margin: 15px 0;
  }
</style>