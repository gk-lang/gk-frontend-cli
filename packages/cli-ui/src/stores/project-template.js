import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useProjectTemplateStore = defineStore("projectTemplate", () => {
  const templateList = ref([]);
  const funcList = ref([]);
  function setTemplateList(list) {
    templateList.value = list;
    doCallbackFunc();
  }
  function clickTemplateItem(item) {
    templateList.value.forEach((x) => {
      if (x.key === item.key) {
        x.selected = !x.selected;
      } else {
        x.selected = false;
      }
    });
    doCallbackFunc();
  }
  function doCallbackFunc() {
    funcList.value.forEach((x) => {
      x.callback(templateList.value);
    });
  }
  function on(name, callback) {
    funcList.value.push({
      name,
      callback,
    });
  }
  function off(name) {
    const i = funcList.value.findIndex((x) => x.name === name);
    funcList.value.splice(i, 1);
  }
  return { templateList, setTemplateList, clickTemplateItem, on, off };
});
