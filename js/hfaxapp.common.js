var bFlag=false;
window.alert=function(e,fn){
	if(bFlag){return;}
	bFlag=true;
    window.alertPop=document.createElement('div');
    alertPop.className='alert';
    alertPop.innerHTML='<div class="mubu"></div><div class="alertBox"><h2>温馨提示</h2><p>'+e+'</p><b class="closed">关闭</b></div>';
    document.body.appendChild(alertPop);

    document.querySelector('.mubu').addEventListener('touchend',closeAlert1);
    document.querySelector('.closed').addEventListener('touchend',closeAlert1);
    var aInput=document.querySelectorAll('input');
    for (var i = 0; i < aInput.length; i++) {
    	aInput[i].blur();
    };
    function closeAlert1(){
    	closeAlert(event);
    }
    function closeAlert(event){
    	event.preventDefault();
    	bFlag=false;
		alertPop.querySelector('.mubu').className='mubu hide';
		alertPop.querySelector('.alertBox').className='alertBox hide';
		alertPop.style.display='none';
		document.body.removeChild(alertPop);
		fn && fn();
    }
  };
function patternCheck(password){
	var pattern = /^[0-9]*$/; 
	return pattern.test(password); 
}
window.addEventListener('load', function(){
	var oPassWord=document.querySelectorAll('div');
	if(oPassWord.length!=0){
		if(oPassWord[0].title=='password'){
			document.querySelectorAll('input')[0].focus();
		}
	}
});
window.addEventListener('load', function(){
	if(document.querySelector('#link_tzxy')){
		document.querySelector('#link_tzxy').addEventListener('touchstart',function(){window.location='toHfaxAppInvestmentAgreement.do';});
	}
	if(document.querySelector('#link_fwtk')){
		document.querySelector('#link_fwtk').addEventListener('touchstart',function(){window.location='toHfaxAppServiceTerms.do';});
	}
	if(document.querySelector('#link_xgdlmm')){
		document.querySelector('#link_xgdlmm').addEventListener('touchstart',function(event){
			event.preventDefault();
			window.location='toHfaxappSetPasswordInit.do';});
	}
	if(document.querySelector('#link_czjymm')){
		document.querySelector('#link_czjymm').addEventListener('touchstart',function(event){
			event.preventDefault();
			window.location='toReTranpwInit.do';});
	}
});
//暂无消息
window.addEventListener('load', function(){
	if (document.querySelectorAll('.no-list').length) {
		var noList=document.querySelectorAll('.no-list');
		for (var i = 0; i < noList.length; i++) {
			if (!noList[i].children.length) {
				noList[i].innerHTML='<p class="noRecord">暂无记录</p>';
			}
		}
	}
});

window.addEventListener('load',function(){
	if (document.querySelectorAll('.setTab').length) {
		var aBtn=document.querySelectorAll('.setTab');
		var aBox=document.querySelectorAll('.list-group-detail');
		for (var i = 0; i < aBtn.length; i++) {
			aBtn[i].index=i;
			aBtn[i].addEventListener('touchend',function(){setTab(this.index);});
		}
	}
	function setTab(d){
		for (var i = 0; i < aBox.length; i++) {
			aBox[i].style.display='none';
			aBtn[i].className='btn btn-group setTab';
		}
		aBtn[d].className='btn btn-group setTab active';
		aBox[d].style.display='block';
	}
});




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
    touchPass     :function (){
      var _this=this;
      keyReset.inputPass(user.fn,_this);
    },
    reSetListener :function(){
      for (var i = 0; i < this.tmpLi.length; i++) {
        this.tmpLi[i].addEventListener('touchend',this.touchPass);
      }
    },
    addListener   : function(){
      this.passFlag=user.bFlag=='once'?true:false;
      this.initTmpLi();
      //this.passBox.addEventListener('touchend',this.showKey);
      this.showKey();
      this.reSetListener();
      this.deletBtn.addEventListener('touchend',this.deletePass);
    }
  };
  function initTmpLi(){
    for (var i = 0; i < this.aLi.length; i++){
      this.tmpLi.push(this.aLi[i]);
    }
    this.tmpLi.push(document.querySelectorAll('#btnBox li')[1]);
  }
  function inputPass(fn,obj){
    clearTimeout(keyReset.passTimer);
    if (keyReset.tmpLength>5) {
      return;
    }
    if(keyReset.tmpLength>0){
      keyReset.passBoxLi[keyReset.tmpLength-1].innerHTML='●';
    }
    keyReset.passBoxLi[keyReset.tmpLength].innerHTML=obj.innerHTML;
    keyReset.hide.push(obj.innerHTML);
    
    once(fn);//执行一次

    if(keyReset.tmpLength>=1){
      keyReset.passTimer=setTimeout(function(){
        keyReset.passBoxLi[keyReset.tmpLength-1].innerHTML='●';
      },300);
    }
    keyReset.tmpLength++;
  }
  function once(fn){
    if (keyReset.tmpLength==5) {
      keyReset.cleanPassBox();
      fn(keyReset.passWord);
      keyReset.cleanPass();
      for (var i = 0; i < keyReset.tmpLi.length; i++) {
        keyReset.tmpLi[i].removeEventListener('touchend',keyReset.touchPass);
      }
      fn && fn();
    }
    
  }
  function deletePass(){
    keyReset.tmpLength--;
    if (keyReset.tmpLength<0) {
      keyReset.tmpLength=0;
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

window.addEventListener('load',function(){
  if(document.querySelectorAll('.popCP')[0]){
    document.querySelectorAll('.popCP')[0].querySelectorAll('b')[0].addEventListener('touchend',function(){
     document.querySelectorAll('.popCP')[0].style.display='none';
    });
  }
});
/*window.addEventListener('load',function(){
	if(document.querySelector('#cardList')){
		var aList=document.querySelectorAll('.list-group-item .row');
		var aDelete=document.querySelectorAll('.delete');

		for (var i = 0; i < aList.length; i++) {
			aList[i].addEventListener('touchstart',getDelete);
			aDelete[i].addEventListener('touchstart',function(){
				console.log(this);
				this.parentNode.parentNode.removeChild(this.parentNode);
			})
		}
		function getDelete(){
			var clientStart=event.changedTouches[0].pageX;
			var _this=this;
			for (var i = 0; i < aList.length; i++) {
				aList[i].style.marginLeft=0;
			}
			document.addEventListener('touchmove',deleteMove);
			function deleteMove(){
        event.preventDefault();
				var clientMove=clientStart-event.changedTouches[0].pageX;
				if(clientMove>20){
					if(clientMove>80){
						_this.style.marginLeft=-80+'px';
					}else{
						_this.style.marginLeft=-clientMove+'px';
					}
				}
			}
			document.addEventListener('touchend',function(){
				document.removeEventListener('touchmove',deleteMove);
			});
		}
	}
});*/


window.addEventListener('load',function(){
	if(document.querySelector('#checkList')){
			var aList=document.querySelectorAll('.repeatBox');
		var aBtn=document.querySelectorAll('.iradio_square-bank');
		for (var i = 0; i < aList.length; i++) {
			(function(index){
  			aList[index].addEventListener('touchend',function(){
  				for (var i = 0; i < aBtn.length; i++) {
  					aBtn[i].classList.remove('checked');
  				};
  				aBtn[index].classList.add('checked');
  			});
			})(i);
		};
	}
});

function hfaxAppComdify(n){
	var re=/\d{1,3}(?=(\d{3})+$)/g;
	var n1=n.replace(/^(\d+)((\.\d+)?)$/,function(s,s1,s2){return s1.replace(re,"$&,")+s2;});
	return n1;
}

function hfaxAppCommafyback(num)
{
var x = num.split(',');
return parseFloat(x.join(""));
}

function hfaxAppAmountHandle(obj) {
	$(obj).each(
			function() {
				var _this = $(this);
				var _amount = _this.html();
				_amount = _amount.split('元')[0];
				if (_amount.indexOf(',') > 0) {
					if (_amount.split(',').length == 3) {
						_amount = _amount.split(',')[0] + ''
								+ _amount.split(',')[1] + ''
								+ _amount.split(',')[2];
					} else {
						_amount = _amount.split(',')[0] + ''
								+ _amount.split(',')[1];
					}
				}
				if (_amount.indexOf('万') > 0) {
					_amount = _amount.split('万')[0] * 10000;
				}

				_amount = Number(_amount);
				if (_amount >= 10000) {
					_this.html(parseInt(_amount / 10000) + '万');
				} else if (_amount >= 1000) {
					_this.html(parseInt(_amount / 1000) + '千');
				} else if (_amount >= 100) {
					_this.html(parseInt(_amount / 100) + '百');
				} else {
					_this.html(_amount + '');
				}
			});
}

function hfaxAppNumberFormat(obj) {
	$(obj).each(
			function() {
				var _this = $(this);
				var _number = _this.html();
				
				_number = hfaxAppCommafyback(_number);
				_number = hfaxAppComdify(Number(_number).toFixed(2));
				_this.html(_number + '');
			});
}

$(function(){
	hfaxAppNumberFormat('.numberFormat');
	hfaxAppAmountHandle('.qitou');
});
function switchCode(pageId) {
	alert(pageId);
	var timenow = new Date();
	$("#codeNum").attr("src","admin/imageCode.do?pageId="+pageId+"&d=" + timenow);
}
