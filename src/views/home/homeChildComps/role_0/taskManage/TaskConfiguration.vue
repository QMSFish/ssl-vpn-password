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
              <el-form-item label="任务号" prop="taskNum">
                <el-input v-model="configData.taskNum" placeholder="请输入任务号"></el-input>
              </el-form-item>
              <el-form-item label="厂商名称" prop="manCompany">
                <el-input v-model="configData.manCompany" placeholder="请输入任务号"></el-input>
              </el-form-item>
              <el-form-item label="CPU型号" prop="cpu">
                <el-input v-model="configData.cpu" placeholder="请输入任务号"></el-input>
              </el-form-item>
              <div class="task_introduction">
                <el-form-item label="任务简介" prop="brief">
                  <el-input type="textarea" v-model="configData.brief" 
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
              <el-form-item label="用例库" prop="caseLib">
                <el-select v-model="configData.caseLib" placeholder="请选择">
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
        <div class="save_form" @click="saveClick">保存</div>
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
            <el-tooltip content="查询任务" placement="top-end" :enterable='false'>
              <li @click="query_task_btn" class="task_list_li">
                <i class="iconfont icon-chaxun"></i>
              </li>
            </el-tooltip>
            <el-tooltip content="修改任务" placement="top-end" :enterable='false'>
              <li @click="change_task_btn" class="task_list_li">
                <i class="iconfont icon-xiugai"></i>
              </li>
            </el-tooltip>
            <el-tooltip content="删除任务" placement="top-end" :enterable='false'>
              <li @click="delete_task_btn" class="task_list_li">
                <i class="iconfont icon-qinglishuju"></i>
              </li>
            </el-tooltip>
            <el-tooltip content="启动任务" placement="top-end" :enterable='false'>
              <li @click="start_task_btn" class="task_list_li">
                <i class="iconfont icon-qidong"></i>
              </li>
            </el-tooltip>
            <el-tooltip content="停止任务" placement="top-end" :enterable='false'>
              <li @click="stop_task_btn" class="task_list_li">
                <i class="iconfont icon-tingzhi"></i>
              </li>
            </el-tooltip>
            <el-tooltip content="重启任务" placement="top-end" :enterable='false'>
              <li @click="restart_task_btn" class="task_list_li">
                <i class="iconfont icon-zhongqi"></i>
              </li>
            </el-tooltip>
            <el-tooltip content="清理数据" placement="top-end" :enterable='false'>
              <li @click="clean_data" class="task_list_li">
                <i class="iconfont icon-dingshiqinglishuju"></i>
              </li>
            </el-tooltip>
          </ul>
        </div>
        <!-- table -->
        <el-table
          v-loading="loading"
          :data="tableData == []? []:tableData[currentIndex]"
          style="width: 100%"
          border
          stripe
          :default-sort="{prop: 'taskNumber', order: 'ascending'}">>
          <el-table-column
          width="50">
            <template slot-scope="scope">
              <!-- <input type="radio" name="user" :value="scope.row.taskNumber" @change="radioChange"> -->
              <label :for="scope.row.taskNum" class="radio">
                <input type="radio" name="user" :id="scope.row.taskNum" :value="scope.row.taskNumber" @change="radioChange" />
                <div class="radio-div">
                  <span class="radio-on"></span>
                  <span class="radio-bg"></span>
                </div>
              </label>
            </template>
          </el-table-column>
          <el-table-column
            prop="taskNumber"
            label="任务号"
            sortable
            :sort-orders="['ascending']"
            min-width="100">
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            sortable
            :sort-by="['status', 'lastChangeTime', 'taskNumber']"
            min-width="100">
          </el-table-column>
          <el-table-column
            prop="lastChangeTime"
            label="最后修改时间"
            sortable
            :sort-by="['lastChangeTime', 'status', 'name']"
            min-width="150">
          </el-table-column>
          <el-table-column
            prop="lastDetectTime"
            label="最后一次检测完成时间"
            sortable
            min-width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="厂家名称"
            sortable
            :sort-orders="['ascending']"
            min-width="100">
          </el-table-column>
          <el-table-column
            prop="cpuModel"
            label="CPU型号"
            sortable
            :sort-orders="['ascending']"
            min-width="120">
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[1, 3, 5, 8]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
        </el-pagination>
      </div>
      <!-- 查询单个任务对话框 -->
      <el-dialog
        title="任务详情"
        :visible.sync="queryTaskFlag"
        width="30%">
        <div v-loading="singelLoading">
          <div v-for="(value,key,index) in taskData" :key="index" class="query_task_div">
            <span class="query_task_left">{{key}}:</span><span class="query_task_right">{{value}}</span>
          </div>
        </div>
      </el-dialog>
      <!-- 修改任务对话框 -->
      <el-dialog
        title="修改任务"
        :visible.sync="modifyTaskFlag"
        width="50%"
        >
        <el-form :model="modifyTaskData" :rules="modifyTask_rules" ref="modifyTask_ref" 
        v-loading="fromLoading"
        label-width="100px">
          <el-form-item label="任务编号" prop="taskNum">
            <el-input v-model="modifyTaskData.taskNum"></el-input>
          </el-form-item>
          <el-form-item label="cpu型号" prop="cpu">
            <el-input v-model="modifyTaskData.cpu"></el-input>
          </el-form-item>
          <el-form-item label="厂商信息" prop="manCompany">
            <el-input v-model="modifyTaskData.manCompany"></el-input>
          </el-form-item>
          <el-form-item label="任务简介" prop="brief">
            <el-input type="textarea" v-model="modifyTaskData.brief"></el-input>
          </el-form-item>
          <el-form-item label="用例库名称" prop="caseLib">
            <el-select v-model="modifyTaskData.caseLib" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="modifyTaskFlag = false">取 消</el-button>
          <el-button type="primary" @click="modifyTaskBtnClick">确 定</el-button>
        </span>
      </el-dialog>
    </div>
     
  </div>
</template>

<script>
import TopLine from 'components/content/TopLine'

import {divideArray} from 'components/common/divideArray'

import {query_task,query_case,add_task,query_singel_task,modify_task,delete_task,start_task,stop_task,restart_task,clean_data} from 'network/home'

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
          path: ['/homePage']
        }
      },
      // 基本信息 from
      configData: {
        taskNum: '',
        manCompany: '',
        cpu: '',
        brief: '',
        caseLib: ''
      },
      // 用例库 select
      options: [],
      // from表单的验证规则
      configData_rules: {
        taskNum: [
          { required: true, message: '请输入任务号', trigger: 'blur' }
        ],
        manCompany: [
          { required: true, message: '请输入厂商名称', trigger: 'blur' }
        ],
        cpu: [
          { required: true, message: '请输入CPU型号', trigger: 'blur' }
        ],
        brief: [
          { required: true, message: '请输入内容',trigger: 'blur' }
        ],
        caseLib: [
          { required: true, message: '请选择一个选项', trigger: 'blur' }
        ],
      },
      // 任务列表 table
      tableData: [],
      loading: false,
      currentIndex: 0,
      // 查询用例请求回来的数据数组
      resData: [],
      // 分页 
      currentPage: 1,
      total: 0,
      // 默认每页三条数据
      pageSize: 3,
      // 选中的任务号
      selectedTask: null,
      // 启动任务的任务号
      // startTaskNum: null,
      // 查询任务对话框的显示隐藏变量
      queryTaskFlag: false,
      singelLoading: false,
      // 查询任务的对象数据
      taskData: {},
      // 修改任务对话框的显示隐藏变量
      modifyTaskFlag: false,
      fromLoading: false,
      // 修改任务 from
      modifyTaskData: {
        taskNum: '',
        manCompany: '',
        cpu: '',
        brief: '',
        caseLib: ''
      },
     // 修改任务 表单的验证规则
      modifyTask_rules: {
        taskNum: [
          { required: true, message: '请输入任务号', trigger: 'blur' }
        ],
        manCompany: [
          { required: true, message: '请输入厂商名称', trigger: 'blur' }
        ],
        cpu: [
          { required: true, message: '请输入CPU型号', trigger: 'blur' }
        ],
        brief: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        caseLib: [
          { required: true, message: '请选择一个选项', trigger: 'blur' }
        ],
      },
      // 开始任务定时器
      // startTaskTimer: null
    } 
  },
  created() {
    this.query_case1();
    this.query_task1();
  },
  methods: {
    // 查询用例请求
    async query_case1() {
      const res = await query_case();
      console.log('查询用例');
      console.log(res);
      if(!res || res.status !== 0) {
        return this.$message.error('查询用例失败')
      }
      this.options = [];
      res.data.forEach(item => {
        this.options.push({
          value: item.useCaseLibrary.caseName,
          label: item.useCaseLibrary.caseName,
        })
      })
    },
    // 任务查询请求
    async query_task1() {
      this.loading = true;
      const res = await query_task();
      console.log(res);
      if(!res || res.status !== 0) {
        this.loading = false;
        this.$message.error('查询任务失败')
      } else {
        // 每次清空resData tableData
        this.resData = [];
        this.tableData = [];
       if(res.data !== {}) {
        for(var key in res.data) {
        const val = {};
        const obj = res.data[key]
        val.taskNumber = obj.taskNum;
        val.status = obj.state;
        val.name = obj.manCompany;
        val.cpuModel = obj.cpu;
        val.lastChangeTime = obj.lastModifyDate;
        val.lastDetectTime = obj.lastDate;
        this.resData.push(val);
        }
        this.tableData = divideArray(this.resData,this.pageSize);
      }
      this.total = this.resData.length;
      this.loading = false;
      return res.data
      }
      
    },
    // 查询单个任务请求
    async query_singel_task1(num) {
      const res = await query_singel_task(num);
      console.log(res);
      if(!res || res.status !== 0) {
         this.singelLoading = false;
         this.$message.error('查询当前任务失败')
      } else {
        this.taskData = res.data;
        console.log(this.taskData);
        return this.taskData
      }
      
    },
    // 新增任务请求
    async add_task1(obj) {
      const res = await add_task(obj);
      console.log(res);
      if(!res || res.status !== 0) {
        return this.$message.error('新增任务失败')
      }
      this.$message.success('新增任务成功');
      // 重新请求任务列表
      this.query_task1();
    },
    // 修改任务请求
    async modify_task1(obj) {
      const res = await modify_task(obj);
      console.log(res);
      if(!res || res.status !== 0) {
        return this.$message.error('修改任务失败')
      }
      this.$message.success('任务已修改');
      // 重新请求任务列表
      this.query_task1();
    },
    // 删除任务请求
    async delete_task1(num) {
      const res = await delete_task(num);
      console.log(res);
      if(!res || res.status !== 0) {
        return this.$message.error('删除任务失败')
      }
      this.$message.success('任务已删除');
      // 重新请求任务列表
      this.query_task1();
    },
    // 启动任务请求
    async start_task1(num) {
      const res = await start_task(num);
      console.log(res);
      if(!res) {
         this.$message.error('启动任务失败')
      } else if(res.status !== 0) {
        if(res.hasOwnProperty('msg') && res.msg == '任务已经启动，无法再启动') {
           this.$message.error('任务已经启动，无法再启动')
        } else {
           this.$message.error('启动任务失败')
        }
      } else {
        this.$message.success('任务启动成功');
        return res

      }
      // if(!res || res.status !== 0) {
      //   return this.$message.error('启动任务失败')
      // }
      
    },
    // 停止任务请求
    async stop_task1(num) {
      const res = await stop_task(num);
      console.log(res);
      if(!res) {
        this.$message.error('停止任务失败')
      } else if(res.status !== 0) {
        if(res.hasOwnProperty('msg') && res.msg == '任务已经停止无需再停止') {
          this.$message.error('任务已经停止无需再停止')
        } else {
          this.$message.error('停止任务失败')
        }
      } else {
        this.$message.success('任务已停止');
        return res
      }
      
    },
    // 重启任务请求
    async restart_task1(num) {
      const res = await restart_task(num);
      console.log(res);
      if(!res || res.status !== 0) {
        return this.$message.error('重新启动任务失败')
      }
      this.$message.success('任务已重启');
    },
    // 清理数据请求
    async clean_data1(num) {
      const res = await clean_data(num);
      console.log(res);
      if(!res || res.status !== 0) {
        return this.$message.error('清理数据失败')
      }
      this.$message.success('数据清理完成');
    },
    // 分页
    // 监听每页数据数量发生改变
    handleSizeChange(val) {
      console.log('每页：' + val + '条');
      this.pageSize = val;
      // this.currentIndex = 0;
      // console.log('------页码' + this.currentIndex );
      console.log('------currentIndex：' + this.currentIndex );
      this.query_task1();
    },
    // 监听页码发生改变
    handleCurrentChange(val) {
      console.log('当前页码：' + val);
      this.currentIndex = val - 1;
      console.log('------currentIndex：' + this.currentIndex );
    },
    // 点击保存按钮
    saveClick() {
      this.$refs.configData_ref.validate((valid) => {
        if(!valid) {
          return this.$message.error('验证不通过！')
        };
        // 对象深拷贝
        const obj = JSON.parse(JSON.stringify(this.configData));
        this.add_task1(obj);
        // 把表单恢复到初始状态
        this.$refs.configData_ref.resetFields();
      })
    },
    radioChange(e) {
      console.log(e.target.defaultValue);
      this.selectedTask = e.target.defaultValue;
    },
    // 点击修改任务对话框里面的确认按钮
    modifyTaskBtnClick() {
      this.$refs.modifyTask_ref.validate((valid) => {
        if(!valid) {
          return this.$message.error('验证不通过！')
        };
        this.modify_task1(this.modifyTaskData);
        // 隐藏对话框
        this.modifyTaskFlag = false;
      })
    },
    // 点击查询任务信息按钮
    query_task_btn() {
      console.log('11');
      if(this.selectedTask) {
        this.queryTaskFlag = true;
        this.singelLoading = true;
        this.query_singel_task1(this.selectedTask).then(() => {
          this.singelLoading = false;
        });
      } else {
        this.$message.error('请选择一个任务！')
      }
    },
    // 点击修改任务按钮
    change_task_btn() {
      console.log(22);
      if(this.selectedTask) {
        // 显示对话框
        this.modifyTaskFlag = true;
        this.fromLoading = true
        this.query_singel_task1(this.selectedTask).then((res) => {
          const obj = this.modifyTaskData;
          obj.taskNum = res.taskNum;
          obj.cpu = res.cpu;
          obj.manCompany = res.manCompany;
          obj.brief = res.brief;
          obj.caseLib = res.caseLib;
          this.fromLoading = false
        });
        // this.modify_task1(this.modifyTaskData);
      } else {
        this.$message.error('请选择一个任务！')
      }
    },
    // 点击删除任务按钮
    delete_task_btn() {
      console.log(33);
      if(this.selectedTask) {
        this.delete_task1(this.selectedTask);
      } else {
        this.$message.error('请选择一个任务！')
      }
    },
    // 点击开始任务按钮
    start_task_btn() {
      console.log(44);
      if(this.selectedTask) {
        // 先对选中的任务号赋值  防止被改变
        const startTaskNum = this.selectedTask;
        this.start_task1(startTaskNum).then((res) => {
          // 只有启动任务成功，才会开启定时器
          if(res != undefined) {
            const startTaskTimer = setInterval(() => {
            this.query_task1().then((res) => {
              // 查询成功才去判断
              if(res != undefined) {
                if(res[startTaskNum].state == 0) {
                  if(startTaskTimer !== null) {
                    console.log(startTaskTimer);
                    // this.$message.success('任务执行中')
                    clearInterval(startTaskTimer);
                    this.startTaskTimer = null
                    console.log('任务执行中');
                  }
                }
              }
            });
          }, 50);
          }
        })
      } else {
        this.$message.error('请选择一个任务！')
      }
    },
    // 点击停止任务按钮
    stop_task_btn() {
      console.log(55);
      if(this.selectedTask) {
        const startTaskNum = this.selectedTask;
        this.stop_task1(startTaskNum).then((res) => {
          // 只有停止任务成功，才会开启定时器
          if(res != undefined) {
            const startTaskTimer = setInterval(() => {
            this.query_task1().then((res) => {
              // 查询成功才去判断
              if(res != undefined) {
                if(res[startTaskNum].state == -1) {
                  if(startTaskTimer !== null) {
                    console.log(startTaskTimer);
                    // this.$message.success('任务执行中')
                    clearInterval(startTaskTimer);
                    this.startTaskTimer = null
                    console.log('任务执行完成');
                  }
                }
              }
            });
          }, 50);
          }

        });
      } else {
        this.$message.error('请选择一个任务！')
      }
    },
    // 点击重启任务按钮
    restart_task_btn() {
      console.log(66);
      if(this.selectedTask) {
        this.restart_task1(this.selectedTask);
      } else {
        this.$message.error('请选择一个任务！')
      }
    },
    // 点击清理数据按钮
    clean_data() {
      console.log(77);
      if(this.selectedTask) {
        this.clean_data1(this.selectedTask);
      } else {
        this.$message.error('请选择一个任务！')
      }
    }
  }
}

</script>
<style scoped>
  /* .main_header {
    margin: 20px 8px 0 20px;
  } */
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
    cursor: pointer;
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
    padding-bottom: 50px;
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
    cursor: pointer;
  }
  .query_task_div {
    margin-bottom: 20px;
  }
  .query_task_left {
    display: inline-block;
    width: 150px;
    text-align: right;
    font-weight: 700;
    font-size: 18px;
    margin-right: 15px;
  }
  .radio {
    display: inline-block;
    position: relative;
    /* line-height: 18px; */
    /* margin-right: 10px; */
    cursor: pointer;
    margin: 6px 0 0 7px;
  }
  
  .radio input {
    display: none;
  }
  
  .radio .radio-bg {
      display: inline-block;
      height: 14px;
      width: 14px;
      border: 2px solid #c2c2c2;
      padding: 0;
      background-color: #ffffff;
      border-radius: 100%;
      /* vertical-align: top; */
      cursor: pointer;
      transition: all 0.2s ease;
  }
  
  .radio .radio-bg:hover {
      border-color: #5FB878;
  }
  
  .radio .radio-on {
      display: none;
  }
  
  .radio input:checked+.radio-div span.radio-on {
      width: 8px;
      height: 8px;
      position: absolute;
      border-radius: 100%;
      background: #5FB878;
      top: 5px;
      left: 5px;
      transform: scale(0, 0);
      transition: all 0.2s ease;
      transform: scale(1, 1);
      display: inline-block;
  }
  
  .radio input:checked+.radio-div span.radio-bg {
      border-color: #5FB878;
  }
  
  .radio-div {
      display: inline-block;
  }
  .task_list_li:hover {
    border-color: #333333;
  }
</style>