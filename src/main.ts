import './assets/main.css';

import UI, { BaseTheme } from '@indielayer/ui';
import { createPinia } from 'pinia';
import { createApp } from 'vue';

import * as Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';

import '@techie04/vue3-phonenumber-input/dist/css/vue3-phone-input.css';

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

import App from './App.vue';
import icons from './assets/icons/icons';
import router from './router';
import routerGuard from './router/RouterGarud';
import './Services/axios.service';

const app = createApp(App)
app.use(createPinia())
routerGuard(router)
app.use(router)
app.use(Toast, {
    bodyClassName: "vue-toastification",
})
app.component('DataTable', Vue3EasyDataTable)
app.use(UI, {
    prefix: 'X',
    theme: {
        colors: {
            primary: {
                50: 'rgb(242,245,249)',
                100: 'rgb(228,235,243)',
                200: 'rgb(198,214,231)',
                300: 'rgb(163,191,217)',
                400: 'rgb(85,148,196)',
                500: '#1c83bc',
                600: 'rgb(27,124,178)',
                700: 'rgb(24,113,163)',
                800: 'rgb(18,85,122)',
                900: 'rgb(15,72,103)',
                950: 'rgb(13,59,84)',
            },
            success: {
                50: '#ecfdf5',
                100: '#d1fae5',
                200: '#a7f3d0',
                300: '#6ee7b7',
                400: '#34d399',
                500: '#10b981',
                600: '#059669',
                700: '#047857',
                800: '#065f46',
                900: '#064e3b',
                950: '#022c22',
            },
        },
        ...BaseTheme,
    },
    icons,
})

app.mount('#app')
