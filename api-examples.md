---
outline: deep
---

# 学习小记

## 前端基础

### JavaScript 异步编程

JavaScript 的异步编程经历了从回调函数到 Promise 再到 async/await 的演进过程。

**回调函数时代**的嵌套问题：

```js
getData(function(a) {
  getMoreData(a, function(b) {
    getEvenMoreData(b, function(c) {
      console.log(c)
    })
  })
})
```

**Promise** 让代码更加扁平：

```js
getData()
  .then(a => getMoreData(a))
  .then(b => getEvenMoreData(b))
  .then(c => console.log(c))
```

**async/await** 让异步代码读起来像同步代码：

```js
async function fetchData() {
  const a = await getData()
  const b = await getMoreData(a)
  const c = await getEvenMoreData(b)
  console.log(c)
}
```

### CSS 布局技巧

Flexbox 和 Grid 是现代 CSS 布局的两大利器：

```css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}
```

## 计算机网络

### TCP 三次握手

1. **第一次握手**：客户端发送 SYN 包，进入 SYN_SENT 状态
2. **第二次握手**：服务端收到后回复 SYN+ACK，进入 SYN_RCVD 状态
3. **第三次握手**：客户端发送 ACK，双方进入 ESTABLISHED 状态

> 三次握手的核心目的是确保双方都能正常收发数据，防止历史连接的建立。

### HTTP 与 HTTPS

HTTPS 在 HTTP 的基础上增加了 TLS 加密层，保证了数据传输的安全性。主要区别：

| 特性 | HTTP | HTTPS |
|------|------|-------|
| 端口 | 80 | 443 |
| 安全性 | 明文传输 | 加密传输 |
| 证书 | 不需要 | 需要 CA 证书 |

## 操作系统

### 进程与线程

**进程**是资源分配的基本单位，**线程**是 CPU 调度的基本单位。一个进程可以包含多个线程，它们共享进程的内存空间。

::: tip
线程切换的开销远小于进程切换，因此多线程编程在提高并发性能方面具有天然优势。
:::

::: warning
多线程编程需要注意线程安全问题，合理使用锁机制避免竞态条件。
:::

## 更多

以上是我近期学习的一些笔记，后续会持续更新。欢迎交流讨论！
