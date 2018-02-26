/**
 * @ 注册、登录、忘记密码、修改密码
 */
window.onload= function(){
       var checkCode=document.querySelector( 'div').title;
       switch (checkCode){
             //登录页面
             case 'login' :
                   var oBtnLogin = document.querySelector( '#login');
                  oBtnLogin.addEventListener( 'touchend' , login);
             break ;
             //忘记密码页面
             case 'forgetPassword' :
                   //忘记密码 发送验证码   
            	 window.oBtnSendCode = document.querySelector('#sendCheckCodeInFindPassword' );
                  oBtnSendCode.addEventListener( 'touchend' ,toSendCheck);
                 // oBtnSendCode.addEventListener( 'touchend' , toSendMsgTwo);

                   //忘记密码 充值密码
                   var oBtnResetPassword = document.querySelector('#resetPassword' );
                   oBtnResetPassword.addEventListener( 'touchend' , toResetPassword);
             break ;
             //注册页面
             case 'regist' :
                   //注册页面发送验证码
            	 	window.oBtnSendCode = document.querySelector('#sendCheckCodeInRegist' );
            	 	oBtnSendCode.addEventListener( 'touchend' , toSendCheckInRegist);
                        
                    //    oBtnSendCheckCodeInRegist.addEventListener( 'touchend' , toSendMsgOne);
                   //注册页面 注册
                   var oBtnRegist = document.querySelector( '#regist');
                        oBtnRegist.addEventListener( 'touchend' , toRegister);
                   		
                        
             break ;
             //修改页面
             case 'modifyPassword' :
             // 修改登录密码页面
             var oBtnModifyPassword = document.querySelector('#modifyPassword' );
                  oBtnModifyPassword.addEventListener( 'touchend' , toModifyPassword);
             break ;
             case 'jumpTx' :
                 // 提现页面
            	 var oBtn=document.querySelector('#jumpTx');
             	 oBtn.addEventListener('touchend',jumpTx);
             break ;
             case 'addRechargeToPass' :
                 // 充值页面
            	 var oBtn=document.querySelector('#addRechargeToPassword');
             	 oBtn.addEventListener('touchend',addRechargeToPass);
             break ;
             case 'toHfaxAppSubscribe' :
                 // 定期理财页面
            	 var oBtn=document.querySelector('#toHfaxAppSubscribe');
             	 oBtn.addEventListener('touchend',toHfaxAppSubscribe);
             break ;
             case 'toHfaxAppFinancingPass' :
                 // 定期理财页面
            	 var oBtn=document.querySelector('#toHfaxAppFinancingPass');
             	 oBtn.addEventListener('touchend',toHfaxAppFinancingPass);
             break ;
             case 'rechargeBundInitChpyId' :
                 // 充值失败页面，重定向充值页面
            	 var oBtn=document.querySelector('#rechargeBundInitChpyId');
             	 oBtn.addEventListener('touchend',rechargeBundInitChpy);
             break ;
             case 'toHfaxAppFinaceIndexId' :
                 // 充值成功页面，重定向投资页面
            	 var oBtn=document.querySelector('#toHfaxAppFinaceIndexId');
             	 oBtn.addEventListener('touchend',toHfaxAppFinaceIndex);
             break ;
             case 'appendInvestId' :
                 // 追加投资
            	 var oBtn=document.querySelector('#appendInvestId');
             	 oBtn.addEventListener('touchend',appendInvest);
             break ;
             case 'toHfaxAppNewFinancingDetailesId' :
                 // 新手标申购
            	 var oBtn=document.querySelector('#toHfaxAppNewFinancingDetailesId');
             	 oBtn.addEventListener('touchend',toHfaxAppNewFinancingDetailes);
             break ;
             case 'toHfaxAppNewFinancingId' :
                 // 新手标申购
            	 var oBtn=document.querySelector('#toHfaxAppNewFinancingId');
             	 oBtn.addEventListener('touchend',toHfaxAppNewFinancing);
             break ;
             case 'appBundCard' :
                 // 新手标申购
            	 var oBtn=document.querySelector('#appBundCard');
             	 oBtn.addEventListener('touchend',appBundCard);
             break ;
             case 'toHfaxAppUnwrapByNoId' :
                 // 新手标申购
            	 var oBtn=document.querySelector('#toHfaxAppUnwrapByNoId');
             	 oBtn.addEventListener('touchend',toHfaxAppUnwrapByNo);
             break ;
             case 'toHfaxAppBindingInvestTicketByid' :
                 //绑定投资券
            	 var oBtn=document.querySelector('#toBindingTicket');
             	 oBtn.addEventListener('touchend',toBindingTicket);
             break ;
             case 'toHfaxAppQtz' :
            	 //去投资
            	 var oBtn=document.querySelector('#toHfaxAppQtz');
             	 oBtn.addEventListener('touchend',toHfaxAppQtz);
             break ;
             case 'validteCard' :
            	 //去投资
            	 var oBtn=document.querySelector('#validteCard');
             	 oBtn.addEventListener('touchend',validteCard);
             break ;
             case 'toHfaxAppWithdrawSuccess' :
            	 //提现 我知道了
            	 var oBtn=document.querySelector('#toHfaxAppWithdrawSuccess');
             	 oBtn.addEventListener('touchend',toHfaxAppWithdrawSuccess);
             break ;
             case 'sxRegist':
            	//寿险 注册页面发送验证码
         	 	window.oBtnSendCode = document.querySelector('#sendCheckCodeInRegist' );
         	 	
         	 	oBtnSendCode.addEventListener( 'click' , toSxSendCheckInRegist);
                     
                //寿险 注册页面 注册
                var oBtnRegist = document.querySelector( '#regist');
                    oBtnRegist.addEventListener( 'click' , toRegistByLifeInsurance);
             break ;
             // 交易密码
             case 'validtePassWord' :
                 var oBtnLogin = document.querySelector( '#validtePassWord');
                oBtnLogin.addEventListener( 'touchend' , validtePassWord);
             break ;
          // 交易密码
             case 'withdraw' :
                 var oBtnLogin = document.querySelector( '#withdraw');
                oBtnLogin.addEventListener( 'touchend' , withdraw);
             break ;
             // 交易密码
             case 'gatewaypaymentChpy' :
                 var oBtnLogin = document.querySelector( '#gatewaypaymentChpy');
                oBtnLogin.addEventListener( 'touchend' , gatewaypaymentChpy);
             break ;
             case 'toHfaxAppCheckFinancing' :
                 var oBtnLogin = document.querySelector( '#toHfaxAppCheckFinancing');
                oBtnLogin.addEventListener( 'touchend' , toHfaxAppCheckFinancing);
             break ;
      }
};



	
/**
 * 发送短信校验码 
 * @SongTao
 * 
 */
function toSendCheck(){
	toSendCheckCode(oBtnSendCode);
	
}
function toSendCheckInRegist(){
	var param = {};
	var phone = document.getElementById("mobilePhone").value;
	param["paramMap.phone"] =phone;
	if(phone == ""){
		alert("手机号码不可为空");
		return false;
	}else if(!checkPhone(phone)){
		alert("请填写正确的手机号码");
		return false;
	}else{
	}
	ajax({url:'toHfaxappCheckPhone.do',
		type:'POST',
		data:param,
		success:function (data){
			var obj=JSON.parse(data);
			if (obj.retCode == "1") {
				toSendCheckCode(oBtnSendCode);	
			} else {
				alert(obj.retMsg);
			}
		},
		error:function (e){
			if(e==0){
				alert("网络忙，请稍后再试~~");
			}else{
				alert(e);
			}
			
		}
	});
	
	
}

function toSxSendCheckInRegist(){
	var param = {};
	var phone = document.getElementById("mobilePhone").value;
	var code = document.getElementById("code").value;
	param["paramMap.phone"] =phone;
	if(phone == ""){
		alert("手机号码不可为空");
		return false;
	}else if(!checkPhone(phone)){
		alert("请填写正确的手机号码");
		return false;
	}else if(code == null || code == ""  ){
		alert("图片验证码不可为空");
		return false;
	}
	ajax({url:'toHfaxappCheckPhone.do',
		type:'POST',
		data:param,
		success:function (data){
			var obj=JSON.parse(data);
			if (obj.retCode == "1") {
				toSxSendCheckCode(oBtnSendCode);	
			} else {
				alert(obj.retMsg);
			}
		},
		error:function (e){
			if(e==0){
				alert("网络忙，请稍后再试~~");
			}else{
				alert(e);
			}
			
		}
	});
	
	
}
function toSxSendCheckCode(obj){
	var param = {};
	var mobile = document.getElementById("mobilePhone").value;
	var code = document.getElementById("code").value;
	param["paramMap.mobilePhone"] =document.getElementById("mobilePhone").value;
	
	if(document.getElementById("mobilePhone").value == ""){
		alert("手机号码不可为空");
		return false;
	}else if(!checkPhone(mobile)){
		alert("请填写正确的手机号码");
		return false;
	}else if(obj.innerHTML.indexOf(":")>0){
		return false;
	}else if(code == null || code == ""){
		alert("图片验证码不可为空");
		return false;
	}else{
		toSendMsg(obj);
	}
	param["paramMap.code"] =document.getElementById("code").value;
	ajax({url:'toHfaxappSxSendCheckCode.do',
		type:'POST',
		data:param,
		success:function (data){
			
			if(data==""){
				alert("验证码发送失败，请稍后再试");
			}else{
				var obj=JSON.parse(data);
				if (obj.retCode == "0000") {
					alert(obj.retMsg);	
    			} else {
    				alert(obj.retMsg);
    			}
			}
			
		},
		error:function (e){
			if(e==0){
				alert("网络忙，请稍后再试~~");
			}else{
				alert(e);
			}
			
		}
	});
}
	function toSendCheckCode(obj){
		var param = {};
		var mobile = document.getElementById("mobilePhone").value;
		param["paramMap.mobilePhone"] =document.getElementById("mobilePhone").value;
		
		if(document.getElementById("mobilePhone").value == ""){
			alert("手机号码不可为空");
			return false;
		}else if(!checkPhone(mobile)){
			alert("请填写正确的手机号码");
			return false;
		}else if(obj.innerHTML.indexOf(":")>0){
			return false;
		}else{
			toSendMsg(obj);
		}
		ajax({url:'toHfaxappSendCheckCode.do',
			type:'POST',
			data:param,
			success:function (data){
				if(data==""){
					alert("验证码发送失败，请稍后再试");
				}else{
					var obj=JSON.parse(data);
					if (obj.retCode == "0000") {
						alert(obj.retMsg);	
	    			} else {
	    				alert(obj.retMsg);
	    			}
				}
				
			},
			error:function (e){
				if(e==0){
					alert("网络忙，请稍后再试~~");
				}else{
					alert(e);
				}
				
			}
		});
	}
	function toSendMsg(obj){
		window.sendTimer=null;
		var cum=60;
		obj.innerHTML='获取中: 60秒';
		obj.removeEventListener( 'touchend' , toSendCheck);
		clearInterval(sendTimer);
		sendTimer=setInterval(function(){
			cum--;
			obj.innerHTML='获取中: '+cum+'秒';
			obj.removeEventListener( 'touchend' , toSendCheck);
			
			if(cum<=0){
				clearInterval(sendTimer);
				obj.addEventListener( 'touchend' , toSendCheck);
				obj.innerHTML='重新获取';
				
			}
		},1000);
	}
/**
 * 页面
 * 
 */
	function login(){
		var param = {};
		param["paramMap.email"] =document.getElementById("mobilePhone").value;
		
		param["paramMap.channelKey"] ="FHLSFH";
		param["paramMap.transt"] = "1";
		if(document.getElementById("mobilePhone").value == ""){
			alert("用户名不可为空");
			return false;
		}else if(document.getElementById("password").value==""){
			alert("密码不可为空");
			return false;
		}
		var password=document.getElementById("password").value;
		/* var key = '12345678';
		 password = encryptByDES(password,key);*/
		 param["paramMap.password"] =password;
		ajax({
			url:'toHfaxappLogin.do',
			type:'POST',
			data:param,
			success:function (data){
				var obj=JSON.parse(data);
				if (obj.retCode == "0000") {
					/*
					var targetUrl="${sessionScope.destinationUrl}";
					if(targetUrl==""){
						window.location.href='toHfaxappHomeInit.do?authKey=${sessionScope.authKey}';
					}else{
						window.location.href=targetUrl;
					}
					*/
					window.location.href='toHfaxappHomeInit.do?authKey='+obj.retMsg;
					//window.location.href='toHfaxapploginAdvertisement.do';
    			} else {
    				alert(obj.retMsg);
    			}
			},
			error:function (e){
				if(e==0){
					alert("网络忙，请稍后再试~~");
				}else{
					alert(e);
				}
			}
		});
	}

/**
 * 忘记密码页面
 * 
 */	
	
	function toResetPassword(){
		var param = {};
		param["paramMap.mobilePhone"] =document.getElementById("mobilePhone").value;
		param["paramMap.authCode"] =document.getElementById("authCode").value;
		
		var password = document.getElementById("password").value;
		var repassword = document.getElementById("repassword").value;
		if(document.getElementById("mobilePhone").value==""){
			alert("手机号不可为空");
			return false;
		}else if(password==""){
			alert("新密码不可为空");
			return false;
		}else if(repassword==""){
			alert("请在此输入新密码");
			return false;
		}else if(document.getElementById("authCode").value ==""){
			alert("请输入验证码");
			return false;
		}
		if (password=="") {
			alert("请设置您的密码");
			return false;
		} else if (password.length < 8) {
			alert("密码长度为8-16个字符");
			return false;
		}else if(checkPass(password)<2){
			alert("请输入数字、大写或者小写字母的组合");
			return false;
		} else if (password.length > 16) {
			alert("密码长度为8-16个字符");
			return false;
		}else {
		}
	//confirmPassword
		if (repassword == "") {
			alert("请再次输入密码确认");
			return false;
		} else if (repassword != password) {
			alert("两次输入密码不一致");
			return false;
		} else {
		}
		/*var key = '12345678';
		 password = encryptByDES(password,key);
		 repassword = encryptByDES(repassword,key);*/
		 param["paramMap.password"] =password;
		 param["paramMap.repassword"] =repassword;
		ajax({url:'resetPasswordBymobile.do',
			type:'POST',
			data:param,
			success:function (data){
				var obj=JSON.parse(data);
				if (obj.retCode == "0000") {
					alert(obj.retMsg,function(){
						window.location.href='toHfaxappLoginInit.do';
					});
					
    			} else {
    				alert(obj.retMsg,function(){
    					document.getElementById("mobilePhone").value="";
    					document.getElementById("authCode").value="";
    					document.getElementById("password").value="";
    					document.getElementById("repassword").value="";
    				});
    				
    			}
			},
			error:function (e){
				if(e==0){
					alert("网络忙，请稍后再试~~");
				}else{
					alert(e,function(){
						document.getElementById("mobilePhone").value="";
						document.getElementById("authCode").value="";
						document.getElementById("password").value="";
						document.getElementById("repassword").value="";
					});
				}

			}
		});
	}
	
/***
 * 注册页面
 * 
 */
	
	function toRegister(){
		var param = {};
		param["paramMap.mobilePhone"] =document.getElementById("mobilePhone").value;
		param["paramMap.channelKey"] ="FHLSFH";
		
		param["paramMap.authCode"] =document.getElementById("authCode").value;
		param["paramMap.userType"] = "1";//个人注册
		param["paramMap.transt"] = "1";//key注册
		var password = document.getElementById("password").value;
		if(document.getElementById("mobilePhone").value==""){
			alert("手机号不可为空");
			return false;
		}else if(password==""){
			alert("密码不可为空");
			return false;
		}else if(document.getElementById("authCode").value ==""){
			alert("请输入验证码");
			return false;
		}
		if (password=="") {
			alert("请设置您的密码");
			return false;
		} else if (password.length < 8) {
			alert("密码长度为8-16个字符");
			return false;
		}else if(checkPass(password)<2){
			alert("请输入数字、大写或者小写字母的组合");
			return false;
		} else if (password.length > 16) {
			alert("密码长度为8-16个字符");
			return false;
		}else {
		}
		var key = '12345678';
		 /*password = encryptByDES(password,key);
		 repassword = encryptByDES(repassword,key);*/
		 param["paramMap.password"] =password;
		
		ajax({url:'toHfaxappRegist.do',
			type:'POST',
			data:param,
			success:function (data){
				var obj=JSON.parse(data);
				if (obj.retCode == "0000") {		
					window.location.href='toHfaxappHomeInit.do?authKey='+obj.retMsg;
    			} else {
    				alert(obj.retMsg);
    			}
			},
			error:function (e){
				if(e==0){
					alert("网络忙，请稍后再试~~");
				}else{
					alert(e);
				}
			}
		});
	}

/***
 * 修改密码页面
 * 
 */
	function toModifyPassword(){
		var param = {};
		
		var password = document.getElementById("password").value;
		var repassword = document.getElementById("repassword").value;
		var oldpassword = document.getElementById("oldpassword").value;
		if (oldpassword ==""){
			alert("原密码不可为空");
			return false;
		}else if(password=="") {
			alert("请设置您的密码");
			return false;
		} else if (password.length < 8) {
			alert("密码长度为8-16个字符");
			return false;
		}else if(checkPass(password)<2){
			alert("请输入数字、大写或者小写字母的组合");
			return false;
		} else if ($("#password").val().length > 16) {
			alert("密码长度为8-16个字符");
			return false;
		}else {
		}
	//confirmPassword
		if (repassword == "") {
			alert("请再次输入密码确认");
			return false;
		} else if (repassword != password) {
			alert("两次输入密码不一致");
			return false;
		} else {
		}
		 /*password = encryptByDES(password,key);
		 repassword = encryptByDES(repassword,key);
		 oldpassword = encryptByDES(oldpassword,key);*/
		 param["paramMap.oldpassword"] =oldpassword;
		 param["paramMap.password"] =password;
		 param["paramMap.repassword"] =repassword;
		ajax({
			url:'toHfaxappSetPassword.do',
			type:'POST',
			data:param,
			success:function (data){
				var obj=JSON.parse(data);
				if (obj.retCode == "resetpassword—008") {
					alert(obj.retMsg,function(){
						window.location.href='toHfaxappPasswordManage.do';
					});
    			} else {
    				if(obj.retMsg == "原密码不一致"){
    					alert("原密码输入错误");
    				}else{
    					alert(obj.retMsg);
    				}
    				
    			}
			},
			error:function (e){
				if(e==0){
					alert("网络忙，请稍后再试~~");
				}else{
					alert(e);
				}
			}
		});
	}
	

	
//校验密码  密码的规则是 数字和字母组合
function checkPass(pass){
		if(pass.length < 8){
		        return 0;
		}
		var ls = 0;
		if(pass.match(/([a-z])+/)){
		 ls++;
		}
		if(pass.match(/([0-9])+/)){
		   ls++; 
		}
		if(pass.match(/([A-Z])+/)){
		    ls++;
		}
		if(pass.match(/[^a-zA-Z0-9]+/)){
		    ls++;  
		}
		if(pass.match(/[^a-zA-Z0-9]+/)){
			return 0;  
		}
		    return ls;
	}
	

function checkPhone(mobile){
     var re = /^((13)|(16)|(15)|(18)|(14)|(17))\d{9}$/;
     var onoff = re.test(mobile);
     return onoff;
 }
/**
 * 绑定投资券
 * 
 **/

function toBindingTicket(){
	var param={};
	
	var ticketId=document.getElementById("ticketId").value;
	if(ticketId==""){
		alert("兑换码不可为空");
		return false;	
	}
	param["paramMap.ticketId"]=ticketId;
	ajax({
		url:'toBingingInvestTicket.do',
		type:"post",
		data:param,
		dataType:"json",
		success:function (data){
			var obj=JSON.parse(data);
			if (obj.successFlag == "1") {
				alert("绑定成功~~",function(){
					window.location.href='toHfaxappInvestCardManage.do';
				});
			}else{
				alert(obj.errorInfo);
			}
		},
	error:function(e){
		if(e==0){
			alert("网络忙，请稍后再试~~");
		}else{
			alert(e);
		}
	}
	
	});
}

/**
 * 去投资
 */
function toHfaxAppQtz(){
	var tickid = document.getElementById("ticketId").value;
	console.log(tickid);
	window.location.href='toQueryBorrowListByTicketId.do?tickid='+tickid;
}


function toRegistByLifeInsurance(){
	var param = {};
	param["paramMap.mobilePhone"] =document.getElementById("mobilePhone").value;
	param["paramMap.channelKey"] ="FHLSFH";
	param["paramMap.mecode"] =document.getElementById("mecode").value;
	param["paramMap.authCode"] =document.getElementById("authCode").value;
	param["paramMap.userType"] = "1";//个人注册
	param["paramMap.transt"] = "1";//key注册
	param["paramMap.yqusername"] = document.getElementById("yqusername").value;//key注册
	var password = document.getElementById("password").value;
	var mobile = document.getElementById("mobilePhone").value;
	if(mobile ==""){
		alert("手机号不可为空");
		return false;
	}else if(!checkPhone(mobile)){
		alert("请填写正确的手机号码");
		return false;
	}else if(password==""){
		alert("密码不可为空");
		return false;
	}else if(document.getElementById("authCode").value ==""){
		alert("请输入验证码");
		return false;
	}
	if (password=="") {
		alert("请设置您的密码");
		return false;
	} else if (password.length < 8) {
		alert("密码长度为8-16个字符");
		return false;
	}else if(checkPass(password)<2){
		alert("密码为数字、大写或者小写字母的组合");
		return false;
	} else if (password.length > 16) {
		alert("密码长度为8-16个字符");
		return false;
	}else {
	}
	
	 param["paramMap.password"] =password;
	
	ajax({url:'toHfaxappRegistByLifeInsurance.do',
		type:'POST',
		data:param,
		success:function (data){
			var obj=JSON.parse(data);
			if (obj.retCode == "0000") {	
				
				window.location.href='toHfaxAppSxReminderInfo.do';
			} else {
				alert(obj.retMsg);
			}
		},
		error:function (e){
			if(e==0){
				alert("网络忙，请稍后再试~~");
			}else{
				alert(e);
			}
		}
	});
}

function hfaxAppCheckPass(pass){
	if(pass.match(/^[a-zA-Z0-9]{6,16}$/)){
	 return 1;
	}
    return 0;
}
