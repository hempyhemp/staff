import {createApp} from 'vue';
import App from './App.vue';

import './assets/main.scss';

const app = createApp(App);

app.config.globalProperties.$getImageURL = (path) => {
    return `${import.meta.env.BASE_URL}/${path}`;
};

app.mount('#app');
