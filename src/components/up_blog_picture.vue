<template>
  <div>
  <el-upload
    name="head"
    class="avatar-uploader"
    ref="upload"
    action="/api2/blogs/addNewBlog"
    :show-file-list="true"
    :file-list="filelist"
    :data="blogData2"
    :auto-upload="false"
    :on-change="imgPreview"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload">
    <img v-if="imageUrl" :src="imageUrl" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
  <el-button type="primary"  @click="submit()">确认发表</el-button>
  </div>
</template>

<script>
    export default {
      computed:{
         blogData(){
          return this.$store.state.newBlogForm
            }
      },

      data() {
        return {
          filelist:[],
          blogData2:Object(null),
          imageUrl: '',
          newBlogForm:[]
        };
      },
      methods: {
        submit(){
          //console.log(this.$store.state.newBlogForm)
          this.$refs.upload.submit()


        },

        imgPreview (file, fileList) {
            //console.log(file)
            this.imageUrl = URL.createObjectURL(file.raw);
            this.blogData2=Object(this.$store.state.newBlogForm)
            

        },

        handleAvatarSuccess(res, file) {
          alert("发表成功")
          //将父亲的那个对话框顺带关闭
          this.$parent.$parent.$parent.all_close();

        },
        beforeAvatarUpload(file) {
          console.log("上传之前的携带数据：")
          console.log(this.blogData2)
          console.log(this.filelist)

          const isJPG = file.type === 'image/jpeg';
          const isLt2M = file.size / 1024 / 1024 < 4;

          if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
          }
          if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 4MB!');
          }
          return isJPG && isLt2M;
        }
      },

      created() {
        this.filelist=this.$store.state.newBlogImgs
      }
    }
</script>

<style>
  .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
</style>
