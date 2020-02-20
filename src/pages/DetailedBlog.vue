<template>
 <el-container>
      <el-header style="padding: 0px;">
        <my-headnav></my-headnav>
      </el-header>
      <el-container>
        <el-aside width="350px">
          <my-card></my-card>

        </el-aside>
        <el-container>
          <el-main>
            <my-showblog></my-showblog>
          </el-main>
          <el-footer>Footer</el-footer>
        </el-container>
      </el-container>
    </el-container>
</template>

<script>
    import portrait from '@/components/portrait';
    import HeadNav from '@/components/HeadNav';
    import showBlog from '@/components/showBlog';
    import mycard from '@/components/mycard'
  export default {

    components:{
      'my-portrait':portrait,
      'my-headnav':HeadNav,
      'my-showblog':showBlog,
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
