<template>
  <div class="home-page">
    <div class="hero-section">
      <div v-if="isDark" class="hero-bg"></div>
      <div class="hero-content">
        <h1 class="hero-name">AI是助手，不是主人</h1>
        <div class="hero-divider"></div>
        <p class="hero-slogan">工具越聪明，人越需要清醒。</p>
        <div class="hero-desc">
          <p>这里记录着我在人工智能与计算机科学领域的学习心得与实践项目。</p>
          <p>文字或许拙劣，但每一步都是真实的成长。谢谢你愿意花时间看完。</p>
        </div>
        <div class="contact-row">
          <span class="contact-chip">
            <span class="contact-icon">✉️</span>
            <span>联系方式：570372819@qq.com</span>
          </span>
          <a class="contact-chip" href="https://github.com/WHUTcjh-2024" target="_blank" rel="noopener">
            <svg class="github-icon" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </div>

    <div class="nav-section">
      <div class="nav-cards">
        <a class="nav-card" href="/my-blog/api-examples.html">
          <div class="card-icon">📝</div>
          <h3 class="card-title">学习小记</h3>
          <p class="card-desc">这里是我在学习过程中的学习日记</p>
          <span class="card-arrow">→</span>
        </a>
        <a class="nav-card" href="/my-blog/markdown-examples.html">
          <div class="card-icon">🚀</div>
          <h3 class="card-title">项目阐述</h3>
          <p class="card-desc">这里是我做过的一些东西的架构设计、开发思路和实现细节</p>
          <span class="card-arrow">→</span>
        </a>
        <a class="nav-card" href="/my-blog/algorithms.html">
          <div class="card-icon">🧠</div>
          <h3 class="card-title">算法笔记</h3>
          <p class="card-desc">这里是我在做力扣题目时的一些感悟与思考</p>
          <span class="card-arrow">→</span>
        </a>
        <a class="nav-card" href="/my-blog/线性神经网络1.html">
          <div class="card-icon">🤖</div>
          <h3 class="card-title">深度学习</h3>
          <p class="card-desc">这里记录深度学习相关的学习笔记与实践心得</p>
          <span class="card-arrow">→</span>
        </a>
      </div>
    </div>

    <div class="about-section">
      <div class="about-content">
        <h2 class="section-title">关于我</h2>
        <div class="about-grid">
          <div class="about-text">
            <p>
              你好！我是陈俊宏，是武汉理工大学电子信息科学与技术专业的一名本科生。
              这里是我记录人工智能与计算机科学学习过程的地方，
              希望既方便自己回顾，也能帮助到有同样困惑的同学。
            </p>
          </div>
          <div class="tech-stack">
            <h3>技术栈</h3>
            <div class="tags">
              <span class="tag">Python</span>
              <span class="tag">PyTorch</span>
              <span class="tag">TensorFlow</span>
              <span class="tag">scikit-learn</span>
              <span class="tag">Git</span>
              <span class="tag">Transformer</span>
              <span class="tag">Jupyter Notebook</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isDark = ref(false)

let observer = null

onMounted(() => {
  const html = document.documentElement
  isDark.value = html.classList.contains('dark')

  observer = new MutationObserver(() => {
    isDark.value = html.classList.contains('dark')
  })
  observer.observe(html, { attributes: true, attributeFilter: ['class'] })
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.home-page {
  min-height: 100vh;
  background: var(--vp-c-bg);
}

.hero-section {
  position: relative;
  padding: 72px 24px 36px;
  text-align: center;
}

.hero-bg {
  position: absolute;
  top: -20%;
  left: 50%;
  transform: translateX(-50%);
  width: 1000px;
  height: 1000px;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.18) 0%, rgba(37, 99, 235, 0.08) 40%, transparent 65%);
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 680px;
  margin: 0 auto;
}

.hero-name {
  font-size: 64px;
  font-weight: 900;
  line-height: 1.15;
  background-image: linear-gradient(135deg, #1d4ed8 0%, #3b82f6 50%, #60a5fa 100%);
  background-size: 100% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
  letter-spacing: 4px;
  padding: 6px 0;
}

.hero-divider {
  width: 56px;
  height: 3px;
  background: linear-gradient(90deg, #3b82f6, #60a5fa);
  border-radius: 2px;
  margin: 18px auto 14px;
  opacity: 0.5;
}

.hero-tagline {
  font-size: 16px;
  color: var(--vp-c-text-3);
  margin: 0;
  letter-spacing: 10px;
  font-weight: 400;
}

.hero-slogan {
  font-size: 20px;
  color: var(--vp-c-text-2);
  margin: 24px 0 0;
  font-style: italic;
  letter-spacing: 2px;
  line-height: 1.6;
}

.hero-desc {
  margin-top: 10px;
}

.hero-desc p {
  font-size: 14px;
  color: var(--vp-c-text-3);
  margin: 4px 0;
  line-height: 1.8;
  letter-spacing: 0.8px;
}

.contact-row {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 28px;
}

.contact-chip {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 26px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  font-size: 16px;
  color: var(--vp-c-text-2);
  text-decoration: none;
  transition: all 0.25s ease;
}

a.contact-chip:hover {
  border-color: var(--vp-c-brand-3);
  color: var(--vp-c-brand-2);
  background: var(--vp-c-brand-soft);
  box-shadow: 0 2px 12px rgba(59, 130, 246, 0.12);
  cursor: pointer;
}

.contact-icon {
  font-size: 15px;
  line-height: 1;
}

.github-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

.nav-section {
  max-width: 960px;
  margin: 0 auto;
  padding: 0 24px;
}

.nav-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.nav-card {
  display: block;
  padding: 32px 24px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  animation: fadeInUp 0.6s ease-out backwards;
}

.nav-card:nth-child(1) {
  animation-delay: 0.1s;
}

.nav-card:nth-child(2) {
  animation-delay: 0.2s;
}

.nav-card:nth-child(3) {
  animation-delay: 0.3s;
}

.nav-card:nth-child(4) {
  animation-delay: 0.4s;
}

.nav-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #3b82f6, #60a5fa);
  transform: scaleX(0);
  transition: transform 0.3s ease;
  transform-origin: left;
  z-index: 2;
}

.nav-card:hover {
  border-color: var(--vp-c-brand-3);
  transform: translateY(-4px);
  background: linear-gradient(180deg, rgba(59, 130, 246, 0.04) 0%, var(--vp-c-bg-soft) 100%);
  box-shadow: 0 8px 30px rgba(59, 130, 246, 0.12);
}

.nav-card:hover::before {
  transform: scaleX(1);
}

.card-icon {
  font-size: 32px;
  margin-bottom: 12px;
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0 0 8px;
}

.card-desc {
  font-size: 14px;
  color: var(--vp-c-text-3);
  margin: 0;
  line-height: 1.6;
}

.card-arrow {
  display: inline-block;
  margin-top: 16px;
  font-size: 18px;
  color: var(--vp-c-brand-3);
  opacity: 0;
  transform: translateX(-8px);
  transition: all 0.3s ease;
}

.nav-card:hover .card-arrow {
  opacity: 1;
  transform: translateX(0);
}

.about-section {
  max-width: 960px;
  margin: 60px auto 0;
  padding: 0 24px 60px;
  animation: fadeInUp 0.6s ease-out 0.4s backwards;
}

.section-title {
  font-size: 28px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin: 0 0 24px;
  text-align: center;
}

.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 32px;
  position: relative;
  overflow: hidden;
}

.about-grid::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #3b82f6, #60a5fa);
  opacity: 0.7;
}

.about-text p {
  font-size: 15px;
  color: var(--vp-c-text-2);
  line-height: 1.8;
  margin: 0;
}

.tech-stack h3 {
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0 0 12px;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  display: inline-block;
  padding: 4px 12px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-2);
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  transition: all 0.25s ease;
  cursor: default;
}

.tag:hover {
  background: rgba(59, 130, 246, 0.2);
  transform: scale(1.05);
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.15);
}

@media (max-width: 768px) {
  .hero-name {
    font-size: 36px;
    letter-spacing: 2px;
  }

  .hero-tagline {
    font-size: 13px;
    letter-spacing: 4px;
  }

  .hero-slogan {
    font-size: 16px;
    margin-top: 20px;
  }

  .hero-divider {
    margin: 14px auto 10px;
  }

  .contact-row {
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
  }

  .nav-cards {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .nav-card {
    padding: 24px 20px;
  }

  .about-grid {
    grid-template-columns: 1fr;
    gap: 24px;
    padding: 24px;
  }

  .hero-section {
    padding: 48px 24px 28px;
  }
}
</style>
