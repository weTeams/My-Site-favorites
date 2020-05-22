<template>
 <el-container style="background: #b3e8e4;">


      <el-container style="overflow: auto;">
        <el-aside width="350px" >
          <my-card></my-card>

          <my-specter></my-specter>
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
    import specter from '@/components/Specter'
  export default {

    components:{
      'my-portrait':portrait,
      'my-headnav':HeadNav,
      'my-bloglist':bloglist,
      'my-card':mycard,
      'my-specter':specter,
    },

    data() {
      return {

      };
    },


    created() {
      if (localStorage.getItem("userMsg")) {

         this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(localStorage.getItem("userMsg"))))
      }
    },
    mounted(){

    }
  };
</script>

<style>

</style>
