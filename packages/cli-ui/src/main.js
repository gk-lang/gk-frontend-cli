import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import {
  ElMessage,
  ElMessageBox,
  ElNotification
} from "element-plus";

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount("#app");
window.$msg = ElMessage;
window.$msgbox = ElMessageBox;
window.$confirm = ElMessageBox.confirm;
window.$notify = ElNotification;
