<template>
  <div class="new" v-if="showNewFile">
    <div class="new_box">
      <div class="box_title">
        <p>报告创建</p>
      </div>
      <div class="box_content">
        <el-upload
          class="upload-demo"
          drag
          :headers="headers"
          action="http://47.98.221.74:30002/reportservice/v1/report/reportTemplate/upload"
          multiple
          submit
          :on-success="handleAvatarSuccess"
          :on-error="error"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将文件拖到此处，或
            <em>点击上传</em>
          </div>
        </el-upload>
        <div class="btn">
          <button class="box__btn" v-if="succeed" @click="accomplish">完成</button>
          <button class="box__btn2" v-if="!succeed" disabled="disabled">完成</button>
        </div>
      </div>
      <div class="create_close" @click="close1">X</div>
    </div>
  </div>
</template>

<script>
import "../../styles/new/index.css";
export default {
  data() {
    return {
      succeed: false,
      showFile: false,
      headers: {
        sessionToken: "451acf57f77241fd9fc36a15584f4d07",
        accessKey: "db92d25ba03d4239a5106d01ad255a29"
      }
    };
  },
  props: ["showNewFile"],
  methods: {
    handleAvatarSuccess(res, file) {
      this.succeed = true;
      this.$message({
        type: "success",
        message: "上传成功!"
      });
    },
    error() {
      this.$message({
        type: "error",
        message: "上传失败"
      });
    },
    accomplish() {
      this.succeed = false;
      this.$emit("NewFile", false);
      // window.history.go(0);
    },
    close1() {
      this.succeed = false;
      this.$emit("NewFile", false);
    }
  }
};
</script>

<style scoped>
.new >>> .el-upload-dragger {
  width: 273px !important;
  height: 139px;
  background: rgba(250, 250, 250, 1);
  border-radius: 3px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  margin-left: 33px;
  margin-top: 13px;
}
.new >>> .el-upload__input {
  display: none;
}
</style>