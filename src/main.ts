import { createApp } from 'vue'
import './index.css'
import App from './App.vue'
import { inject } from '@vercel/analytics';

createApp(App).mount('#app')
inject()