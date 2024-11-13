<template>
  <div class="app-main">
    <div class="header">
      <div class="title">九州云仓项目创建脚手架</div>
      <div class="tab-nav">
        <div
          @click="handleClick(1)"
          :class="['tab-item', activeName === 1 ? 'active' : '']"
        >
          <span>选择模版</span>
        </div>
        <div
          @click="handleClick(2)"
          :class="['tab-item', activeName === 2 ? 'active' : '']"
        >
          <span>选择目录</span>
        </div>
        <div
          @click="handleClick(3)"
          :class="['tab-item', activeName === 3 ? 'active' : '']"
        >
          <span>创建项目</span>
        </div>
      </div>
    </div>
    <div class="app-content">
      <RouterView />
    </div>
  </div>
</template>
<script setup>
import { ref, watch } from "vue";
import { useRouter, useRoute, RouterLink, RouterView } from "vue-router";
const activeName = ref();
const router = useRouter();
const route = useRoute();
function handleClick(name) {
  activeName.value = name;
  if (name === 1) {
    router.push("/selectTemplate");
  }
  if (name === 2) {
    router.push("/selectDirectory");
  }
  if (name === 3) {
    router.push("/inputProject");
  }
}
watch(
  () => router.currentRoute.value.path,
  (toPath) => {
    if (toPath === "/selectTemplate" || toPath === "/") {
      activeName.value = 1;
    }
    if (toPath === "/selectDirectory") {
      activeName.value = 2;
    }
    if (toPath === "/inputProject") {
      activeName.value = 3;
    }
  }
);
</script>
<style lang="scss" scoped>
.app-main {
  height: 100%;
  .header {
    display: block;
    width: 100%;
    background: rgb(200, 235, 223);
    margin: 0 auto;
    .title {
      font-size: 24px;
      text-align: center;
      font-weight: 300;
      padding-top: 10px;
      padding-bottom: 10px;
    }
    .tab-nav {
      margin: auto;
      display: flex;
      justify-content: center;
      .tab-item {
        margin-left: 10px;
        height: 44px;
        line-height: 44px;
        cursor: pointer;
        text-align: center;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        position: relative;
        span {
          padding: 0px 20px;
        }
        &.active {
          color: rgb(164, 76, 246);
          background: rgb(232, 250, 242);
          &::after {
            content: "";
            background-color: rgb(164, 76, 246);
            transition: transform 0.3s ease-in-out;
            display: block;
            width: 100%;
            height: 2px;
            position: absolute;
            bottom: 1px;
          }
        }
        &:hover {
          background: rgb(232, 250, 242);
        }
      }
    }
    :deep(.el-tabs) {
      .el-tabs__content {
        display: none;
      }
    }
  }
  .app-content {
    height: calc(100% - 102px);
  }
}
</style>
