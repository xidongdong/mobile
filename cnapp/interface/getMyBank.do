#格式说明
{
    "msg": "查询用户银行卡成功", #本次请求的提示
    "resultData": {
        "bankId": "0105", #银行代号
        "bankName": "中国建设银行",#银行名称
        "cardNo": "6216731199990002221",#银行卡号
        "cardNox": "6216 **** **** 2221",#需要显示给用户的银行卡号
        "isHasCPAuthentication": "1",#1-已通过CP（银联）认证  0-未通过CP认证
        "isInCPList": "1"#1-是CP支持的银行  0-不是CP支持的银行
    },
    "status": {
        "accountFlag": "1",        #1-已开户 0-未开户
        "appPwdPassFlag": "0",     #1-app交易密码验证成功 0-app交易密码验证失败
        "cardFlag": "1",           #1-已绑卡 0-未绑卡
        "hasAppPwdFlag": "1",      #1-有App交易密码 0-没有App交易密码 
        "hasPcPwdFlag": "0",       #1-有Pc交易密码 0-没有Pc交易密码
        "loginFlag": "1",          #1-已登录	0-未登录
        "pcPwdPassFlag": "0",      #1-Pc交易密码验证成功 0-Pc交易密码验证失败
        "registerFlag": "1",       #1-已注册	0-未注册
        "whiteFlag": "1"           #1-不在白名单   0-在白名单
    },
    "voFlag": "0000"
}
#json
{"msg":"查询用户银行卡成功","resultData":{"bankId":"0105","bankName":"中国建设银行","cardNo":"6216731199990002221","cardNox":"6216 **** **** 2221","isHasCPAuthentication":"1","isInCPList":"1"},"status":{"accountFlag":"1","appPwdPassFlag":"0","cardFlag":"1","hasAppPwdFlag":"1","hasPcPwdFlag":"0","loginFlag":"1","pcPwdPassFlag":"0","registerFlag":"1","whiteFlag":"1"},"voFlag":"0000"}