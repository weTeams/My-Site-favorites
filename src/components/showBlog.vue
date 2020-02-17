<template>
  <div>
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
       value:''
    };
  },
  methods:{
    getBlog(_id){
      this.instance.getBlog({
        _id:_id
      }).then((response) =>{
          this.value=response.data.message[0].content
      }).catch((error) =>{
          console.log(error);
      })
    },//getBlog
  },

  created(){
    this.getBlog(this.$route.params._id)
  }
}
</script>

<style>
</style>
