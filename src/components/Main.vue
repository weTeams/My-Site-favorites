<template>
 <div class="main">
   <my-headnav></my-headnav>
   <my-portrait></my-portrait>

            <h1>欢迎回家，罗杰大人{{username}}</h1>
 <el-container style="height: 500px; border: 1px solid #eee">
   <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
     <el-menu :default-openeds="['1', '3']">
       <el-submenu index="1">
         <template slot="title"><i class="el-icon-message"></i>学习</template>
         <el-menu-item-group>
           <template slot="title">分组一</template>
           <el-menu-item index="1-1">选项1</el-menu-item>
           <el-menu-item index="1-2">选项2</el-menu-item>
         </el-menu-item-group>
         <el-menu-item-group title="分组2">
           <el-menu-item index="1-3">选项3</el-menu-item>
         </el-menu-item-group>
         <el-submenu index="1-4">
           <template slot="title">选项4</template>
           <el-menu-item index="1-4-1">选项4-1</el-menu-item>
         </el-submenu>
       </el-submenu>
       <el-submenu index="2">
         <template slot="title"><i class="el-icon-menu"></i>生活</template>
         <el-menu-item-group>
           <template slot="title">分组一</template>
           <el-menu-item index="2-1">选项1</el-menu-item>
           <el-menu-item index="2-2">选项2</el-menu-item>
         </el-menu-item-group>
         <el-menu-item-group title="分组2">
           <el-menu-item index="2-3">选项3</el-menu-item>
         </el-menu-item-group>
         <el-submenu index="2-4">
           <template slot="title">选项4</template>
           <el-menu-item index="2-4-1">选项4-1</el-menu-item>
         </el-submenu>
       </el-submenu>
       <el-submenu index="3">
         <template slot="title"><i class="el-icon-setting"></i>导航三</template>
         <el-menu-item-group>
           <template slot="title">分组一</template>
           <el-menu-item index="3-1">选项1</el-menu-item>
           <el-menu-item index="3-2">选项2</el-menu-item>
         </el-menu-item-group>
         <el-menu-item-group title="分组2">
           <el-menu-item index="3-3">选项3</el-menu-item>
         </el-menu-item-group>
         <el-submenu index="3-4">
           <template slot="title">选项4</template>
           <el-menu-item index="3-4-1">选项4-1</el-menu-item>
         </el-submenu>
       </el-submenu>
     </el-menu>
   </el-aside>

   <el-container>
     <el-dialog title="新增网址收藏" :visible.sync="dialogFormVisible">
       <el-form :model="form">
         <el-form-item label="网址URL" :label-width="formLabelWidth">
           <el-input v-model="form.url" autocomplete="off"></el-input>
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
       <el-dropdown>
         <i class="el-icon-setting" style="margin-right: 15px"></i>
         <el-dropdown-menu slot="dropdown">
           <el-dropdown-item @click.native="getAll">查看</el-dropdown-item>
           <el-dropdown-item @click.native= "dialogFormVisible = true">新增</el-dropdown-item>
           <el-dropdown-item>删除</el-dropdown-item>
         </el-dropdown-menu>
       </el-dropdown>
        <el-input v-model="search" style="display: inline-block;width: 600px"
               placeholder="请输入搜索内容" @input="change($event)">
             </el-input>
        <el-button icon="el-icon-search" circle></el-button>


       <span>{{username}}</span>
     </el-header>

     <el-main>
       <el-table :data="tables.slice((currentPage-1)*pagesize,currentPage*pagesize)"  stripe=true >
         <el-table-column prop="date" label="日期" width="140">

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

          temp_index:'',
          temp_site:'',

          form: {
                    url: '',
                    delivery: false,
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
                const search = this.search
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
       change (e) {
             this.$forceUpdate()
           },
      addNew() {
        this.dialogFormVisible = false;
        this.instance.addNewUrl({    //这里是发送给后台的数据
              url:this.form.url  //发送网址
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
