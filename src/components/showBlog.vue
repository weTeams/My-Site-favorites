<template>
  <div>
   <h1 style="font-size:150%">{{title}}</h1>
   <el-divider>
     <i class="el-icon-mobile-phone"></i>
   </el-divider>
  <mavon-editor
    class="md"
    :value="value"
    :subfield = "false"
    :defaultOpen = "'preview'"
    :toolbarsFlag = "false"
    :editable="false"
    :scrollStyle="true"
    :ishljs = "true"
  ></mavon-editor>
</div>

</template>

<script>

export default {

  data() {
    return {
       value:'',
       title:'',
    };
  },
  methods:{
    getBlog(_id){
      this.instance.getBlog({
        _id:_id
      }).then((response) =>{
          this.value=response.data.message[0].content
          this.title=response.data.message[0].title
      }).catch((error) =>{
          console.log(error);
      })
    },//getBlog
  },

  created(){
    this.getBlog(this.$route.params._id)

    /*this.$axios({
           url: '/api2/blogs/Picture_url',
           method: 'get',
           data: this.$route.params._id,
           headers: { 'Content-Type': "application/json;charset=utf-8" },
       }).then((res) => {
           this.value=response.data.message[0].content
           this.title=response.data.message[0].title
       })*/
  }
}
</script>

<style>
</style>
