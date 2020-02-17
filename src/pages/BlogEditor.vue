<template>
    <div>
        <mavon-editor ishljs = "true" v-model="value"/>
<!--
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
-->
    <my-uploadblog ref="child" :contentFromDad="value"></my-uploadblog>
    <button @click="open()">提交</button>
    </div>




</template>

<script>
import uploadblog from '@/components/upload_blog';

export default {
    components:{
      'my-uploadblog':uploadblog
    },


    data() {
        return {
            value: '',
            defaultData: "preview"
        };
    },


    methods:{
        open(){
          //打开对话框,传值给子组件
          this.$refs.child.dialogFormVisible=true
          this.$refs.child.form.content=this.value
        }
    }
};
</script>

<style>
</style>
