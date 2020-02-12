<template>
	<div>
      <div>{{this.$store.state.username}}的等级：LV.{{this.$store.state.level}}</div>
      <div>距离满级还差：{{this.$store.getters.computedFull}}级</div>

      <button @click="addFun()">+</button>
      <button @click="reductionFun()">-</button>
      <button @click="jump()">跳转</button>
	</div>
</template>

<script>
import store from '../vuex/store.js';

	export default{
    store,
		name:'HelloWorld2',
		data(){
		  return {

		}
	},
    methods:{
      jump(){
        this.$router.push({name:'Login'});
      },
      addFun(){
        this.$store.dispatch("addFun")//一次加1级
      },
      reductionFun(){
         this.$store.dispatch("reductionFun",3)//一次减3级
      }
    },
    created(){
      console.log(this)

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
</style>
