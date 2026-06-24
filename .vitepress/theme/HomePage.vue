<template>
  <div class="home-page">
    <!-- Hero -->
    <section class="hero">
      <div class="hero-badge">
        <span class="badge-icon">✨</span>
        <span class="badge-text">记录学习与实践的每一步</span>
      </div>
      <h1 class="hero-title"><span class="title-ai">AI</span> 是助手，不是主人</h1>
      <div class="hero-actions">
        <a class="btn btn-ghost" href="https://github.com/WHUTcjh-2024" target="_blank">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          GitHub
        </a>
      </div>
    </section>

    <!-- Terminal -->
    <section class="terminal-wrap">
      <div class="terminal">
        <div class="terminal-bar">
          <span class="dot red"></span>
          <span class="dot yellow"></span>
          <span class="dot green"></span>
        </div>
        <div class="terminal-body">
          <div class="term-info">
            <div class="term-row">
              <span class="term-label">姓名</span>
              <span class="term-value">陈俊宏</span>
            </div>
            <div class="term-row">
              <span class="term-label">学校</span>
              <span class="term-value">武汉理工大学</span>
            </div>
            <div class="term-row">
              <span class="term-label">专业</span>
              <span class="term-value">电子信息科学与技术</span>
            </div>
            <div class="term-row">
              <span class="term-label">方向</span>
              <span class="term-value">人工智能 · Agent 开发 · 深度学习</span>
            </div>
          </div>
          <div class="term-info">
            <div class="term-row">
              <span class="term-label">邮箱</span>
              <span class="term-value"><a href="mailto:570372819@qq.com">570372819@qq.com</a></span>
            </div>
            <div class="term-row">
              <span class="term-label">GitHub</span>
              <span class="term-value"><a href="https://github.com/WHUTcjh-2024" target="_blank">github.com/WHUTcjh-2024</a></span>
            </div>
          </div>
          <div class="term-stack">
            <span class="term-tag">Python</span>
            <span class="term-tag">PyTorch</span>
            <span class="term-tag">TensorFlow</span>
            <span class="term-tag">Machine Learning</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 24px 80px;
  min-height: calc(100vh - 64px); /* 减去导航栏高度 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: 'Inter', 'PingFang SC', 'Microsoft YaHei', 'Noto Sans SC',
    -apple-system, BlinkMacSystemFont, sans-serif;
}

/* ========== Hero ========== */
.hero {
  padding: 40px 0 60px;
  text-align: center;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(230, 126, 34, 0.1);
  border: 1px solid rgba(230, 126, 34, 0.2);
  border-radius: 20px;
  margin-bottom: 24px;
  font-size: 14px;
  color: var(--vp-c-brand-1);
}

.badge-icon {
  font-size: 16px;
}

.hero-title {
  margin: 0 0 32px;
  font-size: 56px;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.03em;
  color: var(--vp-c-text-1);
  font-family: 'Inter', 'SF Pro Display', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 50%, #2c3e50 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.title-ai {
  font-weight: 400;
}

.dark .hero-title {
  background: linear-gradient(135deg, #ffffff 0%, #f0f0f0 50%, #ffffff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 32px;
}

/* ========== Button ========== */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s ease;
}

.btn-primary {
  background: var(--vp-c-brand-1);
  color: white;
  border: none;
}

.btn-primary:hover {
  background: var(--vp-c-brand-2);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(230, 126, 34, 0.3);
}

.btn-ghost {
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
  background: transparent;
}

.btn-ghost:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}

:deep(.dark) .btn-primary {
  background: var(--vp-c-brand-1);
  color: #1a1612;
}

:deep(.dark) .btn-primary:hover {
  background: var(--vp-c-brand-3);
  box-shadow: 0 4px 12px rgba(243, 156, 18, 0.3);
}

/* ========== Terminal ========== */
.terminal-wrap {
  margin-top: -20px;
  margin-bottom: 64px;
}

.terminal {
  border-radius: 16px;
  overflow: hidden;
  background: #ffffff;
  border: 1px solid rgba(230, 126, 34, 0.1);
  box-shadow:
    0 2px 4px rgba(230, 126, 34, 0.04),
    0 4px 8px rgba(230, 126, 34, 0.06),
    0 8px 16px rgba(230, 126, 34, 0.08),
    0 16px 32px rgba(230, 126, 34, 0.1),
    0 24px 48px rgba(230, 126, 34, 0.08),
    0 32px 64px rgba(230, 126, 34, 0.06),
    0 40px 80px rgba(230, 126, 34, 0.04),
    0 48px 96px rgba(230, 126, 34, 0.02);
  position: relative;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

.terminal:hover {
  box-shadow:
    0 2px 4px rgba(230, 126, 34, 0.06),
    0 4px 8px rgba(230, 126, 34, 0.08),
    0 8px 16px rgba(230, 126, 34, 0.12),
    0 16px 32px rgba(230, 126, 34, 0.14),
    0 24px 48px rgba(230, 126, 34, 0.12),
    0 32px 64px rgba(230, 126, 34, 0.1),
    0 40px 80px rgba(230, 126, 34, 0.06),
    0 48px 96px rgba(230, 126, 34, 0.04);
  transform: translateY(-2px);
}

.dark .terminal {
  background: #3a3a3a;
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.1),
    0 4px 8px rgba(0, 0, 0, 0.15),
    0 8px 16px rgba(0, 0, 0, 0.2),
    0 16px 32px rgba(0, 0, 0, 0.25),
    0 24px 48px rgba(0, 0, 0, 0.2),
    0 32px 64px rgba(0, 0, 0, 0.15),
    0 40px 80px rgba(0, 0, 0, 0.1),
    0 48px 96px rgba(0, 0, 0, 0.08);
}

.dark .terminal:hover {
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.15),
    0 4px 8px rgba(0, 0, 0, 0.2),
    0 8px 16px rgba(0, 0, 0, 0.25),
    0 16px 32px rgba(0, 0, 0, 0.3),
    0 24px 48px rgba(0, 0, 0, 0.25),
    0 32px 64px rgba(0, 0, 0, 0.2),
    0 40px 80px rgba(0, 0, 0, 0.15),
    0 48px 96px rgba(0, 0, 0, 0.1);
}

.terminal-bar {
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  background: #f8f8f8;
  border-bottom: 1px solid #e8e8e8;
}

.dark .terminal-bar {
  background: #1a1a1a;
  border-bottom-color: #2a2a2a;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.dot.red { background: #ef4444; }
.dot.yellow { background: #f59e0b; }
.dot.green { background: #22c55e; }

.terminal-title {
  margin-left: 8px;
  font-size: 13px;
  font-weight: 500;
  color: #666;
}

.dark .terminal-title {
  color: #aaa;
}

.terminal-body {
  padding: 28px 36px;
  font-size: 14px;
  line-height: 1.8;
  background: #ffffff;
}

.dark .terminal-body {
  background: #0d0d0d;
}

.term-info {
  margin-bottom: 24px;
}

.term-row {
  display: flex;
  gap: 12px;
  padding: 8px 0;
}

.term-label {
  font-size: 13px;
  color: var(--vp-c-text-3);
  min-width: 32px;
}

.term-value {
  color: var(--vp-c-text-1);
}

.term-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding-top: 20px;
  border-top: 1px solid var(--vp-c-divider);
}

.term-tag {
  padding: 6px 14px;
  background: rgba(230, 126, 34, 0.12);
  border: 1px solid rgba(230, 126, 34, 0.2);
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  color: var(--vp-c-brand-1);
  transition: all 0.2s ease;
}

.term-tag:hover {
  background: var(--vp-c-brand-1);
  color: white;
  border-color: var(--vp-c-brand-1);
}

/* 暗色模式终端 */
:deep(.dark) .terminal {
  background: #3a3a3a;
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.1),
    0 4px 8px rgba(0, 0, 0, 0.15),
    0 8px 16px rgba(0, 0, 0, 0.2),
    0 16px 32px rgba(0, 0, 0, 0.25),
    0 24px 48px rgba(0, 0, 0, 0.2),
    0 32px 64px rgba(0, 0, 0, 0.15),
    0 40px 80px rgba(0, 0, 0, 0.1),
    0 48px 96px rgba(0, 0, 0, 0.08);
}

:deep(.dark) .terminal:hover {
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.15),
    0 4px 8px rgba(0, 0, 0, 0.2),
    0 8px 16px rgba(0, 0, 0, 0.25),
    0 16px 32px rgba(0, 0, 0, 0.3),
    0 24px 48px rgba(0, 0, 0, 0.25),
    0 32px 64px rgba(0, 0, 0, 0.2),
    0 40px 80px rgba(0, 0, 0, 0.15),
    0 48px 96px rgba(0, 0, 0, 0.1);
}

:deep(.dark) .terminal-bar {
  background: #444;
  border-bottom-color: #555;
}

:deep(.dark) .terminal-body {
  background: #3a3a3a;
}

:deep(.dark) .term-tag:hover {
  background: var(--vp-c-brand-3);
  color: #3a3a3a;
  border-color: var(--vp-c-brand-3);
}

/* ========== Cards ========== */
.cards {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 48px;
}

.card {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 24px 32px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.2s ease;
}

.card:hover {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-bg-mute);
  transform: translateX(4px);
}

.card-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: rgba(230, 126, 34, 0.12);
  border-radius: 10px;
  color: var(--vp-c-brand-1);
  flex-shrink: 0;
}

.card-body {
  flex: 1;
}

.card-body h3 {
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0 0 4px;
}

.card-body p {
  font-size: 13px;
  color: var(--vp-c-text-3);
  margin: 0;
}

.card-arrow {
  color: var(--vp-c-text-3);
  transition: all 0.2s ease;
}

.card:hover .card-arrow {
  color: var(--vp-c-brand-1);
  transform: translateX(4px);
}

:deep(.dark) .card {
  background: var(--vp-c-bg-soft);
  border-color: var(--vp-c-divider);
}

:deep(.dark) .card:hover {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-bg-mute);
}

/* ========== Footer ========== */
.footer {
  text-align: center;
  padding: 24px 0;
  border-top: 1px solid var(--vp-c-divider);
  font-size: 13px;
  color: var(--vp-c-text-3);
}

.footer a {
  color: var(--vp-c-text-2);
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer a:hover {
  color: var(--vp-c-brand-1);
}

.dot-sep {
  margin: 0 8px;
}

/* ========== Responsive ========== */
@media (max-width: 640px) {
  .hero {
    padding: 100px 0 48px;
  }

  .hero-badge {
    padding: 6px 12px;
    font-size: 13px;
    margin-bottom: 20px;
  }

  .hero-title {
    font-size: 36px;
    margin-bottom: 24px;
    letter-spacing: -0.02em;
  }

  .hero-actions {
    flex-direction: column;
    align-items: center;
    margin-top: 24px;
  }

  .terminal-wrap {
    margin-top: 32px;
    margin-bottom: 48px;
  }

  .terminal-body {
    padding: 20px 24px;
  }

  .term-row {
    padding: 6px 0;
  }

  .term-stack {
    gap: 8px;
    padding-top: 16px;
  }

  .card {
    padding: 16px 20px;
    gap: 14px;
  }

  .card-icon {
    width: 40px;
    height: 40px;
  }

  .card-icon svg {
    width: 20px;
    height: 20px;
  }

  .card-body h3 {
    font-size: 15px;
  }

  .footer {
    font-size: 12px;
  }
}
</style>
