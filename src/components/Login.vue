<template>

  <div class="login">
    <my-portrait></my-portrait>
      <div>
        <h1>{{this.$store.state.username}}的等级：LV.{{this.$store.state.isLogin}}</h1>
        <el-input style="width: 300px" size="medium" placeholder="请输入用户名" v-model="name" clearable class="input_style"></el-input>
      </div>
      <div>
        <el-input style="width: 300px" size="medium" placeholder="请输入密码" v-model="password" show-password class="input_style"></el-input>
      </div>
      <div>
        <el-button type="primary" @click="login2" class="login_style">登录</el-button>
      </div>
  </div>
</template>

<script>
   import Axios from 'axios';
   import portrait from '@/components/portrait';
   import store from '../vuex/store.js';


   export default {
      name: "Login",
      data(){
        return {
          name: '',
          password : '',
        }
      },
      store,
      components:{
        'my-portrait':portrait
      },



      methods:{

        getData(){
          this.instance.getData({}).then((response) =>{
              console.log(response);
          }).catch((error) =>{
              console.log(error);
          })
        },//getData


        login2(){
             this.instance.userLogin({    //这里是发送给后台的数据
                      username:this.name,
                      password:this.password,
            }).then((response) =>{          //这里使用了ES6的语法
                console.log(response);       //请求成功返回的数据
                if(response.data.status==1){
                //this.$router.push({name:'Main',params:{username:this.name,password:this.password}});
                this.$store.dispatch("loginFun",this.name)//将表单数据添加进全局store
                this.$router.push({name:'Blog'})
                }
            }).catch((error) =>{
                console.log(error);       //请求失败返回的数据
            })
        }//login2


      },//method

      created(){
      if (localStorage.getItem("userMsg")) {
        this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(localStorage.getItem("userMsg"))))
      }

      //在页面刷新时将vuex里的信息保存到localStorage里
      window.addEventListener("beforeunload",()=>{
           localStorage.setItem("userMsg",JSON.stringify(this.$store.state))
        })

      }
    }

</script>

<style>
    .login{
      margin-top: 200px;
    }
    .input_style{
      width: 200px;
      margin-bottom: 10px;
    }
    .login_style{
      width: 200px;
    }
</style>
