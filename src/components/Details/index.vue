<template>
  <div class="details">
    <div class="details_title">
      <div class="title_left">
        <h1>关于XXXXXXX的分析报告</h1>
      </div>
      <div class="title_right">
        <el-button plain @click="goBack">返回上一级</el-button>
        <el-button type="success" @click="exit" plain>导出</el-button>
        <el-button type="success" @click="save" plain>保存</el-button>
      </div>
    </div>
    <div class="details_form">
      <el-form :model="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="活动名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="报告描述" prop="businessDesc">
          <el-input v-model="ruleForm.businessDesc"></el-input>
        </el-form-item>
        <el-form-item label="定期生成" prop="cron">
          <el-input v-model="ruleForm.cron"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="details_table">
      <el-table :data="ruleForm.indexDefinitions" style="width: 100%">
        <el-table-column prop="name" label="名称" style="width: 100%"></el-table-column>
        <el-table-column class prop="type" label="类别" style="width: 100%"></el-table-column>
        <el-table-column prop="preview" label="预览" style="width: 100%"></el-table-column>
        <el-table-column prop="address" label="操作" style="width: 100%">
          <template slot-scope="scope">
            <el-button
              class="TABLEbtn"
              size="mini"
              v-if="scope.row.class == 1"
              @click="tableBtn(scope.row)"
            >关联</el-button>
            <el-button class="RESTSbtn" size="mini" v-else @click="restsBtn(scope.row)">关联</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 蓝色按钮弹窗 -->
    <el-dialog title="指标定义" :visible.sync="dialogVisibleB" width="30%" :before-close="handleClose">
      <el-radio-group v-model="basics.calculateType" @change="changeRadio" class="radio">
        <el-radio label="Simple">基础指标</el-radio>
        <el-radio label="Composite">复合指标</el-radio>
      </el-radio-group>
      <!-- 基本 -->
      <span v-if="basics.calculateType == 'Simple'">
        <el-select class="elSelect" v-model="basics.dataSourceId" placeholder="请选择数据源">
          <el-option
            v-for="item in tabel.Tselect"
            :key="item.value"
            :label="item.databaseName"
            :value="item.id"
          ></el-option>
        </el-select>
        <el-input class="txt" type="textarea" v-model="basics.sql"></el-input>
        <p class="el-p" @click="preview">预览 <span v-if="previewShow">预览结果：{{basics.preview}}</span></p>
      </span>
      <!-- 复合 -->
      <span v-else>
        <el-input class="txt" type="textarea" v-model="basics.sql"></el-input>
        <p class="el-p" @click="preview">预览<span v-if="previewShow">预览结果：{{basics.preview}}</span></p>
      </span>
      <span slot="footer" class="dialog-footer el-Btn">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 绿色按钮弹窗 -->
    <el-dialog title="指标定义" :visible.sync="dialogVisibleG" width="30%" :before-close="handleClose">
      <span>
        <el-select class="elSelect" v-model="basics.dataSourceId" placeholder="请选择数据源">
          <el-option
            v-for="item in tabel.Tselect"
            :key="item.value"
            :label="item.databaseName"
            :value="item.id"
          ></el-option>
        </el-select>
        <el-input class="txt" type="textarea" v-model="basics.sql"></el-input>
        <p class="el-p" @click="preview">预览<span v-if="previewShow">预览结果：{{basics.preview}}</span></p>
      </span>
      <span slot="footer" class="dialog-footer el-Btn">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import "../../styles/details/index.css";
import {
  get,
  list,
  getDialog,
  indexPreview,
  save,
  saveWord
} from "../../api/Details/index";

export default {
  name: "details",
  data() {
    return {
      // 蓝色按钮
      // 基础
      basics: {
        calculateType: "",
        // 数据源id
        dataSourceId: "",
        exist: true,
        // 当前这一条id
        id: "",
        // 当前这一条name
        name: "importTableQualitySummary",
        // 预览的值
        preview: null,
        // textarea
        sql: "",
        // TABLE || ??
        type: ""
      },
      // 当前文档id
      wordId: "",
      // table按钮弹窗
      tabel: {
        // 单选
        radio: "1",
        // 下拉菜单数据
        Tselect: [],
        // 下拉菜单取值
        TselectValue: "",
        // textarea
        desc: ""
      },
      // 蓝色弹窗
      dialogVisibleB: false,
      // 绿色弹窗
      dialogVisibleG: false,
      ruleForm: {
        // 姓名
        name: "",
        // 描述
        businessDesc: "",
        // 定期生成
        cron: ""
      },
      // 当前点击id
      table: [],
      previewShow:false
    };
  },
  mounted() {
    this.getTable();
  },
  methods: {
    // 获取弹窗信息的方法
    getDialogData() {
      const para2 = {
        data: {
          id: this.table.id
        }
      };
      getDialog(para2).then(res => {
        this.basics = Object.assign({}, res.data);
      });
    },
    // 获取弹窗下拉菜单的方法
    getDialogSelect() {
      const para = {};
      list(para).then(res => {
        this.tabel.Tselect = res.data;
      });
    },
    // 弹窗提交的方法
    saveDialog() {
      const para = {
        data: this.basics
      };
      save(para).then(res => {
        this.$message({
          type: "success",
          message: "提交成功!"
        });
        this.previewShow = false
      });
    },
    // 清空弹窗对象
    clearDialog() {
      for (let key in this.basics) {
        this.basics[key] = "";
      }
    },
    // 提交弹窗
    submit() {
      this.dialogVisibleG = false;
      this.dialogVisibleB = false;
      this.saveDialog();
    },
    // 蓝色关联按钮
    restsBtn(e) {
      this.table = e;
      this.dialogVisibleB = true;
      this.clearDialog();
      this.getDialogSelect();
      this.getDialogData();
    },
    // 绿色关联按钮
    tableBtn(e) {
      this.table = e;
      this.dialogVisibleG = true;
      this.clearDialog();
      this.getDialogSelect();
      this.getDialogData();
    },
    // 切换复合与基础
    changeRadio() {},
    // 预览
    preview() {
      const para = {
          data: this.basics
      };
      indexPreview(para).then(res => {
        this.previewShow = true
        this.basics.preview = res.data.preview
      });
    },
    // 关闭弹窗
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
          this.clearDialog();
          this.previewShow = false
        })
        .catch(_ => {});
    },
    // 初始展示页面
    getTable() {
      this.wordId = this.$route.query.id - 0;
      const para = {
        data: {
          id: this.wordId
        }
      };
      get(para).then(res => {
        this.ruleForm = Object.assign(this.ruleForm, res.data);
        this.ruleForm.indexDefinitions.map(item => {
          if (item.preview == null || item.preview == "") {
            item.preview = "无";
          }
          if (item.type == "TABLE") {
            item.class = 1;
          } else {
            item.class = 0;
          }
        });
      });
    },
    // 导出
    exit() {
      window.open(
        `http://47.98.221.74:30002/reportservice/v1/report/reportTemplate/export?id=${this.wordId}`
      );
    },
    // 返回上一级
    goBack() {
      this.$router.go(-1);
    },
    save() {
      const para = {
        data: this.ruleForm
      };
      saveWord(para).then(res => {
        this.$message({
          type: "success",
          message: "保存成功!"
        });
        window.history.go(0);
      });
    },
    cancel(){
      this.dialogVisibleB = false
      this.dialogVisibleG = false
    }
  }
};
</script>

<style scoped>
.txt >>> textarea {
  height: 150px;
  background: rgba(250, 250, 250, 1);
}
.details >>> .el-dialog__footer {
  margin-top: 40px;
  text-align: center;
}
.details >>> .el-dialog__footer button:nth-child(1) {
  width: 57px;
  height: 23px;
  background: rgba(255, 255, 255, 1);
  border-radius: 3px;
  border: 1px solid rgba(4, 209, 149, 1);
  font-size: 10px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(4, 209, 149, 1);
  padding: 0;
}
.details >>> .el-dialog__footer button:nth-child(2) {
  width: 57px;
  height: 23px;
  background: rgba(4, 209, 149, 1);
  border-radius: 3px;
  font-size: 10px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  padding: 0;
}
.details >>> .el-dialog {
  width: 285px !important;
}
.radio >>> label {
  display: block;
  margin-left: 0;
}
.details >>> .el-input--suffix input {
  width: 245px;
  height: 28px;
  background: rgba(250, 250, 250, 1);
  border-radius: 3px;
  border: 1px solid rgba(238, 238, 238, 1);
}
.details >>> .el-form-item {
  margin: 0;
}
.details >>> .el-form-item__label {
  line-height: 32px;
}
.details >>> .el-form-item__content {
  line-height: 36px;
}
.details >>> .has-gutter tr th:nth-child(1) {
  width: 226px;
}
.details >>> .el-dialog__body {
  width: 245px;
  margin: auto;
  padding: 0;
  box-sizing: border-box;
}
.details >>> .el-dialog__body input[type="text"] {
  width: 100%;
  height: 28px;
  margin-top: 11px;
  line-height: 28px;
}
.details >>> .el-dialog__header {
  text-align: center;
  font-size: 13px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(34, 34, 34, 1);
}
.details >>> .el-Btn {
  margin-top: 45px;
}
</style>