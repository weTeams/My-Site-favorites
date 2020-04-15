<template>

   <el-card  style="margin-left: 20px;margin-top: 20px;background-color: #b3e8e4;border: 0;">
     <div class="test">
      <my-portrait></my-portrait>
        <br/><br/>
        <el-button style="margin:10px 5px;" >我的简历</el-button>
        <el-button style="margin:10px 5px;"type="info" @click="jump_Github()">Github</el-button>
        <el-button style="margin:10px 5px;"type="primary"  >知乎</el-button>
        <el-button style="margin:10px 5px;"type="success"  >LeetCode</el-button>

        <el-button style="margin:10px 5px;"type="danger"  @click="jump_csdn()">CSDN博客</el-button>
        <el-button style="margin:10px 5px;"type="warning"  >关于我</el-button>
     </div>
   </el-card>
</template>

<script>
    import portrait from '@/components/portrait';

  export default {

    components:{
      'my-portrait':portrait,
    },

    data() {
      return {

      };

    },

    methods:{
      jump_csdn(){
        window.location.href = "https://me.csdn.net/qq_41841048"
      },
      jump_Github(){
        window.location.href = "https://github.com/luojiegithuber"
      },

    }
  };
</script>

<style>


  .test{
    width:100%;
    height:430px;

    background-image:url(../assets/卡片背景.jpg);
    background-size: cover; -moz-background-size: cover;

    border-radius:10px
  }

</style>
