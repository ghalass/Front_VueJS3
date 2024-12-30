import './assets/main.css'
import * as bootstrap from 'bootstrap/dist/js/bootstrap.bundle';

// import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.provide('bootstrap', bootstrap);

const pinia = createPinia()

pinia.use(({ store }) => {
    store.router = markRaw(router)
})

app.use(pinia)
app.use(router)

app.mount('#app')
