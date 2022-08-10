import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { setupCustomComponents } from '@/plugins';
import ViewUIPlus from 'view-ui-plus'
import 'view-ui-plus/dist/styles/viewuiplus.css';
// 注册全局自定义组件,如：<svg-icon />
const app = createApp(App);
setupCustomComponents(app);
app.use(store).use(router).use(ViewUIPlus).mount("#app");

