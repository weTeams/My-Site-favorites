<template>
  <div id="app">
    <el-header style="padding: 0px;height:400px" >
      <my-headnav  ></my-headnav>
    </el-header>
    <router-view id="head"/>
    <!--<el-footer style="background-color: #222222;">Footer</el-footer>-->
    <el-footer></el-footer>
  </div>
</template>

<script>
import HeadNav from '@/components/HeadNav';


export default {

  components:{
        'my-headnav':HeadNav,
  },
  name: 'App',
  updated(){
      document.querySelector("#head").scrollIntoView(true)
  }
}
</script>

<style>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
}

#headImg{
   background-image:url(assets/海2.jpg) ;
   background-size:100% 100%;
   width: 100%;
   height: 400px;

   position: absolute;

   font-size:5em;
   font-weight: bold;
   color: white;
}
</style>
