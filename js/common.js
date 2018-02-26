/*!
 * =====================================================
 * hFax--youqianrenxin v1.0.1 
 * Copyright 2015 Connor Sears
 *
 * v1.0.1 designed by @shaonan.
 * =====================================================
 */
/* ========================================================================
 * Ratchet: password.js v1.0.1
 * youqian/passWord.html
 *
 * Copyright 2015 Connor Sears
 * ======================================================================== */



var myObject = {};
var bangkaParam={};

function encrypyPw(passWord)
{
	  var key = '12345678';
	  passWord=encryptByDES(passWord, key);
	  passWord=decToHex(passWord);
	  return passWord;
}

function showErrorInfo()
{
	alert("两次输入的密码不一致");
	document.getElementById("pageTip").innerHTML="设置交易密码";
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
	    showKey       :showKey,
	    inputPass     :inputPass,
	    cleanPassBox  :cleanPassBox,
	    pos           :pos,
	    deletePass    :deletePass,
	    initTmpLi     :initTmpLi,
	    passWord      :'',
	    error		  :document.querySelector(".error"),
	    addListener   : function(){
	      this.passFlag=user.bFlag=='once'?true:false;
	      this.initTmpLi();
	      this.passBox.addEventListener('touchend',this.showKey);
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
		if(keyReset.error)
		{
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
	        document.getElementById("pageTip").innerHTML="再次确认密码";
	      }
	    }else{
	      if(keyReset.tmpLength==5){
	        keyReset.cleanPassBox();
	        if(keyReset.passTrue==keyReset.passWord){
	         /*
	          if(patternCheck(keyReset.passTrue)){
	        	  	alert("不能输入6个连续相同的数字！");
	        	  	keyReset.passTrue='';
	        	  	keyReset.cleanPass(); 
	        	  	return;
	          }else{
	        		fn(keyReset.passTrue);
	          }*/
	          fn(keyReset.passTrue);
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
	  function pos(){
	    var aPos=[];
	    for (var i=0; i<this.aLi.length; i++){
	      aPos.push({
	        left:this.aLi[i].offsetLeft,
	        top:this.aLi[i].offsetTop
	      });
	    }
	    for (var i=0; i<this.aLi.length; i++){
	      this.aLi[i].style.left=aPos[i].left+'px';
	      this.aLi[i].style.top=aPos[i].top+'px';
	      this.aLi[i].style.position='absolute';
	    }
	    aPos.sort(function (){
	      return Math.random()-0.5;
	    });
	    for (var i=0; i<this.aLi.length; i++){
	      move(this.aLi[i], aPos[i],{duration:50});
	    }
	  }
	  function showKey(){
	    keyReset.pos();
	    move(keyReset.text,{bottom:0,opacity:1},{duration:200});
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
	  keyReset.addListener();
	}


function patternCheck(password){ 
	 
	var pattern = /([\d])\1{5}/; 
	return pattern.test(password); 
} 

/*
 * ========================================================================
 * Ratchet: chose card v1.0.1 youqian/card.html
 * 
 * Copyright 2015 Connor Sears
 * ========================================================================
 */

function triggerchecked()
{
	var aChecked=document.getElementById("checked");
	aChecked.addEventListener("touchstart",bankList);
}

function bankList()
{
	var tradePass=document.getElementById("tradePass").value;
	if(tradePass!=null && tradePass!="")
	{
		if(bangkaParam.index==null||bangkaParam.index!=1)
		{	
			var key = '12345678';
			tradePass = encryptByDES(tradePass, key);
			bangkaParam.index=1;
		}
		bangkaParam.tradePass=tradePass;
	}
	bangkaParam.realName=document.getElementById("realName").value;
	bangkaParam.cardNo=document.getElementById("cardNo").value;
	bangkaParam.idcard=document.getElementById("idcard").value;
	bangkaParam.phone=document.getElementById("phone").value;
	PUSH({url:document.getElementById("appName").value+'/yqrx/cardPush.do'})

}

function triggerbangKaProtol()
{
	var bangKaProtol=document.getElementById("bangKaProtol");
	bangKaProtol.addEventListener("touchstart",toBangKaProtol);
}

function toBangKaProtol()
{
	var tradePass=document.getElementById("tradePass").value;
	if(tradePass!=null && tradePass!="")
	{
		if(bangkaParam.index==null||bangkaParam.index!=1)
		{	
			var key = '12345678';
			tradePass = encryptByDES(tradePass, key);
			bangkaParam.index=1;
		}
		bangkaParam.tradePass=tradePass;
	}
	bangkaParam.realName=document.getElementById("realName").value;
	bangkaParam.cardNo=document.getElementById("cardNo").value;
	bangkaParam.idcard=document.getElementById("idcard").value;
	bangkaParam.phone=document.getElementById("phone").value;
	PUSH({url:document.getElementById("appName").value+'/yqrx/bangKaProtol.do'})
}

function card() {
	
	var bank = document.getElementById('bank').getElementsByTagName('li');
	for (var i = 0; i < bank.length; i++) {
		bank[i].addEventListener('touchstart', checked);
	}
	function checked() {
		for (var i = 0; i < bank.length; i++) {
			bank[i].className = '';
		}
		this.className = 'checked';
	}
}

/*选择银行卡 接收参数*/
window.aBankList=[];
function cardList(){
  var checked=document.getElementById('checked');
  if(aBankList.length){
    for (var i = 0; i < aBankList.length; i++) {
      if (aBankList[i].checked==1) {
        checked.innerHTML='<label>开户行</label><span>'+aBankList[i].name+'</span>'
        bankcd = aBankList[i].id;
   	 	banknm = aBankList[i].name;
	   	document.getElementById("tradePass").value=(bangkaParam.tradePass==undefined)?"":bangkaParam.tradePass;
	 	document.getElementById("realName").value=(bangkaParam.realName==undefined)?"":bangkaParam.realName;
	 	document.getElementById("cardNo").value=(bangkaParam.cardNo==undefined)?"":bangkaParam.cardNo;
	 	document.getElementById("idcard").value=(bangkaParam.idcard==undefined)?"":bangkaParam.idcard;
	 	document.getElementById("phone").value=(bangkaParam.phone==undefined)?"":bangkaParam.phone;
      }
    }
  }
}
function initBankInfo()
{
	  if(document.getElementById("initBanknm")){
	    	 
	    	 bankcd=document.getElementById("initBankcd").value;
	    	 banknm=document.getElementById("initBanknm").innerHTML;
	     }
}

/*选择银行卡的列表*/
function cardPush(){
  
   tradePass = aBankList.tradePass;

  if(!aBankList.length){
    ajax({
      url:document.getElementById("appName").value+'/yqrx/queryKhBankList.do',
      type:'POST',
      data:{tradePass:tradePass},
      success:function (str){
        aBankList=eval('('+str+')');
        createList();
      },
      error:function (e){
        console.log(e);
      }
    });
  }else{
    createList();
  }
  function createList(){
    var html='';
    for (var i = 0; i < aBankList.length; i++) {
      if(aBankList[i].checked==1){
        html+='<li class="checked" title="'+i+'"><img src="'+document.getElementById("appName").value+"/"+aBankList[i].src+'" alt="'+aBankList[i].id+'"><span>'+aBankList[i].namedes+'</span></li>';
      }else{
        html+='<li title="'+i+'"><img src="'+document.getElementById("appName").value+"/"+aBankList[i].src+'" alt="'+aBankList[i].id+'"><span>'+aBankList[i].namedes+'</span></li>';
      }
    }
    bank.innerHTML=html;
    var aBankBtn=bank.getElementsByTagName('li');
    for (var i = 0; i < aBankBtn.length; i++) {
      aBankBtn[i].addEventListener('touchend',addListener);
      aBankBtn[i].addEventListener('touchmove',function(){
        this.removeEventListener('touchend',addListener);
      });
      aBankBtn[i].addEventListener('touchend',function(){
        this.addEventListener('touchend',addListener);
      });
    }
    function addListener(){
      for (var i = 0; i < aBankList.length; i++) {
        aBankList[i].checked=0;
        if(i==this.title){
          aBankList[i].checked=1;
        }
      }
     var tp=bangkaParam.tradePass;
     if(!tp){
    	 tp="";
     }
      PUSH({url:document.getElementById("appName").value+'/yqrx/toBangKaInit.do?tradePass='+tp,transition:'slide-out'});
    }
  }
}


function pop(){
	  var backdrop=document.getElementById('backdrop');
	  var popover=document.getElementById('popover');
	  var bank=document.getElementById('bank').getElementsByTagName('li');
	  var checked=document.getElementById('checked');
	  var maxLimit=document.getElementById('maxLimit');
	  var infoLimit=document.getElementById('infoLimit');
	  popover.parentNode.removeChild(backdrop);
	  popover.className='popover card';
	  popover.style.display='';
	  
	  for (var i = 0; i < bank.length; i++) {
	    if(bank[i].className=='checked'){
	      checked.innerHTML=bank[i].innerHTML;
	      var oStrong=bank[i].getElementsByTagName("strong")[0];
	      var oSpan=oStrong.getElementsByTagName("span");
	      myObject.bankName=oSpan[0].innerHTML;
	      myObject.cardNox=oSpan[1].innerHTML;
	      myObject.cardNo=oSpan[1].getAttribute("name");
	      myObject.bankId=oStrong.getElementsByTagName("input")[0].value;
	      if (infoLimit) {
	        infoLimit.style.display='';
	         
	      };
	    }
	  }
	  selectValue();
}

/* spead */
function spead() {
	document.querySelector("#buy").addEventListener("touchend", preBuy);
	var speedSlide = document.getElementById('speedSlide');
	var speadNumber = parseInt(document.getElementById('speadNumber').innerHTML);
	move(speedSlide, {width : speadNumber + '%'});
}
var preBuy =  function(){
	var borrowId=document.getElementById("borrowid").value;
	ajax({
		url:document.getElementById("appName").value+'/beforeBuyJudge.do',
		type:'POST',
		data:{borrowId:borrowId},
		success:function (data){
			var obj=JSON.parse(data);
			 if(obj.retCode=='Y'){
				alert("很遗憾，您绑定的银行卡暂时无法完成在有钱任信平台的投资，您可以登录惠金所App完成投资或联系客服更换银行卡，客服电话：400-015-8800");
				return ;
			 }else if(obj.retCode=='N'){
				PUSH({
					url:document.getElementById("appName").value+"/handlePurchaseRequest.do?id="+borrowId
				});
			}else if(obj.retCode=="login"){
				PUSH({url:document.getElementById("appName").value+'/toYappLoginInit.do'});
			}else{
				alert("系统异常，请稍后再试！");
			}
		} 
	});
}
/**
 * 设置交易密码
 * @param passWord
 */
function setPw(passWord)
{
	ajax({
		url : document.getElementById("appName").value+'/yqrx/createPassword.do',
		type : 'post',
		data : {
			password : passWord
		},
		success : function(data) {
			if (data == "success") {
				PUSH({
					url:document.getElementById("appName").value+"/yqrx/isBoundCardInpc.do"
				}); //密码设置成功
			} else if (data == "fail") {
				PUSH({
					url : document.getElementById("appName").value+'/yqrx/error.do'//设置密码失败
				});
			} else if(data=="login") {
				PUSH({
					url : document.getElementById("appName").value+'/toYappLoginInit.do'//未登录
				});
			}
		}

	});
}
/** setpw */
function checkPW(passWord) {
	loading.appendL();
	ajax({
		url : 'ajaxCheckPwd.do',
		type : 'post',
		data : {
			password : passWord
		},
		success : function(data) {
			loading.close();
			if (data == "success") {
				postDate(passWord);
			} else if (data == "fail") {
				alert("密码错误");
			} else if(data == "warn"){
				alert("您已连续输错5次，请到惠金所App上重置密码！https://www.hfax.com/app")
			}else if(data == "error") {
				alert("服务器异常",function(){
					PUSH({
						url : 'yqrx/toYappFinanceDetail.do?id=' + myObject.borrowId
					});
				});
				
			}
		}
	});
}

function postDate(passWord) {
	
	var postData = myObject.cardNo + ";" +myObject.bankId + ";" +myObject.bankName + ";" + myObject.money + ";" + passWord
			+ ";" + myObject.borrowId;
	loading.appendL();
	ajax({
		url : 'confirmPurchase.do',
		type : 'post',
		data : {
			postData : postData
		},
		success : function(data) {
			loading.close();
			var oData = eval('(' + data + ')');
			if (oData.flag == "success") {
				var url = "toPurchaseSuccess.do?applyDate=" + oData.applyDate
						+ "&money=" + myObject.money + "&suname="
						+ oData.suname + "&transt="
						+ oData.transt + "&borrowId=" + myObject.borrowId;
				myObject = {};
				PUSH({
					url : encodeURI(encodeURI(url))
				});
			} else if (oData.flag == "fail") {
				alert(oData.msg,function(){
					PUSH({
						url : 'yqrx/toYappFinanceDetail.do?id=' + myObject.borrowId
					});
				});
				
			} else if (oData.flag = "login") {
				// 跳转登录页面
				myObject = {};
				alert(oData.msg,function(){
					PUSH({url:'toYappLoginInit.do'});
				});
			}else if (oData.flag = "binding"){
				// 跳转绑卡页面
				myObject = {};
				alert(oData.msg,function(){
					PUSH({url:'toTrpassword.do'});
				});
			}
		}
	});

}

/* ajaxList */
function list(url) {
	loading.appendL();
	ajax({
		url : url,
		type : 'get',
		success : function(data) {
			 
			var result = eval('(' + data + ')');
			var allinfo = result.data;
			var isLogin = result.isLogin;
			var hotFlag=false;//热卖交易异常标识
			var allFlag=false;//所有交易异常标识
			var dfxFlag=false;
			var yfxFlag=false;
			var tab1="";
			var tab2="";
			var tab3="";
			var tab4="";
			if (allinfo[0] != null){
				tab1 = allinfo[0].sucBorrowList;
			}else{
				hotFlag=true;
			}
			if (allinfo[1] != null)
			{
				tab2= allinfo[1].sucBorrowList;
			}else{
				allFlag=true;
			}	
			if (allinfo[2] != null)
			{
				tab3 = allinfo[2];
				if( (tab3['par1'].successFlag!="1"&&tab3['par1'].successFlag!="-1")
						||(tab3['par2'].successFlag!="1"&&tab3['par2'].successFlag!="-1")
						||(tab3['par3'].successFlag!="1"&&tab3['par3'].successFlag!="-1"))
				{
					dfxFlag=true;
				}	
			}	
			if (allinfo[3] != null)
			{
				tab4 = allinfo[3];
				if( (tab4['pended_par1'].successFlag!="1"&&tab4['pended_par1'].successFlag!="-1")
						||(tab4['pended_par2'].successFlag!="1"&&tab4['pended_par2'].successFlag!="-1"))
				{
					yfxFlag=true;
				}
			}
			rendering1(tab1, "tab1");// 热卖
			rendering1(tab2, "tab2");// 全部
			rendering2(tab3, "tab3", isLogin);// 未付息
			rendering3(tab4, "tab4", isLogin);// 已付息
			if((hotFlag&&allFlag)||(dfxFlag&&yfxFlag))
			{
				alert("数据异常");
			}
			if(document.querySelector('.loading'))
			{
				document.querySelector('.loading').style.display='none';
			}

		},
		error : function(status) {
			console.log(status);
		}
	});
	/**
	 * 热卖、全部产品
	 */
	function rendering1(aData, tabID) {
		var oUl = document.getElementById(tabID);
		if (aData != null)
			for (var i = 0; i < aData.length; i++) {
				if(aData[i].borrowStatus=="0"){
					var qgje=aData[i].begAmount;
					if(qgje==null || qgje==""){
						qgje="";
					}else{
						qgje=transMoney(aData[i].begAmount);
					}
					var oLi = document.createElement('li');
					oLi.className = 'table-view-cell media';
					oLi.innerHTML = '<div class="media-body">'
							+ '<h4>'
							+ aData[i].borrowTitle
							+ '</h4>'
							+ '<ul>'
							+ '<li><strong>'
							+ myTransNum(aData[i].annualRate)
							+ '<i>%</i></strong><span>预期年化收益</span></li>'
							+ '<li><strong>'
							+ aData[i].deadline
							+ '<i>天</i></strong><span>期限</span></li>'
							+ '<li><strong>'
							+ qgje
							+ '</strong><span>起购金额</span></li>'
							+ '<li><a href="toYappFinanceDetail.do?id='
							+ aData[i].id
							+ '" data-transition="slide-in" class="btn-list-right"></a></li>'
							+ '</ul>' + '</div>';

					oUl.appendChild(oLi);
				}
				
				// aData
			}
	}
	/**
	 * 待付息产品
	 */
	function rendering2(aData, tabID, isLogin) {
		var oDiv = document.getElementById("item3mobile");
		var oUl = document.getElementById(tabID);
		var appName=document.getElementById("appName").value;
		// 如果没有登陆则提示登录
		if ("n" == isLogin) {
			var pTag = document.createElement("p");
			pTag.className = "undefined notBound";
			pTag.innerHTML = "您还未绑定惠金所账户，请<a href='"+appName+"/toYappLoginInit.do' data-transition='slide-in'>点我授权</a>";
			oDiv.insertBefore(pTag, document.getElementById(tabID));
		}
		if ("y" == isLogin) {
			if (aData != null) {
				// 募资中
				var part1 = aData['par1'].pageBean;
				// 锁定中
				var part2 = aData['par2'].pageBean;
				var part3 = aData['par3'].pageBean;

				if ((part1 == null || part1.length == 0)
						&& (part2 == null || part2.length == 0)
						&& (part3 == null || part3.length == 0)) {

					var pTag = document.createElement("p");
					pTag.className = "undefined";
					pTag.innerHTML = "暂无相关数据信息";
					oDiv.insertBefore(pTag, document.getElementById(tabID));
				} else {

					// 募资中
					var status1 = "<span class='muzi'>募资中</span></h4>";
					// 锁定中
					var status2 = "<span class='suoding'>锁定中</span></h4>"
					// 投资总额
					var totlacount = parseFloat(aData['par1'].sumint)
							+ parseFloat(aData['par2'].sumint)
							+ parseFloat(aData['par3'].sumint);
					// 预期总收益
					var suminvestAmount = parseFloat(aData['par1'].sumpay)
							+ parseFloat(aData['par2'].sumpay)
							+ parseFloat(aData['par3'].sumpay);

					var oDiv = document.getElementById("item3mobile");
					var newDiv = document.createElement("div");
					newDiv.className = "gouBox";

					newDiv.innerHTML = "<ul>" + "<li>" + "<span>投资总额(元)</span>"
							+ "<strong>" + fmoney(totlacount) + "</strong>"
							+ "</li>" + "<li>" + "<span>预期总收益(元)</span>"
							+ "<strong>" + fmoney(suminvestAmount)
							+ "</strong>" + "</li>" + "</ul>"
					oDiv.insertBefore(newDiv, oUl);

					rendering2_part(part1, oUl, status1);
					rendering2_part(part2, oUl, status2, "hide");
					rendering2_part(part3, oUl, status2, "hide");
				}

			} else {

				var pTag = document.createElement("p");
				pTag.className = "undefined";
				pTag.innerHTML = "暂无相关数据信息";
				oDiv.insertBefore(pTag, document.getElementById(tabID));
			}
		}
	}
	;
	/**
	 * 待付息产品 分part解析 part1："<span class='muzi'>募资中</span></h4>" part2："<span
	 * class='suoding'>锁定中</span></h4>" part3："<span class='suoding'>锁定中</span></h4>"
	 */
	function rendering2_part(aData, oUl, status, hide) {
		for (var i = 0; i < aData.length; i++) {
			var oLi = document.createElement('li');
			oLi.className = 'table-view-cell media';
			oLi.innerHTML = " <li class='table-view-cell media'>"
					+ " 		              <div class='media-body'>"
					+ " 		                <h4>"
					+ aData[i].borrowTitle
					+ status
					+ " 		                <h6>付息日&nbsp;&nbsp;&nbsp;"
					+ StringToDate(aData[i].dateName)
					+ "</h6>"
					+ " 		                <ul> "
					+ " 		                  <li><strong>"
					+ myTransNum(aData[i].anrate)
					+ "<i>%</i></strong><span>预期年化收益</span></li>"
					+ " 		                  <li><strong>"
					+ addDoubleStr(aData[i].investAmount,aData[i].recievedInterest)
					+ "<i></i></strong><span>预期本息总额（元）</span></li>"
					+ " 		                  <li><a href='getPendingDetails.do?hide="
					+ hide
					+ "&pendFlag=0&id="
					+ aData[i].sunumb
					+ "&investAmount="
					+ aData[i].investAmount
					+ "&interestDate="
					+ aData[i].interestDate
					+ "&dateName="
					+ aData[i].dateName
					+ "&recievedInterest="
					+ aData[i].recievedInterest
					+ "' data-transition='slide-in' class='btn-list-right'></a></li> "
					+ " 		                </ul> "
					+ " 		              </div> "
					+ " 		            </li> ";
			oUl.appendChild(oLi);
			// aData
		}
	}
	/**
	 * 已付息产品
	 */
	function rendering3(aData, tabID, isLogin) {

		var oDiv = document.getElementById("item4mobile");
		var oUl = document.getElementById(tabID);
		var appName=document.getElementById("appName").value;
		// 如果没有登陆则提示登录
		if ("n" == isLogin) {

			var pTag = document.createElement("p");
			pTag.className = "undefined notBound";
			pTag.innerHTML = "您还未绑定惠金所账户，请<a href='"+appName+"/toYappLoginInit.do' data-transition='slide-in'>点我授权</a>";
			oDiv.insertBefore(pTag, document.getElementById(tabID));
		}
		if ("y" == isLogin) {
			var pended_par1 = aData['pended_par1'].pageBean;
			var pended_par2 = aData['pended_par2'].pageBean;
			if ((pended_par1 == null || pended_par1.length==0 )&&(pended_par2 == null || pended_par2.length==0 )) {
				var pTag = document.createElement("p");
				pTag.className = "undefined";
				pTag.innerHTML = "暂无相关数据信息";
				oDiv.insertBefore(pTag, oUl);
			} else {
				rendering3_part(pended_par1,oUl);
				rendering3_part(pended_par2,oUl);
			}
			// aData
		}
	}
	
	function rendering3_part(aData,oUl)
	{
		for (var i = 0; i < aData.length; i++) {
			var oLi = document.createElement('li');
			oLi.className = 'table-view-cell media';
			oLi.innerHTML = "<div class='media-body'>"
					+ "	                <h4>"
					+ aData[i].borrowTitle
					+ "</h4>"
					+ "	                <h6>付息日&nbsp;&nbsp;&nbsp;"
					+ StringToDate(aData[i].dateName)
					+ "</h6>"
					+ "	                <ul>"
					+ "	                  <li><strong>"
					+ aData[i].anrate
					+ "<i>%</i></strong><span>预期年化收益</span></li>"
					+ "	                  <li><strong>"
					+ addDoubleStr(aData[i].investAmount,aData[i].recievedInterest)
					+ "<i>元</i></strong><span>本息总额</span></li>"
					+ "	                  <li><a href='getPendingDetails.do?pendFlag=1&id="
					+ aData[i].sunumb
					+ "&investAmount="
					+ aData[i].investAmount
					+ "&interestDate="
					+ aData[i].interestDate
					+ "&dateName="
					+ aData[i].dateName
					+ "' data-transition='slide-in' class='btn-list-right'></a></li>"
					+ "	                </ul>"
					+ "	              </div>";
			oUl.appendChild(oLi);
		}
	}

	/**
	 * ========================================================================
	 * ajax方法
	 * 
	 * ========================================================================
	 */
	/**
	 * 根据元素id获取元素对象
	 * 
	 * @param elementId
	 * @returns obj
	 */
	function getElementObjById(elementId) {
		return document.getElementById(elementId);
	}
	/**
	 * 根据元素id 设置元素的值
	 * 
	 * @param elementId
	 * @param elementValue
	 * @returns obj
	 */
	function setElementValue(elementId, elementValue) {
		document.getElementById(elementId).value = elementValue;
	}
	/**
	 * 12345格式化为12,345.00 12345.6格式化为12,345.60 12345.67格式化为 12,345.67 只留两位小数。
	 * 格式化函数。可以控制小数位数，自动四舍五入。
	 * 
	 * @param s
	 * @param n
	 * @returns {String}
	 */
	function fmoney(s, n) {
		n = n > 0 && n <= 20 ? n : 2;
		s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
		var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1];
		t = "";
		for (i = 0; i < l.length; i++) {
			t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
		}
		return t.split("").reverse().join("") + "." + r;
	}
}

function triggersubmitForm(){
	
	var oSubmit=document.getElementById("submitForm");
	var ic=document.getElementById("investmentContract");
	 
	oSubmit.addEventListener('touchend',submitForm);
	ic.addEventListener('touchend',toInvestmentContract);
	
}
function toInvestmentContract(){
	//var bankId = "";
	//var bankName = "";
	//var cardNo = "";
	//var infoLimit = "";
//	bankId = document.getElementById("bankId_h").value;
//	bankName = document.getElementById("bankName_h").innerHTML;
//	cardNo = document.getElementById("cardNo_h").innerHTML;
	//infoLimit = document.getElementById("infoLimit").innerHTML;
	//var selectValue = cardNo+";"+bankId+";"+bankName
	//var checkedChildCount=document.getElementById("checked").getElementsByTagName("img");
//	myObject.bankId=bankId;
//	myObject.cardNo=cardNo;
//	myObject.bankName=bankName;
//	myObject.bankInfo = selectValue;
	//myObject.infoLimit = infoLimit;
	var oText = document.getElementById("money");
	var money = Number(oText.value);
	myObject.money = money;
	myObject.borrowId = document.getElementById("borrowId").value;
	PUSH({
		url : 'yqrx/getInvestmentManagementContract.do?borrowId='+myObject.borrowId
	});
}
function submitForm() {
	var checkedChildCount=document.getElementById("checked").getElementsByTagName("img");
	if (checkedChildCount.length<1) {
		alert("请选择银行卡");
		return;
	} 
	var oText = document.getElementById("money");
	var money = Number(oText.value);

	var minsumDouble=Number(document.getElementById("minsumDouble").value);
	var maxsumDouble=Number(document.getElementById("maxsumDouble").value);
	var residuDouble=Number(document.getElementById("residuDouble").value);
	var bankCode=document.querySelector('#bankId_h').value;
	if("0308"==bankCode){//不支持招商银行卡充值
		alert("很遗憾，您绑定的银行卡暂时无法完成在有钱任信平台的投资，您可以登录惠金所App完成投资或联系客服更换银行卡，客服电话：400-015-8800");
		return ;
	}else if ((residuDouble>minsumDouble)&&(money < minsumDouble || money > maxsumDouble)) {
		alert("申购金额"+minsumDouble+"元-"+maxsumDouble+"元");
		return;
	} else if ((residuDouble>minsumDouble)&&(money % 100 != 0)) {
		alert("请输入100的整数倍");
		return;

	} else {
		oText.value = money;
		myObject.money = money;
		myObject.borrowId = document.getElementById("borrowId").value;
		PUSH({
			url : 'toSetpassword.do'
		});
	}
}

function defalutMyObject(str){
	if(str==null||str==undefined){
		return "";
	}else{
		return str;
	}
}
function returnValue()
{
	if(myObject.bankId!=undefined&&myObject.bankName!=undefined&&myObject.cardNo!=undefined&&myObject.money!=undefined)
	{
		var checked=document.getElementById('checked');
		var htmlStr="<img src="+document.getElementById("appName").value+"/mobile/bankico/bankico_"+myObject.bankId+".png alt=''>" 
							+"<strong><span id='bankName_h'>"
							+myObject.bankName
							+"</span><span id='cardNo_h' name='"+myObject.cardNo+"'>"
							+myObject.cardNox+"</span><input type='hidden' id='bankId_h'  value='"
							+myObject.bankId+"'/></strong> ";
		checked.innerHTML=htmlStr;
	}
	if(defalutMyObject(myObject.bankId)!="")
	{
		document.getElementById("bankId_h").value=defalutMyObject(myObject.bankId);
	}	
	if(defalutMyObject(myObject.bankName)!="")
		{
		
		document.getElementById("bankName_h").innerHTML=defalutMyObject(myObject.bankName);
		}
	if(defalutMyObject(myObject.cardNo)!="")
		{
		document.getElementById("cardNo_h").setAttribute("name",defalutMyObject(myObject.cardNo));	
		document.getElementById("cardNo_h").innerHTML=defalutMyObject(myObject.cardNox);
		}
	if(defalutMyObject(myObject.money)!="")
		{
		document.getElementById("money").value=defalutMyObject(myObject.money);
		}
	//document.getElementById("infoLimit").value=defalutMyObject(myObject.infoLimit);
	if(defalutMyObject(myObject.limit)!="")
	{
		
		var bankDiv=document.getElementById("bankDiv");
		var newDiv= document.getElementById("infoLimit");
		if(newDiv)
		{
			bankDiv.removeChild(newDiv);
		}
		var oDiv = document.createElement("div");
		oDiv.className="infoTishi icon-info";
		oDiv.id="infoLimit";
		oDiv.innerHTML=myObject.limit;
		bankDiv.appendChild(oDiv);
	}	
}
function tirgerBackDatail()
{
	var backA=document.getElementById("backDetail");
	backA.addEventListener('touchend',backDetail);
}
function backDetail()
{
	PUSH({
		url:document.getElementById("appName").value+"/yqrx/toYappFinanceDetail.do?id="+document.getElementById("borrowId").value,
		transition:"slide-out"
	});
	myObject={};
}
var listIndex = 0;
function setTab() {
	var aTabBtn = document.querySelectorAll('.control-item');
	var aTabBody = document.querySelectorAll('.control-content');
	for (var i = 0; i < aTabBtn.length; i++) {
		aTabBtn[i].index = i;
		aTabBtn[i].classList.remove('active');
		aTabBody[i].classList.remove('active');
		aTabBtn[i].addEventListener('touchend', function() {
			listIndex = this.index;
		});
	}
	aTabBtn[listIndex].classList.add('active');
	aTabBody[listIndex].classList.add('active');
}
function triggerbuySuccess()
{
	var buySuccess=document.getElementById("buySuccess");
	buySuccess.addEventListener('touchstart', function(){listIndex=2;PUSH({url:document.getElementById("appName").value+"/yqrx/financeListEntry.do"})});
}
function triggerbangka()
{
	var bangka=document.getElementById("bangka");
	bangka.removeEventListener('touchstart', bangKa);
	bangka.addEventListener('touchstart', bangKa);
}

/**
 * 绑卡提交
 */
var bankcd = "";
var banknm = "";
var tradePass="";
function bangKa() {
//	document.charset='utf-8';
//	document.getElementById("bankcd").value=bankcd;
//	document.getElementById("banknm").value=banknm;
//	document.getElementById("mainForm").submit();
	//var key = '12345678';
	var param = [] ;
	//var inpas=getElementObjById("tradePass").value;
	//var enpas = encryptByDES(inpas, key);
	var tp=getElementObjById("tradePass").value;
	if(tp){
		param["paramMap.tradePass"] =decToHex(tp);
	}
	
	param["paramMap.bankcd"] = bankcd;
	param["paramMap.banknm"] = banknm;
	param["paramMap.realName"] = getElementObjById("realName").value;
	param["paramMap.cardNo"] = getElementObjById("cardNo").value;
	param["paramMap.idcard"] = getElementObjById("idcard").value;
	param["paramMap.phone"] = getElementObjById("phone").value;
	var islegal = checkBangKaParam(param);
	if(!islegal){
		return;
	}
	ajax({
		url : document.getElementById("appName").value+'/yqrx/yappBankKa.do',
		type : 'POST',
		data : param,
		success : function(data) {
			var obj=JSON.parse(data);
			//alert(obj.retMsg);
			if (obj.retCode == "0000") {
				bangkaParam={};
				if(obj.retMsg!=null){
				  var topDiv=document.getElementById("topDiv");
				  var formDiv = document.createElement("div");
				  formDiv.innerHTML=obj.retMsg;
				  topDiv.appendChild(formDiv);
				  //提交form 表单
				  if(document.getElementById("editForm")){
					  document.getElementById("editForm").submit();
				  }else if(document.forms[0]){
					  document.forms[0].submit();
				  }
				} else {
					alert("系统异常！");
					return;
				}
			}else if(obj.retCode == "9999"){
				PUSH({url:obj.retMsg});
			}
			else{
				alert(obj.retMsg);
				return;
			}
		},
		error:function (e){
			alert(e);
			return;
		}
		 
	});
	 
}
//绑卡参数校验
function checkBangKaParam(param){
	if(param==null){
		alert("请输入信息");
		return false;
	}
	var banknm = param["paramMap.banknm"] ;
	var realName = param["paramMap.realName"] ;
	var cardNo = param["paramMap.cardNo"]; 
	var idcard = param["paramMap.idcard"] ;
	var phone = param["paramMap.phone"]; 
	if(banknm==null || trim(banknm) == ""){
		alert("请选择银行")
		return false;
	}
	if(realName==null || trim(realName)==""){
		alert("输入持卡人姓名")
		return false;
	}
	if(!/^[-+]?\d*$/.test(trim(cardNo))){
		alert("请输入正确的卡号");
		return false;
	}
	if(!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(trim(idcard))){
		alert("输入正确的身份证号码")
		return false;
	}
	if(!/(^\d{11}$)/.test(trim(phone))){
		alert("输入正确的手机号")
		return false;
	}
	return true;
}
/**
 * 注册已绑定银行卡的select的change事件
 */
function bankSelectChange()
{
	var oSelect=document.getElementById("blankCard");
	oSelect.addEventListener("change",selectValue);
}
function selectValue()
{
	var bankId_h=myObject.bankId;
	var bankName_h=myObject.bankName;
	var bankParam=bankId_h+";"+bankName_h;
	ajax({
		url:'ajaxGetBankLimits.do',
		type:'post',
		data:{bankParam:bankParam},
		success:function (data){
			 
			var bankDiv=document.getElementById("bankDiv");
			var newDiv= document.getElementById("infoLimit");
			if(newDiv)
			{
				bankDiv.removeChild(newDiv);
			}
			var oDiv = document.createElement("div");
			oDiv.className="infoTishi icon-info";
			oDiv.id="infoLimit";
			if(data!=null&&data!="")
			{
				var oData=eval('('+data+')');
				oDiv.innerHTML="单笔限额"+oData.prsili+"元,单日累计限额"+oData.prdacu+"元";
				 
			}else if(bankId_h!=null && bankName_h!=null && bankParam!=null ){
				oDiv.innerHTML="参考：单笔限额5万元,单日累计限额20万元";
			}else{
				oDiv.style.display = "none";
			}
			bankDiv.appendChild(oDiv); 
			myObject.limit=oDiv.innerHTML;
			
		},
		error:function (e){
			alert(e);
		}
	});
}

function triggertoLogin()
{
	var shouquan=document.getElementById("shouquan");
	shouquan.removeEventListener('touchstart', toLogin);
	shouquan.addEventListener('touchstart', toLogin);
}
/*unicode 加密*/
var decToHex = function(str) {
    var res=[];
    for(var i=0;i < str.length;i++)
        res[i]=("00"+str.charCodeAt(i).toString(16)).slice(-4);
    return "\\u"+res.join("\\u");
}
/*unicode 解密*/
var hexToDec = function(str) {
    str=str.replace(/\\/g,"%");
    return unescape(str);
}
var trim=function(str){
	return str.replace(/(^\s*)|(\s*$)/g, "");
}
/**
 * 用户登录
 * @param DateStr
 * @returns
 */


function toLogin(){
	var key = '12345678';
	var param = {};
	param["paramMap.mobilePhone"] =getElementObjById("mobilePhone").value;
	var username=getElementObjById("email").value;
	if(username==null || trim(username)==""){
		alert("请输入用户名！");
		return;
	}
	param["paramMap.email"] = username;
	var inpas=getElementObjById("password").value;
	if(inpas==null || trim(inpas)==""){
		alert("请输入密码！");
		return;
	}
	//密码加密
	var enPas = encryptByDES(inpas, key);
	param["paramMap.password"] =decToHex(enPas);
	param["paramMap.transt"] = "1";
	param["paramMap.channelKey"] =getElementObjById("channelKey").value;
	ajax({
		url:'toYappLogin.do',
		type:'POST',
		data:param,
		success:function (data){
			var obj=JSON.parse(data);
			if (obj.retCode == "0000") {
				alert("账号绑定成功！",function(){
					//var targetUrl=getElementObjById("destinationUrl").value;
					var targetUrl=obj.retMsg;
					if(targetUrl==""){
						PUSH({url:document.getElementById("appName").value+'/yqrx/financeListEntry.do'});
					}else{
						PUSH({url:targetUrl});
					}
					//window.location.href='yqrx/financeListEntry.do';
				});
			} else {
				alert(obj.retMsg);
				return;
			}
		},
		error:function (e){
			alert(e,function(){
				PUSH({url:document.getElementById("appName").value+'/yqrx/error.do'});
			});
			
		}
	});
}

function triggertoRegister()
{
	var register=document.getElementById("register");
	register.removeEventListener('touchstart', toRegister);
	register.addEventListener('touchstart', toRegister);
}
/**
 * 用户注册
 */
function toRegister(){
	var param = {};
	param["paramMap.mobilePhone"] =getElementObjById("mobilePhone").value;
	param["paramMap.channelKey"] =getElementObjById("channelKey").value;
	param["paramMap.userType"] = "1";//个人注册
	param["paramMap.transt"] = "1";//key注册
	
	ajax({
		url:'toYappRegist.do',
		type:'POST',
		data:param,
		success:function (data){
			var obj=JSON.parse(data);
			if (obj.retCode == "0000") {
				/*
				var targetUrl="";
				if(targetUrl==""){
					window.location.href='yqrx/financeListEntry.do';
				}else{
					window.location.href=targetUrl;
				}*/
				alert(obj.retMsg,function(){
					PUSH({url:document.getElementById("appName").value+'/yqrx/financeListEntry.do'});
				});
			} else {
				alert(obj.retMsg);
				return;
			}
		},
		error:function (e){
			alert(e,function(){
				PUSH({url:document.getElementById("appName").value+'/yqrx/error.do'});
			});
		}
	});
}

function triggernextpage()
{
	var onextpage=document.getElementById("nextpage");
	onextpage.removeEventListener('touchstart', checkPassword);
	onextpage.addEventListener('touchstart', checkPassword);
	
}
function checkPassword(passWord)
{
	var qdh=document.getElementById("qdh").value;
	var pcpassword="";
	if(qdh!="")
	{
		pcpassword=document.getElementById("password").value;
		
		 var key = '12345678';
		 pcpassword = encryptByDES(pcpassword, key);
		 pcpassword=decToHex(pcpassword);
		
	}else{
		pcpassword=passWord;
	}
	
	ajax({
		url:document.getElementById("appName").value+'/yqrx/checkPcPassword.do',
		type:'POST',
		data:{pcpassword:pcpassword,qdh:qdh},
		success:function (data){
			 if(data=='1'){
				PUSH({
					url:document.getElementById("appName").value+"/yqrx/setpwforapp.do"
				})//pc端校验成功
			 }else if(data=='2')
				{
					PUSH({
						url:document.getElementById("appName").value+"/yqrx/isBoundCardInpc.do"
					});
				}
			 else if(data=="-1") {
				alert("密码错误！");
			}else if(data=="login")
				{
				PUSH({url:document.getElementById("appName").value+'/toYappLoginInit.do'});
				}else
			{
				alert("系统异常，请稍后再试！");
			}
		} 
	});
}

// 将日期yyyyMMdd转为yyyy-MM-dd格式
function StringToDate(DateStr) {
	if (DateStr == null)
		return "";
	var r = DateStr.replace(/^(\d{4})(\d{2})(\d{2})$/, "$1-$2-$3")
	return r;
}
// 将浮点数保留2位小数
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

function initPendingDetails() {
	
	var nums = document.getElementsByClassName("mynum");
	var dates = document.getElementsByClassName("mydate");
	if( nums!=null && nums.length>0)
		for(var i = 0; i< nums.length ;i++){
			nums[i].innerHTML = myTransNum(nums[i].innerHTML);
		}
	if( dates!=null && dates.length>0)
		for(var i = 0; i< dates.length ;i++){
			dates[i].innerHTML = StringToDate(dates[i].innerHTML);
		}
}
/*关闭绑定银行卡页面的弹窗*/
function popClose(){
  var backdrop=document.getElementById('backdrop2');
  var popover=document.getElementById('popover2');
  backdrop.addEventListener('touchend',function(){
    popover.parentNode.removeChild(backdrop);
    popover.className='popover';
    popover.style.display='';
  })
}

function encryptByDES(message, key) {

	var keyHex = CryptoJS.enc.Utf8.parse(key);

	var encrypted = CryptoJS.DES.encrypt(message, keyHex, {
		mode : CryptoJS.mode.ECB,
		padding : CryptoJS.pad.Pkcs7
	});
	return encrypted.toString();
}
function decryptByDES(ciphertext, key) {
	var keyHex = CryptoJS.enc.Utf8.parse(key);

	var decrypted = CryptoJS.DES.decrypt({
		ciphertext : CryptoJS.enc.Base64.parse(ciphertext)
	}, keyHex, {
		mode : CryptoJS.mode.ECB,
		padding : CryptoJS.pad.Pkcs7
	});

	return decrypted.toString(CryptoJS.enc.Utf8);
}

window.addEventListener('load',function(){
	  var title=document.querySelector('title').title;
	  if(title=='card'){
		  cardList();
	      triggerbangka();
	      triggerchecked();
	      triggerbangKaProtol();
	  }
})

function pendingSpeed(){
    		var speedSlide=document.getElementById('speedSlide');
    		var speadNumber=parseInt(document.getElementById('speadNumber').innerHTML);
    		speedSlide.style.width=speadNumber+'%';
    	}
/**
 * 计算两个字符串的算数值
 * @param doubleStr1
 * @param doubleStr2
 * @returns
 */
function addDoubleStr(doubleStr1,doubleStr2){
	if(isNaN(doubleStr1)){
		doubleStr1 = 0.0;
	}
	if(isNaN(doubleStr2)){
		doubleStr2 = 0.0;
	}
	var sum = parseFloat(doubleStr1)+parseFloat(doubleStr2)
	return myTransNum(sum);
}
/**
 * 将金额改为 元、千元、万元为单位
 */
function transMoney(money){
	if(isNaN(money)){
		return '0.00<i>元</i>';
	}else{
		var money = parseFloat(money);
		if(money>100000){
			return money/10000+"<i>万元</i>";
		}else{
			return money+"<i>元</i>";
		}
	}
}
function setPop(){
	var checked=document.querySelector('#checked');
	checked.addEventListener('touchend',showPop);
	function showPop(){
		
		document.querySelector('#money').blur();
		var backdrop = (function () {
		  var element = document.createElement('div');
		  element.classList.add('backdrop');
		  element.id='backdrop';
		  element.addEventListener('touchend', function () {
		    popover.addEventListener('webkitTransitionEnd', onPopoverHidden);
		    popover.classList.remove('visible');
		    popover.parentNode.removeChild(backdrop);
		  });
		  return element;
		}());
		popover.style.display='block';
		popover.classList.add('visible');
		popover.parentNode.appendChild(backdrop);
		var onPopoverHidden = function () {
			popover.style.display = 'none';
			popover.removeEventListener('webkitTransitionEnd', onPopoverHidden);
		};
	}
}
/*for alertPop by shaonan at 2015-12-22*/
window.alert=function(e,fn){
    var alertPop=document.createElement('div');
    alertPop.className='alert';
    alertPop.innerHTML='<div class="mubu"></div><div class="alertBox"><h2>温馨提示</h2><p>'+e+'</p><b class="closed">关闭</b></div>';
    document.body.appendChild(alertPop);
    document.querySelector('.mubu').addEventListener('touchend',closeAlert);
    document.querySelector('.closed').addEventListener('touchend',closeAlert);
    var aInput=document.querySelectorAll('input');
    for (var i = 0; i < aInput.length; i++) {
    	aInput[i].blur();
    };
    function closeAlert(){
       alertPop.querySelector('.mubu').className='mubu hide';
       alertPop.querySelector('.alertBox').className='alertBox hide';
       setTimeout(function(){
        alertPop.style.display='none';
        document.body.removeChild(alertPop);
        fn&&fn();
       },750)
    }
  };
