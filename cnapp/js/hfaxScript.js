// json转URL
function json2url(json){
	json.t=Math.random();
	var arr=[];
	for (var name in json){
		arr.push(name+'='+json[name]);
	}
	return arr.join('&');
}

//ajax源码
function ajax(json){
	json=json || {};
	if ( ! json.url) return;
	json.type=json.type || 'get';
	json.data=json.data || {};
	json.timeout=json.timeout || 100000;
	json.loadding=json.loadding || false;
	json.error=json.error || function(){
		createView(viewModle.linkfail);
	}
	json.timeoutView=json.timeoutView || function(){
		createView(viewModle.linkfail);
	}
	var timer=null;
	var loaddingTime=null;
	if (window.XMLHttpRequest){
		var oAjax=new XMLHttpRequest();
	}
	else{
		var oAjax=new ActiveXObject('Microsoft.XMLHTTP');
	}
	//document.querySelector('#loadding').style.display='block';
	document.querySelector('#loadding')&&document.querySelector('#loadding').classList.remove('hidde');
	document.querySelector('#loadding')&&document.querySelector('#loadding').classList.add('in');
	switch (json.type.toLowerCase()){
		case 'get':
			oAjax.open('GET', json.url+'?'+json2url(json.data), true);
			oAjax.send();
			break;
		case 'post':
			oAjax.open('POST', json.url, true);
			oAjax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			oAjax.send(json2url(json.data));
			break;
	}
	oAjax.onreadystatechange=function (){
		if (oAjax.readyState == 4){
			// 连接成功
			clearTimeout(timer);
			if (oAjax.status>=200 && oAjax.status<300 || oAjax.status==304){
				var responseJson ;
				try{
					responseJson = eval('('+oAjax.responseText+')');
				}catch (e) {
					responseJson = "";
				}
				if(responseJson && responseJson.status!=null && responseJson.status.loginFlag!=null ){
					user.state=responseJson.status;//存储状态
					responseJson=JSON.stringify(responseJson.status);
				    localStorage.state=responseJson;//存储状态
				}
				json.success(oAjax.responseText);
				if(!json.loadding){
					closeLoading();
				}
			}
			else{
				closeLoading();
				json.error(oAjax.status);
				//加载异常
			}
		}
	};
	timer=setTimeout(function (){
		json.timeoutView('网络超时');
		closeLoading();
		oAjax.onreadystatechange=null;
	}, json.timeout);
}

//获取非行间样式
function getStyle(obj, sName){
	return (obj.currentStyle || getComputedStyle(obj, false))[sName];
}
//jsonp源码
function jsonp(json){
	//json = {url/cbName/data/success};
	json = json||{};
	//如果没有url，就阻止
	if(!json.url)return;
	//给默认的callback名字
	json.cbName = json.cbName || 'cb';
	//给默认的数据
	json.data = json.data || {};
	//给回调函数名字，处理缓存
	json.data[json.cbName] = 'show'+Math.random();
	//把函数名字的.干掉
	json.data[json.cbName] = json.data[json.cbName].replace('.','');
	var arr = [];
	for(var name in json.data){
		arr.push(name+'='+encodeURIComponent(json.data[name]));
	}
	var str = arr.join('&');
	//全局回调函数
	window[json.data[json.cbName]] = function(res){
		//执行回调函数
		json.success&&json.success(res);
		//执行完成之后，把script标签删除
		oH.removeChild(oS);
	}
	var oH = document.getElementsByTagName('head')[0];
	var oS = document.createElement('script');
	oS.src=json.url+'?'+str;
	oH.appendChild(oS);
}


window.alert=function (e,fn){
  var alertPop=document.createElement('div');
  alertPop.className='alert';
  alertPop.innerHTML='<div class="mubu"></div><div class="alertBox"><h2>提示</h2><p>'+e+'</p><b class="closed">关闭</b></div>';
  document.body.appendChild(alertPop);
  document.querySelector('.mubu').addEventListener('touchend',closeAlert);
  document.querySelector('.closed').addEventListener('touchend',closeAlert);
  var aInput=document.querySelectorAll('input');
  for (var i = 0; i < aInput.length; i++) {
  	aInput[i].blur();
  }
	function closeAlert(){
		alertPop.querySelector('.mubu').className='mubu hide';
		alertPop.querySelector('.alertBox').className='alertBox hide';
		setTimeout(function(){
		alertPop.style.display='none';
		alertPop.parentNode.removeChild(alertPop);
		fn && fn();
		},750);
	}
}

function getQueryString(name) {  
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");  
  var r = window.location.search.substr(1).match(reg);  
  if (r != null) return unescape(r[2]);  
  return null;  
}

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    //AMD
    define(factory);
  } else if (typeof exports === 'object') {
    //Node, CommonJS之类的
    module.exports = factory();
  } else {
    //浏览器全局变量(root 即 window)
    root.resLoader = factory(root);
  }
}(this, function () {
  var isFunc = function(f){
    return typeof f === 'function';
  }
  //构造器函数
  function resLoader(config){
    this.option = {
      resourceType : 'image', //资源类型，默认为图片
      baseUrl : './', //基准url
      resources : [], //资源路径数组
      onStart : null, //加载开始回调函数，传入参数total
      onProgress : null, //正在加载回调函数，传入参数currentIndex, total
      onComplete : null //加载完毕回调函数，传入参数total
    }
    if(config){
      for(i in config){
        this.option[i] = config[i];
      }
    }
    else{
      alert('参数错误！');
      return;
    }
    this.status = 0; //加载器的状态，0：未启动   1：正在加载   2：加载完毕
    this.total = this.option.resources.length || 0; //资源总数
    this.currentIndex = 0; //当前正在加载的资源索引
  };
  resLoader.prototype.start = function(){
    this.status = 1;
    var _this = this;
    var baseUrl = this.option.baseUrl;
    for(var i=0,l=this.option.resources.length; i<l; i++){
      var r = this.option.resources[i], url = '';
      if(r.indexOf('http://')===0 || r.indexOf('https://')===0){
        url = r;
      }
      else{
        url = baseUrl + r;
      }
      var image = new Image();
      image.onload = function(){_this.loaded();};
      image.onerror = function(){_this.loaded();};
      image.src = url;
    }
    if(isFunc(this.option.onStart)){
      this.option.onStart(this.total);
    }
  }
  resLoader.prototype.loaded = function(){
    if(isFunc(this.option.onProgress)){
      this.option.onProgress(++this.currentIndex, this.total);
    }
    //加载完毕
    if(this.currentIndex===this.total){
      if(isFunc(this.option.onComplete)){
        this.option.onComplete(this.total);
      }
    }
  }
  //暴露公共方法
  return resLoader;
}));
/*处理滑动时触发链接的行为*/
function push(obj,fn){
  if(!obj){return;}
  obj.addEventListener('touchstart',linkListener);
  function linkListener(){
    obj.addEventListener('touchend',fn);
    var startY=event.changedTouches[0].pageY;
    document.addEventListener('touchmove',function(){
      var disY=Math.abs(event.changedTouches[0].pageY-startY);
      if(disY>40){
        obj.removeEventListener('touchend',fn);
      }
    });
  }
}