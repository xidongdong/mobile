$(function($){
	$("#passwordInput").focus(function(){
	  $("#passwordInput").before("<div style='z-index:900;position:absolute;bottom:0;left:0;overflow:hidden;width:100%;'><input type='password' class='form-control pwinputfake' maxlength='6' id='passwordInputMask' value='' readonly></div>");
	  $("#passwordInputMask").css("display","block");
	});
	$('#passwordInput').bind('input propertychange', function() {
	  var password = $("#passwordInput").val();
	  $("#passwordInputMask").attr("value",password);
	});
	$("#passwordInput").blur(function(){
	  $("#passwordInputMask").css("display","none");
	});
});