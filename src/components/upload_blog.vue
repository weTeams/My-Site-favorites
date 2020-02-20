
<template>
  <el-dialog style="text-align: left;" title="上传文章" :visible.sync="dialogFormVisible">
        <el-dialog
          width="30%"
          title="为博客添加导览图"
          :visible.sync="child_dialogFormVisible"
          append-to-body>
           <my-upblogpicture ref="up_picture" style="text-align: center;"></my-upblogpicture>
        </el-dialog>



<el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="文章标题">
    <el-input v-model="form.title"></el-input>
  </el-form-item>
  <el-form-item label="主要类型">
    <el-select v-model="form.maintype" placeholder="请选择活动区域">
      <el-option label="技术" value="技术"></el-option>
      <el-option label="生活" value="生活"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="时间">
    <el-col :span="11">
      <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
    </el-col>
    <el-col class="line" :span="2">-</el-col>
    <el-col :span="11">
      <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
    </el-col>
  </el-form-item>
  <el-form-item label="是否公开">
    <el-switch v-model="form.isPublic"></el-switch>
  </el-form-item>
  <el-form-item label="标签">
    <el-checkbox-group v-model="form.tag">
      <el-checkbox label="前端" name="tag"></el-checkbox>
      <el-checkbox label="算法/数据结构" name="tag"></el-checkbox>
      <el-checkbox label="后端" name="tag"></el-checkbox>
      <el-checkbox label="其他" name="tag"></el-checkbox>
    </el-checkbox-group>
  </el-form-item>

  <el-form-item label="备注">
    <el-input type="textarea" v-model="form.note"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="addNewBlogFormFun">确认</el-button>
    <el-button @click="test2()">取消</el-button>
  </el-form-item>
</el-form>


</el-dialog>
</template>
<script>

  import upblogpicture from '@/components/up_blog_picture'

  export default {
    props: {
        contentFromDad: {
          type: String
        }
    },

    components:{
      'my-upblogpicture':upblogpicture
    },

    data() {
      return {
        dialogFormVisible:false,
        child_dialogFormVisible:false,

        //这个form最后和图片文件一起上传
        form: {
          title: '',
          maintype: '',
          date1: '',
          date2: '',
          content:'',
          isPublic: true,
          tag: [],
          note: '',
        }
      }
    },
    methods: {
      test2(){
        console.log(this.form.tag)
      },

      onSubmit() {
        //最终确认提交
        console.log('submit!');

      },
      addNewBlogFormFun(){
        //console.log(this.form);
        this.$store.dispatch("addNewBlogFormFun",this.form)//将表单数据添加进全局store

        //再打开图片上传的控件
        this.child_dialogFormVisible=true

      },

      all_close(){
        this.child_dialogFormVisible=false
        this.dialogFormVisible=false
      }
    }
  }
</script>
