<template>
  <div class="demo-basic--circle">头像框
    <div class="block"><el-avatar :size="50" :src="circleUrl+'/'+picture"></el-avatar></div>
  </div>
</template>

<script>
  export default {

    data () {
      return {
        picture:"微信图片_20200127233702",   //这里是用户指定的标识图像的名字
        circleUrl: "/api2/users/download"
      }
    },

    }
</script>

<style>

</style>
