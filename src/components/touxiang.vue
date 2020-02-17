<template>
  <div>
  <el-upload
    name="head"
    ref="upload"
    class="avatar-uploader"
    action="/api2/users/touxiang"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :auto-upload="false"
    :data="myData"
    :on-change="imgPreview"
    :before-upload="beforeAvatarUpload">
    <img v-if="imageUrl" :src="imageUrl" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
  <button @click="submit()">上传</button>
  </div>
</template>

<script>
    export default {
      data() {
        return {
          imageUrl: ''
        };
      },
      computed:{
         myData(){
                return {
                    "username":"罗杰",
                    "password":"123456"
                }
      }
      },
      methods: {
        submit(){
          this.$refs.upload.submit()
        },

        imgPreview (file, fileList) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },

        handleAvatarSuccess(res, file) {
          this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {

          const isJPG = file.type === 'image/jpeg';
          const isLt2M = file.size / 1024 / 1024 < 2;

          if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
          }
          if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
          }
          return isJPG && isLt2M;
        }
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
