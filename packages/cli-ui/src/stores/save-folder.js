import { ref } from "vue";
import { defineStore } from "pinia";

export const useSaveFolderStore = defineStore("saveFolder", () => {
  const saveFolder = ref("");
  const funcList = ref([]);
  function setSaveFolder(list) {
    if (list.length === 0) {
      saveFolder.value = "";
    } else {
      saveFolder.value = "/" + list.join("/");
    }
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
  return { saveFolder, setSaveFolder, on, off };
});
