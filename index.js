const Koa = require('koa');
const cors = require('koa2-cors');
const proxy = require('koa-http-proxy');
const logger = require('koa-logger');

const app = new Koa();

app.use(logger()); // 添加日志记录中间件

app.use(cors({
  origin: 'http://localhost:1234',
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE', 'OPTIONS', 'PUT'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'Accept-Custom-Type', 'Cookie','Content-Encoding','Referer']
}));

const proxyOptions = {
  target: 'http://cdxsyl.cn/',
  changeOrigin: true,
  // 其他可选配置...
};

const proxyMiddleware = proxy(proxyOptions);
app.use(proxyMiddleware);

const port = process.env.PORT || 80;
app.listen(port, () => {
  console.log(`服务正直运行 ${port}`);
});
