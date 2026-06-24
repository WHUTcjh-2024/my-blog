// https://vitepress.dev/guide/custom-theme
import DefaultTheme from 'vitepress/theme'
import './style.css'
import HomePage from './HomePage.vue'

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    app.component('HomePage', HomePage)
  },
  setup() {
    // 强制首次访问使用亮色主题
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('vitepress-preferred-appearance')
      if (!saved) {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('vitepress-preferred-appearance', 'light')
      }
    }
  }
}
