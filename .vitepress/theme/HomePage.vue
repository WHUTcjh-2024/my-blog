<template>
  <div class="home-page tech-theme">
    <!-- Tech Background Grid -->
    <div class="tech-grid"></div>

    <div class="ambient-bg">
      <div class="glow-orb orb-1"></div>
      <div class="glow-orb orb-2"></div>
      <div class="noise-overlay"></div>
    </div>

    <div class="content-wrapper">
      <header class="hero">
        <div class="hero-badge">
          <span class="pulse-dot"></span>
          SYSTEM.READY // DIGITAL_GARDEN
        </div>
        <h1 class="hero-title">
          <span class="text-gradient">AI是助手，</span><br />
          <span class="text-outline">不是主人_</span>
        </h1>
        <p class="hero-slogan">> 工具越聪明，人越需要清醒。</p>
        <div class="terminal-box">
          <div class="terminal-header">
            <span class="dot red"></span>
            <span class="dot yellow"></span>
            <span class="dot green"></span>
            <span class="terminal-title">guest@my-blog: ~</span>
          </div>
          <p class="hero-desc">
            这里记录着我在人工智能与计算机科学领域的学习心得与实践项目。<br/>
            文字或许拙劣，但每一步都是真实的成长。<br/>
            <span class="cursor">_</span>
          </p>
        </div>
      </header>

      <main class="bento-grid">
        <!-- About Section (Large) -->
        <div class="bento-card col-span-2 row-span-2 about-card">
          <div class="card-glass"></div>
          <div class="card-corner top-left"></div>
          <div class="card-corner bottom-right"></div>
          <h2 class="card-title">关于我 <span class="dim-text">/ ABOUT.exe</span></h2>
          <p class="about-text">
            > 用户名：陈俊宏<br/>
            > 身份：武汉理工大学 - 电子信息科学与技术本科生<br/><br/>
            这里是我记录人工智能与计算机科学学习过程的数据库，希望既方便自己检索，也能为访问此节点的终端提供数据支持。
          </p>
          <div class="contact-links">
            <a href="mailto:570372819@qq.com" class="social-btn">
              <span class="icon">✉️</span> 570372819@qq.com
            </a>
            <a href="https://github.com/WHUTcjh-2024" target="_blank" rel="noopener" class="social-btn">
              <svg class="icon" viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              GitHub
            </a>
          </div>
        </div>

        <!-- Tech Stack -->
        <div class="bento-card col-span-2 tech-card">
          <div class="card-glass"></div>
          <div class="card-corner top-left"></div>
          <div class="card-corner bottom-right"></div>
          <h2 class="card-title">技术栈 <span class="dim-text">/ STACK.json</span></h2>
          <div class="tags-container">
            <span class="tech-tag">Python</span>
            <span class="tech-tag">PyTorch</span>
            <span class="tech-tag">TensorFlow</span>
            <span class="tech-tag">scikit-learn</span>
            <span class="tech-tag">Git</span>
            <span class="tech-tag">Transformer</span>
            <span class="tech-tag">Jupyter</span>
          </div>
        </div>

        <!-- Nav Cards -->
        <a href="/my-blog/api-examples.html" class="bento-card nav-card interactive">
          <div class="card-glass"></div>
          <div class="nav-icon">📝</div>
          <h3>学习小记</h3>
          <p>学习过程中的学习日记</p>
          <div class="arrow-indicator">↗</div>
          <div class="card-corner bottom-right"></div>
        </a>

        <a href="/my-blog/markdown-examples.html" class="bento-card nav-card interactive">
          <div class="card-glass"></div>
          <div class="nav-icon">🚀</div>
          <h3>项目阐述</h3>
          <p>架构设计、开发思路与实现</p>
          <div class="arrow-indicator">↗</div>
          <div class="card-corner bottom-right"></div>
        </a>

        <a href="/my-blog/algorithms.html" class="bento-card nav-card interactive">
          <div class="card-glass"></div>
          <div class="nav-icon">🧠</div>
          <h3>算法笔记</h3>
          <p>力扣题目感悟与思考</p>
          <div class="arrow-indicator">↗</div>
          <div class="card-corner bottom-right"></div>
        </a>

        <a href="/my-blog/线性神经网络1.html" class="bento-card nav-card interactive">
          <div class="card-glass"></div>
          <div class="nav-icon">🤖</div>
          <h3>深度学习</h3>
          <p>学习笔记与实践心得</p>
          <div class="arrow-indicator">↗</div>
          <div class="card-corner bottom-right"></div>
        </a>
      </main>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'

let observer = null

onMounted(() => {
  // Add mouse tracking effect to interactive cards
  const cards = document.querySelectorAll('.interactive');
  const handleMouseMove = (e) => {
    for (const card of cards) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    }
  };
  
  document.addEventListener('mousemove', handleMouseMove);
  
  // Clean up
  onUnmounted(() => {
    document.removeEventListener('mousemove', handleMouseMove);
  });
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=JetBrains+Mono:wght@400;700&display=swap');

/* Force dark tech theme regardless of VitePress mode */
.tech-theme {
  --bg-color: #161618; /* 调整为极深灰偏蓝，与侧边栏融合更好 */
  --text-main: #e0f2fe;
  --text-muted: #7dd3fc;
  --tech-blue: #00f0ff;
  --tech-blue-dim: rgba(0, 240, 255, 0.1); /* 降低亮度 */
  --tech-dark-blue: #0ea5e9;
  --card-bg: rgba(22, 22, 24, 0.6); /* 卡片背景也调暗，更通透 */
  --card-border: rgba(0, 240, 255, 0.15); /* 边框弱化 */
  
  position: relative;
  min-height: calc(100vh - var(--vp-nav-height));
  background-color: var(--bg-color);
  color: var(--text-main);
  font-family: 'JetBrains Mono', monospace;
  overflow: hidden;
  padding: 60px 24px;
  z-index: 0;
  margin: -64px -24px -64px -24px; /* Counteract default padding from VitePress */
}

/* Grid Background */
.tech-grid {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(var(--tech-blue-dim) 1px, transparent 1px),
    linear-gradient(90deg, var(--tech-blue-dim) 1px, transparent 1px);
  background-size: 60px 60px; /* 增大网格间距，显得更空灵 */
  opacity: 0.15; /* 降低网格透明度，保持简洁 */
  z-index: -2;
  pointer-events: none;
  transform: perspective(500px) rotateX(20deg) scale(1.5) translateY(-10%);
  transform-origin: top;
}

.ambient-bg {
  position: absolute;
  inset: 0;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
}

.glow-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
  opacity: 0.5;
  animation: float 20s infinite ease-in-out alternate;
}

.orb-1 {
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(0,240,255,0.4) 0%, rgba(14,165,233,0.1) 70%, transparent 100%);
  top: -100px;
  right: -100px;
}

.orb-2 {
  width: 800px;
  height: 800px;
  background: radial-gradient(circle, rgba(14,165,233,0.3) 0%, rgba(0,240,255,0.1) 70%, transparent 100%);
  bottom: -200px;
  left: -200px;
  animation-delay: -5s;
}

.noise-overlay {
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E");
  mix-blend-mode: overlay;
  z-index: 1;
}

@keyframes float {
  0% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(50px, 30px) scale(1.1); }
  100% { transform: translate(-30px, 80px) scale(0.9); }
}

.content-wrapper {
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  padding-top: 20px;
}

.hero {
  margin-bottom: 64px;
  animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  opacity: 0;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 2px;
  padding: 8px 16px;
  border: 1px solid var(--tech-blue);
  background: rgba(0, 240, 255, 0.1);
  color: var(--tech-blue);
  margin-bottom: 24px;
  box-shadow: 0 0 15px rgba(0, 240, 255, 0.2);
  backdrop-filter: blur(10px);
}

.pulse-dot {
  width: 8px;
  height: 8px;
  background-color: var(--tech-blue);
  border-radius: 50%;
  box-shadow: 0 0 10px var(--tech-blue);
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% { opacity: 1; box-shadow: 0 0 10px var(--tech-blue); }
  50% { opacity: 0.4; box-shadow: 0 0 2px var(--tech-blue); }
  100% { opacity: 1; box-shadow: 0 0 10px var(--tech-blue); }
}

.hero-title {
  font-family: 'Orbitron', sans-serif;
  font-size: clamp(36px, 6vw, 64px);
  font-weight: 900;
  line-height: 1.2;
  margin: 0 0 24px 0;
  letter-spacing: 2px;
}

.text-gradient {
  background: linear-gradient(135deg, #ffffff 0%, var(--tech-blue) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0 0 30px rgba(0, 240, 255, 0.4);
}

.text-outline {
  color: transparent;
  -webkit-text-stroke: 1.5px var(--tech-blue);
  text-shadow: 0 0 15px rgba(0, 240, 255, 0.3);
}

.hero-slogan {
  font-size: 20px;
  font-weight: 400;
  color: var(--text-muted);
  margin: 0 0 24px 0;
  text-shadow: 0 0 10px rgba(125, 211, 252, 0.3);
}

.terminal-box {
  background: rgba(5, 12, 25, 0.8);
  border: 1px solid var(--card-border);
  border-radius: 8px;
  overflow: hidden;
  max-width: 650px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(0, 240, 255, 0.05);
  backdrop-filter: blur(10px);
}

.terminal-header {
  background: rgba(10, 25, 50, 0.9);
  padding: 8px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 1px solid var(--card-border);
}

.terminal-header .dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.dot.red { background: #ef4444; }
.dot.yellow { background: #eab308; }
.dot.green { background: #22c55e; }

.terminal-title {
  margin-left: 10px;
  font-size: 12px;
  color: var(--text-muted);
}

.hero-desc {
  padding: 20px;
  font-size: 14px;
  color: var(--text-main);
  line-height: 1.8;
  margin: 0;
}

.cursor {
  display: inline-block;
  width: 8px;
  animation: blink 1s step-end infinite;
  color: var(--tech-blue);
  font-weight: bold;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

/* Bento Grid */
.bento-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 180px;
  gap: 24px;
  animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards;
  opacity: 0;
}

.col-span-2 { grid-column: span 2; }
.row-span-2 { grid-row: span 2; }

.bento-card {
  position: relative;
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  text-decoration: none;
  color: inherit;
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  backdrop-filter: blur(20px);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  /* Tech cut-out corners effect using clip-path could be added, but border with corner accents is safer */
}

/* Tech Corner Accents */
.card-corner {
  position: absolute;
  width: 15px;
  height: 15px;
  border-color: var(--tech-blue);
  border-style: solid;
  border-width: 0;
  transition: all 0.3s ease;
}

.top-left {
  top: -1px;
  left: -1px;
  border-top-width: 2px;
  border-left-width: 2px;
}

.bottom-right {
  bottom: -1px;
  right: -1px;
  border-bottom-width: 2px;
  border-right-width: 2px;
}

.card-glass {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(0,240,255,0.05) 0%, rgba(0,0,0,0) 100%);
  pointer-events: none;
}

/* Hover effects for interactive cards */
.interactive {
  cursor: pointer;
}

.interactive::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    600px circle at var(--mouse-x) var(--mouse-y),
    rgba(0, 240, 255, 0.15),
    transparent 40%
  );
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: 1;
  pointer-events: none;
}

.interactive:hover::before {
  opacity: 1;
}

.interactive:hover {
  transform: translateY(-4px);
  border-color: var(--tech-blue);
  box-shadow: 0 10px 30px rgba(0, 240, 255, 0.15), inset 0 0 15px rgba(0, 240, 255, 0.1);
  background: rgba(10, 30, 60, 0.8);
}

.interactive:hover .card-corner {
  width: 25px;
  height: 25px;
  box-shadow: 0 0 10px var(--tech-blue);
}

.card-title {
  font-family: 'Orbitron', sans-serif;
  font-size: 24px;
  font-weight: 700;
  margin: 0 0 16px 0;
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--text-main);
  text-shadow: 0 0 10px rgba(0, 240, 255, 0.3);
}

.dim-text {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  color: var(--text-muted);
  font-weight: 400;
  letter-spacing: 1px;
}

.about-card {
  justify-content: space-between;
}

.about-text {
  font-size: 14px;
  line-height: 1.8;
  color: var(--text-muted);
  margin: 0;
}

.contact-links {
  display: flex;
  gap: 16px;
  margin-top: 24px;
}

.social-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid var(--tech-blue-dim);
  font-size: 13px;
  text-decoration: none;
  color: var(--text-main);
  transition: all 0.3s ease;
  z-index: 2;
  position: relative;
  overflow: hidden;
}

.social-btn::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--tech-blue);
  transform: translateX(-100%);
  transition: transform 0.3s ease;
}

.social-btn:hover::after {
  transform: translateX(0);
}

.social-btn:hover {
  background: rgba(0, 240, 255, 0.1);
  border-color: var(--tech-blue);
  color: var(--tech-blue);
  box-shadow: 0 0 15px rgba(0, 240, 255, 0.2);
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.tech-tag {
  padding: 6px 12px;
  background: rgba(0, 240, 255, 0.05);
  border: 1px solid var(--tech-blue-dim);
  color: var(--tech-blue);
  font-size: 12px;
  transition: all 0.3s ease;
}

.tech-tag:hover {
  background: rgba(0, 240, 255, 0.2);
  border-color: var(--tech-blue);
  transform: translateY(-2px);
  box-shadow: 0 0 12px rgba(0, 240, 255, 0.4);
  color: #fff;
}

/* Nav Cards styling */
.nav-card h3 {
  font-family: 'Orbitron', sans-serif;
  font-size: 18px;
  font-weight: 700;
  margin: 0 0 8px 0;
  position: relative;
  z-index: 2;
  color: var(--text-main);
}

.nav-card p {
  font-size: 13px;
  color: var(--text-muted);
  margin: 0;
  position: relative;
  z-index: 2;
}

.nav-icon {
  font-size: 32px;
  margin-bottom: auto;
  position: relative;
  z-index: 2;
  filter: drop-shadow(0 0 10px rgba(0, 240, 255, 0.4));
}

.arrow-indicator {
  position: absolute;
  top: 24px;
  right: 24px;
  font-size: 20px;
  color: var(--tech-blue-dim);
  transition: all 0.3s ease;
  z-index: 2;
}

.nav-card:hover .arrow-indicator {
  color: var(--tech-blue);
  transform: translate(4px, -4px);
  text-shadow: 0 0 10px var(--tech-blue);
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Responsive Design */
@media (max-width: 1024px) {
  .bento-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .bento-grid {
    grid-template-columns: 1fr;
    grid-auto-rows: auto;
  }
  
  .col-span-2, .row-span-2 {
    grid-column: span 1;
    grid-row: auto;
  }
  
  .bento-card {
    min-height: 200px;
  }
  
  .hero-title {
    font-size: 36px;
  }
  
  .contact-links {
    flex-direction: column;
  }
}
</style>
