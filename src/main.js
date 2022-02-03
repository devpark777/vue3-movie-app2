import 'bootstrap/dist/css/bootstrap.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'  // import store from './store/index.js' : 폴더 아래 index.js 파일은 생략해도 됨
import loadImage from './plugins/loadImage' //내가 만든 plugin => 다른 곳에서 사용가능하도록 함


createApp(App)
    .use(router) // $router로 사용
    .use(store)  // $store로 사용
    .use(loadImage)  // $loadImage 로 사용
    .mount('#app')

import 'bootstrap/dist/js/bootstrap.js'
