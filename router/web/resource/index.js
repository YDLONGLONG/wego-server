const Router = require('koa-router');
const router = new Router();
const { returnMsg, queryFN, jwtVerify } = require("../../../utils/dbconfig")

router.get('/nav', async (ctx) => {
    let sql = `SELECT * FROM nav`
    let result = await queryFN(sql);
    ctx.body = returnMsg(0,"请求成功",result);
})

router.get('/banner', async (ctx) => {
    let sql = `SELECT * FROM banner`
    let result = await queryFN(sql);
    ctx.body = returnMsg(0,"请求成功",result);
})

module.exports = router;