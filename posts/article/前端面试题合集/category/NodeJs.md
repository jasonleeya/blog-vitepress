---
category: NodeJs
order: 14
---
<script setup>
import NavHead from "../components/NavHead.vue";
</script>
<nav-head link="/article/前端面试题合集/read.html">
</nav-head>

# NodeJs

## 说说你对Node.js 的理解？优缺点？应用场景？

## Node.js 中的非阻塞 I/O 是什么？如何实现？

## Node.js 的单线程模型有什么优缺点？

## 解释 Node.js 的事件循环机制及其工作原理

## 什么是事件循环的 “Tick”？

## Node.js 中的模块系统是如何工作的？

## CommonJS 模块和 ES 模块的区别是什么？

## 说说Node中的 EventEmitter? 如何实现一个 EventEmitter?

## 解释事件循环的各个阶段（如 timers、poll、check）

## 如何用 Worker Threads 实现多线程？

## 说说对 Node 中的 Stream 的理解？应用场景？

## 解释 stream 模块中的可读流、可写流、双工流和转换流

## 说说对 Node 中的 Buffer 的理解？应用场景？

## 说说对 Node 中的 fs 模块的理解? 有哪些常用方法

## 解释 setImmediate 和 process.nextTick 的区别

## process.nextTick 和 Promise.then 谁先执行？

## 如何实现并行和串行的异步操作？

## 请介绍 Node.js 中的事件驱动架构，它与传统线程模型有什么区别？

## 如何用 crypto 模块进行加密/解密？

## zlib 模块的作用是什么？如何压缩数据？

## Node 中的 process 的理解？有哪些常用方法？

## Node.js 有哪些全局对象？

## common.js和es6中模块引入的区别？

## 浏览器 和 Node 事件循环有区别吗？

## 什么是回调地狱？Node 中如何避免？

## 如何在 Node.js 中实现模块化开发？

## 如何在 Node.js 中实现跨域资源共享（CORS）？

## 什么是 WebSocket？如何在 Node.js 中实现 WebSocket 服务器？

## 如何在 Node.js 中实现日志记录

## 在 Node.js 中，如何获取命令行参数？

## process.nextTick, setTimeout 以及 setImmediate 三者的执行顺序？

在 Node.js 中，`process.nextTick`、`setTimeout` 和 `setImmediate` 是三种用于在事件循环的不同阶段执行回调函数的方法。它们的执行顺序遵循特定的规则，这取决于事件循环的阶段。以下是这三者的执行顺序和细节：

**1. `process.nextTick`**

- **描述**：`process.nextTick` 的回调函数会在当前操作完成后、事件循环的下一轮开始前立即执行。
- **执行时机**：在当前执行栈中的所有代码运行完后，`process.nextTick` 队列中的回调函数会被执行。它的优先级高于 `setTimeout` 和 `setImmediate`。

**2. `setTimeout`**

- **描述**：`setTimeout` 用于设置一个定时器，在指定的延迟时间后执行回调函数。
- **执行时机**：`setTimeout` 的回调函数在指定的延迟时间后执行，具体的执行时间取决于事件循环的空闲状态和系统定时器的精度。即使延迟时间是 0，`setTimeout` 也不会立即执行，而是会等到当前操作结束并进入下一轮事件循环后执行。

**3. `setImmediate`**

- **描述**：`setImmediate` 用于在当前事件循环的剩余部分执行回调函数。它在 I/O 事件之后执行回调。
- **执行时机**：`setImmediate` 的回调函数会在当前事件循环的所有 `poll` 阶段处理完成后执行。如果在事件循环的 `poll` 阶段没有其他 I/O 事件，它会尽快执行。

**执行顺序示例**

```javascript
1console.log('Start');

process.nextTick(() => {
  console.log('process.nextTick');
});

setTimeout(() => {
  console.log('setTimeout');
}, 0);

setImmediate(() => {
  console.log('setImmediate');
});

console.log('End');
```

**输出顺序**

1. **`Start`** - `console.log` 执行
2. **`End`** - `console.log` 执行
3. **`process.nextTick`** - `process.nextTick` 回调执行
4. **`setTimeout`** - `setTimeout` 回调执行
5. **`setImmediate`** - `setImmediate` 回调执行



## 说说 express 中间件的工作原理

**1. 中间件的定义**

中间件是一个函数，它接收请求对象 (`req`)、响应对象 (`res`) 和一个 `next` 函数。中间件函数可以对请求进行处理、修改响应、终止请求-响应周期，或者将请求传递给下一个中间件。

**2. 中间件的使用**

中间件在 Express 应用程序中通过 `app.use()` 或者其他 HTTP 方法 (`app.get()`, `app.post()`, 等) 被注册。它们会按顺序执行。

**3. 中间件工作流程**

1. **请求到达**：
   - 当一个 HTTP 请求到达 Express 应用时，请求会从顶部开始传递给中间件链中的第一个中间件函数。
2. **中间件执行**：
   - 每个中间件函数可以对请求进行处理，比如修改请求对象 (`req`)、响应对象 (`res`)，或者执行某些操作（如日志记录、身份验证等）。
   - 中间件可以通过调用 `next()` 函数将控制权传递给下一个中间件函数。如果不调用 `next()`，请求-响应周期会被中断，响应不会发送给客户端。
3. **传递到下一个中间件**：
   - 控制权转移到下一个中间件函数，直到所有中间件都执行完成，或者找到一个能够终止请求-响应周期的中间件。
   - 如果请求没有被终止且所有中间件都执行完成，Express 会将请求传递到定义的路由处理函数（如果有的话），最后发送响应给客户端。
4. **响应处理**：
   - 最终的响应由最后一个中间件或路由处理函数生成并发送给客户端。如果某个中间件终止了请求-响应周期（比如通过 `res.send()` 或 `res.end()`），则后续的中间件将不会被执行。

**4. 中间件类型**

1. **应用级中间件**：

   - 使用 `app.use()` 注册的中间件，它们可以是所有路由的通用中间件，也可以针对特定路径。

   - 示例：

     ```javascript
     app.use((req, res, next) => {
         console.log('Request received');
         next();
     });
     ```

2. **路由级中间件**：

   - 绑定到特定路由的中间件，仅在请求匹配到指定路由时才会执行。

   - 示例：

     ```javascript
     app.get('/user/:id', (req, res, next) => {
         console.log('User ID:', req.params.id);
         next();
     });
     ```

3. **错误处理中间件**：

   - 用于处理错误的中间件，通常有四个参数 (`err`, `req`, `res`, `next`)。

   - 示例：

     ```javascript
     app.use((err, req, res, next) => {
         console.error(err.stack);
         res.status(500).send('Something broke!');
     });
     ```

4. **内置中间件**：

   - Express 内置的中间件，如 `express.json()` 和 `express.static()`。

   - 示例：

     ```javascript
     app.use(express.json()); // 解析 JSON 请求体
     app.use(express.static('public')); // 提供静态文件
     ```

## 怎么进行 Node 服务的内存优化？

优化 Node.js 应用的内存使用可以显著提高应用性能和稳定性。以下是一些针对 Node.js 内存优化的策略和技巧：

**1. 了解内存使用**

- 使用工具：
  - **`process.memoryUsage()`**：可以查看 Node.js 进程的内存使用情况。
  - **Chrome DevTools**：可以进行内存快照分析，帮助找出内存泄漏和不必要的内存占用。
  - **`heapdump`**：用于生成堆快照，以便离线分析内存使用情况。

**2. 避免内存泄漏**

- **监控和排查**：
  - 定期使用工具检查内存快照，特别是在应用运行一段时间后，检查是否存在内存持续增长的情况。
  - 使用 **`--trace_gc`** 启动标志查看垃圾回收日志，帮助诊断内存问题。
- **注意**：
  - **全局变量**：避免不必要的全局变量，因为它们会一直存在于内存中。
  - **闭包**：谨慎使用闭包，确保不持有对大对象的引用，避免意外的内存占用。
  - **事件监听器**：在不再需要时，记得移除事件监听器，避免内存泄漏。

**3. 优化数据处理**

- **流式处理**：

  - 使用流（Streams）处理大数据集，避免一次性将整个数据集加载到内存中。使用 `stream` 模块进行数据的分块处理。

  ```javascript
  const fs = require('fs');
  const readStream = fs.createReadStream('large-file.txt');
  readStream.on('data', (chunk) => {
    // 处理数据块
  });
  ```

- **数据结构**：

  - 使用高效的数据结构来管理数据，例如选择合适的缓存策略，避免不必要的数据复制和存储。

**4. 进行性能调优**

- **垃圾回收（GC）**：

  - 调整垃圾回收参数，以优化垃圾回收行为。例如，使用 `--max-old-space-size` 调整最大内存限制。

  ```
  node --max-old-space-size=4096 app.js
  ```

- **线程池**：

  - 调整 Node.js 线程池大小，优化对并发操作的支持。使用 `UV_THREADPOOL_SIZE` 环境变量设置线程池的大小。

  ```
  UV_THREADPOOL_SIZE=8 node app.js
  ```

**5. 代码优化**

- **避免内存占用高的操作**：

  - 减少复杂计算和内存占用高的操作，尽量使用高效算法和数据结构。

- **缓存优化**：

  - 使用缓存策略（例如 LRU 缓存）来管理和清理缓存数据，避免缓存无限增长。

  ```javascript
  const LRU = require('lru-cache');
  const cache = new LRU({ max: 1000 });
  ```

**6. 依赖管理**

- **更新依赖**：
  - 确保所有依赖都保持最新版本，因为许多内存问题和性能问题可能已经在新版本中修复。
- **避免过度依赖**：
  - 只使用必要的依赖库，避免引入不必要的内存开销。

**7. 内存限制和监控**

- **限制内存使用**：
  - 设置合理的内存限制来防止应用过度消耗内存，使用 `--max-old-space-size` 参数设置 Node.js 进程的最大内存使用量。
- **监控工具**：
  - 使用工具如 **`pm2`** 或 **`forever`** 进行生产环境的内存监控和管理。

## Node性能如何进行监控以及优化？

## 如何实现文件上传？说说你的思路

## 如果让你来设计一个分页功能, 你会怎么设计? 前后端如何交互?

## 如何实现 jwt 鉴权机制？说说你的思路



##  怎么在 koa 中，进行中间件的异常处理？

在 Koa 中，中间件的异常处理是一个重要的部分，可以通过以下几种方式来实现：

**1. 使用 `try...catch` 捕获异常**

- **概述**：在 Koa 的中间件中，可以使用 `try...catch` 块来捕获和处理异步操作中的异常。这样可以确保即使中间件出现错误，服务器不会崩溃。

- 实现：

  ```javascript
  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      ctx.status = err.status || 500;
      ctx.body = {
        message: err.message
      };
      // 可选：记录错误
      console.error(err);
    }
  });
  ```

**2. 使用 `onerror` 事件处理**

- **概述**：Koa 的 `app.onerror` 事件可以用来处理未捕获的异常。这种方式适合全局处理所有未被捕获的错误。

- 实现：

  ```javascript
  const Koa = require('koa');
  const app = new Koa();
  
  app.onerror = (err, ctx) => {
    ctx.status = err.status || 500;
    ctx.body = {
      message: err.message
    };
    // 可选：记录错误
    console.error(err);
  };
  
  app.use(async (ctx, next) => {
    throw new Error('Something went wrong!');
  });
  
  app.listen(3000);
  ```

**3. 使用第三方中间件**

- **概述**：使用第三方中间件可以简化错误处理，例如 `koa-err`。

- 实现：

  ```javascript
  const Koa = require('koa');
  const err = require('koa-err');
  const app = new Koa();
  
  app.use(err({
    // 这里可以配置错误处理选项
  }));
  
  app.use(async (ctx, next) => {
    throw new Error('Something went wrong!');
  });
  
  app.listen(3000);
  ```

**4. 异常处理中间件的顺序**

- **概述**：确保异常处理的中间件放在其他中间件的最后，这样它可以捕获之前中间件中发生的所有异常。

- 实现：

  ```javascript
  复制const Koa = require('koa');
  const app = new Koa();
  
  app.use(async (ctx, next) => {
    // 这里是正常的中间件逻辑
    await next();
  });
  
  // 异常处理中间件应在所有其他中间件之后
  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      ctx.status = err.status || 500;
      ctx.body = {
        message: err.message
      };
      console.error(err);
    }
  });
  
  app.listen(3000);
  ```

## 单线程的 nodejs 是如何充分利用计算机 CPU 资源的呢？


Node.js 是单线程的，但它可以通过以下方式有效地利用计算机的 CPU 资源：

**1. 异步 I/O 操作**

- **概念**：Node.js 使用异步非阻塞 I/O 操作，这意味着它在等待 I/O 操作（如文件读写、网络请求）完成时不会阻塞主线程。
- **实现**：Node.js 的异步 I/O 操作由底层的 libuv 库管理，libuv 使用线程池来处理这些 I/O 操作。当 I/O 操作完成后，回调函数会被触发，主线程继续执行其他任务。

**2. 事件循环（Event Loop）**

- **概念**：事件循环是 Node.js 的核心机制，它管理异步操作的执行。事件循环不断检查事件队列并执行相应的回调函数。
- **实现**：事件循环使得 Node.js 能够在处理 I/O 操作时继续处理其他任务，而不是阻塞线程等待 I/O 完成。

**3. libuv 线程池**

- **概念**：libuv 是 Node.js 的底层库，提供了跨平台的异步 I/O 操作。它内部包含一个线程池，用于处理一些需要阻塞的操作（如文件系统操作、DNS 查询等）。
- **实现**：libuv 线程池允许 Node.js 在进行这些阻塞操作时，不影响主线程的运行。线程池的任务完成后，结果会被传递回事件循环中的回调函数。

**4. Worker Threads**

- **概念**：Node.js 也提供了 `worker_threads` 模块，可以在多线程环境中运行 JavaScript 代码。
- **实现**：通过 `worker_threads`，Node.js 可以创建多个线程，这些线程可以并行地处理计算密集型任务，而主线程继续处理事件循环。这使得 Node.js 能够利用多核 CPU 的能力。

**5. Cluster 模块**

- **概念**：Node.js 的 `cluster` 模块允许创建多个进程，每个进程都有自己的事件循环和内存空间，但它们可以共享端口和负载均衡。
- **实现**：使用 `cluster` 模块，可以充分利用多核 CPU。每个子进程（工作进程）处理不同的请求，而主进程负责负载均衡和管理。

## cluster 模块如何实现多进程？

## Node.js 的垃圾回收机制是如何工作的？

## 解释V8引擎的优化策略（如内联缓存、隐藏类）

## 说说对 node 子进程的了解

Node.js 的子进程模块允许你创建和管理子进程，以便执行系统命令、运行脚本或处理后台任务。子进程的使用场景包括处理大量计算任务、执行外部命令、并行处理等。Node.js 提供了 `child_process` 模块来支持这些功能。以下是对 Node.js 子进程的详细了解：

**1. 子进程模块（`child_process`）**

Node.js 的 `child_process` 模块提供了几种创建子进程的方法：

- `exec(command[, options], callback)`：运行一个命令，并且缓冲整个命令的输出，适合处理小型任务。
- `execFile(file[, args][, options], callback)`：直接运行一个可执行文件，不会先启动一个 shell。适合执行外部程序。
- `spawn(command[, args][, options])`：启动一个新进程来执行指定的命令，可以流式处理数据。适合处理长时间运行的任务。
- `fork(modulePath[, args][, options])`：创建一个新的 Node.js 子进程来执行指定的模块，并且自动为子进程建立通信通道。适合在 Node.js 环境中处理并行任务。

**2. 使用示例**

**2.1 exec**

`exec` 适合用于执行简单的系统命令并获取结果：

```javascript
const { exec } = require('child_process');

exec('ls -l', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);
});
```

**2.2 execFile**

`execFile` 直接运行指定的文件：

```javascript
const { execFile } = require('child_process');

execFile('node', ['--version'], (error, stdout, stderr) => {
  if (error) {
    console.error(`execFile error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);
});
```

**2.3 spawn**

`spawn` 启动一个新进程，并且可以处理流数据：

```javascript
const { spawn } = require('child_process');

const ls = spawn('ls', ['-l']);

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

ls.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});
```

**2.4 fork**

`fork` 创建一个新的 Node.js 子进程，并且可以通过 IPC 通信：

**父进程（parent.js）**：

```javascript
const { fork } = require('child_process');

const child = fork('./child.js');

child.on('message', (message) => {
  console.log(`Received message from child: ${message}`);
});

child.send('Hello from parent');
```

**子进程（child.js）**：

```javascript
process.on('message', (message) => {
  console.log(`Received message from parent: ${message}`);
  process.send('Hello from child');
});
```

**3. 子进程与父进程的通信**

- **标准输入/输出**：子进程可以通过 `stdin`、`stdout` 和 `stderr` 流与父进程通信。
- **IPC（Inter-Process Communication）**：通过 `fork` 创建的子进程可以使用 `process.send()` 和 `process.on('message', callback)` 进行通信。

**4. 注意事项**

- **资源管理**：需要适当管理子进程的资源，确保子进程在完成任务后正确退出。
- **错误处理**：应处理子进程中的错误，以防止未处理的异常导致程序崩溃。
- **性能影响**：创建和管理大量子进程可能会影响性能，通常需要根据具体场景选择合适的进程管理策略。

通过以上功能，Node.js 的子进程模块能够帮助开发者在 Node.js 环境中实现并行处理和系统命令执行等功能，从而提升应用的处理能力和性能。

## 如何用child_process模块执行外部命令？

## Node.js 是单线程的，那该如何充分利用多核 CPU 呢？

虽然 Node.js 是单线程运行的，但可以通过多种方式利用多核 CPU 来提升性能，尤其是在需要处理大量并发请求或计算密集型任务时。

以下是常用的多核利用方案：

1. **使用 Cluster 模块**

- **原理**：Cluster 模块可以轻松地创建多个 Node.js 进程（称为工作进程），每个进程都运行相同的代码，并共享相同的服务器端口。
- **实现**：在主进程中创建多个子进程，每个子进程独立运行，分配给 CPU 核心，让多个进程共享负载。Cluster 模块会自动根据系统的核心数量生成对应数量的子进程，以提高多核利用率。

**示例代码**：

```javascript
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.log(`主进程 ${process.pid} 正在运行`);

  // 为每个 CPU fork 一个工作进程
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`工作进程 ${worker.process.pid} 已退出`);
    // 这里可以设置重新 fork 新的进程，以保证服务的高可用
    cluster.fork();
  });
} else {
  // 工作进程可以共享相同的 TCP 连接
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end('Hello World\n');
  }).listen(8000);

  console.log(`工作进程 ${process.pid} 已启动`);
}
```

2. **使用 Child Process 模块**

- **原理**：`child_process` 模块允许 Node.js 创建独立的子进程并与主进程进行通信，适用于需要在主进程之外完成计算密集型任务的情况。
- **实现**：通过 `fork()`、`exec()`、`spawn()` 等方法创建子进程并执行任务，可以利用不同的 CPU 核心来分担计算负载。

**示例代码**：

```javascript
const { fork } = require('child_process');

// 创建一个子进程
const compute = fork('./compute.js'); // 假设有一个计算密集型的文件 compute.js

compute.on('message', result => {
  console.log('从子进程收到结果:', result);
});

// 发送任务到子进程
compute.send('开始计算');
```

3. **使用 Worker Threads 模块**

- **原理**：Worker Threads 模块允许在单个 Node.js 进程中创建多个线程，用于运行 JavaScript。每个线程都有自己的事件循环，适合计算密集型任务且避免了进程间的资源开销。
- **实现**：在主线程中启动多个 worker 线程来并行处理任务，通过共享 `SharedArrayBuffer` 或传递消息实现数据共享与通信。

**示例代码**：

```javascript
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

if (isMainThread) {
  // 主线程
  const worker = new Worker(__filename, { workerData: 42 });
  worker.on('message', (message) => {
    console.log('主线程收到消息:', message);
  });
} else {
  // 子线程
  const result = workerData * 2; // 简单的计算任务
  parentPort.postMessage(result);
}
```

4. **负载均衡和反向代理**

- **原理**：通过 Nginx 或 PM2 等工具对多个 Node.js 进程进行负载均衡，将请求分配给不同进程以充分利用多核 CPU。
- **实现**：例如使用 Nginx 作为反向代理，配置多个 Node.js 服务实例并进行轮询分发；或使用 PM2 启动集群模式，自动管理 Node.js 进程和多核利用。

5. **使用 PM2 集群模式**

- **原理**：PM2 是一个强大的进程管理器，支持多核自动分配。它可以一键启动多个 Node.js 实例，让每个实例利用不同的 CPU 核心，并管理进程状态，自动重启失败进程。
- **实现**：PM2 的集群模式可根据服务器的 CPU 核心数量自动启动等量的进程。

**命令示例**：

```javascript
pm2 start app.js -i max  # 自动根据 CPU 核数启动进程
pm2 start app.js -i 4    # 手动指定 4 个进程
```

## Node.js 中的 exec、execFile、spawn 和 fork 有什么区别？

## 说说对中间件概念的理解，如何封装 node 中间件？

## express middleware(中间件) 工作原理是什么？

## 如何在 Express 中实现路由参数校验

## express 里面的"中间件"和"插件"是同一个东西吗？

在 **Express** 中，**中间件（Middleware）** 和 **插件（Plugin）** 并不是完全一样的概念，虽然它们在某些场景下可能有重叠，但实际上有不同的含义和用途。

1. **中间件（Middleware）**

中间件是指在请求-响应周期中间的函数，用于处理请求、响应、以及错误处理等。每个中间件函数都可以访问请求对象（`req`）、响应对象（`res`）和下一个中间件（`next`）。中间件是 Express 框架的核心部分，可以在请求到达路由之前，或响应返回给客户端之前进行处理。

- **功能**：处理请求数据、验证权限、解析请求体、日志记录、处理跨域请求等。
- **用法**：你可以通过 `app.use()`、`app.get()`、`app.post()` 等方法来挂载中间件。

**示例**：

```javascript
// 例子：一个简单的日志中间件
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next(); // 必须调用 next() 才能继续下一个中间件
});
```

- **顺序性**：中间件是有执行顺序的，Express 按照添加的顺序执行中间件。
- **作用范围**：中间件可以针对所有路由（全局中间件）或特定的路由路径（局部中间件）进行处理。

2. **插件（Plugin）**

插件通常是指可以扩展应用功能的模块或工具，它们通常是一个外部库或包，能为 Express 添加额外的功能。插件可以是中间件的一部分，但更广泛的概念是指任何能够增强或扩展 Express 功能的工具。

在 Express 中，插件通常是通过 `npm` 安装的库，这些库会以中间件的形式集成到你的应用中，也可能会提供一些额外的功能，比如数据库连接、认证、文件上传等。

**示例**：

- **插件示例**：`express-session`、`body-parser`、`cors` 等，这些都可以视为 Express 插件，它们提供额外的功能，通常是通过中间件的形式使用的。

```javascript
const session = require('express-session');
app.use(session({ secret: 'mySecret', resave: false, saveUninitialized: true }));
```

- 插件不仅仅是中间件，也可能提供其他功能，比如路由管理、扩展请求和响应对象的方法等。

中间件和插件的区别：

1. **作用**：
   - **中间件** 是在请求-响应周期中执行的函数，用于处理请求和响应。
   - **插件** 是外部模块，通常用来扩展 Express 的功能，可能会通过中间件、路由或其他方式集成。
2. **使用方式**：
   - 中间件是手动添加到应用中的（使用 `app.use()` 或 `router.use()`）。
   - 插件通常是通过安装外部库实现，安装后也有可能以中间件的形式添加到应用中。
3. **灵活性**：
   - 中间件通常是开发者在应用中编写的自定义逻辑。
   - 插件是由第三方库或开发者提供的，可以快速扩展应用的功能。
4. **功能范围**：
   - 中间件通常只是在请求-响应周期中起作用，处理特定的逻辑。
   - 插件通常包含更多的功能，可能不仅仅是处理请求，还可以增加额外的应用特性。

例子：

- **中间件**：请求日志、中间件验证、权限检查、数据处理。
- **插件**：`express-session`（提供会话管理功能）、`cors`（处理跨域请求）、`body-parser`（解析请求体）。


## Koa 中，如果一个中间件没有调用 await next()，后续的中间件还会执行吗？

如果一个中间件没有调用 `await next()`，那么后续的中间件将不会执行。

这是因为当一个中间件函数执行完成并且没有调用 `await next()` 时，它不会将控制权交给下一个中间件，而是直接返回或抛出异常。

在 `Koa` 中，中间件函数通常会使用 `await next()` 语句来调用下一个中间件函数，并等待下一个中间件执行完毕并返回结果后再执行自己的逻辑。如果一个中间件没有调用 `await next()`，那么下一个中间件就不会被执行，当前中间件也不能得到后续中间件的处理结果，从而可能导致请求无法得到正确的响应或者程序出现错误。

因此，在编写中间件函数时，需要确保在遇到需要交给下一个中间件处理的情况下，要及时调用 `await next()` 来将控制权转交给下一个中间件，以保证整个请求处理流程的正常进行。

例如，一个检测用户权限的 middleware 可以决定是否继续处理请求，还是直接返回403错误：

```javascript
复制app.use(async (ctx, next) => {
    if (await checkUserPermission(ctx)) {
        await next();
    } else {
        ctx.response.status = 403;
    }
});
```

## body-parser 这个中间件是做什么用的？

`body-parser` 是一个 Node.js 中间件，用于解析 HTTP 请求中的请求体（RequestBody），并将其转换为 JSON 格式或其他格式的数据对象。它可以帮助开发者方便地从 POST、PUT、DELETE 等请求中获取请求体数据，并进行相应的处理。

具体来说，`body-parser` 支持以下几种请求体数据格式：

1. JSON 格式：通过 `json()` 方法解析 JSON 格式的请求体数据，并将其转换为 JavaScript 对象。
2. URL 编码格式：通过 `urlencoded()` 方法解析 URL 编码格式的请求体数据，并将其转换为 JavaScript 对象。
3. 多部分数据格式：通过 `multipart()` 方法解析多部分数据格式的请求体数据，并将其转换为 JavaScript 对象。

下面是一个简单的使用 `body-parser` 解析请求体数据的示例代码：

```javascript
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// 解析 URL 编码格式的请求体数据
app.use(bodyParser.urlencoded({ extended: false }));

// 解析 JSON 格式的请求体数据
app.use(bodyParser.json());

// 处理 POST 请求
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  console.log(`username: ${username}`);
  console.log(`password: ${password}`);
  res.send('Login Success!');
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

上面使用 `body-parser` 中间件分别解析了 URL 编码格式和 JSON 格式的请求体数据，并通过 `req.body` 获取请求体数据对象。在 POST 请求的处理函数中，打印了用户输入的用户名和密码，并返回了一个登录成功的响应消息。

在使用 `body-parser` 中间件时，需要根据实际情况选择合适的解析方法，并注意配置参数，以防止出现安全漏洞和错误数据。同时，在处理 HTTP 请求时，需要对请求体数据进行有效性验证和安全性检查，以保证数据的可靠性和完整性。



## 说说你对 koa 洋葱模型的理解

Koa 框架是一个 Node.js 的 Web 应用程序框架，它通过中间件（`Middleware`）机制实现了业务逻辑的分层和复用。Koa 中使用的中间件机制被称为洋葱模型（`Onion Model`），其核心思想是将 HTTP 请求和响应对象依次传递给各个中间件函数，形成一条类似于洋葱的管道，最终返回响应结果。

具体来说，Koa 洋葱模型的处理流程可以大致分为四个阶段：

1. 请求阶段：从外到内依次执行请求相关的中间件，例如解析请求体、设置响应头等操作。
2. 业务阶段：执行业务逻辑相关的中间件，例如处理授权、验证身份、路由分发等操作。
3. 响应阶段：从内到外依次执行响应相关的中间件，例如格式化响应数据、设置响应头等操作。
4. 错误处理阶段：如果在前面的中间件过程中出现了错误，则会跳过后续中间件并交给错误处理中间件来处理异常情况。

在这个过程中，每个中间件都可以根据需要对请求和响应对象进行修改、扩展、封装等操作，并将控制权传递给下一个中间件，形成了一条流水线式的处理模式。这种设计可以大大提高代码的复用和可读性，同时也方便了对程序行为进行监控、调试和优化。

总之，Koa 洋葱模型是一种基于中间件机制的 Web 应用程序开发方法，它通过将请求和响应对象依次传递给各个中间件函数，实现了业务逻辑的分层和复用，并且具有灵活、可扩展和高效的特点。

## 如何用 PM2 管理 Node.js 进程

## pm2 守护进程的原理是什么?

PM2 是一个用于管理 Node.js 进程的工具，它可以在后台启动、守护和监控多个 Node.js 应用程序。PM2 的守护进程原理主要包括以下几个方面：

1. 启动应用：当用户使用 PM2 启动应用时，PM2 会创建一个子进程，并将应用程序作为子进程来启动。同时，PM2 会记录该应用程序的相关信息，如 PID（进程 ID）、状态、日志等，并且会将这些信息保存到 PM2 的数据库中。
2. 监控应用：一旦应用程序被启动，PM2 就会监控它的运行情况。如果应用程序意外退出或发生异常，PM2 将会自动重启应用程序。同时，PM2 会定期检查应用程序的资源占用情况，并且可以根据需要调整进程数、CPU 使用率等参数。
3. 守护进程：为了确保 PM2 能够长时间稳定运行，PM2 本身也需要一个守护进程来监控其运行情况。该守护进程会定期检查 PM2 的健康状态，并且在 PM2 出现异常情况时进行相应的处理，例如重启进程、发送警告通知等。
4. 日志管理：PM2 还提供了丰富的日志管理功能，可以将应用程序的日志导出到文件或远程服务器，并且支持实时查看、过滤等操作。这些日志信息对于排查问题、分析业务数据等都非常有用。

综上所述，PM2 的守护进程原理主要是将应用程序作为子进程启动，并在后台监控其运行情况。同时，PM2 本身也会被一个守护进程来监控和管理，以确保整个系统的稳定性和可靠性。



## Node.js 如何调试？

Node.js 提供了多种调试方式，以下是常用的几种：

1. 使用 `console.log()` 输出调试信息：在代码中使用 `console.log()` 输出一些变量和状态信息，以便在运行时跟踪代码执行流程。这种方式简单易用，但需要手动添加和删除调试代码，不适合调试复杂程序和性能瓶颈。
2. 使用 Node.js 自带的调试器：Node.js 自带了一个内置的调试器，可以通过命令行参数 `--inspect` 或者 `--inspect-brk` 来启动。然后在 Chrome 浏览器中打开 `chrome://inspect` 页面，即可连接到 Node.js 调试器，并可以进行断点调试、查看变量和堆栈信息等操作。这种方式需要安装相应的 IDE 或者编辑器插件，并且需要一定的配置和调试经验。
3. 使用第三方调试工具：除了 Node.js 自带的调试器外，还有一些第三方调试工具，例如 node-inspector、ndb、WebStorm、VS Code 等，它们提供了更加强大和友好的调试功能，例如调试控制台、堆栈跟踪、性能分析等。

## 如何在Express中处理文件上传？


## 如何用Socket.io实现实时通信？

## koa 和 express 有哪些不同？

**框架介绍**

express框架是一个基于 Node.js 平台的极简、灵活的 web 应用开发框架，主要基于 Connect 中间件，并且自身封装了路由、视图处理等功能。

koa是 Express 原班人马基于 ES6 新特性重新开发的框架，主要基于 co 中间件，框架自身不包含任何中间件，很多功能需要借助第三方中间件解决，但是由于其基于 ES6 generator 特性的异步流程控制，解决了 "callback hell" 和麻烦的错误处理问题。

**相同点**

两个框架都对http进行了封装。相关的api都差不多，同一批人所写。

**不同点**

express内置了许多中间件可供使用，而koa没有。

express包含路由，视图渲染等特性，而koa只有http模块。

express的中间件模型为线型，而koa的中间件模型为U型，也可称为洋葱模型构造中间件。

express通过回调实现异步函数，在多个回调、多个中间件中写起来容易逻辑混乱。

```javascript
// express写法
app.get('/test', function (req, res) {
    fs.readFile('/file1', function (err, data) {
        if (err) {
            res.status(500).send('read file1 error');
        }
        fs.readFile('/file2', function (err, data) {
            if (err) {
                res.status(500).send('read file2 error');
            }
            res.type('text/plain');
            res.send(data);
        });
    });
});
```

koa通过generator 和 async/await 使用同步的写法来处理异步，明显好于 callback 和 promise。

```javascript
app.use(async (ctx, next) => {
    await next();
    var data = await doReadFile();
    ctx.response.type = 'text/plain';
    ctx.response.body = data;
});
```

**总结**

**Express**
优点：线性逻辑，通过中间件形式把业务逻辑细分、简化，一个请求进来经过一系列中间件处理后再响应给用户，清晰明了。
缺点：基于 callback 组合业务逻辑，业务逻辑复杂时嵌套过多，异常捕获困难。

**Koa**
优点：首先，借助 co 和 generator，很好地解决了异步流程控制和异常捕获问题。其次，Koa 把 Express 中内置的 router、view 等功能都移除了，使得框架本身更轻量。
缺点：社区相对较小。



## 两个 Node.js 进程如何通信？

两个 Node.js 进程之间如何进行通信呢？这里要分两种场景：

1. 不同电脑上的两个 Node.js 进程间通信
2. 同一台电脑上两个 Node.js 进程间通信

对于第一种场景，通常使用 TCP 或 HTTP 进行通信，而对于第二种场景，又分为两种子场景：

1. Node.js 进程和自己创建的 Node.js 子进程通信
2. Node.js 进程和另外不相关的 Node.js 进程通信

前者可以使用内置的 IPC 通信通道，后者可以使用自定义管道，接下来进行详细介绍：

## 不同电脑上的两个 Node.js 进程间通信

要想进行通信，首先得搞清楚如何标识网络中的进程？网络层的 ip 地址可以唯一标识网络中的主机，而传输层的协议和端口可以唯一标识主机中的应用程序（进程），这样利用三元组（ip 地址，协议，端口）就可以标识网络的进程了。

**使用 TCP 套接字**

TCP 套接字（socket）是一种基于 TCP/IP 协议的通信方式，可以让通过网络连接的计算机上的进程进行通信。一个作为 server 另一个作为 client，server.js 代码如下：

```
const net = require('net')
const server = net.createServer(socket => {
  console.log('socket connected')
  socket.on('close', () => console.log('socket disconnected'))
  socket.on('error', err => console.error(err.message))
  socket.on('data', data => {
    console.log(`receive: ${data}`)
    socket.write(data)
    console.log(`send: ${data}`)
  })
})
server.listen(8888)
```

client.js 代码：

```
const net = require('net')
const client = net.connect(8888, '192.168.10.105')

client.on('connect', () => console.log('connected.'))
client.on('data', data => console.log(`receive: ${data}`))
client.on('end', () => console.log('disconnected.'))
client.on('error', err => console.error(err.message))

setInterval(() => {
  const msg = 'hello'
  console.log(`send: ${msg}`)
  client.write(msg)
}, 3000)
```

运行效果：

```
$ node server.js
client connected
receive: hello
send: hello

$ node client.js
connect to server
send: hello
receive: hello
```

**使用 HTTP 协议**

因为 HTTP 协议也是基于 TCP 的，所以从通信角度看，这种方式本质上并无区别，只是封装了上层协议。server.js 代码为：

```javascript
const http = require('http')
http.createServer((req, res) => res.end(req.url)).listen(8888)
```

client.js 代码：

```javascript
const http = require('http')
const options = {
  hostname: '192.168.10.105',
  port: 8888,
  path: '/hello',
  method: 'GET',
}
const req = http.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`)
  res.on('data', d => process.stdout.write(d))
})
req.on('error', error => console.error(error))
req.end()
```

运行效果：

```bash
$ node server.js
url /hello

$ node client.js
statusCode: 200
hello
```

## 同一台电脑上两个 Node.js 进程间通信

虽然网络 socket 也可用于同一台主机的进程间通讯（通过 loopback 地址 127.0.0.1），但是这种方式需要经过网络协议栈、需要打包拆包、计算校验和、维护序号和应答等，就是为网络通讯设计的，而同一台电脑上的两个进程可以有更高效的通信方式，即 IPC（Inter-Process Communication），在 unix 上具体的实现方式为 unix domain socket，这是服务器端和客户端之间通过本地打开的套接字文件进行通信的一种方法，与 TCP 通信不同，通信时指定本地文件，因此不进行域解析和外部通信，所以比 TCP 快，在同一台主机的传输速度是 TCP 的两倍。

**使用内置 IPC 通道**

如果是跟自己创建的子进程通信，是非常方便的，child_process模块中的 fork 方法自带通信机制，无需关注底层细节，例如父进程 parent.js 代码：

```javascript
const fork = require("child_process").fork
const path = require("path")
const child = fork(path.resolve("child.js"), [], { stdio: "inherit" });
child.on("message", (message) => {
  console.log("message from child:", message)
  child.send("hi")
})
```

子进程 child.js 代码：

```javascript
process.on("message", (message) => {
  console.log("message from parent:", message);
})

if (process.send) {
  setInterval(() => process.send("hello"), 3000)
}
```

运行效果如下：

```
$ node parent.js
message from child: hello
message from parent: hi
message from child: hello
message from parent: hi
```

**使用自定义管道**

如果是两个独立的 Node.js 进程，如何建立通信通道呢？在 Windows 上可以使用命名管道（Named PIPE），在 unix 上可以使用 unix domain socket，也是一个作为 server，另外一个作为 client，其中 server.js 代码如下：

```javascript
const net = require('net')
const fs = require('fs')

const pipeFile = process.platform === 'win32' ? '\\\\.\\pipe\\mypip' : '/tmp/unix.sock'

const server = net.createServer(connection => {
  console.log('socket connected.')
  connection.on('close', () => console.log('disconnected.'))
  connection.on('data', data => {
    console.log(`receive: ${data}`)
    connection.write(data)
    console.log(`send: ${data}`)
  })
  connection.on('error', err => console.error(err.message))
})

try {
  fs.unlinkSync(pipeFile)
} catch (error) {}

server.listen(pipeFile)
```

client.js 代码如下：

```javascript
const net = require('net')

const pipeFile = process.platform === 'win32' ? '\\\\.\\pipe\\mypip' : '/tmp/unix.sock'

const client = net.connect(pipeFile)
client.on('connect', () => console.log('connected.'))
client.on('data', data => console.log(`receive: ${data}`))
client.on('end', () => console.log('disconnected.'))
client.on('error', err => console.error(err.message))

setInterval(() => {
  const msg = 'hello'
  console.log(`send: ${msg}`)
  client.write(msg)
}, 3000)
```

运行效果：

```javascript
$ node server.js 
socket connected.
receive: hello
send: hello

$ node client.js
connected.
send: hello
receive: hello
```

## 解释错误优先回调模式

## 如何用 fs 模块同步和异步读取文件？

## 如何用 http 模块创建一个简单的HTTP服务器？

## 在 Node.js 中，如何处理静态文件的服务？

## 在 Node.js 中，如何使用 JWT 进行用户认证？

## 如何在 Node.js 中实现 OAuth 认证？

## 如何在 Node.js 中实现请求的限流？

## \_\_dirname 和\_\_filename的作用是什么？

## 解释 Node.js 的全局对象（如process、global）

## path.join() 和 path.resolve() 的区别是什么？

## 如何用 os 模块获取系统信息？

## Buffer 类的作用是什么？如何处理二进制数据？

## 如何用 events 模块创建自定义事件？

## 解释 util.promisify 的作用

## RESTful API的设计原则是什么？Node.js 如何实施？

## 解释 JWT 的工作原理及在 Node.js 中的实现

## 什么是 Swagger？如何用它生成 API 文档？

## 如何在 Node.js 中实现单元测试

## 解释 GraphQL 在 Node.js 中的使用场景

## 你了解 NestJs 吗？

## 如何用 Cluster 模块实现负载均衡？

## Node.js 如何诊断和修复内存泄漏？

## Node.js 适合 CPU 密集型任务吗？为什么？

## 如何用 perf_hooks 模块进行性能分析？

## 如何优化数据库查询性能（如索引、缓存）？

## 反向代理在 Node.js 中的作用是什么？

## 什么是 SQL 注入和 XSS 攻击？如何在 Node.js 中防范？
## 如何在 Node.js 中实现 CSRF 保护？

## Node.js 如何防御 DDoS 攻击？

## 如何安全地存储用户密码？

## 如何用 Helmet 中间件增强安全性？

## 解释 HTTPS 的工作原理及在Node.js中的实现

## 如何用 Mongoose 连接 MongoDB？

## 如何实现数据库事务？

## 解释 Redis 在Node.js中的常见使用场景

## 什么是数据库连接池？如何配置？

## 如何用 async_hooks 跟踪异步资源？

## 解释 Node.js 的模块缓存机制，如何清除缓存？

## 什么是 Serverless 架构？如何在 Node.js 中实现？

## 解释微服务架构在 Node.js 中的实现

## 如何用 TypeScript 开发 Node.js 应用？

## 解释 node --inspect 的作用

## 如何分析 Node.js 的内存快照

## 如果你发现 Node.js 应用性能下降，你会如何排查？

## 如何处理 Node.js 应用程序中的高并发请求，并避免阻塞？

## 如何保证 Node.js 应用的代码质量？

