<template>
  <div>
    <div class="main_header">
      <!-- 顶行 -->
      <top-line :topdata="topdata"></top-line>
      <!-- 上传升级文件 -->
      <div class="up_file">
        <span>上传升级文件</span>
        <div class="up_file_info">
          <form action="">
            <span class="span_one">上传升级文件:</span>
            <input type="file" class="input_file">
            <div class="system_up">
              <i class="el-icon-upload2"></i>
              <span>系统升级</span>
            </div>
          </form>
          <div class="view_up_record">
              <i class="el-icon-upload2"></i>
              <span>查看升级记录</span>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TopLine from 'components/content/TopLine'
export default {
  name: 'systemup',
  components: {
    TopLine
  },
  data() {
    return {
      // 顶行 
      topdata: {
        left: '系统升级',
        center: ''
      },
      systemUpForm: {

      }
    }
  }
}

</script>
<style scoped>
  .main_header {
    margin: 20px 20px 0;
  }
  .up_file {
    position: relative;
    font-size: 14px;
    margin: 10px 0 0 10px;
  }
  .up_file_info {
    position: absolute;
    left: 350px;
    top: 40px;
  }
  .up_file_info .span_one {
    margin-right: 20px;
  }
  .input_file {
    width: 185px;
  }
  .system_up {
    display: inline-block;
    color: #fff;
    background-color: #4e89b9;
    padding: 5px;
  }
  .view_up_record {
    width: 100px;
    margin-left: 125px;
    color: #fff;
    background-color: #4e89b9;
    padding: 5px;
    
  }
</style>