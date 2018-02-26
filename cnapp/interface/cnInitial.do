#用户初始状态查询
{
    "msg": "",
    "resultData": null,
    "status": {
        "accountFlag": "1",      #1-已开户 0-未开户
        "appPwdPassFlag": "0",	 #1-app交易密码验证成功 0-app交易密码验证失败
        "cardFlag": "0",         #1-已绑卡 0-未绑卡
        "hasAppPwdFlag": "1",    #1-有App交易密码 0-没有App交易密码 
        "hasPcPwdFlag": "1",     #1-有Pc交易密码 0-没有Pc交易密码
        "loginFlag": "1",        #1-已登录	0-未登录
        "pcPwdPassFlag": "0",    #1-Pc交易密码验证成功 0-Pc交易密码验证失败
        "registerFlag": "1",     #1-已注册	0-未注册
        "whiteFlag": "1"         #1-不在白名单   0-在白名单
    },
    "voFlag": "0000" #0000-用户状态合法    0099-用户状态非法  9999-服务器异常   1111-登录超时
}
#json
{"msg":"","resultData":null,"status":{"accountFlag":"0","appPwdPassFlag":"0","cardFlag":"0","hasAppPwdFlag":"0","hasPcPwdFlag":"0","loginFlag":"0","pcPwdPassFlag":"0","registerFlag":"0","whiteFlag":"1"},"voFlag":"0000"}
