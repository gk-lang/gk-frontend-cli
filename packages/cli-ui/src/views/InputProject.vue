<template>
  <div class="InputProject">
    <div class="raw">
      <div class="title">项目名称</div>
      <div class="content">
        <el-input
          v-model="projectName"
          placeholder="请输入项目名称"
          :prefix-icon="Document"
        />
      </div>
    </div>
    <div class="raw project-path">
      <div class="title">
        <span>项目文件夹</span>
        <el-icon title="编辑" @click="handleProjectPathEdit" class="edit-btn" :size="16">
          <Edit />
        </el-icon>
      </div>
      <div class="content">
        <el-input
          v-model="projectPath"
          placeholder="双击选择项目路径"
          :readonly="projectPathIsDisabled"
          :prefix-icon="FolderOpened"
          :autosize="{ minRows: 3, maxRows: 6 }"
          @dblclick.native="handleProjectPathClick"
          type="textarea"
        />
      </div>
    </div>
    <div class="raw">
      <div class="title">项目模版</div>
      <div class="content">
        <ProjectTemplateCard
          :info="projectTemplateInfo"
          @click="handleTemplateCardClick"
          style="width: 480px"
        />
      </div>
    </div>
    <div class="raw">
      <div class="title">更多选项</div>
      <div class="content">
        <div class="content-left-right">
          <span class="sub-title">若文件夹已存在则将其覆盖</span>
          <el-switch v-model="moreInfo.isCoverExistFolder" />
        </div>
      </div>
    </div>
    <div class="raw">
      <div class="title">Git</div>
      <div class="content-left-right">
        <span>初始化git仓库</span>
        <el-switch v-model="gitInfo.isInitRepository" />
      </div>
      <div class="content-left-right" v-if="gitInfo.isInitRepository">
        <el-input
          v-model="gitInfo.repositoryUrl"
          placeholder="请输入仓库地址"
        />
      </div>
    </div>
    <div class="raw btn-wrap">
      <el-button color="#626aef" :icon="Edit" @click="saveAsPreset">保存为预设配置</el-button>
      <el-button type="success" :icon="Select">开始创建项目</el-button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { FolderOpened, Edit, Select, Document } from "@element-plus/icons-vue";
import { useRouter, RouterLink, RouterView } from "vue-router";
import { queryPresetList,savePresetList } from "@/api/cli-server";
import { useProjectTemplateStore } from "@/stores/project-template";
import { useSaveFolderStore } from "@/stores/save-folder";

const router = useRouter();
const templateStore = useProjectTemplateStore();
const folderStore = useSaveFolderStore();
const projectName = ref("");
const projectPath = ref("");
const projectPathIsDisabled = ref(true);

const gitInfo = ref({
  isInitRepository: false,
});
const moreInfo = ref({
  isCoverExistFolder: false,
});
const projectTemplateInfo = ref(null);
function handleTemplateCardClick(info) {
  router.push("/selectTemplate");
}
function handleProjectPathEdit(){
  projectPathIsDisabled.value =!projectPathIsDisabled.value;
}
function handleProjectPathClick(){
  router.push("/selectDirectory");
}
async function getPresetList(path) {
  const resp = await queryPresetList();
  if (resp.code === 200) {
    
  }
}
function saveAsPreset() {
  savePresetList({
    aa:11,
    bb:22
  })
}
onMounted(() => {
  // 项目模板
  templateStore.on("InputProject", (list) => {
    projectTemplateInfo.value = list.find(x=>x.selected) || null;
  });
  projectTemplateInfo.value = templateStore.templateList.find(x=>x.selected) || null;
  // 项目路径
  folderStore.on("InputProject", (list) => {
    projectPath.value = folderStore.saveFolder;
  });
  projectPath.value = folderStore.saveFolder;
})
</script>
<style lang="scss" scoped>
@mixin btn-item {
  background: #e0f8ed;
  cursor: pointer;
  height: 30px;
  display: inline-block;
  width: 34px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  :deep(.el-icon) {
    outline: none;
  }
}
.InputProject {
  width: 500px;
  margin: auto;
  background: #e1ead8;
  padding: 50px;
  margin-top: 20px;
  .raw {
    margin-top: 10px;
    .title {
      font-size: 16px;
      font-family: Roboto, Avenir, Helvetica, Arial, sans-serif;
      color: #2c3e50;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .edit-btn {
        @include btn-item;
        width: 26px;
        height: 26px;
        cursor: pointer;
        &:hover{
          color: rgb(164, 76, 246);
        }
      }
    }
    .sub-title {
      font-size: 14px;
      font-family: Roboto, Avenir, Helvetica, Arial, sans-serif;
    }
    .content{
      width: 100%;
      display: flex;
      align-items: center;
      :deep(.el-textarea) {
        textarea:read-only {
          background-color: #eee;
          cursor: pointer;
        }
      }
    }
    .content-left-right {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    :deep(.el-input) {
      width: 100%;
    }
    &.project-path {
      :deep(.el-input) {
        width: 80%;
      }
    }
    &.btn-wrap {
      margin-top: 20px;
      display: flex;
      justify-content: space-around;
    }
  }
}
</style>
