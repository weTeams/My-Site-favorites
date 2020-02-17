
<template>
  <el-dialog style="text-align: left;" title="上传文章" :visible.sync="dialogFormVisible">
<el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="文章标题">
    <el-input v-model="form.title"></el-input>
  </el-form-item>
  <el-form-item label="主要类型">
    <el-select v-model="form.maintype" placeholder="请选择活动区域">
      <el-option label="博客" value="shanghai"></el-option>
      <el-option label="生活" value="beijing"></el-option>
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
      <el-checkbox label="前端" name="type"></el-checkbox>
      <el-checkbox label="算法/数据结构" name="type"></el-checkbox>
      <el-checkbox label="后端" name="type"></el-checkbox>
      <el-checkbox label="其他" name="type"></el-checkbox>
    </el-checkbox-group>
  </el-form-item>

  <el-form-item label="备注">
    <el-input type="textarea" v-model="form.note"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="addNewBlogFormFun">立即创建</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form>
<my-upblogpicture></my-upblogpicture>

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
        dialogFormVisible:true,

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
      onSubmit() {
        //最终确认提交
        console.log('submit!');

      },
      addNewBlogFormFun(){
        console.log(this.form);
        this.$store.dispatch("addNewBlogFormFun",this.form)//将表单数据添加进全局store
        console.log(this.$store.state)
      },
    }
  }
</script>
