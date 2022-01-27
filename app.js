const Koa = require('koa2');
const app = new Koa();
const Router = require("koa-router");
const router = new Router();
const cors = require("koa2-cors");
const bodyParser = require('koa-bodyparser');
const static = require('koa-static')
const path = require("path")

const web = require('./router/web')
const host = "http://localhost";
const port = 4000;

router.get("/", async ctx => {
    ctx.body = "http://localhost:4000/web/"
})

router.use("/web", web.routes(), web.allowedMethods());

app.use(cors());
app.use(bodyParser());
app.use(static(path.join(__dirname,"static")));
app.use(static(path.join(__dirname,"router/web/upload")));
app.use(router.routes(), router.allowedMethods());

app.listen(port, () => {
    console.log(`Server is running at ${host}:${port}`);
})