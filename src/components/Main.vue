<template>
 <div class="main">
   <my-headnav></my-headnav>

 <el-container style="height: 75%; border: 1px solid #eee">
   <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
 <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">

      <el-menu-item index="0" @click="getAllSite()">
        <div slot="title">全部</div>

      </el-menu-item>

      <el-menu-item index="1" @click="getStudy()">
        <div slot="title">学习</div>

      </el-menu-item>
      <el-menu-item index="2" @click="getTool()">
        <div slot="title">工具</div>

      </el-menu-item>
      <el-menu-item index="3"  @click="getLife()">

      <span slot="title">生活</span>
      </el-menu-item>
      <el-menu-item index="4"  @click="getWeb()">

        <span slot="title">前端</span>
      </el-menu-item>
      <el-menu-item index="5"  @click="getOther()">

        <span slot="title">其他</span>

      </el-menu-item>
      <el-menu-item index="6">

        <span slot="title">社区</span>
      </el-menu-item>
      <el-menu-item index="7">

        <span slot="title">艺术</span>
      </el-menu-item>


    </el-menu>
   </el-aside>

   <el-container>
     <el-dialog title="新增网址收藏" :visible.sync="dialogFormVisible">
       <el-form :model="form">
         <el-form-item label="网址URL" :label-width="formLabelWidth">
           <el-input v-model="form.url" autocomplete="off"></el-input>
         </el-form-item>

         <el-form-item label="类别" :label-width="formLabelWidth">
           <el-radio v-model="radio" label=0>学习</el-radio>
           <el-radio v-model="radio" label=1>工具</el-radio>
           <el-radio v-model="radio" label=2>生活</el-radio>
           <el-radio v-model="radio" label=3>前端</el-radio>
           <el-radio v-model="radio" label=4>其他</el-radio>
         </el-form-item>

       </el-form>
       <div slot="footer" class="dialog-footer">
         <el-button @click="dialogFormVisible = false">取 消</el-button>
         <el-button type="primary" @click=" addNew()">确 定</el-button>
       </div>
     </el-dialog>

     <el-dialog
       title="温馨提醒"
       :visible.sync="dialogVisible"
       width="30%"
       :before-close="handleClose">
       <span>你是否确认进行删除操作？</span>
       <span slot="footer" class="dialog-footer">
         <el-button @click="dialogVisible = false">取 消</el-button>
         <el-button type="primary" @click="handleDelete(temp_index,temp_site)">确 定</el-button>
       </span>
     </el-dialog>

     <el-header style="text-align: right; font-size: 12px">

        <el-input v-model="search" style="display: inline-block;width: 600px"
               placeholder="请输入搜索内容" @input="change($event)">
             </el-input>
        <el-button icon="el-icon-search" circle></el-button>
        <el-button icon="el-icon-plus" circle @click= "OpenDialogFormVisible()" type="primary"></el-button>


       <span>{{username}}</span>
     </el-header>

     <el-main>
       <el-table :data="tables.slice((currentPage-1)*pagesize,currentPage*pagesize)"  stripe=true >
         <el-table-column prop="date" label="日期" width="100">

         </el-table-column>
         <el-table-column  label="类别" width="80">
        <template slot-scope="scope">

                           <el-tag v-if="scope.row.__v===0" >学习</el-tag>
                           <el-tag  v-else-if="scope.row.__v===1" type="success">工具</el-tag>
                           <el-tag  v-else-if="scope.row.__v===2" type="info">生活</el-tag>
                           <el-tag  v-else-if="scope.row.__v===3" type="warning">前端</el-tag>
                           <el-tag  v-else-if="scope.row.__v===4" type="danger">其他</el-tag>


        </template>
         </el-table-column>

 <el-table-column label="url"
        min-width="250">
        <template slot-scope="scope">
          <a :href="scope.row.url"
            target="_blank"
            class="buttonText">{{scope.row.title}}</a>
        </template>
      </el-table-column>

         <el-table-column label="操作">
               <template slot-scope="scope">
                 <el-button
                   size="mini"
                   @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                 <el-button
                   size="mini"
                   type="danger"
                   @click="handleDelete_first(scope.$index, scope.row)">删除</el-button>
               </template>
             </el-table-column>

       </el-table>
       <div class="pagination">
            <el-pagination
               @size-change="handleSizeChange"
               @current-change="handleCurrentChange"
               :current-page="currentPage"
               :page-sizes="[5, 10, 15, 20]"
               :page-size="pagesize"
                layout="total, sizes, prev, pager, next, jumper"
               :total="tables.length">
             </el-pagination>
       </div>

     </el-main>
   </el-container>

 </el-container>

 </div>
</template>
<script>

    //import '@/outjs/heart.js'
    import Axios from 'axios';
    import portrait from '@/components/portrait';
    import HeadNav from '@/components/HeadNav';

    export default {
      components:{
        'my-portrait':portrait,
        'my-headnav':HeadNav
      },


      data () {

        return {
          circleUrl: "https://s2.ax1x.com/2020/01/27/1uoyIf.jpg",
          username: this.$route.params.username,
          urlData:'',
          dialogFormVisible: false,
          dialogVisible: false,

          getAllSiteVar:true,

          tag_flag:false,
          tag_name:'',

          radio:'',

          temp_index:'',
          temp_site:'',

          form: {
                    url: '',
                    delivery: false,
                    __v:'',
                  },
          formLabelWidth: '80px',
          search: '',

                currentPage:1, //初始页
                pagesize:10,    //    每页的数据

        }

      },
      computed: {
              // 模糊搜索
              tables () {

                let boring=this.getAllSiteVar//为了让【全部】触发
                const search = this.search
                this.currentPage=1
                //如果是根据标签搜索的话
                if(this.tag_flag){
                    this.tag_flag=false
                    return this.urlData.filter(data => {
                        return data.__v==this.tag_name
                    })


                }

                if (search) {
                  // filter() 方法创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。
                  // 注意： filter() 不会对空数组进行检测。
                  // 注意： filter() 不会改变原始数组。
                  return this.urlData.filter(data => {
                    // some() 方法用于检测数组中的元素是否满足指定条件;
                    // some() 方法会依次执行数组的每个元素：
                    // 如果有一个元素满足条件，则表达式返回true , 剩余的元素不会再执行检测;
                    // 如果没有满足条件的元素，则返回false。
                    // 注意： some() 不会对空数组进行检测。
                    // 注意： some() 不会改变原始数组。
                    return Object.keys(data).some(key => {
                      // indexOf() 返回某个指定的字符在某个字符串中首次出现的位置，如果没有找到就返回-1；
                      // 该方法对大小写敏感！所以之前需要toLowerCase()方法将所有查询到内容变为小写。
                      return String(data[key]).toLowerCase().indexOf(search) > -1
                    })
                  })
                }
                return this.urlData
              }

      },//computed



      methods: {

        //判断增加的操作权限
        OpenDialogFormVisible(){
           if(!this.$store.state.isLogin){
             this.$message.error('请登录，不然无法使用增加功能');
             return 0
           }else{
             this.dialogFormVisible=true
           }

        },


        /*************五大类别**************/
        getAllSite(){
           this.getAllSiteVar=!(this.getAllSiteVar)
           //this.$forceUpdate()
        },
        getStudy(){
          this.tag_flag=true
          this.tag_name=0

          //this.$forceUpdate()

        },
        getTool(){
          this.tag_flag=true
          this.tag_name=1

          //this.$forceUpdate()

        },
        getLife(){
          this.tag_flag=true
          this.tag_name=2

          //this.$forceUpdate()

        },
        getWeb(){
          this.tag_flag=true
          this.tag_name=3

          //this.$forceUpdate()

        },
        getOther(){
          this.tag_flag=true
          this.tag_name=4

          //this.$forceUpdate()

        },








        /******************************/


       change (e) {
             //this.$forceUpdate()
           },
      addNew() {

        this.form.__v=this.radio
        console.log("类别是"+this.form.__v)
        this.dialogFormVisible = false;
        this.instance.addNewUrl({    //这里是发送给后台的数据
              url:this.form.url  ,//发送网址
              __v: this.form.__v,//类别
        }).then((response) =>{          //这里使用了ES6的语法
            console.log(response);       //请求成功返回的数据
            this.getAll();
            this.$message({
              message: '添加成功',
              type: 'success'
            });
        }).catch((error) =>{
            console.log(error);       //请求失败返回的数据
        })

      },
      getAll() {
        this.instance.getallURL({}).then((response) =>{          //这里使用了ES6的语法
            console.log(response);       //请求成功返回的数据
            this.urlData=response.data.message;
        }).catch((error) =>{
            console.log(error);       //请求失败返回的数据
        })

      },//getAll

      handleDelete_first(index,site){
        if(!this.$store.state.isLogin){
          this.$message.error('请登录，不然无法使用删除功能');
          return 0
        }
        this.dialogVisible=true;
        this.temp_index=index;
        this.temp_site=site;
      },

      handleDelete(index,site){

        this.dialogVisible=false;
        console.log(site);
        console.log(site._id);
        this.instance.deleteUrl({    //这里是发送给后台的数据
              _id:site._id  ,//发送网址id
        }).then((response) =>{          //这里使用了ES6的语法
            console.log(response);       //请求成功返回的数据
            this.getAll();
                    this.$message({
                      message: '删除成功',
                      type: 'success'
                    });
        }).catch((error) =>{
            console.log(error);       //请求失败返回的数据
        })

      },//deleteURL

        // 初始页currentPage、初始每页数据数pagesize和数据data
        handleSizeChange: function (size) {
                this.pagesize = size;
                console.log(this.pagesize)  //每页下拉显示数据
        },
        handleCurrentChange: function(currentPage){
                this.currentPage = currentPage;
                console.log(this.currentPage)  //点击第几页
        },

      },
      mounted() {
         this.getAll();
      }
    }
</script>

<style>


    .el-header {
      background-color: #B3C0D1;
      color: #333;
      line-height: 60px;
    }

    .el-aside {
      color: #333;
    }


    a{
        text-decoration:none;
    }

    a:link{		/*默认状态*/
            color: black;
        }
        a:visited{	/*浏览过的*/
            color:black;
        }
        a:hover{	/*悬浮状态*/
            color:#333 ;
        }
        a:active{	/*激活过的*/
            color: black;
        }

</style>
