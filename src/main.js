import './assets/main.css'
import './assets/tailwind.css'

import VueEasyLightbox from 'vue-easy-lightbox'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(VueEasyLightbox)
app.use(router)

app.mount('#app')
