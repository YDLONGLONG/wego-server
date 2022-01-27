const Router = require('koa-router');
const router = new Router();
const jwt = require('jsonwebtoken');

const { returnMsg, queryFN } = require("../../../utils/dbconfig")

router.post('/', async (ctx) => {
    let { username, password } = ctx.request.body;
    if (username && password) {
        let sql = `SELECT * FROM user WHERE username='${username}'`
        let result = await queryFN(sql)
        if (result.length > 0) {
            let token = jwt.sign(
                { username, password },    // 携带信息
                'liyichen',          // 秘钥
                { expiresIn: '24h' }        // 有效期：24h一小时
            )
            let sql1 = `UPDATE user SET token='${token}' WHERE username='${username}'`;
            await queryFN(sql1)
            let result1 = await queryFN(sql)
            let obj = {
                username:result1[0].username,
                "wego-token":result1[0].token,
                avatar:result1[0].avatar,
            }
            ctx.body = returnMsg(0, "登录成功", obj)
        } else {
            ctx.body = returnMsg(2, "用户不存在", "用户不存在，请先注册")
        }
    } else {
        ctx.body = returnMsg(1, "参数错误", "用户名或密码有误")
    }
})

module.exports = router;