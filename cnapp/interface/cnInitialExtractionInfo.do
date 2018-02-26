#查询提现列表
{
    "msg": "",
    "resultData": {
        "totalAssets": "1200.02", #总资产
        "frozenMoney": "0", #冻结的总额
        "handleMoney": 0, #体现处理中的总额
        "productList": [
            {
                "termdtDate": "2016-03-26",#预期到账时间
                "extractionSum": "1200.02",#可提现金额
                "type": "have", #have-已投资  nothave-未投资
                "sunumb": "Z160120047"#标的编号
            }
        ]
    },
    "status": {
        "accountFlag": "1",     #1-已开户 0-未开户
        "appPwdPassFlag": "0",  #1-app交易密码验证成功 0-app交易密码验证失败
        "cardFlag": "1",        #1-已绑卡 0-未绑卡
        "hasAppPwdFlag": "1",   #1-有App交易密码 0-没有App交易密码 
        "hasPcPwdFlag": "0",    #1-有Pc交易密码 0-没有Pc交易密码
        "loginFlag": "1",       #1-已登录	0-未登录
        "pcPwdPassFlag": "0",   #1-Pc交易密码验证成功 0-Pc交易密码验证失败
        "registerFlag": "1",    #1-已注册	0-未注册
        "whiteFlag": "1"        #1-不在白名单   0-在白名单
    },
    "voFlag": "0000"
}
#json
{"msg":"","resultData":{"totalAssets":"1200.02","frozenMoney":"0","handleMoney":0,"productList":[{"termdtDate":"2016-03-26","extractionSum":"1200.02","type":"have","sunumb":"Z160120047"}]},"status":{"accountFlag":"1","appPwdPassFlag":"0","cardFlag":"1","hasAppPwdFlag":"1","hasPcPwdFlag":"0","loginFlag":"1","pcPwdPassFlag":"0","registerFlag":"1","whiteFlag":"1"},"voFlag":"0000"}
