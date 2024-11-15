<template>
  <div class="SelectTemplate">
    <div class="top">
      <template v-for="info in templateStore.templateList">
        <ProjectTemplateCard
          @click="handleItemClick"
          :info="info"
          style="width: 480px"
        />
      </template>
    </div>
    <div class="bottom">
      <el-button type="primary" :icon="Plus" @click="handleSave"
        >以此模版创建新项目</el-button
      >
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import ProjectTemplateCard from "@/components/ProjectTemplateCard";
import { Plus } from "@element-plus/icons-vue";
import { queryProjectTemplate } from "@/api/cli-server";
import { useProjectTemplateStore } from "@/stores/project-template";
import { useSaveFolderStore } from "@/stores/save-folder";
const router = useRouter();
const templateStore = useProjectTemplateStore();
const folderStore = useSaveFolderStore();
function handleItemClick(item) {
  templateStore.clickTemplateItem(item);
}
function handleSave() {
  if (!folderStore.saveFolder || folderStore.saveFolder.length === 0) {
    router.push("/selectDirectory");
  } else {
    router.push("/inputProject");
  }
}
onMounted(async () => {
  if (!templateStore.templateList || templateStore.templateList.length === 0) {
    const resp = await queryProjectTemplate();
    templateStore.setTemplateList(resp.data);
  }
});
</script>
<style lang="scss" scoped>
.SelectTemplate {
  height: 100%;
  .top {
    height: calc(100% - 100px);
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
  .bottom {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
