<template>
  <div>

   <el-card >
     <div id="main" style="width: 1000px;height: 600px; "></div>
   </el-card>
    <el-card >
      <el-col span="12">
      <div id="main2" style="width: 400px;height:400px;"></div>
      </el-col>
      <el-col span="12">
      <div id="main3" style="width: 400px;height:400px;background-color: #f0f0f0;">
        <h3>现存确诊：{{currentConfirmedCount}}</h3><br/>
        <h3>累计确诊：{{confirmedCount}}</h3><br/>
        <h3>严重病例：{{suspectedCount}}</h3><br/>
        <h3>治愈：{{curedCount}}</h3><br/>
        <h3>死亡：{{deadCount}}</h3><br/>
      </div>
      </el-col>
    </el-card>





  </div>
</template>

<script>
  import Axios from 'axios';
  import hainan from "echarts/map/js/province/hainan.js" //引入海南地图
  import hainanJson from "echarts/map/js/hainan.json"
  import echarts from "echarts"

  export default {

    data () {
      return {

        currentConfirmedCount: 0,
        confirmedCount: 0,
        suspectedCount: 0,
        curedCount: 0,
        deadCount: 0,


        all_count:0,
        need_data:[],

        series: [{
                        name:'疫情分布',
                        type: 'map',
                        map: 'hainan',
                        roam: false,
                                    itemStyle:{
                                        normal:{label:{show:true}},
                                        emphasis:{label:{show:true}}
                                    },
                        data:[
                        {name: '三亚',value:0},
                        {name: '海口',value:0},
                        {name: '万宁',value:0},
                        {name: '儋州',value:0},
                        {name: '澄迈',value:0},
                        {name: '临高',value:6},
                        {name: '琼海',value:0},
                        {name: '昌江',value:0},
                        {name: '陵水',value:0},
                        {name: '东方',value:0},
                        {name: '定安',value:0},
                        {name: '文昌',value:0},
                        {name: '保亭',value:0},
                        {name: '乐东',value:0},
                        {name: '琼中',value:0},
                        {name: '五指山',value:0},
                        {name: '屯昌',value:0},
                        {name: '白沙',value:0},
                        ]
                    }],
      }
    },
    methods:{
      index_Of(arr,str){
        for(let i in arr){
          if(arr[i].cityName.indexOf(str)>=0)return i
        }
        return -1
      },
      pie(){
        var myChart2 = echarts.init(document.getElementById('main2'));

              myChart2.setOption({
                  series : [
                      {
                          name: '访问来源',
                          type: 'pie',    // 设置图表类型为饼图
                          radius: '55%',  // 饼图的半径，外半径为可视区尺寸（容器高宽中较小一项）的 55% 长度。
                          data:this.series[0].data
                      }
                  ]
              })

      },

      getFeiyanData(){
          this.instance.getFeiyanData({}).then((response) =>{
              console.log(response);
              this.need_data=response.data.data.area[19].cities;
              this.currentConfirmedCount=response.data.data.area[19].currentConfirmedCount;
              this.confirmedCount=response.data.data.area[19].confirmedCount;
              this.suspectedCount=response.data.data.area[19].suspectedCount;
              this.curedCount=response.data.data.area[19].curedCount;
              this.deadCount= response.data.data.area[19].deadCount;


              for (let i in this.series[0].data){
                   let index = this.index_Of(this.need_data,this.series[0].data[i].name)
                   if(index>=0){
                   this.series[0].data[i].value=this.need_data[index].confirmedCount
                   this.all_count=this.all_count+this.series[0].data[i].value
                   }
              }

              //console.log(this.series[0].data);

              var chart = echarts.init(document.getElementById('main'));
                          echarts.registerMap('hainan', hainanJson);
                          chart.setOption({
                              series:this.series,
              tooltip : {
                  trigger: 'item',
              		formatter: function (params) {
                   var res = "确诊人数:"+params.value;
                   return res;}
              },
              legend: {
                  orient: 'vertical',
                  x:'left',
                  data:['疫情分布']
              },
              dataRange: {
                  min: 0,
                  max: this.all_count,
                  x: 'left',
                  y: 'center',
                  text:['总数',''],
                  calculable : true,
                  borderColor: '#ccc',
                  borderWidth: 3,
              },
              toolbox: {
                  show: true,
                  orient : 'vertical',
                  x: 'right',
                  y: 'center',
                  feature : {
                      mark : {show: true},
                      dataView : {show: true, readOnly: false},
                      restore : {show: true},
                      saveAsImage : {show: true}
                  }
              },
              roamController: {
                  show: true,
                  x: 'right',
                  mapTypeControl: {
                      'china': true
                  }
              },
              title : {
                 text: '海南疫情分布图',


                  x:'center'
                },

                });
                this.pie();

          }).catch((error) =>{
              console.log(error);
          })
      }
    },
      //钩子函数  不了解的话 建议看看 vue的生命周期
    mounted() {
                this.getFeiyanData();


      },


    }
</script>

<style>
  #main2{
    display: inline-block;
  }
  #main3{
    display: inline-block;
  }
</style>
