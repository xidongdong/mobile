/**
 * @ 重置交易密码
 */
window.onload = function() {
	var checkCode = document.getElementsByTagName('div')[0].title;
	switch (checkCode) {
	// 登录页面
	case 'tranpw':
		var oBtnLogin = document.getElementById('sendPhoneSms');
		window.oBtnLogin = document.querySelector('#sendPhoneSms' );
		oBtnLogin.addEventListener('click', sendPhoneSms);

		var tranpwRe = document.getElementById('tranpwSub');
		tranpwRe.addEventListener('click', tranpwSub);
		break;
	case 'resetTransPwd':
		var oBtnLogin = document.getElementById('sendPhoneSms');
		window.oBtnLogin = document.querySelector('#sendPhoneSms' );
		oBtnLogin.addEventListener('click', sendPhoneSms);
		var oBtnLogin = document.getElementById('next');
		oBtnLogin.onclick = toTransPwdNext;

		break;
	case 'tranpwdNew':
		var oBtnTranPwdNew = document.getElementById('toResetTranPwdNew');
		oBtnTranPwdNew.addEventListener('click',toResetTranPwdNew);
		break;
	default:
		alert("^~^");
	}
};


	
/**
 * 发送短信校验码
 * 
 * @Liuyujing
 * 
 */
function sendPhoneSms(){
	toSendCheckCode(oBtnLogin);
	
}

	function toSendCheckCode(obj){
		toSendMsg(obj);
		ajax({url:'sendTranPhoneSms.do',
			type:'POST',
			success:function (data){
				var obj=JSON.parse(data);
				if (obj.retCode == "0000") {
					alert(obj.retMsg);			
    			} else {
    				alert(obj.retMsg);
    			}
			},
			error:function (e){
				alert(e);
			}
		});
	}
	
/**
 * 充值交易码验证信息页面
 * 
 */
	function tranpwSub(){
		var param = {};
		param["paramMap.realName"] =document.getElementById("realName").value;
		param["paramMap.idCard"] =document.getElementById("idCard").value;
		param["paramMap.bankCard"] =document.getElementById("bankCard").value;
		param["paramMap.codeNum"] =document.getElementById("codeNum").value;
		ajax({
			url:'tranpwInfoVer.do',
			type:'POST',
			data:param,
			success:function (data){
				var obj=JSON.parse(data);
				if (obj.msg == "0000") {
					//alert(obj.retCode);
					//新的交易密码设置
					//window.location.href='toReTranpw.do';
					window.location.href='toReTranpwdNew.do';
    			} else {
    				alert("个人信息验证失败！");
    			}
			},
			error:function (e){
				alert(e);
			}
		});
	}
	
	/**
	 * 未绑卡交易密码验证信息
	 * 
	 */
		function toTransPwdNext(){
			var param = {};
			param["paramMap.authCode"] =document.getElementById("authCode").value;
		
			ajax({
				url:'transPwdNext.do',
				type:'POST',
				data:param,
				success:function (data){
					var obj=JSON.parse(data);
					if (obj.retCode == "0000") {
						//新的交易密码设置
						//window.location.href='toReTranpw.do';
						window.location.href='toReTranpwdNew.do';
	    			} else {
	    				alert("请填写正确验证码");
	    			}
				},
				error:function (e){
					alert(e);
				}
			});
		}
		function toSendMsg(obj){
			window.sendTimer=null;
			var cum=60;
			obj.innerHTML='获取中: 60秒';
			obj.removeEventListener( 'click', sendPhoneSms);
			clearInterval(sendTimer);
			sendTimer=setInterval(function(){
				cum--;
				obj.innerHTML='获取中: '+cum+'秒';
				obj.removeEventListener( 'click', sendPhoneSms);
				
				if(cum<=0){
					clearInterval(sendTimer);
					obj.addEventListener( 'click', sendPhoneSms);
					obj.innerHTML='重新获取';
					
				}
			},1000);
		}
		function toResetTranPwdNew(){
			var param = {};
			var password = document.getElementById("password").value;
			var repassword = document.getElementById("repassword").value;
			param["paramMap.password"] = password;
			param["paramMap.repassword"] = repassword;
			if(password == ""){
				alert("请输入交易密码");
				return false;
			}
			if(repassword == ""){
				alert("请再次输入交易密码");
				return false;
			}
			if(!checkNewTranPass(password)){
				alert("请输入6-16为字母或数字");
				return false;
			}
			if(password != repassword){
				alert("两次输入的交易密码不一致");
				return false;
			}
			
			ajax({url:'toTranpwVerNew.do',
				type:'POST',
				data:param,
				success:function (data){
					var obj=JSON.parse(data);
					if (obj.retCode == "0000") {
						alert("重置交易密码成功",function(){
						var url = "toHfaxappPasswordManage.do";
	   		   				parent.location.href = url;	});
					} else {
						alert(obj.retMsg,function(){
							var url = "toReTranpwInit.do";
   	   		   				parent.location.href = url;
						});
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
		function checkNewTranPass(pass){
			
			if(pass.match(/^[a-zA-Z0-9]{6,16}$/)){
				return true;  
			}else{
				return false;
			}
			   
		}
	