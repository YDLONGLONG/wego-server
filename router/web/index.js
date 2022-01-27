const Router = require('koa-router');
const router = new Router();

const resource = require("./resource")
const user = require("./user")

router.get('/', async (ctx) => {
    ctx.body = "前端接口";
})

router.use("/resource", resource.routes(), resource.allowedMethods());
router.use("/user", user.routes(), user.allowedMethods());

module.exports = router;
