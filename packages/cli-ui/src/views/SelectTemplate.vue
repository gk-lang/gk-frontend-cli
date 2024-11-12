<template>
  <div class="SelectTemplate">
    <template v-for="info in templateList">
      <ProjectTemplateCard @click="handleItemClick" :info="info" style="width: 480px" />
    </template>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter, RouterLink, RouterView } from "vue-router";
import ProjectTemplateCard from "@/components/ProjectTemplateCard";

const templateList = ref([
  {
    key: 1,
    title: "vue-cli输出方案基础版",
    tags: ["vue-cli", "vue3"],
    downloadUrl: "git@github.com:gk-lang/gk-frontend-vuecli-outputconfig.git", // 模板下载地址
    description:
      "集成了输出方案相关组件、用户、登录、权限、路由等等，工程化工具使用的是vue-cli", // 模板描述
    branch: "main", // 分支
    selected: false,
  },
  {
    key: 2,
    title: "vite基础版",
    tags: ["vite", "vue3"],
    downloadUrl: "git@github.com:gk-lang/gk-frontend-vuecli-outputconfig.git",
    description:
      "集成一些常用组件如动态表格、动态表格等等，工程化工具使用的是vite",
    branch: "main",
    selected: true,
  },
  {
    key: 3,
    title: "vue-cli基础版",
    tags: ["vue-cli", "vue3"],
    downloadUrl: "git@github.com:gk-lang/gk-frontend-vuecli-outputconfig.git",
    description:
      "集成一些常用组件如动态表格、动态表格等等，工程化工具使用的是vue-cli",
    branch: "main",
    selected: false,
  },
  {
    key: 4,
    title: "uni-app基础版",
    tags: ["vue3"],
    downloadUrl: "git@github.com:gk-lang/gk-frontend-vuecli-outputconfig.git",
    description:
      "集成一些常用组件如动态表格、动态表格等等，工程化工具使用的是uni-app",
    branch: "main",
    selected: false,
  },
]);
function handleItemClick(item) {
  templateList.value.forEach((x) => {
    if (x.key === item.key) {
      x.selected = !x.selected;
    } else {
      x.selected = false;
    }
  });
}
</script>
<style lang="scss" scoped>
.SelectTemplate {
  height: 100%;
  margin: auto;
  display: grid;
  max-width: 1600px;
  grid-template-columns: 33.33% 33.33% 33.33%;
  grid-template-rows: 33.33% 33.33% 33.33%;
  @media screen and (max-width: 1500px) {
    grid-template-columns: 50% 50%;
    grid-template-rows: 50% 50%;
  }
}
</style>
