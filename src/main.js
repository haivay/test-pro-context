import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'

const pinia = createPinia()

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

library.add(faChevronRight)

createApp(App)
  .use(pinia)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app')
