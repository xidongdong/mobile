#查询当前银行卡是否可以解绑
 {
    "msg": "当前银行卡可以解绑",
    "resultData": null,
    "status": {
        "accountFlag": "1",         #1-已开户 0-未开户
        "appPwdPassFlag": "0",      #1-app交易密码验证成功 0-app交易密码验证失败
        "cardFlag": "1",            #1-已绑卡 0-未绑卡
        "hasAppPwdFlag": "1",       #1-有App交易密码 0-没有App交易密码 
        "hasPcPwdFlag": "0",        #1-有Pc交易密码 0-没有Pc交易密码
        "loginFlag": "1",           #1-已登录	0-未登录
        "pcPwdPassFlag": "0",       #1-Pc交易密码验证成功 0-Pc交易密码验证失败
        "registerFlag": "1",        #1-已注册	0-未注册
        "whiteFlag": "1"            #1-不在白名单   0-在白名单
    },
    "voFlag": "0000" # 0000-可以解绑  0099-不可以解绑
}
#json
{"msg":"当前银行卡可以解绑","resultData":null,"status":{"accountFlag":"1","appPwdPassFlag":"0","cardFlag":"1","hasAppPwdFlag":"1","hasPcPwdFlag":"0","loginFlag":"1","pcPwdPassFlag":"0","registerFlag":"1","whiteFlag":"1"},"voFlag":"0000"}