<template>
    <div>
      <div class="title-up" style="padding: 10px 10px 10px 10px;background-color: #47484a;">
      <el-row :gutter="20">
        <el-col :span="16">
        <el-input
          style="display: inline-block;"
          type="text"
          placeholder="请输入文本标题"
          v-model="title"
          maxlength="50"
          show-word-limit
          @input="change($event)"
        ></el-input></el-col>
        <el-col :span="8">
          <el-button type="info" plain>保存为草稿</el-button>
          <el-button type="primary" @click="open()">发表博客</el-button>
          </el-col>
      </el-row>
      </div>

        <mavon-editor :ishljs = "true" v-model="value" ref=md @imgAdd="$imgAdd" @imgDel="$imgDel"/>
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
     <button @click="test()">查看</button>

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
            defaultData: "preview",
            title:'',
            img_file:[]
        };
    },


    methods:{
      change (e) {
         this.$forceUpdate()
      },
      open(){
       //打开对话框,传值给子组件
          this.$refs.child.dialogFormVisible=true
          this.$refs.child.form.title=this.title
          this.$refs.child.form.content=this.value
     },
      $imgAdd (pos, $file){
        this.img_file[pos] = $file;

      },
      $imgDel (pos){
        delete this.img_file[pos[0]];
      },
      test(){

        // 第一步.将图片上传到服务器.
          var formdata = new FormData();
          for(var _img in this.img_file){
        formdata.append(_img, this.img_file[_img]);
       }
       formdata.append("_img"," this.img_file[_img]");

       //***************************
         this.$axios({
                url: '/api2/blogs/Picture_url',
                method: 'post',
                data: formdata,
                headers: { 'Content-Type': 'multipart/form-data' },
            }).then((res) => {
                console.log(res)
                /**
                 * 例如：返回数据为 res = [[pos, url], [pos, url]...]
                 * pos 为原图片标志（0）
                 * url 为上传后图片的url地址
                 */
                 // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
                for (var i in res.data.data) {
                    let pos=res.data.data[i][0]
                    let url=res.data.data[i][1]
                    this.$refs.md.$img2Url(pos, url);
                }

                console.log("图片上传成功啦")
            })
       //*******************


      }
   }
};
</script>

<style>
</style>
