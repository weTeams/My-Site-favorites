<template>
   <div class="contain">
     <el-menu
       :default-active="activeIndex2"
       class="el-menu-demo"
       style="padding: 0px;"
       mode="horizontal"
       @select="handleSelect"
       background-color="#545c64"
       text-color="#fff"
       active-text-color="#ffd04b">
       <el-menu-item index="1" @click="jump_blog()" >我的博客</el-menu-item>
       <el-menu-item index="2" @click="jump_collect()">网络收藏夹</el-menu-item>
       <el-menu-item index="3" @click="jump_editor()">写博客</el-menu-item>
       <el-menu-item index="4" @click="jump_login()">登录</el-menu-item>
       <el-menu-item index="5" @click="jump_outbreak()">疫情天眼</el-menu-item>
     </el-menu>
   </div>
</template>

<script>
  export default {
      data() {
        return {
          activeIndex: '1',
          activeIndex2: '1'
        };
      },
      methods: {
         jump_hainan(){
           this.$router.push({name:'Hainan'});
         },
         jump_collect(){
           this.$router.push({name:'Main'});
         },
         jump_blog(){
           this.$router.push({name:'Blog'});
         },
         jump_editor(){
           this.$router.push({name:'BlogEditor'});
         },
         jump_login(){
           this.$router.push({name:'Login'});
         },
         jump_outbreak(){
           window.location.href = "http://www.luojiework.cn:8017/#/Home"
         },

        handleSelect(key, keyPath) {
          console.log(key, keyPath);
        }
      }
    }
</script>

<style>

</style>
