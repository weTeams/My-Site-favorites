<template>
  <el-card
      style="margin-left: 20px;margin-top: 20px;border: 0;text-align: center;">
      <el-progress
      type="circle"
      :percentage="percentage"
      :show-text='false'
      :stroke-width='12'
      color="#ff2e2e"
      >
      </el-progress>
      <div :class="classHeart" @mousedown="down" @mouseup="end" @mouseleave="end"></div>
      <h3>长按送爱心❤</h3>
      <h4>已经收获的爱心数目：{{loveCount}}</h4>
  </el-card>
</template>

<script>
  import axios from 'axios'

  	export default{

  		data(){
  		  return {
          loveCount:39,
          percentage:0,
          time:null,
          num:0,
          isRed:false,
          classHeart:"heart_gray",
          time2:null,
  		}
  	},


      methods:{
         //请求爱心数据
         getLoveCountNoAdd(){
         	axios({
         	     url: '/api2/blogs/getLoveCount',
         	     method: 'get',
         	 }).then((res) => {
               this.loveCount=res.data.message
         	 })
         },
         getLoveCount(){
         	axios({
         	     url: '/api2/blogs/addCount',
         	     method: 'get',
         	 }).then((res) => {
               this.loveCount=res.data.message
         	 })
         },


         down(){
            if(this.isRed)return
            let that=this  //注意计数器的全局作用域是windows！！！
            that.time=setInterval(function(){
               that.percentage+=10
               if(that.percentage==100){
                   that.isRed=true
                   clearInterval(that.time)

                   that.time2=setTimeout(()=>{
                       that.classHeart="heart_red"
                       that.getLoveCount()
                       clearTimeout(that.time2)
                     },1000)
               }

            },100)

         },


         end(){
           if(this.isRed)return //如果已经变红，就不再触发

           if(this.time){
             clearInterval(this.time)
             this.percentage=0
           }

         }
      },
      created(){
        this.getLoveCountNoAdd()

      }
  	}


</script>

<style>

.love_count{
  height:250px;
  background-color: #fff;
}

.heart_gray{
  height:50px;
  width:50px;
  background-image: url(../assets/爱心灰色.png);
  background-size:100% 100%;

  margin: 0 auto;
  position: relative;
  top:-90px;
}

.heart_red{
  height:50px;
  width:50px;
  background-image: url(../assets/爱心红色.png);
  background-size:100% 100%;

  margin: 0 auto;
  position: relative;
  top:-90px;
}
</style>
