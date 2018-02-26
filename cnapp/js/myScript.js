var user={};
var cnConsumeInfo={};
var b_bankList = [];
var b_selectedBank = {};
var b_BKMobile = "";
var b_BKCardNo = "";
var moveFlag=true;
var pageNo="1";
var aMonthPageEnd='';
var b_hasAlert = "";
//历史记录存储单元
//var backMap=['registFlag','loginFlag','whiteFlag','appPwdFlag','pcPwdFlag','accountFlag','pwdPassFlag','cardFlag'];
var backMap=[];

function createView(content,transition){
	  
  var oldView=document.querySelectorAll('div')[0];
  var viewport=document.createElement('div');
  var html='';
  if(typeof(content.content().html)=="string"){
	  html= content.content().html;
  }else{
	  html= content.content().html();
  }
  viewport.id=content.id;
  viewport.classList.add('main');
  viewport.innerHTML='<header class="bar bar-nav"><h1 class="title">'+content.title+'</h1></header>'
  viewport.innerHTML+='<div class="content">'+html+' </div>';
  var oldView=document.querySelectorAll('.main')[0];

  oldView.parentNode.insertBefore(viewport,document.querySelector('#opening'));

  content.content().fn&&content.content().fn();
  var aInput=document.querySelectorAll('input');
  if (aInput.length>0) {
  	for(var i=0;i<aInput.length;i++){
  		if (!aInput[i].disabled) {
  			aInput[i].focus();
  			break;
  		}
  	}
  }
  if(transition=='toLeft'){
    viewport.classList.add('toLeft');
    oldView.parentNode.removeChild(oldView);
  }else if(transition=='toRight' || transition===undefined){
    viewport.classList.add('toRight');
    oldView.parentNode.removeChild(oldView);
  }
}


function controller(state){
	//等待资源
	switch('0'){
	  case state.registerFlag:
	    createView(viewModle.registerFlag);
	  break;
	  case state.loginFlag:
	    createView(viewModle.loginFlag);
	  break;
	  case state.whiteFlag:
	    createView(viewModle.whiteFlag);
	  break;
		// case state.appPwdFlag:
		// createView(viewModle.appPwdFlag);
		//如果有app密码 修改pc交易密码状态
		// break;
		// case state.pcPwdFlag:
		// createView(viewModle.pcPwdFlag);
		// break;
	  case state.accountFlag:
	  	if(getQueryString('model')==2||getQueryString('model')==3){
	  		createView(viewModle.product);
	  	}else{
	  		createView(viewModle.accountFlag);
	  	}
	  break;
	  //case state.pwdPassFlag:
	   // createView(viewModle.pwdPassFlag);
	  //break;
	  case state.cardFlag:
	    createView(viewModle.product);
	  break;
	  default:
			if(getQueryString('model')==2){
				createView(viewModle.user);
			}else if(getQueryString('model')==3)
			{
				f_preExtraction();
			}else{
				createView(viewModle.product);
			}
	  break;
  }
}	

function updateStatus(json){
	user.state=json;//存储状态
    json=JSON.stringify(json.status);
    localStorage.state=json;//存储状态
}

  function setPassWord(user){
    window.keyReset={
      text          :document.querySelector('#text'),
      passBox       :document.querySelector('#passBox'),
      passBoxLi     :document.querySelectorAll('#passBox li'),
      keyBox        :document.querySelector('#keyBox'),
      aLi           :document.querySelectorAll('#keyBox li'),
      deletBtn      :document.querySelectorAll('#btnBox li')[2],
      tmpLi         :[],
      passTimer     :null,
      tmpLength     :0,
      hide          :[],
      passTrue      :'',

      cleanPass     :cleanPass,
      inputPass     :inputPass,
      cleanPassBox  :cleanPassBox,
      deletePass    :deletePass,
      initTmpLi     :initTmpLi,
      passWord      :'',
      error     :document.querySelector(".error"),
      addListener   : function(){
        this.passFlag=user.bFlag=='once'?true:false;
        this.initTmpLi();
        for (var i = 0; i < this.tmpLi.length; i++) {
          keyReset.tmpLi[i].addEventListener('touchend',function(fn){
            var _this=this;
            keyReset.inputPass(user.fn,_this);
          })
        }
        this.deletBtn.addEventListener('touchend',this.deletePass);
      }
    }
    function initTmpLi(){
      for (var i = 0; i < this.aLi.length; i++){
        this.tmpLi.push(this.aLi[i]);
      }
      this.tmpLi.push(document.querySelectorAll('#btnBox li')[1]);
    }
	    function inputPass(fn,obj){
		    if(keyReset.error){
		      keyReset.error.style.display='none'; 
		    }
	      clearTimeout(keyReset.passTimer);
	      if (keyReset.tmpLength>5) {
	        return;
	      }
	      if(keyReset.tmpLength>0){
	        keyReset.passBoxLi[keyReset.tmpLength-1].innerHTML='●';
	      }
	      keyReset.passBoxLi[keyReset.tmpLength].innerHTML=obj.innerHTML;
	      keyReset.hide.push(obj.innerHTML);
	      
	      if(keyReset.passFlag==true){//只有一次
	        once(fn);
	      }else{//两次
	        twice(fn)
	      }
	      if(keyReset.tmpLength>=1){
	        keyReset.passTimer=setTimeout(function(){
	          keyReset.passBoxLi[keyReset.tmpLength-1].innerHTML='●';
	        },300)
	      }
	      keyReset.tmpLength++;
	    }
	    function twice(fn){
	      if(!keyReset.passTrue){
	        if (keyReset.tmpLength==5) {
	          keyReset.cleanPassBox();
	          keyReset.passTrue=keyReset.passWord;
	          keyReset.cleanPass();
	          document.getElementById("pageTip").innerHTML="请再输入一次";
	        }
	      }else{
	        if(keyReset.tmpLength==5){
	          keyReset.cleanPassBox();
	          if(keyReset.passTrue==keyReset.passWord){
//	            if(patternCheck(keyReset.passTrue)){
//	              alert("不能输入6个连续相同的数字！");
//	              keyReset.passTrue='';
//	              keyReset.cleanPass(); 
//	              return;
//	            }else{
	              fn(keyReset.passTrue);
//	            }
	          }else{
	            fn('error');
	          }
	          keyReset.passTrue='';
	          keyReset.cleanPass(); 
	        }
	      }
	    }
	    function once(fn){
	      if (keyReset.tmpLength==5) {
	        keyReset.cleanPassBox();
	        fn(keyReset.passWord);
	        keyReset.cleanPass();
	      }
	    }
	    function deletePass(){
	      keyReset.tmpLength--;
	      if (keyReset.tmpLength<0) {
	        keyReset.tmpLength=0
	      }else{
	        keyReset.passBoxLi[keyReset.tmpLength].innerHTML='';
	        keyReset.hide.pop();
	      }
	    }
	    function cleanPassBox(){
	      for (var i = 0; i <= keyReset.hide.length-1; i++) {
	        keyReset.passWord=keyReset.passWord+keyReset.hide[i];
	        keyReset.passBoxLi[i].innerHTML='';
	      }
	    }
	    function cleanPass(){
	      keyReset.passWord='';
	      keyReset.tmpLength=-1;
	      keyReset.hide=[];
	      keyReset.passTimer=null;
	    }
	    function patternCheck(password){ 
	      var pattern = /([\d])\1{5}/; 
	      return pattern.test(password); 
	    } 
	    keyReset.addListener();
	  }
window.addEventListener('load',toLocal);

function toLocal(){
	//createView(viewModle.pageTest);
	//return;
	var mobilePhone=getQueryString("mobilePhone");
	localStorage.a_mobile=mobilePhone;
	var stateJson  = eval('('+localStorage.state+')');
	 	localStorage.clear();
		localStorage.opened='1';
		ajax({
			url:root+map.cntransfer,
			success:function(data){
				localStorage.mobile=mobilePhone;
				ajax({
			    url:root+map.getState,
			    success:function(data){
			      var json=eval('('+data+')');
			      user.state=json;//存储状态
			      initial(user.state.status);
			    }
			  })
			}
		})	
}
//生产环境 1=cninvest；2=cnwallet ；3=docash
function initial(state){
	
    if(getQueryString('model')==1){
    	 createView(viewModle.product);
         return false;
    }
    if(getQueryString('model')==4){
    	var data=getQueryString('data');
    	cnConsumeInfo.data=data;
    	console.log(cnConsumeInfo.data);
    	createView(viewModle.inPWForCnConsume);
    	return false;
    }
    controller(state);
}

window.addEventListener('load',function(){
	push(document.querySelector('#back'),function(){
    //if 历史记录为空 返回橙牛
	 if(backMap.length==0){
		 this.setAttribute("href",'cnapp://close');
		 //this.setAttribute("onclick",'');
		 this.click();
//		 window.open("cnapp://close");
		 return;
	 }
    createView(viewModle[backMap[backMap.length-1]],'toLeft');
    backMap.pop();
  });
})

/***************************************************************/
function encryptByDES(message, key) {
	var keyHex = CryptoJS.enc.Utf8.parse(key);
	var encrypted = CryptoJS.DES.encrypt(message, keyHex, {
		mode : CryptoJS.mode.ECB,
		padding : CryptoJS.pad.Pkcs7
	});
	return encrypted.toString();
}
/*unicode 加密*/
var decToHex = function(str) {
    var res=[];
    for(var i=0;i < str.length;i++)
        res[i]=("00"+str.charCodeAt(i).toString(16)).slice(-4);
    return "\\u"+res.join("\\u");
}
function encrypyPw(passWord)
{
	  var key = '12345678';
	  passWord=encryptByDES(passWord, key);
	  passWord=decToHex(passWord);
	  return passWord;
}

function showErrorInfo(){
	alert("两次输入的密码不一致");
	document.getElementById("pageTip").innerHTML="请设置6位数字交易密码";
}

//luwfls

var touchSelectBank = function() {
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
}
/**
 * 点击 立即充值 触发事件
 */
var preRecharge = function(from) {
	var state = eval('(' + localStorage.state + ')');
	if (state.registerFlag == "0") {
		createView(viewModle.registerFlag);
		return;
	} else if (state.loginFlag == "0") {
		createView(viewModle.loginFlag);
		return;
	} else if (state.whiteFlag == "0") {
		createView(viewModle.whiteFlag);
		return;
	} else if (state.accountFlag == "0") {
		createView(viewModle.accountFlag);
		return;
	} else if (state.hasAppPwdFlag == "1") {
		if (state.cardFlag == "1") {
			ajax({
				url : root + map.getMyBank,
				success : function(data) {
					var json = eval('(' + data + ')');
					if (json.voFlag == "0000") {
						localStorage.b_bankName = json.resultData.bankName;
						localStorage.b_bankId = json.resultData.bankId;
						localStorage.b_cardNox = json.resultData.cardNox;
						localStorage.b_cardNo = json.resultData.cardNo;
						if (json.resultData.bankId == "0308") {
							alert("很遗憾，您绑定的银行卡暂时无法完成在橙牛汽车管家平台的投资，您可以登录惠金所App完成投资或联系客服更换银行卡，客服电话：<a href='tel:400-015-8800'>400-015-8800</a>",function(){
								if("fromSetPwd"==from){
									createView(viewModle.product);
								}
							});
							return;
						}else if (json.resultData.isHasCPAuthentication == "0") {
							/*if (json.resultData.isInCPList == "0") {
								alert("很遗憾，您绑定的银行卡暂时无法完成在橙牛汽车管家平台的投资，您可以登录惠金所App完成投资或联系客服更换银行卡，客服电话：<a href='tel:400-015-8800'>400-015-8800</a>");
								return;
							}*/
							localStorage.b_reAuthentication = "1";
							createView(viewModle.renderBindCard);
							return;
						}
						else {
							createView(viewModle.recharge);
							return;
						}
					} else if(json.voFlag == "1111"){
						createView(viewModle.loginOutPage);
						return;
					}
					else  {
						createView(viewModle.linkfail);
						return;
					}
				}
			})
		} else {
			createView(viewModle.checkapppw);
			return;
		}
	} else if (state.hasAppPwdFlag == "0") {
		if (state.hasPcPwdFlag == "1") {
			createView(viewModle.checkpcpw);
			return;
		} else {
			createView(viewModle.setapppw);
			return;
		}
	}else{
		createView(viewModle.errorPage);
		return;
	}
}
var toSendCheck =  function(){
	ajax({
		url : root + map.cnAppGetCheckCode,
		success : function(data) {
			json = eval('(' + data + ')');
			if (json.voFlag != "0000") {
				alert(json.msg);
			}
		}
	});
}
/**
 * 验证码倒计时
 * @param obj
 */
function toSendMsg(){
	var obj = document.querySelector("#getCodeBt");
	var sendTimer=null;
	var cum=60;
	obj.innerHTML='获取中: 60秒';
	obj.removeEventListener( 'touchend' , toSendMsg);
	toSendCheck();
	clearInterval(sendTimer);
	sendTimer=setInterval(function(){
		cum--;
		obj.innerHTML='获取中: '+cum+'秒';
		obj.removeEventListener( 'touchend' , toSendMsg);
		if(cum<=0){
			clearInterval(sendTimer);
			obj.addEventListener('touchend',toSendMsg);
			obj.innerHTML='重新获取';
			
		}
	},1000);
}
/*创建分页元素*/
function testLi(){
	var oUl=document.createElement('ul');
	setTimeout(function(){
		var html='';
		for (var i = 0; i < 30; i++) {
			html+='<li>第'+(i+1)+'个</li>';
		}
		oUl.innerHTML=html;
		moveFlag=true;

		p_oBox.addEventListener('touchstart',loadList);
	},300)
	return oUl;
}
/*创建 分页的 touchstart*/
function loadList(){
	
	var clientStart=event.changedTouches[0].pageY;

	var disY=this.offsetHeight-(document.body.clientHeight+document.querySelector('.content').scrollTop);
	//console.log('this '+this.offsetHeight+' | body '+document.body.clientHeight+' | scrollTop '+document.querySelector('.content').scrollTop);
	
	if(disY>0){
		document.addEventListener('touchmove',loadMove);
	}
	function loadMove(){
		var clientMove=clientStart-event.changedTouches[0].pageY;
		//console.log(clientMove+'||||'+disY+'||||'+document.querySelector('.content').scrollTop);
		if((clientMove>=disY-30) && moveFlag){
				moveFlag=false;
				p_oBox.removeEventListener('touchstart',loadList);
				
				p_oBox.appendChild(testLi());
		}
	}
	document.addEventListener('touchend',function(){
		document.removeEventListener('touchmove',loadMove);
	});
}
function loadNewList(json){
	//最后一个子节点
	//pBox.childNodes[pBox.childNodes.length-1]
	var tradeType = ["充值","消费","提现"];
	var tradeStatu = ["处理中","已提现到银行卡","提现异常","成功"];
	var html='';
	var aMonth=[];
	for(var i=0;i<json.length;i++){
		aMonth.push(parseInt(json[i].trantm/100));
	}
	if(aMonth[0]!=aMonthPageEnd){
		html+='<h4>'+parseInt(aMonth[0]/100)+'年'+aMonth[0]%100+'月</h4>';
	}
	for(var i=0;i<json.length;i++){
		json[i].trantp=tradeType[parseInt(json[i].trantp)-1];
		var fh="";
		if(json[i].trantp=="充值"){
			fh="+";
		}else{
			fh="-";
		}
		json[i].transt=tradeStatu[json[i].transt];
		if(aMonth[i]%100<10){
			json[i].trantm='0'+aMonth[i]%100+'-'+json[i].trantm%100+' '+transDate2Day(json[i]) ;
		}else{
			json[i].trantm=aMonth[i]%100+'-'+json[i].trantm%100+' '+transDate2Day(json[i]) ;	
		}
		
		//html+='<h4></h4>';
		html+='<div class="reList">';
		html+='<p class="reListLeft"><span>'+json[i].trantp+'</span>'+json[i].trantm+'</p>';
		var rm=json[i].remaks;
		if(rm==null || ""==rm){
			rm="";
		}else{
			rm="橙牛-"+rm;
		}
		html+='<p class="reListCenter"><span>'+fh+json[i].traves+'元</span>'+rm+'</p>';
		html+='<p class="reListRight"><span>'+json[i].transt+'</span></p>';
		html+="</div>";
		if(i+1<json.length){
			if(aMonth[i]!=aMonth[i+1]){
				html+='<h4>'+parseInt(aMonth[i+1]/100)+'年'+aMonth[i+1]%100+'月</h4>';
			}
		}
	}
	aMonthPageEnd=aMonth[aMonth.length-1];
	return html;
}

function transDate2Day (formatStr){
	var weekDay = [" 周日", " 周一", " 周二", " 周三", " 周四", " 周五", " 周六"];
	var myDate =  toDate(formatStr.trantm);
	return weekDay[myDate.getDay()];
}
//将字符串转换为日期
var toDate = function(str) {
   var y = str.substring(0,4);
   var m = str.substring(4,6);
   var d = str.substring(6,8);
   var stateDate=new Date(y,m-1,d);
    return stateDate;
}
function isCardNo(card)
{
   // 身份证号码为18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
   var reg = /(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
   if(reg.test(card) === false)
   {
       return  false;
   }else{
	   return true;
   }
}

//将浮点数保留2位小数
function myTransNum(floatvar) {
	var f_x = parseFloat(floatvar);
	if (isNaN(f_x)) {
		return '0.00';
	}
	var f_x = Math.round(f_x * 100) / 100;
	var s_x = f_x.toString();
	var pos_decimal = s_x.indexOf('.');
	if (pos_decimal < 0) {
		pos_decimal = s_x.length;
		s_x += '.';
	}
	while (s_x.length <= pos_decimal + 2) {
		s_x += '0';
	}
	return s_x;
}

//将日期yyyyMMdd转为yyyy-MM-dd格式
function StringToDate(DateStr) {
	if (DateStr == null)
		return "";
	var r = DateStr.replace(/^(\d{4})(\d{2})(\d{2})$/, "$1-$2-$3")
	return r;
}
function dateCompare(date1,date2){//付息日  当前时间
	date1 = date1.replace(/\-/gi,"/");
	date2 = date2.replace(/\-/gi,"/");
	var time1 = new Date(date1).getTime();
	var time2 = new Date(date2).getTime();
	if(time1 > time2){ 
		return 1;
	}else{
		return 2;
	}
}
function closeLoading(){
	if(document.querySelector('#loadding')){
		document.querySelector('#loadding').classList.add('hidde');
		document.querySelector('#loadding').classList.remove('in');
	}
}
var judgeStr = function(obj){
	var isjson = typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;    
	return isjson;
}
document.addEventListener('keypress',function(){
	var e = event || window.event || arguments.callee.caller.arguments[0]; 
	if(e && e.keyCode==13){//回车
		return false;
	} 
})