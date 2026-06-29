<script setup>
const projects = [
  {
    type: 'Agent / RAG',
    title: '基于 RAG 的多模态电商智能导购 Agent',
    description: '面向电商导购场景，组织商品知识库、检索增强问答与 Agent 工具调用，支持多轮交互和推荐理由解释。',
    stack: ['FastAPI', 'RAG', '向量数据库', '多模态检索', 'Agent'],
    highlights: ['商品知识库构建', '检索增强问答', '多轮对话', '推荐解释'],
    link: '/projects/RAG-agent'
  },
  {
    type: 'Deep Learning / CV',
    title: '基于 SIREN 与 PINNs 的激光衍射自动测量系统',
    description: '将图像处理、隐式神经表示与物理约束建模结合，用于激光衍射条纹分析和高精度自动测量。',
    stack: ['PyTorch', 'SIREN', 'PINNs', 'OpenCV', '图像处理'],
    highlights: ['条纹中心定位', '物理约束建模', '亚像素级测量', '实验误差分析'],
    link: '/projects/SIREN-PINNs'
  },
  {
    type: 'Kaggle / Tabular',
    title: 'Spaceship Titanic Kaggle 实战',
    description: '完成从字段理解、缺失值处理和特征工程，到 PyTorch MLP 训练、验证与 Kaggle 提交的完整闭环。',
    stack: ['PyTorch', 'scikit-learn', '特征工程', 'MLP'],
    highlights: ['数据预处理', '缺失值处理', '过拟合分析', '公开榜 0.79845'],
    link: '/kaggle/Spaceship Titanic'
  }
]

const focusAreas = [
  ['RAG / Agent 应用开发', '检索增强、工具调用、多轮对话与可解释推荐'],
  ['PyTorch 深度学习工程实践', '训练流程、模型调优、过拟合控制与实验复盘'],
  ['多模态信息处理', '文本、图像与领域知识的联合检索和处理'],
  ['后端接口与项目工程化', 'FastAPI 接口、模块组织、部署与可维护性']
]
</script>

<template>
  <main class="portfolio-home">
    <section class="portfolio-hero">
      <div class="hero-copy">
        <p class="eyebrow"><span></span> 武汉理工大学 · 陈俊宏</p>
        <h1>把 AI 能力做成<br><em>可运行的应用</em></h1>
        <p class="hero-summary">
          聚焦 AI 应用开发、Agent 开发与后端工程。这里展示项目架构、工程实现、实验结果和问题复盘。
        </p>
        <p class="job-status"><span class="status-dot"></span>正在寻找 AI 应用开发、Agent 开发、后端开发相关实习</p>
        <div class="hero-actions">
          <a class="button primary" href="/my-blog/projects/">查看核心项目 <span>→</span></a>
          <a class="button secondary" href="https://github.com/WHUTcjh-2024" target="_blank" rel="noreferrer">GitHub</a>
          <a class="text-link" href="mailto:570372819@qq.com">570372819@qq.com</a>
        </div>
      </div>

      <aside class="profile-panel" aria-label="个人技术方向">
        <div class="panel-bar">
          <div><span></span><span></span><span></span></div>
          <small>profile.json</small>
        </div>
        <div class="panel-body">
          <p class="code-line"><b>name</b><span>陈俊宏</span></p>
          <p class="code-line"><b>role</b><span>AI Application Developer</span></p>
          <p class="code-line"><b>school</b><span>武汉理工大学</span></p>
          <div class="panel-divider"></div>
          <p class="panel-label">CURRENT FOCUS</p>
          <div class="panel-tags">
            <span>RAG / Agent</span>
            <span>PyTorch</span>
            <span>Multimodal</span>
            <span>FastAPI</span>
          </div>
        </div>
      </aside>
    </section>

    <section class="home-section" aria-labelledby="projects-heading">
      <div class="section-heading">
        <div>
          <p class="section-kicker">Selected work</p>
          <h2 id="projects-heading">核心项目</h2>
        </div>
        <a href="/my-blog/projects/">全部项目 →</a>
      </div>
      <div class="project-grid">
        <a v-for="project in projects" :key="project.title" class="project-card" :href="`/my-blog${project.link}`">
          <span class="project-type">{{ project.type }}</span>
          <h3>{{ project.title }}</h3>
          <p>{{ project.description }}</p>
          <div class="tag-list">
            <span v-for="item in project.stack" :key="item">{{ item }}</span>
          </div>
          <ul>
            <li v-for="item in project.highlights" :key="item">{{ item }}</li>
          </ul>
          <span class="card-link">查看项目复盘 →</span>
        </a>
      </div>
    </section>

    <section class="home-section focus-section" aria-labelledby="focus-heading">
      <div class="section-heading">
        <div>
          <p class="section-kicker">Engineering focus</p>
          <h2 id="focus-heading">关注方向</h2>
        </div>
      </div>
      <div class="focus-grid">
        <article v-for="([title, detail], index) in focusAreas" :key="title">
          <span>0{{ index + 1 }}</span>
          <h3>{{ title }}</h3>
          <p>{{ detail }}</p>
        </article>
      </div>
    </section>

    <section class="notes-entry">
      <div>
        <p class="section-kicker">Supporting notes</p>
        <h2>工程笔记是项目实践的补充</h2>
        <p>记录 PyTorch 训练流程、模型结构、Transformer、Kaggle 实验和常见工程问题，不以教材章节复述为目标。</p>
      </div>
      <a class="button secondary" href="/my-blog/deep-learning/">进入工程笔记</a>
    </section>
  </main>
</template>
