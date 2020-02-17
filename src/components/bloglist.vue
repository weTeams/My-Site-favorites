<template>
  <div class="block">

            <el-timeline style="padding-left:0 ;">
              <el-timeline-item placement="top" v-for="(content,index) in contents"
              :key="index"
              :timestamp="content.date">
              <el-card>
              <el-row gutter="1">
              <el-col :span="18"><div >
              <h3>{{content.title}}</h3>
              <!--
              <el-button style="float: right;margin-left: 10px;" type="danger" size='mini' icon="el-icon-delete" circle></el-button>
              <el-button style="float: right;" type="warning" size='mini' icon="el-icon-star-off" circle></el-button>
              <el-button style="float: right;" type="primary" size='mini' icon="el-icon-edit" circle></el-button>
              -->
              <hr/>
              {{content.note}}
              <button @click="jump_detailed(content._id)">查看全文</button>
              </div></el-col>
              <el-col :span="6"><div >
              <img
                  style="float:right;width: 133px; height: 100px;margin-bottom:5px;"
                  v-bind:src="circleUrl+content._id"
                  :fit="fit">
              </img>
              <img/>
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
        contents: [
          {timestamp:'2018-04-15', title:"今天打了姚静娴的屁股",word:"罗杰今天很生气，想把臭猪揍一顿"},
          {timestamp:'2018-04-15', title:"更新 Github 模板",word:"罗杰 提交于 2018/4/2 20:46"},
          {timestamp:'2018-04-15', title:"更新 Github 模板",word:"罗杰 提交于 2018/4/2 20:46"},
          {timestamp:'2018-04-15', title:"更新 Github 模板",word:"罗杰 提交于 2018/4/2 20:46"},
          {timestamp:'2018-04-15', title:"更新 Github 模板",word:"罗杰 提交于 2018/4/2 20:46"},
          {timestamp:'2018-04-15', title:"更新 Github 模板",word:"罗杰 提交于 2018/4/2 20:46"},
          {timestamp:'2018-04-15', title:"更新 Github 模板",word:"罗杰 提交于 2018/4/2 20:46"},
          {timestamp:'2018-04-15', title:"更新 Github 模板",word:"罗杰 提交于 2018/4/2 20:46"},
          {timestamp:'2018-04-15', title:"更新 Github 模板",word:"罗杰 提交于 2018/4/2 20:46"}
        ],
        temp_contents:[
          {timestamp:'2018-04-15', title:"今天打了姚静娴的屁股",word:"罗杰今天很生气，想把臭猪揍一顿"},
          {timestamp:'2018-04-15', title:"更新 Github 模板",word:"罗杰 提交于 2018/4/2 20:46"},
          {timestamp:'2018-04-15', title:"更新 Github 模板",word:"罗杰 提交于 2018/4/2 20:46"},
          {timestamp:'2018-04-15', title:"更新 Github 模板",word:"罗杰 提交于 2018/4/2 20:46"},
          {timestamp:'2018-04-15', title:"更新 Github 模板",word:"罗杰 提交于 2018/4/2 20:46"},
          {timestamp:'2018-04-15', title:"更新 Github 模板",word:"罗杰 提交于 2018/4/2 20:46"},
          {timestamp:'2018-04-15', title:"更新 Github 模板",word:"罗杰 提交于 2018/4/2 20:46"},
          {timestamp:'2018-04-15', title:"更新 Github 模板",word:"罗杰 提交于 2018/4/2 20:46"},
          {timestamp:'2018-04-15', title:"更新 Github 模板",word:"罗杰 提交于 2018/4/2 20:46"}
        ]
      };
    },

    methods:{
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

</style>
