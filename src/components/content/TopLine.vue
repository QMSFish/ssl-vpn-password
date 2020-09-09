<template>
  <div class="basic_top" v-if="topdata">
      <!-- 左边基本配置-->
      <div class="topdata_left" v-if="topdata.hasOwnProperty('left')">
        <div class="outer_space">
          <div class="inner_layer">{{topdata.left}}</div>
        </div>
        <div class="sibling">{{topdata.center}}</div>
      </div>
      <!-- 右边面包屑 -->
      <el-breadcrumb separator="-" v-if="topdata.hasOwnProperty('right')">
        <el-breadcrumb-item :to="{ path: topdata.right.path[0] }">{{topdata.right.info[0]}}</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: topdata.right.path[1] }">{{topdata.right.info[1]}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{topdata.right.info[2]}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
</template>

<script>
export default {
  name: 'topline',
  props: {
    topdata: Object
  }
}

</script>
<style scoped>
  .basic_top {
    display: flex;
    justify-content: space-between;
    border-bottom: 2px solid #009688;
  }
  .topdata_left {
    display: flex;
  }
  .outer_space {
    /* position: relative; */
    padding: 1px;
    border: 2px solid #009688;
    border-bottom: 0;
    margin-bottom: -2px;
  }
  .inner_layer {
    width: 100px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    color: #fff;
    background-color: #009688;
  }
  .sibling {
    text-align: center;
    line-height: 38px;
    padding-left: 10px;
  }
</style>