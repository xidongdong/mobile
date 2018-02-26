'use strict'
//json   url   cbName  data  success
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







