import{_ as n,o as s,c as e,a0 as p}from"./chunks/framework.-mROjw-3.js";const x=JSON.parse('{"title":"深度卷积神经网络 AlexNet","description":"","frontmatter":{},"headers":[],"relativePath":"深度卷积神经网络.md","filePath":"深度卷积神经网络.md"}'),l={name:"深度卷积神经网络.md"};function t(i,a,c,o,r,_){return s(),e("div",null,[...a[0]||(a[0]=[p(`<h1 id="深度卷积神经网络-alexnet" tabindex="-1">深度卷积神经网络 AlexNet <a class="header-anchor" href="#深度卷积神经网络-alexnet" aria-label="Permalink to &quot;深度卷积神经网络 AlexNet&quot;">​</a></h1><p>这里简单阐述一下AlexNet的我对个人理解。</p><p>AlexNet的典型结构大致是这样的：</p><div class="language-text vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">text</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>输入</span></span>
<span class="line"><span>→ 卷积层</span></span>
<span class="line"><span>→ ReLU</span></span>
<span class="line"><span>→ 池化</span></span>
<span class="line"><span>→ 卷积层</span></span>
<span class="line"><span>→ ReLU</span></span>
<span class="line"><span>→ 池化</span></span>
<span class="line"><span>→ 卷积层</span></span>
<span class="line"><span>→ 卷积层</span></span>
<span class="line"><span>→ 卷积层</span></span>
<span class="line"><span>→ 池化</span></span>
<span class="line"><span>→ 全连接层</span></span>
<span class="line"><span>→ 全连接层</span></span>
<span class="line"><span>→ 全连接层</span></span>
<span class="line"><span>→ 输出</span></span></code></pre></div><h1 id="alexnet比传统的cnn强" tabindex="-1">AlexNet比传统的CNN强 <a class="header-anchor" href="#alexnet比传统的cnn强" aria-label="Permalink to &quot;AlexNet比传统的CNN强&quot;">​</a></h1><p>AlexNet的层数更多，然后它常用的激活函数是ReLU,训练比较块，而且它十分依赖GPU，所以与现代的算力结合的比较深，另外它使用了Dropout和数据增强等技巧来减轻过拟合。</p><p>AlexNet 是一个把卷积神经网络从“学术可行”推进到“工业可用”的经典深度模型。</p>`,7)])])}const h=n(l,[["render",t]]);export{x as __pageData,h as default};
