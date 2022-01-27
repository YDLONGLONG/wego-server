const Router = require("koa-router")
const router = new Router();
const multer = require('koa-multer');
const path = require("path")

const { returnMsg, queryFN, jwtVerify } = require("../../../utils/dbconfig")

//存储文件的名称
let myfilename = "";

var storage = multer.diskStorage({
    //文件保存路径
    destination:path.join(__dirname ,'../upload/'),
    //修改文件名称
    filename: function (req, file, cb) {
        let type = file.originalname.split('.')[1]
        // logo.png -> logo.xxx.png
        myfilename = `${file.fieldname}-${Date.now().toString(16)}.${type}`
        cb(null, myfilename)
    }
})

//文件上传限制
const limits = {
    fields: 1,//非文件字段的数量
    fileSize: 2000 * 1024,//文件大小 单位 b
    files: 1//文件数量
}

const upload = multer({storage,limits})

router.post('/',upload.single('avatar'), async ctx=>{
    //鉴权
    let token = ctx.request.headers['wego-token'];
    if(!jwtVerify(token)){
        ctx.body = returnMsg(2,"查询用户信息失败","token过期或用户不存在");
        return;
    }
    //鉴权成功
    let sql = `UPDATE user SET avatar='${myfilename}' WHERE token='${token}'`
    await queryFN(sql);
    //重新查询返回给前端
    let sql1 = `SELECT username,token,avatar FROM user WHERE token='${token}'`
    let result = await queryFN(sql1);
    ctx.body = returnMsg(0,"修改成功",{
        username:result[0].username,
        "wego-token":result[0].token,
        avatar:result[0].avatar
    })
})

module.exports = router;