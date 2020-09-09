<template>
  <div>
    <div class="main_header">
      <!-- 顶行 -->
      <top-line :topdata="topdata"></top-line>
      <div class="config_base">
        <!-- 基本信息 -->
        <el-form :model="configData" :rules="configData_rules" 
        ref="configData_ref" label-width="100px">
          <!-- top -->
          <div class="form_top">
            <!-- 基本信息 -->
            <div class="taskconfig_top1">
              <i class="el-icon-film"></i>
              <span>基本信息</span>
            </div>
            <!-- form-item -->
            <div class="form_item">
              <el-form-item label="任务号" prop="taskNumber">
                <el-input v-model="configData.taskNumber" placeholder="请输入任务号"></el-input>
              </el-form-item>
              <el-form-item label="厂商名称" prop="tradeName">
                <el-input v-model="configData.tradeName" placeholder="请输入任务号"></el-input>
              </el-form-item>
              <el-form-item label="CPU型号" prop="cpuModel">
                <el-input v-model="configData.cpuModel" placeholder="请输入任务号"></el-input>
              </el-form-item>
              <div class="task_introduction">
                <el-form-item label="任务简介" prop="content">
                  <el-input type="textarea" v-model="configData.content" 
                  placeholder="请输入内容"></el-input>
                </el-form-item>
              </div>
            </div>
          </div>
          <!-- bottom -->
          <div class="form_bottom">
            <!-- 测试用例关联 -->
            <div class="taskconfig_top2">
              <i class="el-icon-film"></i>
              <span>测试用例关联</span>
            </div>
            <!-- form-item -->
            <div class="form_item">
              <el-form-item label="用例库" prop="select">
                <el-select v-model="select_value" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>
        </el-form>
        <!-- 保存 -->
        <div class="save_form">保存</div>
      </div>
      <!-- 任务列表 -->
      <div class="task_list">
        <!-- top -->
        <div class="task_list_top">
          <i class="el-icon-film"></i>
          <span>任务列表</span>
        </div>
        <!-- center  div -->
        <div class="task_list_center">
          <ul>
            <li>
              <i class="el-icon-set-up"></i>
            </li>
            <li>
              <i class="el-icon-set-up"></i>
            </li>
            <li>
              <i class="el-icon-set-up"></i>
            </li>
            <li>
              <i class="el-icon-set-up"></i>
            </li>
            <li>
              <i class="el-icon-set-up"></i>
            </li>
            <li>
              <i class="el-icon-set-up"></i>
            </li>
            <li>
              <i class="el-icon-set-up"></i>
            </li>
            <li>
              <i class="el-icon-set-up"></i>
            </li>
          </ul>

        </div>
        <!-- table -->
        <el-table
          :data="tableData"
          style="width: 100%"
          :height="250"
          border
          stripe>
          <el-table-column
          type="index">
          </el-table-column>
          <el-table-column
            prop="taskNumber"
            label="任务号"
            sortable
            min-width="100">
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            sortable
            min-width="100">
          </el-table-column>
          <el-table-column
            prop="lastChangeTime"
            label="最后修改时间"
            sortable
            min-width="100">
          </el-table-column>
          <el-table-column
            prop="lastDetectTime"
            label="最后一次检测完成时间"
            sortable
            min-width="100">
          </el-table-column>
          <el-table-column
            prop="name"
            label="厂家名称"
            sortable
            min-width="100">
          </el-table-column>
          <el-table-column
            prop="cpuModel"
            label="CPU型号"
            sortable
            >
          </el-table-column>
        </el-table>
      </div>
    </div>
     
  </div>
</template>

<script>
import TopLine from 'components/content/TopLine'
export default {
  name: 'taskconfig',
  components: {
    TopLine
  },
  data() {
    return {
      topdata: {
        left: '任务配置',
        center: '',
        right: {
          info: ['首页','任务管理','任务配置'],
          path: ['/homePage','/basic']
        }
      },
      // 基本信息 from
      configData: {
        taskNumber: '',
        tradeName: '',
        cpuModel: '',
        content: ''

      },
      // 用例库 select
      options: [{
          value: '选项1',
          label: '用例库1'
        }, {
          value: '选项2',
          label: '用例库2'
        }, ],
        select_value: '',

      // from表单的验证规则
      configData_rules: {
        taskNumber: [
          { required: true, message: '请输入任务号', trigger: 'blur' }
        ],
        tradeName: [
          { required: true, message: '请输入厂商名称', trigger: 'blur' }
        ],
        cpuModel: [
          { required: true, message: '请输入CPU型号', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        select: [
          { required: true, message: '请选择一个选项', trigger: 'blur' }
        ],
      },
      // 任务列表 table
      tableData: [{
          taskNumber: '演示任务',
          status: '就绪',
          lastChangeTime: '2020-06-04 11:02:43',
          lastDetectTime: '2020-06-04 11:02:43',
          name: '信安世纪',
          cpuModel: '中标麒麟'
        }, {
          taskNumber: 'txt1',
          status: '就绪',
          lastChangeTime: '2020-06-04 11:12:22',
          lastDetectTime: '2020-06-04 11:12:22',
          name: 'adids',
          cpuModel: 'adids'
        }]
    } 
  }
}

</script>
<style scoped>
  .main_header {
    margin: 20px 20px 0;
  }
  .config_base {
    position: relative;
    margin: 50px 5px;
  }
  .form_bottom,
  .form_top {
    position: relative;
    height: 300px;
    background-color: #f1f1f1;
    border-left: 5px solid #009688;
    padding: 20px;
  }
  .taskconfig_top2 span,
  .taskconfig_top1 span {
    margin-left: 5px;
    font-weight: 700;
  }
  .form_bottom {
    margin-top: 20px;
    height: 100px;
  }
  .form_item {
    position: absolute;
    top: 58px;
    left: 60px;
  }
  .save_form {
    position: absolute;
    right: 0;
    top: -40px;
    color: #f1f3f4;
    background-color: #4e89b9;
    padding: 5px;
  }
  .task_introduction {
    position: absolute;
    top: 0;
    left: 320px;
    width: 500px;
  }
  .task_list {
    margin: 0 5px;
    border-top: 3px solid #1472b8;
  }
  .task_list_top {
    margin: 7px 0;
  }
  .task_list_top span {
    font-size: 14px;
    font-weight: 700;
    margin-left: 5px;
  }
  .task_list_center {
    position: relative;
    height: 40px;
    background-color: #f2f2f2;
  }
  .task_list_center ul {
    display: flex;

    position: absolute;
    /* width: 100px; */
    right: 0;
    top: 10px;
  }
  .task_list_center ul li {
    margin-right: 14px;
    border: 1px solid #c0c4cc;
    padding: 1px 2px;
  }
</style>