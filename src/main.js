import './assets/main.css'

import './assets/vendor/apexcharts/apexcharts.min.js'
import './assets/vendor/bootstrap/js/bootstrap.bundle.min.js'
import './assets/vendor/tinymce/tinymce.min.js'
import './assets/js/main.js'


import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

const pinia = createPinia()

pinia.use(({ store }) => {
    store.router = markRaw(router)
})

app.use(pinia)
app.use(router)

app.mount('#app')
