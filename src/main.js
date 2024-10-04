import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

//Using pinia=> pinia config...
import { createPinia } from "pinia";

//Emitter config...
import mitt from "mitt";
const Emitter = mitt();
export default Emitter;

//Swiper Config...
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Vuetify
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

// Components
//import App from "./App.vue";

const vuetify = createVuetify({
  components,
  directives,
});

createApp(App).use(vuetify).use(createPinia()).use(router).mount("#app");
