<template>
  <div class="demo-basic--circle">
    <div class="block"><el-avatar :size="75" :src="circleUrl+'/'+picture"></el-avatar></div>
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
