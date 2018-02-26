/**
 * 授权页面
 */
var borrowId="";
/**
 * 充值失败返回信息
 */
var rechargeMsg="";
var register=function(){
  var page={
    html:
      '	<div class="main">'
	+  '    <header class="bar bar-nav"><h1 class="title">授权</h1></header>'
	+  '    <div class="content">'
	+  '      <div class="pdAll">'
	+  '        <div class="rigesterLogo">'
	+  '          <img src="mobile/cnapp/images/rigesterLogo.png" alt="">'
	+  ' 			<strong>安全、优惠、便捷</strong>'
	+  ' 			<span>惠金所-您的专属汽车钱包管家</span>'
	+  '        </div>'
	+  '  			<div class="linkAgree">'
	+  ' 			    <span>授权惠金所获取您的基本信息(姓名、手机号等)</span>'
	+  ' 			    <span>同意并授权关联惠金所账户，注册为惠金所用户</span>'
	+  ' 			</div>'
	+  '        <div class="btn btn-block btn-orange" id="registerb">授权</div>'
	+  '        <div class="agreement">'
	+  '          <i class="agree"></i><span>已阅读并同意</span><b id="yhxy1">《惠金所服务协议》</b>'
	+  '        </div>'
	+  '      </div>'
	+  '    </div>'
	  +'  </div>',
        
 
    fn:function(){
    	
    	localStorage.clear();
    	localStorage.opened='1';
    	push(document.querySelector('#registerb'),function(){
    	  var param = {};
    	  param["paramMap.transt"]=1;
    	  ajax({
    		    url:root+map.register,
    		    data:param,
    		    success:function(data){
    		    	if(data!=null&&data!="")
    		    	{
    		    		var json=eval('('+data+')');
    		    		 
    		    		if(json.status.loginFlag=='1'&&json.voFlag=='0000')
    		    		{
    		    			//授权、登陆成功
    		    			updateStatus(json);
    		    			
    		    			//backMap.push("registerFlag");//返回页面
    		    			createView(viewModle.product);
    		    		}else if(json.status.loginFlag!='1'&&json.voFlag=='0000'){
    		    			//用户已存在，去往登陆页面
    		    			//backMap.push("registerFlag");//返回页面
    		    			localStorage.a_mobile=json.resultData.mobilePhone;
    		    			createView(viewModle.loginFlag);
    		    		}else if(json.voFlag=='1111'){
    		    			//登陆超时
    		    			createView(viewModle.loginOutPage);
    		    			
    		    		}else{
    		    			//失败或系统异常
    		    			alert(json.msg);
    		    		}
    		    	}else{
    		    		alert("授权异常");
    		    	}	
    		    }
    		  });
      });
    	push(document.querySelector('#yhxy1'),function(){
    	  backMap.push("registerFlag");//返回页面
    	  createView(viewModle.hjsfwxy);
      });
      
    }
  }
  return page;
}
/**
 * 登陆页面
 */
var loginFn=function(){
	var page={
			html: 
			     '<div class="pdAll">'
			    +'<div class="text">'    
			    +' 您已经在阳光惠金所注册，验证密码后即可享受橙牛汽车钱包服务'     
			    +' </div>'   
			    +'<div class="input-group column">'    
			    +' <div class="input-row">'     
			    +' <label>惠金所账户</label>'       
			    +'<input type="text" disabled="true" placeholder="'+ getQueryString("mobilePhone")+'" id="b_name">'        
			    +' </div>'     
			    +' <div class="input-row hive-background">'     
			    +'<label>登录密码</label>'        
			    +'<input type="password" placeholder="请输入惠金所账户登录密码" id="b_password" tabindex="1">'        
			    +' </div>'     
			    //+' <p><b>忘记密码？</b></p>'   //去掉忘记密码   
			    +'</div>'    
			    +'<div class="btn btn-block btn-orange" id="b_login">确定</div>'    
			    +' <div class="agreement">'   
			    +' <i class="agree"></i><span>已阅读并同意</span><b id="yhxy">《惠金所服务协议》</b>'     
			    +' </div>'   
			    +'</div>',  
			 
		    fn:function(){
		    	push(document.querySelector('#b_login'),function(){
		    	  var userName =document.getElementById("b_name").placeholder;
		    	  var password =document.getElementById("b_password").value;
		    	  if(password==""){
		    		  alert('请输入密码');
		    		  return false;
		    	  }else{
		    		  var key = '12345678';
					  password = encryptByDES(password, key);
					  password = decToHex(password);
		    	  }
		    	  ajax({
		    		    url:root+map.login,
		    		    data:{userName:userName,password:password},
		    		    success:function(data){
		    		    	if(data!=null&&data!="")
		    		    	{
		    		    		var json=eval('('+data+')');
		    		    		if(json.voFlag=='0000')
		    		    		{
		    		    			//登陆成功
		    		    			updateStatus(json);
		    		    			//backMap.push("registerFlag");//返回页面
		    		    			createView(viewModle.product);
		    		    		}else if(json.voFlag=='1111'){
		    		    			//登陆超时
		    		    			createView(viewModle.loginOutPage);
		    		    		}else{
		    		    			alert(json.msg);
		    		    		}  
		    		    	}else{
		    		    		alert("登陆异常");
		    		    	}
		    		    }
		    		  });
		      });
		      push(document.querySelector('#yhxy'),function(){
		    	  backMap.push("loginFlag");//返回页面
		    	  createView(viewModle.hjsfwxy);
		      });
		    }
	}
	return page;
}
/**
 * 产品介绍页面
 */
var productInfo=function(){
  var page={
		    html: 
			 '      <div class="pdAll">   '
			+'        <div class="programBox">'
			+'          <div class="programTxt">'
			+'            <h2>钱包介绍</h2>'
			+'            <p><strong>自动投资：</strong><span>充值金额高于100元即可授权惠金所自动匹配投资产品，匹配成功后每日计息。（起息、到期时间根据项目具体发布情况确定）</span></p>'
			+'            <p><strong>复投规则：</strong><span>投资产品到期前1天如未申请提现，本息将自动复投。</span></p>'
			+'            <p><strong>提现规则：</strong><span>充值金额及投资余额均可提现，分别于提现申请后与投资项目到期日后三个工作日内到账。</span></p>'
			+'            <p><strong>消费规则：</strong><span>钱包余额均可用于橙牛内消费，优先扣除先到期投资项目的计提利息、本金。</span></p>'
			+'            <p><strong>打折细则：</strong><span>充值用户专享折上折，折扣每月200元额度。</span></p>'
			+'			  		<em>汽车钱包服务详情可参见 <br /><b id="zdtzxy">《汽车钱包服务规则》</b><b id="qcqbxy">《汽车钱包服务协议》</b></em>'
			+'          </div>'
			+'          <div class="programTxt">'
			+'            <h2>项目介绍</h2>'
			+'            <p><strong>项目来源：</strong><span>该投资项目由阳光保险集团旗下惠金所推荐及匹配。</span></p>'
			+'            <p><strong>预期年化：</strong><span>投资生效后预期年化收益率为7%。</span></p>'
			+'            <p><strong>投资期限：</strong><span>15-28天。</span></p>'
			+'            <p><strong>计息规则：</strong><span>每日计提，到期一次性还本付息。</span></p>'
			+'            <b id="tzhtxy">《投资合同协议》</b>'
			+'          </div>'
			+'          <div class="global-logo">'
			+'            <img src="mobile/cnapp/images/logoSmall.png" alt="">'
			+'            <span>交易资金安全由阳光保险承担</span>'
			+'          </div>'
			+'        </div>'
			+'      </div>'
			+'      <div class="btnFixed static">'
			+'        <div class="btn btn-block btn-orange" id="preRechargeb">确认充值</div>'
			+'      </div>',
		    fn:function(){
		      push(document.querySelector("#preRechargeb"),function(){
		    	  backMap.push("product");//返回页面
		    	  preRecharge();
		      });
		      
		      push(document.querySelector("#tzhtxy"),function(){
		    	  backMap.push("product");//返回页面
		    	  createView(viewModle.tzhtxy); 
		      });
		      
		      push(document.querySelector("#zdtzxy"),function(){
		    	  backMap.push("product");//返回页面
		    	  createView(viewModle.qcqbfugz);
		      });
		      push(document.querySelector("#qcqbxy"),function(){
		    	  backMap.push("product");//返回页面
		    	  createView(viewModle.qcqbfuxy);
		      });
 
		    }
		  }
  return page;
}
function getProtocolInfo(pid){
	ajax({
		url:root+map.cnprotocol,
		data:{pid:pid,borrowId:borrowId},
		success:function(data){
			if(data!=null&&data!=""){
				if(pid=='5'){
					htmlStr=data.substring(data.indexOf('<body>'),data.indexOf('</body>'));
					
				}else{
					var json=eval('('+data+')');
					htmlStr= json.resultData ;
				   }
				document.getElementById("tag").innerHTML=htmlStr;
				}
			}
		});
}
/**
 * 惠金所服务协议
 */
var hjsfwxy=function(pid){
	var htmlStr='';
	var page={
		html:'<div id="tag"></div>',
		fn:function(){
			getProtocolInfo(pid);
		}
	}
	return page;
}
/**
 *汽车钱包服务规则
 */
var qcqbfugz=function(pid){
	 var page={
			 html:'<div id="tag"></div>',
				fn:function(){
					getProtocolInfo(pid);
				}
	 		 }	  
	return page;
}
/**
 * 汽车钱包服务协议
 */
var qcqbfuxy=function(pid){
	var page={
			html:'<div id="tag"></div>',
			fn:function(){
				getProtocolInfo(pid);
			}
	}
	return page;
}

/**
 * 认证支付服务协议
 */
var rzzffwxy=function(pid){
	var page={
			html:'<div id="tag"></div>',
			fn:function(){
				getProtocolInfo(pid);
			}
	}
	return page;
}

/**
 * 惠金所服务协议
 */
var yhxy=function(){
	 var page={
			    html: 
		'	      <div class="pdAll">'
		+'	        <div class="hFaxCard" id="cons">'
		+'	          <h4>定向为头投资管理协议<span>编号：651854795485647</span></h4>'
		+'	          <h5>第一部分</h5>'
		+'	          <table>'
		+'	            <tr><td colspan="2" style="background:#e3e3e3">委托人(甲方)</td></tr>'
		+'	            <tr><td width="120">姓名</td><td>余鼎初</td></tr>'
		+'	            <tr><td>惠金所用户名</td><td>yudingchu</td></tr>'
		+'	            <tr><td>证件类型</td><td>身份证</td></tr>'
		+'	            <tr><td>证件号</td><td>220273198607041938</td></tr>'
		+'	            <tr><td colspan="2" style="background:#e3e3e3">委托人(乙方)</td></tr>'
		+'	            <tr><td>公司名称</td><td>北京融汇阳关财富投资管理有限公司</td></tr>'
		+'	            <tr><td>惠金所用户名</td><td>hjs</td></tr>'
		+'	            <tr><td colspan="2" style="background:#e3e3e3">定向委托投资标的明细</td></tr>'
		+'	            <tr><td>定向委托投资标的</td><td>非银行金融机构发行的金融产品</td></tr>'
		+'	            <tr><td>发行机构</td><td>非银行金融机构</td></tr>'
		+'	            <tr><td>定向委托投资标的成立日</td><td>4947140.00份</td></tr>'
		+'	            <tr><td>定向委托投资标的对应金融产品份额</td><td>2015年9月25日</td></tr>'
		+'	            <tr><td>定向委托投资标的到期日</td><td>2015年12月25日</td></tr>'
		+'	            <tr><td>定向委托投资标的剩余存续期</td><td>31天</td></tr>'
		+'	            <tr><td>定向委托投资标的预期收益率</td><td>8.90%/年</td></tr>'
		+'	          </table>'
		+'	          <h5>第二部分</h5>'
		+'	          <p>'
		+'	            第一条《定向委托投资管理协议》（“本协议”）由两部分组成：第一部分为“定向委托投资明细”；第二部分为“定向委托投资管理通用条款”。</p>'
		+'	            <p>'
		+'	第二条 甲方为符合中华人民共和国法律（“中国法律”，仅为本协议之目的，不包括香港特别行政区、澳门特别行政区和台湾省的法律法规）规定的具有完全民事权利能力和民事行为能力，独立行使和承担本协议项下权利义务的、自愿将合法所有资金委托乙方进行定向投资管理的自然人或机构。甲方为“北京中关村融汇金融信息服务有限公司”（“惠金所”）的注册用户。' 
		+'	          </p>'
		+'	        </div>'
		+'	      </div>'
	 		 }	  
	return page;
}
 
/**
 * 投资合同协议
 */
var tzhtxy=function(pid){
	var page={
			html:'<div id="tag"></div>',
			fn:function(){
				getProtocolInfo(pid);
			}
	}  
	return page;
}

/**
 * 充值时输入交易密码页面
 */
var entryapppw=function(){
	var dataStr = window.localStorage.d_recharge_postDataStr;
	 var page={
			 html:	
			    	'<div class="pdAll">'
			    	+'<div class="password">'
			    	+'<ul id="passBox">'
			    	+'<li></li>'
			    	+'<li></li>'
			    	+'<li></li>'
			    	+'<li></li>'
			    	+'<li></li>'
			    	+'<li></li>'
			    	+'</ul>'
			    	+'</div>'
			    	+'<p class="forgot"><b>忘记密码？</b></p>'
			    	+'</div>'
			    	+'<div id="text">'
			    	+'<ul id="keyBox">'
			    	+'<li>1</li>'
			    	+'<li>2</li>'
			    	+'<li>3</li>'
			    	+'<li>4</li>'
			    	+'<li>5</li>'
			    	+'<li>6</li>'
			    	+'<li>7</li>'
			    	+'<li>8</li>'
			    	+'<li>9</li>'
			    	+'</ul>'
			    	+'<ul id="btnBox">'
			    	+'<li></li>'
			    	+'<li>0</li>'
			    	+'<li>清除</li>'
			    	+'</ul>'
			    	+'</div>',
		   
		    fn:function(){
		    	push(document.querySelector('.forgot'),function(){
		    		backMap.push("entryapppw");
    				f_forgetpwd();
			      });
		    	setPassWord({
		    		bFlag:"once",
		    		fn:function(passWord){
		    			  passWord=encrypyPw(passWord);
						  ajax({
				    		    url:root+map.checkpw,
				    		    data:{password:passWord},
				    		    loadding:true,
				    		    success:function(data){
				    		      var json=eval('('+data+')');
				    		      if(json.voFlag!='0000')
				    		      {
				    		    	 closeLoading();
				    		    	 alert(json.msg);
				    		    	 // TODO
//				    		    	// 交易密码
//				 			    	var postData = passWord;
//				 			    	window.localStorage.setItem("d_recharge_postData", postData);
//				    		    	 f_doRecharge(dataStr);
				    		      }else if(json.voFlag=='1111'){
			    		    			//登陆超时
			    		    			createView(viewModle.loginOutPage);
			    		    			
			    		    		}else{
				    		    	// 交易密码
				  			    	var postData = passWord;
				  			    	window.localStorage.setItem("d_recharge_postData", postData);
				  			    	dataStr += passWord;
				    		    	f_doRecharge(dataStr);
				    		      }
				    		    }
			    		  });
		    		}
		    		
		    	});
			 
	    	}
 		 }	  
	return page;
}

 
/**
 * 橙牛消费时输入交易密码页面并橙牛消费扣款
 */
var inPWForCnConsume=function(){
	
	var page={
			html:	
		    	'<div class="pdAll">'
		    	+'<div class="password">'
		    	+'<ul id="passBox">'
		    	+'<li></li>'
		    	+'<li></li>'
		    	+'<li></li>'
		    	+'<li></li>'
		    	+'<li></li>'
		    	+'<li></li>'
		    	+'</ul>'
		    	+'</div>'
		    	+'<p class="forgot"><b>忘记密码？</b></p>'
		    	+'</div>'
		    	+'<div id="text">'
		    	+'<ul id="keyBox">'
		    	+'<li>1</li>'
		    	+'<li>2</li>'
		    	+'<li>3</li>'
		    	+'<li>4</li>'
		    	+'<li>5</li>'
		    	+'<li>6</li>'
		    	+'<li>7</li>'
		    	+'<li>8</li>'
		    	+'<li>9</li>'
		    	+'</ul>'
		    	+'<ul id="btnBox">'
		    	+'<li></li>'
		    	+'<li>0</li>'
		    	+'<li>清除</li>'
		    	+'</ul>'
		    	+'</div>',
			fn:function(){
				push(document.querySelector('.forgot'),function(){
    				f_forgetpwd();
			      });
				setPassWord({
		    		bFlag:"once",
		    		fn:function(passWord){
		    			  passWord=encrypyPw(passWord);
		    			   var data=cnConsumeInfo.data ;
		    			   var json=eval('('+data+')');
		    			   var model=json.model;
		    			   var orderToken=json.orderToken;
		    			   var out_trade_no=json.out_trade_no;
		    			   
						  ajax({
				    		    url:root+map.pay,
				    		    data:{password:passWord,orderToken:orderToken},
				    		    success:function(data){
				    		    
				    		      var json=eval('('+data+')');
				    		      if(json.state=='0')
				    		      {
				    		    	  cnConsumeInfo={};
			    		    	  window.location.href=model+"?out_trade_no="+out_trade_no;
				    		      }else{
				    		    	  
				    		    	 alert(json.error);
				    		      }
				    		    }
			    		  });
		    		}
		    		
		    	});
			}
	}
	
	return page;
}
 

/**
 * 设置密码页面
 */
var f_setapppw=function() {
	 var page={
		    html:
		    	'<div class="pdAll">'
		    	+'<h4 id="pageTip">请设置6位数字交易密码</h4>'
		    	+'<div class="password">'
		    	+'<ul id="passBox">'
		    	+'<li></li>'
		    	+'<li></li>'
		    	+'<li></li>'
		    	+'<li></li>'
		    	+'<li></li>'
		    	+'<li></li>'
		    	+'</ul>'
		    	+'</div>'
		    	+'</div>'
		    	+'<div id="text">'
		    	+'<ul id="keyBox">'
		    	+'<li>1</li>'
		    	+'<li>2</li>'
		    	+'<li>3</li>'
		    	+'<li>4</li>'
		    	+'<li>5</li>'
		    	+'<li>6</li>'
		    	+'<li>7</li>'
		    	+'<li>8</li>'
		    	+'<li>9</li>'
		    	+'</ul>'
		    	+'<ul id="btnBox">'
		    	+'<li></li>'
		    	+'<li>0</li>'
		    	+'<li>清除</li>'
		    	+'</ul>'
		    	+'</div>',
		    fn:function(){
		    	setPassWord({
		    	      bFlag:'twice',
		    	      fn:function(passWord){
		    	    	  if(passWord=="error"){
		            		  showErrorInfo();
		            		  return;
		    	    	  }
		    	    	  passWord=encrypyPw(passWord);
						  ajax({
				    		    url:root+map.setpw,
				    		    data:{password:passWord},
				    		    success:function(data){
				    		      var json=eval('('+data+')');
				    		      updateStatus(json);
				    		      if(json.voFlag=='0000')
				    		      {
				    		    	  if( json.status.cardFlag=='1'){
				    		    		     preRecharge("fromSetPwd");
					    		    	 }else{
					    		    		 createView(viewModle.renderBindCard);
					    		    	 }
				    		      }else if(json.voFlag=='1111'){
			    		    			//登陆超时
			    		    			createView(viewModle.loginOutPage);
			    		    			
						    	   }else{
				    		    	  
						    		   alert(json.msg);
				    		      }
				    		    }
			    		  });
		    	      }
		    	    });//两次
	    	}
 		 }	  
	return page;
}
/**
 * 提现获得页面信息
 */
var f_preExtraction=function(){
	ajax({
	    url:root+map.extraction,
	    success:function(data){
	      var json=eval('('+data+')');
	      if(json.voFlag=='0000')
	      {
	    	  var resultData = json.resultData;
		      var productList = resultData.productList;
		      localStorage.d_extraction_productList=data;
		      backMap.push("user");//返回页面
	    	  createView(viewModle.extraction);
	      } else if(json.voFlag=='1111'){
				backMap.push("user");//返回页面
				//登陆超时
				createView(viewModle.loginOutPage);
  			
	      } else {
	    	  alert(json.msg);
	      }
	    }
  });
}
/**
 * 提现时输入交易密码页面
 */
var f_extractionapppw=function(){
//	var data = window.localStorage.d_extraction_productList;
//	var json=eval('('+data+')');
//	var resultData = json.resultData;
//    var productList = resultData.productList;
//	var sunumb = "";
//	var cb = "";
//	for(var i=0; i<productList.length; i++) {
//		sunumb += productList[i].sunumb;
//		sunumb += ',';
//    }//
//	sunumb=sunumb.substring(0, sunumb.Length-1);
	var cb = "";
	var sunumb = localStorage.d_sunumb;
	var page={
			 html:	
				 '<div class="pdAll">'
			    	+'<div class="password">'
			    	+'<ul id="passBox">'
			    	+'<li></li>'
			    	+'<li></li>'
			    	+'<li></li>'
			    	+'<li></li>'
			    	+'<li></li>'
			    	+'<li></li>'
			    	+'</ul>'
			    	+'</div>'
			    	+'<p class="forgot"><b>忘记密码？</b></p>'
			    	+'</div>'
			    	+'<div id="text">'
			    	+'<ul id="keyBox">'
			    	+'<li>1</li>'
			    	+'<li>2</li>'
			    	+'<li>3</li>'
			    	+'<li>4</li>'
			    	+'<li>5</li>'
			    	+'<li>6</li>'
			    	+'<li>7</li>'
			    	+'<li>8</li>'
			    	+'<li>9</li>'
			    	+'</ul>'
			    	+'<ul id="btnBox">'
			    	+'<li></li>'
			    	+'<li>0</li>'
			    	+'<li>清除</li>'
			    	+'</ul>'
			    	+'</div>',
		    fn:function(){
		    	push(document.querySelector('.forgot'),function(){
    				f_forgetpwd();
			      });
		    	setPassWord({
		    		bFlag:"once",
		    		fn:function(passWord){
		    			  passWord=encrypyPw(passWord);
		    			  ajax({
				    		    url:root+map.cnHandleExtraction,
				    		    data:{
				    		    	password:passWord,
				    		    	resultData:sunumb,
				    		    	cb:cb
				    		    },
				    		    success:function(data){
				    		      var json=eval('('+data+')');
				    		      if(json.voFlag=='0000')
				    		      {
				    		    	  localStorage.d_extractionsuccess_data = data;
				    		    	  backMap.push("user");//返回页面
				    		    	  createView(viewModle.extractionsuccess);
				    		    	 
				    		    	 // TODO
//				    		    	 localStorage.d_extractionsuccess_data = data;
//				    		    	 createView(viewModle.extractionsuccess);
				    		      } else if(json.voFlag=='1111'){
			    		    			//登陆超时
			    		    			createView(viewModle.loginOutPage);
			    		    			
						    	   } else {
						    		   alert(json.msg);
				    		      }
				    		    }
			    		  });
		    		}
		    		
		    	});
	    	}
 		 }	  
	return page;
}
/**
 * 提现详情
 */
var f_extractionsuccess=function(){
	var postData = window.localStorage.d_extractionsuccess_data;
	var data = postData.split(",");
	var json=eval('('+data+')');
	var resultData = json.resultData;
	var productList = resultData.resultProductList;
	var nowdate = resultData.nowDate;
	var productListStr = "";
	for (var i = 0; i < productList.length; i++) {
		productListStr += "<li><span>";
		if ('fail' == productList[i].status) {
			productListStr += '<b class="error">失败</b>';
		}
		if ('success' == productList[i].status) {
			productListStr += '<b>成功</b>';
		}
		productListStr += "到账金额:<strong>";
		productListStr += productList[i].extractionSum;
		productListStr += "</strong>";
		productListStr += "</span>预计到账时间:";
		productListStr += productList[i].termdtDate;
		productListStr += "</li>";
    }
	 var page={
			 html:
		    	   '<div class="pdAll">'
		    	  + '<div class="extractBox">'
		    	  +	'<h2><strong>提现申请已提交，请等待银行处理</strong>提现时间:'+nowdate+'</h2>'
		    	  +	'<ul>'
		    	  + productListStr
		    	  +	'</ul>'
		    	  + '</div>'
		    	  + '<div class="navbar-fixed-bottom">'
		    	  + '<button class="btn btn-lg btn-main btn-orange btn-block" type="button">确定</button>'
		    	  + '</div>'
		    	  + '</div>',
		    fn:function(){
		    	push(document.querySelector('.btn-orange'),function(){
		    		createView(viewModle.user);
		    		return;
			      });
	    	}
 		 };	  
	return page;
};
/**
 * 提现页面
 */
var f_extraction = function() {
	var data = window.localStorage.d_extraction_productList;
	var json = eval('(' + data + ')');
	var resultData = json.resultData;
	var productList = resultData.productList;
	var sunumb = "";
	var totalAssets = resultData.totalAssets;
	var handleMoney = resultData.handleMoney;
	var frozenMoney = resultData.frozenMoney;
	var handleMoneyHtml = "";
	if (0 != handleMoney) {
		handleMoneyHtml = '<p>提现处理中（元）：<strong id="str_handleMoney">'+handleMoney+'</strong></p>';
	}
	var frozenMoneyHtml = "";
	if (0 != frozenMoney) {
		//现在不显示
		//frozenMoneyHtml = '<p>投资分配中（元）：<strong id="str_frozenMoney">'+frozenMoney+'</strong></p>';
	}
	var productListStr = "";
	var productSize = 0;
	var className="";
	var flag=0;
	if (null != productList && productList != undefined) {
		productSize = productList.length
		if(productList.length>0){
			className="btn btn-block btn-orange";
		}else{
			className="btn btn-block btn-gray";
		}
	}else{
		className="btn btn-block btn-gray";
	}
	for (var i = 0; i < productList.length; i++) {
		var cssName="";
		//if(window.localStorage.mobile!=exceptionUser.mobile){
			
			if(productList[i].status=='2'){
				cssName="wait";
				flag++;
			}
			
		//}
		
		productListStr += '<li class="'+cssName+'" ><span>';
		productListStr += productList[i].termdtDate;
		productListStr += '</span><i>';
		if ('have' == productList[i].type) {
			productListStr += '已投资';
		} else {
			productListStr += '未投资';
		}
		productListStr += '</i><strong>';
		productListStr += productList[i].extractionSum;
		productListStr += '</strong>';
		//status=1可提现,
		if(productList[i].status=='1'){
			productListStr +='<input type="hidden" value="'+productList[i].sunumb+'"/>';
			sunumb += productList[i].sunumb;
			sunumb += ',';
		}
		productListStr +="</li>";

	}
	if(flag==productList.length){
		className="btn btn-block btn-gray";
	}
	sunumb = sunumb.substring(0, sunumb.Length - 1);
	var page = {
	    html:
		    	   '<div class="pdAll">'
		    	  + '<div class="extractBody">'
		    	  + '<div class="extractSurvey">'
		    	  + '<p>总资产（元）：<strong id="str_totalAssets">'+totalAssets+'</strong></p>'
		    	  + handleMoneyHtml
		    	  + frozenMoneyHtml
		    	  + '</div>'
		    	  + '<div class="checkList">'
		    	  + '<h2><span>转账日期</span><i>资金类型</i><strong>金额(元)</strong><b>选择</b></h2>'
		    	  + '<ul>'
		    	  + productListStr
		    	  + '</ul>'
		    	  + '</div>'
		    	  + '<div class="jieshao">'
		    	  + '<strong>提现帮助：</strong>'
		    	  + '1.充值后金额将冻结一日：一日后可进行提款<br />'
		    	  + '2.钱包中的金额将自动投资理财产品，进行计息<br />'
		    	  + '3.未投资的钱包金额，提现申请成功后次日可转账<br />'
		    	  + '4.已投资的钱包金额，提现申请成功后等到理财产品到期进行'
		    	  + '自动转账<br />'
		    	  + '5.已投资的钱包金额，在转账日期前一天15:00前未申请提现则'
		    	  + '进行自动投资<br />'
		    	  + '6.系统转账后预计3个工作日可到账银行卡'
		    	  + '</div>'
		    	  + '<div class="extractCard">'
		    	  + '</div>'
		    	  + '<div class="'+className+'" id="btn_submit">提交</div>'
		    	  + '</div>'
		    	  + '</div>',
	    fn:function(){
	    	var html = "";
	    	ajax({
				url:root+map.getMyBank,
				success:function(data)
				{
					
					var json=eval('('+data+')');
					if(json.voFlag=='1111'){
		    			//登陆超时
		    			createView(viewModle.loginOutPage);
		    			return false;
		    	   }
					if(json.resultData!=null){
						
						html+=' <img src="mobile/cnapp/images/bankico_'+json.resultData.bankId+'.png" alt="">'
			             +'<strong><span>'+json.resultData.bankName+'</span> '+json.resultData.cardNox+'</strong>';
						document.querySelector(".extractCard").innerHTML=html;
					}
					
					if(resultData.productList.length==0){
						var oSubBtn=document.createElement('div');
				    	  oSubBtn.className='btn btn-block btn-gray';
				    	  oSubBtn.innerHTML='提交';
				    	  document.querySelector('#btn_submit').parentNode.appendChild(oSubBtn);
				    	  document.querySelector('#btn_submit').parentNode.removeChild(document.querySelector('#btn_submit'));

					}
					else if(resultData.productList.length==document.querySelectorAll('.wait').length){
						var oSubBtn=document.createElement('div');
				    	  oSubBtn.className='btn btn-block btn-gray';
				    	  oSubBtn.innerHTML='提交';
				    	  document.querySelector('#btn_submit').parentNode.appendChild(oSubBtn);
				    	  document.querySelector('#btn_submit').parentNode.removeChild(document.querySelector('#btn_submit'));
					}
					 
				}
			});
	    	var oLi=document.querySelectorAll('.checkList li');
	    	for (var i = 0; i < oLi.length; i++) {
	    		if(oLi[i].className!='wait'){
	    			push(oLi[i],function(){
	    				this.className=this.className=='checked'?'':'checked';
	    			})
	    		}
	    	  };
	    	  push(document.querySelector('#btn_submit,.btn btn-block btn-orange'),tx_submit);
	    
	    }
	 
	  }
	 //document.getElemntById('btn_submit').onClick()=function(){alert('ok')}
return page;
	
}
/**
 * 提现页面点击提交按钮时触发
 */
function tx_submit(){
	var ele=document.querySelectorAll('.checked input');
	var sunumb = "";
	if(eval("("+eval(localStorage).state+")").hasAppPwdFlag=="2") 
	{
		createView(viewModle.errorPage);
		return;
	}
	if (0 === ele.length) {
		alert("请勾选相应的提现数据!");
		return;
	}
	for (var i = 0; i < ele.length; i++) {
		sunumb += ele[i].value;
		sunumb += ",";
	}
	window.localStorage.setItem("d_sunumb", sunumb);
	backMap.push("extraction");
	createView(viewModle.extractionapppw);
  }

/**
 * 充值页面
 */
var f_recharge=function(postData){
	var dataStr = "";
	// 获得当前用户的银行
	 var page={
		    html:
		    	'<div class="pdAll">'
		    	+ '<div class="input-group column no-top icon-group">'
		    	+ '<div class="input-row hive-background">'
		    	+ '<label id="lbl_bank"><img src="mobile/cnapp/images/bankico_'+window.localStorage.b_bankId+'.png" alt="">'+window.localStorage.b_bankName+'</label>'
		    	+ '<input type="text" id="txt_cardNo" disabled="true"  placeholder="'+window.localStorage.b_cardNox+'" tabindex="1">'
		    	+ '</div>'
		    	+ '</div>'
		    	+ '<div class="text font12">'
		    	+ '单卡单次最多转入50000.00元'
		    	+ '</div>'
		    	+ '<div class="input-group column no-top icon-group">'
		    	+ '<div class="input-row hive-background">'
		    	+ '<label>充值金额</label>'
		    	+ '<input id="text_money" placeholder="请输入金额(元)" type="number" pattern="\d*" length="5" tabindex="2">'
		    	+ '</div>'
		    	+ '</div>'
		    	+ '<div class="text font12">'
		    	+ '千元起购，充值2万元以上可享橙牛产品折上折，最小增加单位为100元'
		    	+ '</div>'
		    	+ '<div class="btn btn-block btn-orange" id="btn_confirm">确认</div>'
		    	+'<div class="agreement">'
		    	+' <i class="agree"></i><span>已阅读并同意</span><b id="czyhxy">《惠金所服务协议》</b>'
		    	+'</div>'
		    	+ '</div>',
		    fn:function(){
	    		// 银行卡信息
		    	dataStr += window.localStorage.b_cardNo;
		    	dataStr += ';';
		    	dataStr += window.localStorage.b_bankId;
		    	dataStr += ';';
		    	dataStr += encodeURI(encodeURI(window.localStorage.b_bankName));
		    	dataStr += ';';
		    	
		    	push(document.getElementById("czyhxy"),function(){
		    		backMap.push("recharge");
//		    		createView(viewModle.yhxy);
		    		createView(viewModle.hjsfwxy);
		    	});
		    	
		    	push(document.querySelector('#btn_confirm'),function(){
		    		var money = document.querySelector('#text_money').value ;
		    		var reg = /^[0-9]*[1-9][0-9]*$/;  
		    		if(!reg.test(money)){
		    			alert("充值金额为正整数");
		    			document.getElementById("text_money").value="";
		    			return;
		    		}
		    		if(isNaN(money)|| money<100){
		    			alert("首次充值金额不能小于1000,复投金额不能小于100");
		    			document.getElementById("text_money").value="";
		    			return;
		    		};
		    		if(isNaN(money)|| money>50000){
		    			alert("单次充值金额不能大于5万");
		    			document.getElementById("text_money").value="";
		    			return;
		    		};
		    		ajax({
		    			url:root+map.rechargeCheck,
		    			data:{money:money},
		    			timeout:20000,
		    			timeoutView:viewModle.timeoutView,
		    			success:function(data){
		    				if(data!=null){
		    					var json=eval('('+data+')');
		    					if(json.voFlag=='0000'){
		    						dataStr += document.querySelector('#text_money').value;
							    	dataStr += ';';
							    	window.localStorage.setItem("d_recharge_postDataStr", dataStr);
						    		// 校验交易密码
							    	createView(viewModle.entryapppw);
		    					} else if(json.voFlag=='1111'){
		    		    			//登陆超时
		    		    			createView(viewModle.loginOutPage);
					    	   } else{
					    		   alert(json.msg);
					    		   document.getElementById("text_money").value="";
					    		   return false;
					    	   }
		    				}
				    		
		    			}
		    		});
		    		
			      });
	    	}
 		 }	  
	return page;
}
/**
 * 调用充值
 */
var f_doRecharge = function(dataStr) {
	ajax({
		    url:root+map.recharge,
		    data:{"postData":dataStr},
		    success:function(data){
		      var json=eval('('+data+')');
		      if(json.voFlag=='0000')
		      {
		    	 localStorage.setItem("d_recharge_money", json.resultData.recharge);
		    	 backMap.push("recharge");//返回页面
		    	 createView(viewModle.rechargesuccess);
		      } else if(json.voFlag=='1111'){
    			//登陆超时
    			createView(viewModle.loginOutPage);
    	   } else {
		    	 //backMap.push("recharge");//返回页面
    		   	 window.rechargeMsg=json.msg;
		    	 createView(viewModle.rechargefail);
	      }
	    }
	  });
}

/**
 * 充值成功(wxb  wj)
 */
var f_rechargesuccess=function(){
	var money = localStorage.d_recharge_money;
	 var page={
			 html: 
		    	'<div class="pdAll">'     
		    	 +'<div class="promptBox ok">'       
		    	 +'<h2>充值成功</h2>'         
		    	 /**+'<p>您已成功充值<strong>1000</strong><br />使用钱包消费可获得折上折</p>' */
		    	 +'<p>您已成功充值<strong>'+myTransNum(money)+'</strong><br />使用钱包消费可获得折上折</p>'
		      	 +'<b class="btn btn-outlined btn-third">确认</b>'         
		    	 +'</div>'          
		    	 +'</div>', 
		    fn:function(){
		    	push(document.querySelector('.btn'),function(){
				  createView(viewModle.user);
		      });
	    	}
 		 };	  
	return page;
};
/**
 * 我的钱包
 */
var user=function(){
	
	var page={
			html: 
		    	'      <div class="pdAll">'
			    +'        <div class="detailBox">'
			    +'          <div class="walletListTop">'
			    +'            <p>总资产(元)<strong id="s_Amount"></strong></p>'
			    +'            <ul>'
			    +'              <li>总收益(元)<strong id="s_Earnsum" ></strong></li>'
			    +'              <li>昨日收益(元)<strong id="s_Yessum"></strong></li>'
			    +'            </ul>'
			    +'          </div>'
			    +'          <div class="detailList walletList">'
			    +'            <ul>'
			    +'              <li id="mycard">我的银行卡</li>'
			    +'              <li id="resetpw">重置密码</li>'
			    +'              <li id="dealDetail">交易记录</li>'
			    +'              <li id="proceedsDetail">收益明细</li>'
			    +'              <li id="financialDetail">理财明细</li>'
			    +'            </ul>'
			    +'          </div>'
			    +'          <div class="global-logo">'
			    +'            <img src="mobile/cnapp/images/logoSmall.png" alt="">'
			    +'            <span>交易资金安全由阳光保险承担</span>'
			    +'          </div>'
			    +'        </div>'
			    +'      </div>'
			    +'          <div class="btnFixed"> '
			    +'            <div class="btn btn-outlined btn-second" id="cash">提现</div>'
			    +'            <div class="btn btn-block btn-orange" id="preRecharge">立即充值</div>'
			    +' 	 </div>',
		    fn:function(){
		    	ajax({
	    		    url:root+map.toQyMyWallet,
	    		    data:{
	    		    	cb:''
	    		    },
	    		    success:function(data){
	    		      var json=eval('('+data+')');
	    		      if(json.voFlag=='1111'){
	  		    			//登陆超时
	  		    			createView(viewModle.loginOutPage);
	  		    		}else if(json.voFlag=='0000')
	    		      {
	  		    			backMap=[];
	  		    			var resultData = json.resultData;
		    		    	var amount = resultData.amount;
		    		    	if (typeof(amount)==undefined){
		    		    		amount = 0.00;
		    		    	}else{
		    		    		amount = myTransNum(amount);
		    		    	}
		    		    	var balace = resultData.balace;
		    		    	var earnsum = resultData.earnsum;
		    		    	if (typeof(earnsum)==undefined){
		    		    		earnsum = 0.00;
		    		    	}else{
		    		    		earnsum = myTransNum(earnsum);
		    		    	}
		    		    	var yessum = resultData.yessum;
		    		    	if (typeof(yessum)==undefined){
		    		    		yessum = 0.00;
		    		    	}else{
		    		    		yessum = myTransNum(yessum);
		    		    	}
		    		    	document.querySelector("#s_Amount").innerHTML=amount; 
		    		    	document.querySelector("#s_Earnsum").innerHTML=earnsum; 
		    		    	document.querySelector("#s_Yessum").innerHTML=yessum; 
	    		      }  
	    		      else if(json.msg!=""){
	    		    	  alert(json.msg);
	    		      } else{
	    		    	  alert("网络异常，请重试");
	    		      }
	    		    }
    		  });
		    	push(document.querySelector('#mycard'),function(){
		    		 
		    		 	backMap.push("user");//返回页面
		    		 	createView(viewModle. myBankCard);
		    		
		    	 });
		    	push(document.querySelector('#resetpw'),function(){
		    		 	backMap.push("user");//返回页面
		    		 	createView(viewModle.resetPassWord);
		    		 
		    	 });
		    	push(document.querySelector('#dealDetail'),function(){
		    		 	backMap.push("user");//返回页面
		    		 	createView(viewModle.transactionrecord);
		    	 });
		    	push(document.querySelector('#proceedsDetail'),function(){
					 	backMap.push("user");//返回页面
		    		 	createView(viewModle.proceedsDetail);   		 
				 });
		    	push(document.querySelector('#financialDetail'),function(){
					 	backMap.push("user");//返回页面
		    		 	createView(viewModle.financingDetail);   
				});
		    	push(document.querySelector('#cash'),function(){
					 	backMap.push("user");//返回页面
					 	f_preExtraction();  
				});
		    	push(document.querySelector('#preRecharge'),function(){
					
					backMap.push("user");//返回页面
					createView(viewModle.product);
				});
		    }	  
	}
	return page;
}

/**
 * 校验app交易密码页面
 */
var checkapppw=function()
{
	 var page={
		    html:'<div class="pdAll">'
		    	+'<div class="password">'
		    	+'<ul id="passBox">'
		    	+'<li></li>'
		    	+'<li></li>'
		    	+'<li></li>'
		    	+'<li></li>'
		    	+'<li></li>'
		    	+'<li></li>'
		    	+'</ul>'
		    	+'</div>'
		    	+'<p class="forgot"><b>忘记密码？</b></p>'
		    	+'</div>'
		    	+'<div id="text">'
		    	+'<ul id="keyBox">'
		    	+'<li>1</li>'
		    	+'<li>2</li>'
		    	+'<li>3</li>'
		    	+'<li>4</li>'
		    	+'<li>5</li>'
		    	+'<li>6</li>'
		    	+'<li>7</li>'
		    	+'<li>8</li>'
		    	+'<li>9</li>'
		    	+'</ul>'
		    	+'<ul id="btnBox">'
		    	+'<li></li>'
		    	+'<li>0</li>'
		    	+'<li>清除</li>'
		    	+'</ul>'
		    	+'</div>',
		    fn:function(){
		    	push(document.querySelector('.forgot'),function(){
    				f_forgetpwd();
			      });
			  setPassWord({
		    		bFlag:"once",
		    		fn:function(passWord){
		    			  passWord=encrypyPw(passWord);
		    			  ajax({
				    		    url:root+map.checkpw,
				    		    data:{
				    		    	password:passWord
				    		    },
				    		    success:function(data){
				    		      var json=eval('('+data+')');
				    		      if(json.voFlag=='0000')
				    		      {
				    		    	 createView(viewModle.renderBindCard);
				    		      } else if(json.voFlag=='1111'){
			    		    			//登陆超时
			    		    			createView(viewModle.loginOutPage);
			    		    		}
				    		      	else{
				    		      		alert(json.msg);
				    		      }
				    		    }
			    		  });
		    		}
		    	});
	    	}
 		 }	  
	return page;
}


/**
 * 校验pc交易密码页面
 */
var checkpcpw=function()
{
	var page = {
		html : '     <div class="pdAll plAll-reset">                                                       '
				+ '       <div class="text">                                                     '
				+ '         为了保障您的账号安全，请在设置APP交易密码前进行惠金所交易密码校验              '
				+ '       </div>                                                                 '
				+ '       <div class="input-group column">                                       '
				+ '         <div class="input-row hive-background">                               '
				+ '           <label>密码校验</label>                                               '
				+ '           <input type="password" placeholder="请输入交易密码" id="pcpassword" tabindex="1">                      '
				+ '         </div>                                                                 '
				+ '       </div>                                                                  '
				+ '       <div class="btn btn-block btn-orange" id="entrypwb">下一步</div>                          '
				/*+ '       <div class="global-logo"><img src="mobile/cnapp/images/logoSmall.png" alt=""></div> '*/
				+ ' </div>                                                                          ',
		fn : function() {
			push(document.querySelector('#entrypwb'),function(){
								var key = '12345678';
				  var password=document.getElementById("pcpassword").value;
								if (password == "") {
									alert("密码不能为空");
									return;
								}
								password = encryptByDES(password, key);
								password = decToHex(password);
								ajax({
									url : root + map.checkpw,
		    		    data:{password:password,qdh:'101'},
									success : function(data) {
										var json = eval('(' + data + ')');
										if(json.voFlag=='0000')
						    		      {
												createView(viewModle.setapppw);
											} else if (json.voFlag == '1111') {
												// 登陆超时
												createView(viewModle.loginOutPage);
											} else {
												alert(json.msg);
											}
									}
								});
							});
		}
	}
	return page;
}

/**
 * 交易记录页面(wdw wj)
 */

var transactionrecord=function()
{
	var page = {
		    html: 
		    	'<div class="pdAll">'
				+ '<div class="record">'
				+ '</div>'
				+ '<b class="btn btn-outlined btn-third more" id="getMore">加载更多</b>'
				+ '</div>',
		    fn:function()
		    {
			var recordBox = document.querySelector('.record');
			var pageNo = 0;
			window.aMonthPageEnd = '197001';
			getMoreInfo();
			push(document.getElementById("getMore"),getMoreInfo);

			function getMoreInfo() {
				var param = {};
				param["paramMap.pageno"] = ++pageNo;
				ajax({
					url : root + map.transactionrecord,
					data : param,
					success : function(data) {
						var oRecord = document.createElement('div');
						var json = eval('(' + data + ')');
						var dataObj = json.resultData;
						var totalNum = "";
						if (dataObj != null && dataObj.info.length) {
							oRecord.innerHTML = loadNewList(dataObj.info);
							var reLists = document.querySelectorAll('.reList');
				if(reLists && reLists.length + dataObj.info.length == dataObj.totshu ){
								document.querySelector('#getMore').style.display = 'none';
							}
			}
			else{
							var div = document.querySelector(".record");
							var childDiv = document.createElement("div");
							childDiv.className = "undefined";
							div.appendChild(childDiv);
							document.querySelector('#getMore').style.display = 'none';

				return;}
						recordBox.appendChild(oRecord);
					}
				});
			}

		}
	}
	return page;
}

/**
 * 收益明细页面
 */
var proceedsDetail=function()
{
	var page = {
		    html:
		    '	      <div class="pdAll">'
			+'	        <div class="profitList">'
			+'	          <h2>'
				+ '	            <span>累计收益(元)</span>'
				+ '	            <strong id="totalincome"></strong>'
			+'	          </h2>'
			+'          <ul id="dataTab">'
			+'          </ul>'
			+'          </div>'
			+'        </div>',
		    fn:function()
		    {
			var html = '';
			ajax({
				url : root + map.proceedsDetail,
			    		    data:{pageno:1},
				success : function(data) {
					var json = eval('(' + data + ')');
					if (json.voFlag == "1111") {
						// 登陆超时
						createView(viewModle.loginOutPage);
					}else if(json.voFlag == "0000"){
						var dataObj = json.resultData;
						if(dataObj!=null)
						{
							var earsum = dataObj.earsum;
							if (0 == earsum) {
								earsum = "0.00";
								document.getElementById("totalincome").innerHTML = earsum;
								var divObj = document.createElement("div");
								divObj.className = "undefined";
								document.querySelector(".pdAll").appendChild(divObj) ;
							} else {
								//累计收益
								document.getElementById("totalincome").innerHTML = earsum;
								for(var i=0;i<dataObj.loop.length;i++)
								{
									html+='<li><span>'+StringToDate(dataObj.loop[i].benefi)+"</span><strong>"+dataObj.loop[i].dayinc+"</strong></li>";
								}
								document.querySelector("#dataTab").innerHTML = html;
							}
						}else{
							document.getElementById("totalincome").innerHTML = "0.00";
							var divObj = document.createElement("div");
							divObj.className = "undefined";
							document.querySelector(".pdAll").appendChild(divObj) ;
						}
					} 
				}
			});
		}
	}
	return page;
}
/**
 * 理财明细页面(wdw wj)
 */
var financingDetail=function()
{
	var page = {
		    html:
		          '<div class="pdAll">'
				+ '<div class="financeList" >'
				+ '</div>'
				+ '<b class="btn btn-outlined btn-third more" id="getMore">加载更多</b>'
				+ '</div>',
		    fn : function() {
			var html = '';
			var pageNo = 0;
			var divObj = document.querySelector(".financeList");
			getInfo();
			push(document.getElementById("getMore"),getInfo);
			function getInfo() {
				var param = {};
				param["paramMap.pageno"] = ++pageNo;
				ajax({
					url : root + map.financingDetail,
					data : param,
					success : function(data) {
						var json = eval('(' + data + ')');
						var oRecord = document.createElement('div');
						if (json.voFlag == '1111') {
							// 登陆超时
							createView(viewModle.loginOutPage);
						}else if (json.voFlag != "0000") {
							var noData = document.createElement('div');
							noData.class = "promptBox";
							noData.innerHTML = '<div class="undefined"></div>';
							divObj.appendChild(noData);
							document.getElementById("getMore").style.display = "none";
							return;
						} 
						var dataObj = json.resultData;
			    		      if(dataObj && dataObj.info  && dataObj.info.length>0)
		    		    	  {
			    		    	var htmlMj="";
			    		    	var htmlSD="";
			    		    	var htmlWJ="";
			    		    	
			    		    	for(var i=0;i<dataObj.info.length;i++)
			    		    	{
			    		    		var tip="";
									var className="";
									if(dataObj.info[i].orvrst==3 || dataObj.info[i].orvrst==6){
					    				tip="已完结";
					    				className="end";
					    				htmlWJ+=bulidHtml(dataObj.info[i],className,tip);
					    				
									 }else if(dataObj.info[i].orvrst==1){
										 tip="募集期";
										 className="start";
										 htmlMj+=bulidHtml(dataObj.info[i],className,tip);
					    			 }else if(dataObj.info[i].orvrst==2 || dataObj.info[i].orvrst==4 || dataObj.info[i].orvrst==5 || dataObj.info[i].orvrst==10){
					    				 tip="锁定期";
					    				 className="stop";
					    				 htmlSD+=bulidHtml(dataObj.info[i],className,tip);
									 }
			    		    	}
			    		    	html=htmlMj+htmlSD+htmlWJ;
//			    		    	if(html==""){
//			    		    		html += '<div class="undefined"></div>';
//			    		    	}
							if (dataObj.totshu > pageNo * 30) {
								document.getElementById("getMore").style.display = "block";
							} else {
								document.getElementById("getMore").style.display = "none";
							}
						} else {
							html += '<div class="undefined"></div>';
							document.getElementById("getMore").style.display = "none";
						}
						// console.log(oRecord);
						oRecord.innerHTML = html
						divObj.appendChild(oRecord);
						showInfo();
					}

				});

			}
function bulidHtml(dataObj,className,tip){
	var html="";
	//if(Number(dataObj.minams)!=0){
		html += '	  <div class="fListBox">';
		html += '     <ul>';
		html += '        <li class="fListLeft">';
		html+='          <span>投资金额(元)<b>'+dataObj.tranam+'</b></span>';
		html+='          <span>购买消费(元)<b>'+dataObj.selamo+'</b></span>';
		html+='          <span>剩余本金(元)<b>'+dataObj.minams+'</b></span>';
		html += '       </li>';
		html+='        <li class="fListCenter"><strong>'+dataObj.loterm+'</strong>投资期限(天)</li>';
		html+='        <li class="fListRight"><strong>'+dataObj.earnie+'</strong></li>';
		html += '      </ul>';
		html+='      <p><span>付息时间 <b>'+StringToDate(dataObj.matudt)+'</b></span><strong class="viewContract" id="'+dataObj.subjcd+'">查看合同</strong></p>';
		html += '<i class="'+className+'">' + tip + '</i>';
		html += '</div>';
	//}
	return html;
}
// 查看合同
function showInfo() {
				var fListBoxDiv=document.querySelectorAll('.fListBox'); 
				for(var i=0;i<fListBoxDiv.length;i++){
					var className =fListBoxDiv[i].getElementsByTagName("i")[0].className
					var spanObj=document.createElement("span");
					var liObj=fListBoxDiv[i].getElementsByTagName("ul")[0].getElementsByTagName("li")[2];
					if(className=="end"){
						 spanObj.innerHTML="总收益(元)";
						 liObj.appendChild(spanObj);
					}else{
						spanObj.innerHTML="预计收益(元)";
						 liObj.appendChild(spanObj);
					}
				}
				
				var ckhtObj = document.querySelectorAll('.viewContract');
				for (var i = 0; i < ckhtObj.length; i++) {
					
					push(ckhtObj[i], function() {
						backMap.push("financingDetail");// 返回页面
						borrowId=this.getAttribute("id");
						createView(viewModle.tzhtxy);
					});
				}
		    	 };
		}
	}
	return page;
}

/**
 * 我的银行卡页面
 */
var myBankCard=function(){
	var page={
			html:	'    <div class="pdAll">'
				+'      <div class="myCard">'
				+'		</div>'
				+'      <div class="btn btn-block btn-orange" id="changeBankCard">修改银行卡</div>'
				+'      <div class="global-logo"><img src="mobile/cnapp/images/logoSmall.png" alt=""></div>'
				+'    </div>',
			fn:function()
			{
				var html='';
				ajax({
					url:root+map.getMyBank,
					success:function(data)
					{
						var json=eval('('+data+')');
						if(json.resultData!=null){
							
							html+=' <img src="mobile/cnapp/images/bankico_'+json.resultData.bankId+'.png" alt="">'
				             +'<strong><span>'+json.resultData.bankName+'</span> '+json.resultData.cardNox+'</strong>';
							document.querySelector(".myCard").innerHTML=html;
						}
					}
				});
				push(document.querySelector('#changeBankCard'),function(){
					 ajax({
						 url:root+map.forsolBankCard,
						 success:function(data){
							 var json=eval('('+data+')');
							 if(json.voFlag == "0099"){
								 alert(json.msg);
								 return;
							 }else if(json.voFlag == "0000"){
								 localStorage.isReplace="1";
								 createView(viewModle.renderBindCard);
								 return;
							 }else if(json.voFlag == "1111"){
								 createView(viewModle.loginOutPage);
								 return;
							 }
						 }
					 });
					 
				 });
			}
	}
	return page;
}
/**
 * 白名单页面
 */
var whiteRoster=function()
{
	var page = {
			html:
		'      <div class="pdAll">'
		+'        <div class="whiteList">'
				+ '          <img src="mobile/cnapp/images/logoMe.svg" alt="">'
				+ '          <p>您已经在惠金所绑定的银行卡；<br />'
		+'          需要您去惠金所APP做相应修改才可以进行充值</p>'
				+ '  </div>'
		+'  </div>'
	}
	return page;
}
/**
 * 忘记密码
 */
var f_forgetpwd=function()
{
	createView(viewModle.resetPassWord);
}

// wj
/**
 * 充值失败
 */
var f_rechargefail = function() {
	var page = {
			html:'<div class="pdAll">'
			    +'<div class="promptBox">'    
			    +'<h2>'+window.rechargeMsg+'</h2>'     
			    +'<p>请您重新确认信息</p>'
			    +'<b class="btn btn-outlined btn-second">确认</b>'    
			    +'</div>'
			    +'</div>',
	        fn:function(){
	        	push(document.querySelector(".btn"),function(){
	        		preRecharge();
	        	});
	        }			
	};
	return page;
};
/**
 * 链接失败
 */
var f_linkfail = function (){
	var page ={
		html:'<div class="pdAll">'
			+'	<div class="promptBox">'
			+'	  <h2>出错啦！</h2>'
			+'	  <p>如有疑问，请联系客服。</p>'
			+'	  <span>客服电话</span>'
			+'	  <strong>400-8066-330</strong>'
			+'	</div>'
			+'</div>',
        fn:function(){
        	push(document.querySelector('.btn'),function(){
        		createView(viewModle.product);
        	});
        }     
	};
	return page;
};

/**
 * 渲染 身份证认证 页面
 */
var renderIDAuthentication = function() {
	var page = {
		html :  '    <div class="pdAll plAll-reset">                                                            '
				+ '      <div class="input-group column no-top">                                     '
				+ '        <div class="input-row hive-background">                                    '
				+ '          <label>真实姓名</label>                                                  '
				+ '          <input type="text" placeholder="请输入姓名" id="realName" tabindex="1">                             '
				+ '        </div>                                                                     '
				+ '        <div class="input-row hive-background">                                    '
				+ '          <label>证件类型</label>                                                  '
				+ '          <input id="realName" type="text" disabled="true" placeholder="身份证">                 '
				+ '        </div>                                                                     '
				+ '        <div class="input-row hive-background">                                    '
				+ '          <label>证件号码</label>                                                  '
				+ '          <input id="certNo" type="text" placeholder="请输入身份证号" tabindex="2">                         '
				+ '        </div>                                                                     '
				+ '      </div>                                                                      '
				+ '      <div class="btn btn-block btn-orange" id="openAccountBt_lu">认证</div>                               '
				/*+ '    <div class="global-logo"><img src="mobile/cnapp/images/logoSmall.png" alt=""></div>    '*/
				+ '</div>                                                                             ',
		fn : function() {
			push(document
					.querySelector("#openAccountBt_lu"),
							function() {
								var realName = document
										.querySelector("#realName").value;
								var certNo = document.querySelector("#certNo").value;
								if (realName == null || realName == "") {
									alert("请输入姓名");
									return;
								}
								if (certNo == null || certNo == "" || !isCardNo(certNo)) {
									alert("请输入正确的身份证号");
									return;
								}
								var IDdata = {
									"paramMap.realName" : encodeURI(encodeURI(realName)),
									"paramMap.certNo" : certNo
								};
								ajax({
									url : root + map.openAccount,
									data : IDdata,
									success : function(data) { 
										var json = eval('(' + data + ')');
										updateStatus(json);
										if (json.voFlag == "0000") {
											createView(viewModle.setapppw);
										}else if(json.voFlag=='1111'){
				    		    			//登陆超时
				    		    			createView(viewModle.loginOutPage);
				    		    		}
										else {
											alert(json.msg);
										}
									}
								});
							});
		}
	}
	return page;
}
/**
 * 渲染绑卡页面
 */
function renderBindCard() {
	var page = {
		html : '      <div class="pdAll plAll-reset plAll-bindcard">                                                            '
				+'		<div id="ad_s" class="bindAdd">新用户绑卡立送<strong>20元</strong>橙牛加油券</div>'
				+ '        <div class="input-group column no-top">                                     '
				+ '          <div class="input-row hive-background">                                    '
				+ '            <label>持卡人</label>                                                    '
				+ '            <input type="text" disabled="true"  id="realName">                   '
				+ '          </div>                                                                     '
				+ '		<div id="reAuCard">'	
				+ '          <div class="input-row hive-background checkBox"  id="selectBankBt">                           '
				+ '            <label>开户行</label>                                                    '
				+ '            <input type="text" disabled="true" id="cardInfo" placeholder="请选择银行卡">           '
				+ '          </div>                                                                     '
				+ '   </div>                                                                     '
				+ '          <div class="input-row hive-background">                                    '
				+ '            <label>卡号</label>                                                      '
				+ '            <input type="text"  placeholder="请输入银行卡号" id="cardNo" tabindex="1">    '
				+ '          </div>                                                                     '
				+ '        </div>                                                                      '
				+ '        <div class="text font12">请输入银行预留信息</div>                            '
				+ '        <div class="input-group column no-top">                                     '
				+ '          <div class="input-row hive-background">                                    '
				+ '            <label>身份证号</label>                                                  '
				+ '            <input type="text"  disabled="true" placeholder="请输入您的身份证号" id="certNo" >                         '
				+ '          </div>                                                                     '
				+ '          <div class="input-row hive-background">                                    '
				+ '            <label>手机号</label>                                                  '
				+ '            <input type="text" id="mobile" placeholder="请输入您的手机号" tabindex="2">                             '
				+ '          </div>                                                                     '
				+ '        </div>                                                                      '
				+ '        <div class="btn btn-block btn-orange" id="preBindCardBt">下一步</div>                           '
				+ '        <div class="agreement">                                                      '
				+ '          <i class="agree"></i><span>已阅读并同意</span><b id="hjs_protocol">《认证支付服务协议》</b>          '
				+ '        </div>                                                                       '
				/*+ '        <div class="global-logo"><img src="mobile/cnapp/images/logoSmall.svg" alt=""></div>    '*/
				+ '  </div>   ',
		fn : function() {
			push(document.querySelector("#hjs_protocol"),function(){
						window.b_BKMobile = document
								.getElementById("mobile").value;
						window.b_BKCardNo = document
								.getElementById("cardNo").value;
						localStorage.b_BKMobile = document
								.getElementById("mobile").value;
						localStorage.b_BKCardNo = document
								.getElementById("cardNo").value;
						backMap.push("renderBindCard");
						createView(viewModle.rzzffwxy);
						return;
					});
			if(localStorage.isReplace){
				document.querySelector('#ad_s').style.display="none";
			}
			if(!b_hasAlert ){
				//alert("系统升级，只能绑定一张银行卡");
				b_hasAlert = "1";
			}
			if (b_selectedBank.name) {
				document.querySelector('#cardInfo').value = b_selectedBank.name;
			}
			if (b_BKMobile) {
				document.querySelector('#mobile').value = b_BKMobile;
			}
			if (b_BKCardNo) {
				document.querySelector('#cardNo').value = b_BKCardNo;
			}
			push(document.querySelector("#selectBankBt"),touchSelectBank);
			if(localStorage.b_reAuthentication=="1"){
				document.querySelector('#reAuCard').innerHTML=' <div class="input-row hive-background" >  <label>开户行</label> <input type="text" disabled="true" id="cardInfo" > </div>'
				document.querySelector('#cardInfo').value = localStorage.b_bankName;
				document.querySelector('#cardNo').value = localStorage.b_cardNo;
				document.querySelector('#cardNo').disabled="true";
				b_selectedBank.id = localStorage.b_bankId;
				b_selectedBank.name = localStorage.b_bankName;
			}
			ajax({
				url : root + map.cnGetBindCardInfo,
				success : function(data) {
					var json = eval("(" + data + ")");
					if (json.voFlag == '1111') {
						// 登陆超时
						createView(viewModle.loginOutPage);
					} else if (json.voFlag != "0000") {
						alert(json.msg);
						return;
					}
					var mobile = json.resultData.mobile;
					var realName = json.resultData.realName;
					var certNo = json.resultData.certNo;

					window.b_bankList = json.resultData.bankList;
					var bankList = JSON.stringify(json.resultData.bankList);
					localStorage.b_bankList = bankList;
					document.getElementById("realName").value = realName;
					document.getElementById("certNo").value = certNo;
				},
				error : function(status) {
					alert(status);
				}
			});
			push(document
					.querySelector("#preBindCardBt"),
							function() {
								var bankName = b_selectedBank.name;
								var bankNo = b_selectedBank.id ;
								// document.querySelector("#certNo").value;
								var cardNo = document.querySelector("#cardNo").value;
								var mobile = document.querySelector("#mobile").value;
								if (!mobile || !/^[\d]{11}$/.test(mobile) ) {
									alert("请输入长度为11位的预留手机号");
									return;
								}
								if (!bankNo || !bankName) {
									alert("请选择开户行");
									return;
								}
								if (!cardNo) {
									alert("请输入银行卡号");
									return;
								}else{
									var reg = /^\d{16,19}$/;
									if(!reg.test(cardNo)){
										alert("请输入合法的银行卡号");
										return;
									}
								}
								var bindCardData = {
									"paramMap.bankNo" : bankNo,
									"paramMap.cardNo" : cardNo,
									"paramMap.mobile" : mobile,
									"paramMap.bankName" : encodeURI(encodeURI(bankName))
								};
								ajax({
									url : root + map.bindBankCard,
									data : bindCardData,
									success : function(data2) {
										data2 = eval('(' + data2 + ')');
										if (data2.voFlag == "0000") {
											var view = {
												content : function() {
													return {
														"html" : data2.resultData,
														fn : function() {
															document
																	.querySelector(
																			"#editForm")
																	.submit();
														}
													};
												},
												id : "",
												title : ""
											};
											backMap.push("renderBindCard");
											createView(view);
											localStorage.isReplace="";
											b_selectedBank={};
											b_hasAlert = "";
											localStorage.b_reAuthentication="";
										} else {
											alert(data2.msg);
										}
									}
								})
							});
		}
	}
	return page;
}
/**
 * 渲染绑卡页面 有卡的情况
 *//*
function renderReplaceCard() {
	var page = {
		html : '      <div class="pdAll">                                                            '
				+ '        <div class="input-group column no-top">                                     '
				+ '          <div class="input-row hive-background">                                    '
				+ '            <label>持卡人</label>                                                    '
				+ '            <input type="text" disabled="true"  id="realName">                   '
				+ '          </div>                                                                     '
				+ '          <div class="input-row hive-background checkBox"  id="selectBankBt">                           '
				+ '            <label>开户行</label>                                                    '
				+ '            <input type="text" disabled="true" id="cardInfo" value="'
				+ localStorage.b_bankName
				+ '">           '
				+ '          </div>                                                                     '
				+ '          <div class="input-row hive-background">                                    '
				+ '            <label>卡号</label>                                                      '
				+ '            <input type="text" disabled="true" value="'
				+ localStorage.b_cardNox
				+ '" id="cardNo">    '
				+ '          </div>                                                                     '
				+ '        </div>                                                                      '
				+ '        <div class="text font12">请输入银行预留信息</div>                            '
				+ '        <div class="input-group column no-top">                                     '
				+ '          <div class="input-row hive-background">                                    '
				+ '            <label>身份证号</label>                                                  '
				+ '            <input type="text"  disable="true" placeholder="请输入您的身份证号" id="certNo" >                         '
				+ '          </div>                                                                     '
				+ '          <div class="input-row hive-background">                                    '
				+ '            <label>手机号</label>                                                  '
				+ '            <input type="text" id="mobile" placeholder="请输入您的手机号">                             '
				+ '          </div>                                                                     '
				+ '        </div>                                                                      '
				+ '        <div class="btn btn-block btn-orange" id="preBindCardBt">下一步</div>                           '
				+ '        <div class="agreement">                                                      '
				+ '          <i class="agree"></i><span>已阅读并同意</span><b>《用户协议》</b>          '
				+ '        </div>                                                                       '
				+ '        <div class="global-logo"><img src="mobile/cnapp/images/logoSmall.svg" alt=""></div>    '
				+ '  </div>   ',
		fn : function() {
			alert("系统升级，只能绑定一张银行卡");
			ajax({
				url : root + map.cnGetBindCardInfo,
				success : function(data) {
					var json = eval("(" + data + ")");
					if (json.voFlag == '1111') {
						// 登陆超时
						createView(viewModle.loginOutPage);
					}else if (json.voFlag != "0000") {
						alert(json.msg);
						return;
					} 

					var mobile = json.resultData.mobile;
					var realName = json.resultData.realName;
					var certNo = json.resultData.certNo;
					document.getElementById("realName").value = realName;
					document.getElementById("certNo").value = certNo;
				},
				error : function(status) {
					alert(status);
				}
			});
			document.querySelector("#selectBankBt")
					.addEventListener(
							'touchend',
							function() {
								backMap.push("renderBindCard");
								window.b_BKMobile = document
										.getElementById("mobile").value;
								window.b_BKCardNo = document
										.getElementById("cardNo").value;
								localStorage.b_BKMobile = document
										.getElementById("mobile").value;
								localStorage.b_BKCardNo = document
										.getElementById("cardNo").value;
								createView(viewModle.selectBank);
								return;
							});
			document
					.querySelector("#preBindCardBt")
					.addEventListener(
							'touchend',
							function() {
								backMap.push("renderBindCard");
								var bankName = b_selectedBank.banknm;
								var bankNo = b_selectedBank.bankcd;
								// document.querySelector("#certNo").value;
								var cardNo = document.querySelector("#cardNo").value;
								var mobile = document.querySelector("#mobile").value;
								if (!mobile) {
									alert("请输入预留手机号");
									return;
								}
								if (!cardNo) {
									alert("请输入银行卡号");
									return;
								}
								var bindCardData = {
									"paramMap.bankNo" : bankNo,
									"paramMap.cardNo" : cardNo,
									"paramMap.mobile" : mobile,
									"paramMap.bankName" : encodeURI(encodeURI(bankName))
								};
								ajax({
									url : root + map.bindBankCard,
									data : bindCardData,
									success : function(data2) {
										data2 = eval('(' + data2 + ')');
										if (data2.voFlag == "0000") {
											var view = {
												content : function() {
													return {
														"html" : data2.resultData,
														fn : function() {
															document
																	.querySelector(
																			"#editForm")
																	.submit();
														}
													};
												},
												id : "",
												title : ""
											};
											createView(view);
										} else if (json.voFlag == '1111') {
											// 登陆超时
											createView(viewModle.loginOutPage);
				    		    			}
				    		    			else {
											alert(data2.msg);
										}
									}
								})
							});
		}
	}
	return page;
}*/

/**
 * 未绑卡重置App交易密码
 */
function resetPassWordNotHasCard() {
	var page = {
		html : '    <div class="pdAll">                                                             '
				+ '      <div class="text align-center">                                               '
				+ '        验证码将发送到您绑定的手机号码<br />'+localStorage.mobile.replace(localStorage.mobile.substring(4,8),"******")+'上，请注意查收。             '
				+ '      </div>                                                                        '
				+ '      <div class="input-group column">                                             '
				+ '        <div class="input-row hive-background verification">                        '
				+ '          <label >验证码</label>                                                     '
				+ '          <input type="text" placeholder="请输入验证码" id="checkCode" tabindex="1">                            '
				+ '          <b id="getCodeBt">获取验证码</b>                                                         '
				+ '        </div>                                                                      '
				+ '      </div>                                                                       '
				+ '      <div class="btn btn-block btn-orange" id="resetAppPwdBt">下一步</div>                              '
				+ '</div>                                                                              ',
		fn : function() {
			push(document.querySelector("#resetAppPwdBt"),
							function() {
								var code_in = document.querySelector("#checkCode").value;
								if(!code_in){
									alert("请输入手机验证码！");
									return;
								}
								var resetData ={ "paramMap.checkCode" : code_in  };
								ajax({
									url : root
											+ map.resetAppPwdNotWithCardCheck,
									data : resetData,
									success : function(data) {
										json = eval('(' + data + ')');
										if (json.voFlag == "0000") {
											createView(viewModle.inputNewAppPwd);
											return;
										} else if(json.voFlag=='1111'){
				    		    			//登陆超时
				    		    			createView(viewModle.loginOutPage);
				    		    		}else {
				    		    			alert("验证码有误，请重新输入");
										}
									}
								});
							});
			push(document.querySelector("#getCodeBt"),toSendMsg);
		}
	}
	return page;
}
/**
 * 已绑卡重置App交易密码
 */
function resetPassWordHasCard() {
	var page = {
		html : '    <div class="pdAll">                                                             '
				+ '      <div class="input-group column no-top">                                      '
				+ '        <div class="input-row hive-background">                                     '
				+ '          <label>真实姓名</label>                                                   '
				+ '          <input type="text"  id="realName" placeholder="请输入您的真实姓名" tabindex="1">                      '
				+ '        </div>                                                                      '
				+ '        <div class="input-row hive-background">                                     '
				+ '          <label>证件号码</label>                                                   '
				+ '          <input type="text"  id="certNo" placeholder="请输入您的身份证号" tabindex="2">                      '
				+ '        </div>                                                                      '
				+ '        <div class="input-row hive-background">                                     '
				+ '          <label>银行卡号</label>                                                   '
				+ '          <input type="text"  id="cardNo" placeholder="请输入您绑定的银行卡卡号" tabindex="3">                    '
				+ '        </div>                                                                      '
				+ '        <div class="input-row hive-background verification">                        '
				+ '          <label>验证码</label>                                                     '
				+ '          <input type="text"   id="checkCode" placeholder="请输入验证码" tabindex="4">                            '
				+ '          <b id="getCodeBt">获取验证码</b>                                                         '
				+ '        </div>                                                                      '
				+ '      </div>                                                                       '
				+ '                                                                                    '
				+ '      <div class="text align-center">                                               '
				+ '        验证码将发送到您绑定的手机号码<br />'+localStorage.mobile.replace(localStorage.mobile.substring(4,8),"******")+'上，请注意查收。             '
				+ '      </div>                                                                        '
				+ '      <div class="btn btn-block btn-orange" id="resetAppPwdBt2">下一步</div>                              '
				+ '</div>                                                                              ',
		fn : function() {
			push(document
					.querySelector("#resetAppPwdBt2"),
							function() {
								var realName = document
										.querySelector("#realName").value;
								var certNo = document.querySelector("#certNo").value;
								var cardNo = document.querySelector("#cardNo").value;
								var checkCode = document
										.querySelector("#checkCode").value;
								if(!realName){
									alert("请输入真实姓名");
									return;
								}
								if(!certNo){
									alert("请输入身份证号");
									return;
								}
								if(!cardNo){
									alert("请输入银行卡号");
									return;
								}
								if(!checkCode){
									alert("请输入验证码");
									return;
								}
								var resetData = {
									"paramMap.realName" : realName,
									"paramMap.certNo" : certNo,
									"paramMap.cardNo" : cardNo,
									"paramMap.checkCode" : checkCode
								};
								ajax({
									url : root + map.resetAppPwdWithCardCheck,
									data : resetData,
									type : "post",
									success : function(data) {
										json = eval('(' + data + ')');
										if (json.voFlag == "0000") {
											createView(viewModle.inputNewAppPwd);
											return;
										} else if (json.voFlag == '1111') {
											// 登陆超时
											createView(viewModle.loginOutPage);
										} else {
											alert(json.msg);
										}
									}
								});
							});
			push(document.querySelector("#getCodeBt"),toSendMsg);
		}
	}
	return page;
}

/**
 * 选择开户行
 */
function renderSelectBank() {
	var page = {
		html : function() {
			var bankLi = "";
			var bankList = eval("(" + localStorage.b_bankList + ")");
			bankLi += '      <div class="pdAll">                                                                                                   '
			bankLi += '        <div class="cardList">                                                                                              '
			bankLi += '          <ul id="bank" class="check" > 																						';
			for (var i = 0; i < bankList.length; i++) {
				bankLi += '<li class="bank_li"><img src="mobile/cnapp/images/bankico_'
						+ bankList[i].id
						+ '.png" alt=""><span name="'+bankList[i].name+'" code="'
						+ bankList[i].id
						+ '">'
						+ bankList[i].namedes
						+ '</span></li>';
			}
			bankLi += '</ul></div></div>';
			return bankLi
		},
		fn : function() {
			var lis = document.querySelectorAll(".bank_li");
			for (var i = 0; i <= lis.length - 1; i++) {
				(function(index) {
					push(lis[index], function() {
						b_selectedBank = b_bankList[index];
						backMap.pop();
						createView(viewModle.renderBindCard);
					});
				})(i)
			}
		}
	};
	return page;
}
/**
 * 输入重置App交易密码页面
 */
var f_resetApppw = function() {
	var page = {
		    html:'<div class="pdAll">'
		    	+'<h4 id="pageTip">请设置6位数字交易密码</h4>'
		    	+'<div class="password">'
		    	+'<ul id="passBox">'
		    	+'<li></li>'
		    	+'<li></li>'
		    	+'<li></li>'
		    	+'<li></li>'
		    	+'<li></li>'
		    	+'<li></li>'
		    	+'</ul>'
		    	+'</div>'
		    	+'</div>'
		    	+'<div id="text">'
		    	+'<ul id="keyBox">'
		    	+'<li>1</li>'
		    	+'<li>2</li>'
		    	+'<li>3</li>'
		    	+'<li>4</li>'
		    	+'<li>5</li>'
		    	+'<li>6</li>'
		    	+'<li>7</li>'
		    	+'<li>8</li>'
		    	+'<li>9</li>'
		    	+'</ul>'
		    	+'<ul id="btnBox">'
		    	+'<li></li>'
		    	+'<li>0</li>'
		    	+'<li>清除</li>'
		    	+'</ul>'
		    	+'</div>',
		    fn:function(){
		    	setPassWord({
		    	      bFlag:'twice',
		    	      fn:function(passWord){
		    	    	  if(passWord=="error"){
		            		  showErrorInfo();
		            		  return;
		    	    	  }
		    	    	  passWord=encrypyPw(passWord);
						  ajax({
				    		    url:root+map.cnResetAppPwd,
				    		    data:{password:passWord},
				    		    success:function(data){
				    		    	var json=eval('('+data+')');
					    		      if(json.voFlag=='0000')
					    		      {
					    		    	 alert("重置交易密码成功",function(){
					    		    		 if( json.status.cardFlag=='1'){
						    		    		 if(backMap[backMap.length-1]=="user"){
						    		    			 createView(viewModle.user);
						    		    		 }else{
						    		    			 preRecharge();
						    		    		 }
						    		    	 }else{
						    		    		 createView(viewModle.renderBindCard);
						    		    	 }
					    		    	 });
					    		      }else if(json.voFlag=='1111'){
				    		    			//登陆超时
				    		    			createView(viewModle.loginOutPage);
					    		      }else{
				    		    			alert(json.msg);
					    		      }
				    		    }
			    		  });
		    	      }
		    	    });//两次
	    	}
 		 }	  
	return page;
}
/**
 * 登陆超时
 */
var loginOutPage=function(){
	var page={
			html:
			 '      <div class="pdAll">'
			+'        <div class="promptBox">'
			+'          <h2>登录信息失效</h2>'
			+'          <p>请返回橙牛汽车管家重试</p>'
			+'        </div>'
			+'      </div>',
		fn:function(){
			backMap=[];
		}
	}
	return page;
}

var errorPage=function(){
	var page={
			html:
			 '<div class="pdAll">'
			+	'<div class="promptBox">'
			+		'<h2>出错啦！</h2>'
			+		'<p>如有疑问，请联系客服。</p>'
			+		'<span>客服电话</span>'
			+		'<strong>400-8066-330</strong>'
			+	'</div>'
			+'</div>'
	}
	return page;
}
var timeoutView=function(){
	var page={
			html:' <div class="pdAll">                                                                      '
    			+'	<div class="clockBox">                                                                  '
    			+'		<h2>数据处理中，请稍后！</h2>                                                       '
    			+'		<p>处理结果我们会以短信的形式通知到您，<br />请及时查收！如有疑问，请联系客服。</p> '
    			+'		<span>客服电话</span>                                                               '
    			+'		<strong>400-015-8800</strong>                                                       '
    			+'	</div>                                                                                  '
    			+'</div>                                                                                    '
	}
	return page;
}
