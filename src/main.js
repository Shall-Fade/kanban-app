import { createApp } from "vue";
import App from "./App.vue";
import BaseButton from './components/UI/BaseButton.vue';
import BaseCard from './components/UI/BaseCard.vue';

import "./assets";

const app = createApp(App);

app.component('BaseButton', BaseButton);
app.component('BaseCard', BaseCard);

app.mount("#app");
