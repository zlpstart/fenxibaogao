<template>
  <div class="appmain">
    <div class="appmain_new">
      <el-button type="success" @click="New">新建</el-button>
    </div>
    <div class="all_file">
      <el-button plain>全部文件</el-button>
    </div>
    <div class="appmain_wrap">
      <div
        class="content_box"
        v-for="(item) in pageList"
        :key="item.id"
        @click="particulars(item.id)"
      >
        <div class="box_img">
          <img :src="'data:image/png;base64,' + item.pic" v-if="item.pic" alt />
          <img :src="img" alt v-else />
        </div>
        <div class="box_txt">
          <p>{{item.name}}</p>
        </div>
      </div>
    </div>
    <div class="page">
      <el-pagination
        v-if="limit>= 10"
        background
        layout="prev, pager, next"
        :total="limit"
        @current-change="handleCurrentChange"
        :page-size="10"
      ></el-pagination>
    </div>
    <New @NewFile="getNewFile" :showNewFile="showNewFile" />
  </div>
</template>


<script>
import "../../styles/appmain/index.css";
import { page } from "../../api/layout/index";
import New from "../New/index";

export default {
  name: "appmain",
  data() {
    return {
      img: require("@/assets/wrod.jpg"),
      pagination: 1,
      pageList: [],
      limit: null,
      showNewFile: false
    };
  },
  components: {
    New
  },
  mounted() {
    this.getPage();
  },
  methods: {
    getNewFile(e) {
      this.showNewFile = e;
      this.getPage();
    },
    getPage() {
      const para = {
        page: this.pagination,
        per_page: 10,
        sortby: "",
        order: ""
      };
      page(para).then(res => {
        this.pageList = res.data;
        this.limit = res.request.limit;
      });
    },
    handleCurrentChange(e) {
      this.pagination = e;
      this.getPage();
    },
    particulars(e) {
      this.$router.push(`/details?id=${e}`);
    },
    New() {
      this.showNewFile = true;
    }
  }
};
</script>

<style scoped>
.appmain >>> .page {
  float: right;
  margin-bottom: 30px;
}
</style>