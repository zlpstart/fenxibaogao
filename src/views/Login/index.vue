<template>
  <div class="login">
    <div class="login_wrap">
      <div class="login_box">
        <div class="box_left">
          <img :src="Img" alt />
        </div>
        <div class="box_right">
          <div class="right_title">
            <h1>登录</h1>
          </div>
          <div class="right_from">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
              <el-form-item prop="loginName">
                <el-input v-model="ruleForm.loginName" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item prop="password" style="margin-top:48px">
                <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="success" @click="submitForm('ruleForm')">登录</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
      <div class="login_bottom">
        <div class="decorate"></div>
        <div class="bottom_txt">
          <p>分析报告生成工具</p>
        </div>
        <div class="decorate"></div>
      </div>
    </div>
  </div>
</template>

<script>
import "../../styles/element.css";
import "../../styles/login/index.css";
// import { login } from "../../api/Login/index";
import { validUsername } from "@/utils/validate";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "login",
  data() {
    return {
      // 登录左边图片
      Img: require("../../assets/Login.png"),
      // 用户名密码
      ruleForm: {
        loginName: "",
        password: ""
      },
      rules: {
        loginName: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  computed: {
    ...mapGetters(["getLoginState"])
  },
  methods: {
    ...mapActions(["login"]),
    submitForm() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.login(this.ruleForm);
        }
      });
      setTimeout(() => {
        if (this.getLoginState == true) {
          this.$router.push("/");
          this.$message({
            type: "success",
            message: "登录成功!"
          });
        }
      }, 1000);
    }
  }
};
</script>

<style scoped>
</style>