<template>
  <div>
    <div class="main_header">
      <!-- 顶行 -->
      <top-line :topdata="topdata"></top-line>
      <!-- 详情 -->
      <div class="set_time_content">
        <div class="content">
          <!-- form -->
          <el-form :model="setTimeForm" :rules="setTime_rules"
           ref="setTime_ref" label-width="100px">
            <el-form-item label="日期" prop="date">
              <el-input v-model="setTimeForm.date" @focus="inputFocus" @blur="inputBlur"></el-input>
            </el-form-item>
            <el-form-item label="时间" prop="time">
              <el-input v-model="setTimeForm.time" @focus="inputFocus" @blur="inputBlur"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <!-- 保存 -->
        <div class="save" @click="saveBtn">保存</div>
      </div>
    </div>
  </div>
</template>

<script>
import TopLine from 'components/content/TopLine'

import {query_sysdate,modify_sysdate} from 'network/home'

export default {
  name: 'systemtime',
  components: {
    TopLine
  },
  data() {
    return {
      // 顶行 
      topdata: {
        left: '设置系统时间',
        center: '',
        right: {
          info: ['首页','系统管理','设置系统时间'],
          path: ['/homePage','/systemtime']
        }
      },
      // 详情 form
      setTimeForm: {
        date: '',
        time: null
      },
      // from表单的验证规则
      setTime_rules: {
        date: [
          { required: true, message: '请输入日期', trigger: 'blur' }
        ],
        time: [
          { required: true, message: '请输入时间', trigger: 'blur' }
        ]
      },
      timer: null
    }
  },
  created() {
    this.query_sysdate1();
    console.log("1111111111111");
    // 每过一秒请求一次系统时间
    this.setTime()
  },
  destroyed() {
    this.closeTime();
  },
  methods: {
    // 查询系统时间请求
     async query_sysdate1() {    
      const res = await query_sysdate();
      console.log(res);
      if(!res || res.status !== 0) {
        return this.$message.error('查询系统时间失败')
      }
      const date = res.data.split(' ');
      console.log(date);
      this.setTimeForm.date = date[0];
      this.setTimeForm.time = date[1]
      
    },
    // 修改系统时间
    async modify_sysdate1(date) {
      const res = await modify_sysdate(date);
      console.log(res);
      if(!res || res.status !== 0) {
        this.query_sysdate1();
        this.setTime();
        return this.$message.error('修改系统时间失败')
      }
      this.$message.success('修改系统时间成功');
      // 重新查询系统时间
      this.query_sysdate1();
      this.setTime();

    },
    // 开启定时器
    setTime() {
      if(!this.timer) {
        this.timer = setInterval(() => {
          this.query_sysdate1();
        },1000)
      }
    },
    // 关闭定时器
    closeTime() {
      if(this.timer) {
        clearInterval(this.timer)
      }
      this.timer = null
    },
    // 点击保存按钮
    saveBtn() {
      let date= [];
      date.push(this.setTimeForm.date);
      date.push(this.setTimeForm.time);
      date = date.join(' ');
      this.closeTime();
      this.modify_sysdate1(date)
    },
    // input框获得焦点
    inputFocus() {
      this.closeTime();
    },
    // input框失去焦点
    inputBlur() {
      // this.query_sysdate1();
      this.setTime()
     }  
    }
}

</script>
<style scoped>
  /* .main_header {
    margin: 20px 20px 0;
  } */
  .set_time_content {
    position: relative;
    margin: 10px 10px 0;
  }
  .content {
    position: absolute;
    top: 40px;
    left: 450px;
  }
  .save {
    position: absolute;
    top: 0;
    right: 0;
    padding: 5px;
    color: #fff;
    background-color: #0f5076;
    cursor: pointer;
  }
</style>