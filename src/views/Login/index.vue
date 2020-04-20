<template>
  <div class="login container-fluid">
    <div class="container">
      <div class="row">
        <div class="col-lg-12 .col-md-6 login_wrap">
          <div class="login_box row">
            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 box_left">
              <img :src="Img" alt />
            </div>
            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6 box_right">
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
      setTimeout(()=>{
        this.getLoginState == true ? this.$router.push("/") : null;
        console.log(this.getLoginState);
      },1000)

    }
  }
};
</script>

<style scoped>
</style>