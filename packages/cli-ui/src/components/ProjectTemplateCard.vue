<template>
  <el-card
    @click="handleItemClick"
    shadow="hover"
    :class="['project-template-card', info.selected ? 'selected' : '']"
  >
    <div v-if="info.selected" class="selcted">
      <el-button color="#A44CF6" :icon="Check" circle />
    </div>
    <div class="left">
      <el-button type="danger" circle>{{ info.key }}</el-button>
    </div>
    <div class="right">
      <div class="top">
        <span class="title">{{ info.title }}</span>
        <span>
          <el-tag v-for="tag in info.tags" type="primary">{{ tag }}</el-tag>
        </span>
      </div>
      <div class="bottom">
        {{ info.description }}
      </div>
    </div>
  </el-card>
</template>
<script setup>
import { ref } from "vue";
import { FolderOpened, Edit } from "@element-plus/icons-vue";
import { useRouter, RouterLink, RouterView } from "vue-router";
import { Check } from "@element-plus/icons-vue";

const emits = defineEmits(["click"]);
const props = defineProps({
  info: {
    type: Object,
    default: () => {
      return {};
    },
  },
});
function handleItemClick() {
  emits("click", props.info);
}
</script>
<style lang="scss" scoped>
.project-template-card {
  margin: auto;
  cursor: pointer;
  &.selected {
    --el-card-border-color: rgb(164, 76, 246);
    border: 2px solid var(--el-card-border-color);
  }
  :deep(.el-card__body) {
    display: flex;
    position: relative;
    .selcted {
      position: absolute;
      right: 10px;
      top: 7px;
    }
    .left {
      width: 50px;
      display: flex;
      align-items: center;
    }
    .right {
      .top {
        .title {
          font-weight: 800;
        }
        .el-tag {
          margin-left: 10px;
        }
      }
      .bottom {
      }
    }
  }
}
</style>
