//文件的作用是在整个Vue项目中声明:我们要使用Vuex进行状态管理

//引入
import  Vue from 'vue'
import  Vuex from 'vuex'

Vue.use(Vuex);


function storeLocalStore (state) {
    window.localStorage.setItem("userMsg",JSON.stringify(state));
}


//创建Vuex实例
const store=new Vuex.Store({
     state:{
       username:"",
       token:'',
       isLogin:Boolean(false),
       level:1,
       newBlogForm:[],
       newBlogImgs:[]
     },
     getters:{//类似于Vue的computed
       computedFull:function(state){
         return 100-state.level
       }
     },
     /*************************************************************/
     mutations:{
       login(state,username){
         state.username=username
         state.isLogin=true
       },

       add(state){//上面定义的state
         state.level=state.level+1
       },

       reduction(state,n){//传参数,减多少级
         state.level=state.level-n
       },

       addNewBlogForm(state,data_newBlogForm){//传参数
         state.newBlogForm=data_newBlogForm
       },

       addNewBlogImgs(state,data_newBlogImg){//传参数
         state.newBlogImgs=data_newBlogImg
       }

     },
     //*********************************************************/
     actions:{//注册action,类似于Vue里的mothods
       addFun(context){
         //接收一个与store实例具有相同方法的属性得到context对象
         context.commit("add")
       },

       reductionFun(context,n){
         context.commit("reduction",n)
       },

       addNewBlogImgsFun(context,data_newBlogImgs){
         context.commit("addNewBlogImgs",data_newBlogImgs)
       },

       addNewBlogFormFun(context,data_newBlogForm){
         context.commit("addNewBlogForm",data_newBlogForm)
       },

       //上传登录状态
       loginFun(context,username){
         context.commit("login",username)
       },
     }

})

//导出store
export default store
