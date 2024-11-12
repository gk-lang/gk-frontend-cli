<template>
  <div class="SelectDirectory">
    <div class="top">
      <span class="back">
        <el-icon :size="16">
          <ArrowUpBold />
        </el-icon>
      </span>
      <div class="folder-list">
        <span class="folder-start">
          <el-icon :size="20">
            <FolderOpened />
          </el-icon>
        </span>
        <span
          :class="[
            'folder-item',
            i === folderList.length - 1 ? 'folder-item-last' : '',
          ]"
          v-for="(name, i) in folderList"
        >
          <span class="folder-item-content">{{ name }}</span>
          <el-icon v-if="i === folderList.length - 1" class="edit" :size="20">
            <Edit />
          </el-icon>
        </span>
      </div>
      <span class="refresh">
        <el-icon :size="16">
          <Refresh />
        </el-icon>
      </span>
      <div class="collection">
        <span class="do-collect">
          <el-icon :size="16">
            <Star />
          </el-icon>
        </span>
        <span class="collect-list">
          <el-dropdown placement="bottom-end">
            <el-icon :size="16">
              <CaretBottom />
            </el-icon>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>The Action 1st</el-dropdown-item>
                <el-dropdown-item>The Action 2st</el-dropdown-item>
                <el-dropdown-item>The Action 3st</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </span>
      </div>
      <div class="more">
        <el-dropdown placement="bottom-end">
          <el-icon :size="16">
            <MoreFilled />
          </el-icon>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>The Action 1st</el-dropdown-item>
              <el-dropdown-item>The Action 2st</el-dropdown-item>
              <el-dropdown-item>The Action 3st</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <div class="middle">
      <el-scrollbar class="scroll-container" ref="scrollRef">
        <template v-for="(name, index) in childFolderList" :key="index">
          <div class="folder-item">
            <el-icon :size="26" color="green">
              <FolderOpened />
            </el-icon>
            <div class="name">{{ name }}</div>
          </div>
        </template>
      </el-scrollbar>
    </div>
    <div class="bottom">
        <el-button type="primary" :icon="Plus">在此创建新项目</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  Refresh,
  Edit,
  Star,
  Plus,
  ArrowUpBold,
  FolderOpened,
  CaretBottom,
  MoreFilled,
} from "@element-plus/icons-vue";
import { useRouter, RouterLink, RouterView } from "vue-router";
const folderList = ref(["Users", "zhanggaoke", "workspace", "code", "demo"]);
const childFolderList = ref([
  "Users",
  "zhanggaoke",
  "workspace",
  "code",
  "demo",
  "Users",
  "zhanggaoke",
  "workspace",
  "code",
  "demo",
  "Users",
  "zhanggaoke",
  "workspace",
  "code",
  "demo",
  "Users",
  "zhanggaoke",
  "workspace",
  "code",
  "demo",
  "Users",
  "zhanggaoke",
  "workspace",
  "code",
  "demo",
  "Users",
  "zhanggaoke",
  "workspace",
  "code",
  "demo",
]);
</script>
<style lang="scss" scoped>
@mixin btn-item {
  background: #e0f8ed;
  cursor: pointer;
  height: 32px;
  display: inline-block;
  width: 34px;
  display: flex;
  justify-content: center;
  align-items: center;
  :deep(.el-icon) {
    outline: none;
  }
}
.SelectDirectory {
  width: 1200px;
  margin: auto;
  height: 100%;
  .top {
    display: flex;

    font-size: 14px;
    margin: 10px auto;
    .back {
      @include btn-item;
      border-radius: 4px;
    }
    .refresh {
      @include btn-item;
      border-radius: 4px;
      margin-left: 10px;
    }
    .collection {
      margin-left: 10px;
      display: flex;
      align-items: center;
      .do-collect {
        @include btn-item;
        border-radius: 4px;
      }
      .collect-list {
        @include btn-item;
        border-radius: 4px;
        margin-left: 2px;
      }
    }
    .more {
      @include btn-item;
      border-radius: 4px;
      margin-left: 10px;
    }
    .folder-list {
      margin-left: 10px;
      display: flex;
      flex: 1;
      .folder-start {
        @include btn-item;
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
      }
      .folder-item {
        display: inline-block;
        background: #e0f8ed;
        cursor: pointer;
        margin-left: 2px;
        &:hover {
          background: #e8faf2;
        }
        .folder-item-content {
          color: #2c3e50;
          background: 0 0;
          padding: 0 9px;
          height: 32px;
          line-height: 32px;
          display: inline-block;
        }
        &.folder-item-last {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-right: 0px;
          min-width: 150px;
          flex: 1;
          .edit {
            margin-right: 0px;
          }
        }
      }
    }
  }
  .middle {
    height: calc(100% - 152px);
    .scroll-container {
      .folder-item {
        height: 50px;
        line-height: 50px;
        cursor: pointer;
        display: flex;
        align-items: center;
        padding-left: 20px;
        .name {
          margin-left: 10px;
        }
        &:hover {
          background: #e8faf2;
        }
      }
    }
  }
  .bottom{
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
