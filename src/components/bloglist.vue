<template>
  <div class="block">

            <el-timeline style="padding-left:0 ;">
              <el-timeline-item placement="top" v-for="(content,index) in contents"

              :key="index"
>
              <el-card>
              <span class="s-round-date"><span class="month">{{get_month(content.date)+'月'}}</span> <span class="day">{{get_day(content.date)}}</span></span>
              <el-row gutter=1>
              <el-col :span="18"><div >
              <h3>{{content.title}}</h3>
              <!--
              <el-button style="float: right;margin-left: 10px;" type="danger" size='mini' icon="el-icon-delete" circle></el-button>
              <el-button style="float: right;" type="warning" size='mini' icon="el-icon-star-off" circle></el-button>
              <el-button style="float: right;" type="primary" size='mini' icon="el-icon-edit" circle></el-button>
              -->
              <el-divider>
              <!--<el-tag style="margin-right: 3px;" size="mini" >{{content.tag}}</el-tag>-->
              <el-tag style="margin-right: 3px;" size="mini" v-for="tag in content.tag[0].split(',')" >{{tag}}</el-tag>
              </el-divider>
              {{content.note}}<br/><br/>
              <el-button type="success" size="mini" style="display:block;margin:0 auto" @click="jump_detailed(content._id)">阅读全文>></el-button>
              </div></el-col>
              <el-col :span="6"><div class="sssss">
              <!--<img
                  style="float:right;width: 200px; height: 150px;"
                  v-bind:src="circleUrl+content._id"
                  :fit="fit">
              </img>-->
    <el-image
      style="float:right;width: 200px; height: 150px;"
      :src="circleUrl+content._id"
      :fit="fit"
      lazy></el-image>

              </div></el-col>
              </el-row>



              </el-card>
              </el-timeline-item>
            </el-timeline>

            <div class="pagination">
                 <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[3,5, 10, 15, 20]"
                    :page-size="pagesize"
                     layout="total, sizes, prev, pager, next, jumper"
                    :total="temp_contents.length">
                  </el-pagination>
            </div>

  </div>
</template>

<script>
    import portrait from '@/components/portrait';
    import HeadNav from '@/components/HeadNav';
  export default {

    components:{
      'my-portrait':portrait,
      'my-headnav':HeadNav
    },

    data() {
      return {
        circleUrl:"/api2/blogs/getAllBlog/",

        currentPage:1, //初始页
        pagesize:5,    //    每页的数据

        url:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        contents: [],
        temp_contents:[]
      };
    },

    methods:{

      //对返回的时间处理
      get_month(date){
        return date.split('-')[1]
      },
      get_day(date){
        return date.split('-')[2]
      },


      jump_detailed(_id){
        console.log(_id)
        this.$router.push({name:'DetailedBlog',params:{_id:_id}})
      },

      // 初始页currentPage、初始每页数据数pagesize和数据data
      handleSizeChange: function (size) {
              this.pagesize = size;
              this.contents=this.temp_contents.slice((this.currentPage-1)*this.pagesize,this.currentPage*this.pagesize)
      },
      handleCurrentChange: function(currentPage){
              this.currentPage = currentPage;
              this.contents=this.temp_contents.slice((this.currentPage-1)*this.pagesize,this.currentPage*this.pagesize)
      },
      getAllBlog(){
          this.instance.getAllBlog({}).then((response) =>{
              console.log(response);
              this.contents=this.temp_contents=response.data.message;
              this.handleSizeChange(this.pagesize)
          }).catch((error) =>{
              console.log(error);
          })

      }
    },
    mounted() {
      this.getAllBlog()


    }
  };
</script>

<style>
  h3{
    margin: 0;
    display: inline;
  }

  i{
    float: right;
  }

  .s-round-date {
      position: absolute;
      top: -5px;
      left: -10px;
      height: 60px;
      width: 70px;
      padding-top: 10px;
      border-radius: 100px;
      color: #fff;
      background: #759aff;
  }

  .s-round-date span {
      text-align: center;
      display: block;
  }
.s-round-date .day {
    font-size: 30px;
    font-weight: 700;
}

</style>
