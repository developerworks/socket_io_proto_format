const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);


app.all("*", function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", " 3.2.1");
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

// app.use(express.static('public'));
app.use(express.static('public', {
    setHeaders: (res, path) => {
      if (path.endsWith('.html')) {
        res.set('Content-Type', 'text/html');
      }
    },
  }));


// 在客户端连接时执行
io.on('connection', (socket) => {
  console.log('客户端已连接');

  // 监听来自客户端的消息
  socket.on('message', (data) => {
    console.log('收到消息:', data);

    // 向客户端发送响应消息
    socket.emit('response', { message: '收到消息：' + data.message });
  });

  // 当客户端断开连接时执行
  socket.on('disconnect', () => {
    console.log('客户端已断开连接');
  });
});

server.listen(3000, () => {
  console.log('服务器已启动，监听端口 3000');
});
