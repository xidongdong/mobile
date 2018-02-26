/**
 * 根据元素id获取元素对象
 * @param elementId
 * @returns obj
 */
function getElementObjById(elementId){
	return  document.getElementById(elementId);
}
/**
 * 根据元素id 设置元素的值
 * @param elementId
 * @param elementValue
 * @returns obj
 */
function setElementValue(elementId,elementValue){
	document.getElementById(elementId).value=elementValue;
}

function json2url(json){
	json.t=Math.random();
	var arr=[];
	for (var name in json)
	{
		arr.push(name+'='+json[name]);
	}
	return arr.join('&');
}
function ajax(json){
	json=json || {};
	if ( ! json.url) return;
	json.type=json.type || 'get';
	json.data=json.data || {};
	json.timeout=json.timeout || 3000;
	var timer=null;
	
	if (window.XMLHttpRequest){
		var oAjax=new XMLHttpRequest();
	}
	else{
		var oAjax=new ActiveXObject('Microsoft.XMLHTTP');
	}
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
			if (oAjax.status>=200 && oAjax.status<300 || oAjax.status==304)
			{
				json.success && json.success(oAjax.responseText);
			}
			else
			{
				json.error && json.error(oAjax.status);
			}
		}
	};
	/*
	timer=setTimeout(function (){
		json.error && json.error('网络超时');
		oAjax.onreadystatechange=null;
	}, json.timeout);*/
}

