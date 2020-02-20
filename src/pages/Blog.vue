<template>
 <el-container style="background: #e3dbff;">
      <el-header style="padding: 0px;">
        <my-headnav></my-headnav>
      </el-header>
      <el-container>
        <el-aside width="350px">
          <my-card></my-card>

        </el-aside>
        <el-container>
          <el-main>
            <my-bloglist></my-bloglist>
          </el-main>

        </el-container>
      </el-container>

    </el-container>
</template>

<script>
    import portrait from '@/components/portrait';
    import HeadNav from '@/components/HeadNav';
    import bloglist from '@/components/bloglist';
    import mycard from '@/components/mycard'
  export default {

    components:{
      'my-portrait':portrait,
      'my-headnav':HeadNav,
      'my-bloglist':bloglist,
      'my-card':mycard
    },

    data() {
      return {

      };
    }
  };
</script>

<style>

</style>
