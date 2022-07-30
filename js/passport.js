 String.prototype.getBytesLength = function(){
     var totalLength = 0; 
     var charCode;  
     for (var i = 0; i < this.length; i++) {  
        charCode = this.charCodeAt(i);  
         if (charCode < 0x007f)  {     
            totalLength++;     
        } else      
             totalLength += 2;      
     }  
     return totalLength;   
 }


var $userName = $("#reg-userName");
$userName.focus(function(){
	$("#userNameTip").css("display","block");
	$("#userNameTipText").css("display","block");
	$userName.css("border-color","#2E58FF");
	$("#userNameError").text(" ");
});
$userName.blur(function(){
	$("#userNameTip").css("display","none");
	$("#userNameTipText").css("display","none");
	
	var userNameVal =  $userName.val().replace(/\s*/g,"");
	$userName.val(userNameVal);
	
	var $userNameError = $("#userNameError");
	var userNameValByteSize = userNameVal.getBytesLength();
	if(userNameValByteSize == 0)
	{
		$userNameError.text(" ");
		$("#userNameCorrectIcon").css("display","none");
		$("#reg-userName").css("border-color","#E0E0E0");
		ubool = false;
	}
	else if(userNameValByteSize > 14 )
	{
		$userNameError.text("用户名不能超过7个汉字或14个字符");
		$("#userNameCorrectIcon").css("display","none");
		$("#reg-userName").css("border-color","#f55");
		ubool = false;
	}
	else if(!/^[\u4E00-\u9FA5A-Za-z0-9_]+$/.test(userNameVal) || !/^(?!\d*$)/.test(userNameVal))
	{
		$userNameError.text("用户名仅支持中英文、数字和下划线,且不能为纯数字");
		$("#userNameCorrectIcon").css("display","none");
		$("#reg-userName").css("border-color","#f55");
		ubool = false;
	}
	else	
	{
		$userNameError.text(" ");
		$("#userNameCorrectIcon").css("display","inline");
		$("#reg-userName").css("border-color","#E0E0E0");
		ubool = true;
	}
	testIfSubmitAvailable();
});
var phoneVerifyCode =  /^1[3|4|5|7|8][0-9]{9}$/;
var $regPhone = $("#reg-phone");
$regPhone.focus(function(){
	$regPhone.css("border-color","#2E58FF");
});
$regPhone.blur(function(){
	var phoneValue = $regPhone.val();
	var $phoneError = $("#phoneError");
	var $phoneCorrectIcon = $("#phoneCorrectIcon");
	if(phoneValue.length == 0)
	{
		$phoneError.text(" ");
		$phoneCorrectIcon.css("display","none")
		$("#reg-phone").css("border-color","#E0E0E0");
		phbool = false;
	}
	else if(!phoneVerifyCode.test(phoneValue))
	{
		$phoneError.text("手机号码格式不正确");
		$phoneCorrectIcon.css("display","none")
		$("#reg-phone").css("border-color","#f55");
		phbool = false;
	}
	else
	{
		$phoneError.text(" ");
		$phoneCorrectIcon.css("display","inline")
		$("#reg-phone").css("border-color","#E0E0E0");
		phbool = true;
	}
	testIfSubmitAvailable();
});

var $regPassword = $("#reg-password");
var passwordTipVerify = false;
$regPassword.focus(function(){
	var pwdVal = $("#reg-password").val();
			if(0==pwdVal)
			{
					$("#pwdErrorText1").css("color","#FFFFFF");
					pwdbool[0] = false;
					$("#pwdErrorText2").css("color","#FFFFFF");
					pwdbool[1] = false;
					$("#pwdErrorText3").css("color","#FFFFFF");
					pwdbool[2] = false;
					$(".pwdErrorIcon").css("display","none");
			}
	$("#passwordTip").css("display","block");
	$("#passwordTipText").css("display","block");
	passwordTipVerify = true;
	$("#passwordError").css("display","none");
	$("#pwdCorrectIcon").css("display","none");
	$("#passwordTipIcon").css("display","block");
	
	if(pwdbool[0]  && pwdbool[1]  && pwdbool[2] )
	{
		$("#reg-password").css("border-color","#2E58FF");
	}
	else
	{
		$("#reg-password").css("border-color","#F55");
	}
});

$regPassword.blur(function(){
	
	
	//获取密码的值
	var passwordVal = $regPassword.val();
	if(0 == passwordVal.length)
	{
		$("#passwordTip").css("display","none");
		$("#passwordTipText").css("display","none");
		passwordTipVerify = false;
		pbool = false;
		
	}
	//正则表达式：8-14个字符,不包含空格,必须包含数字,字母或字符至少两种
	///^(?=.*\\d)(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^[^\\s\\u4e00-\\u9fa5]{8,14}/;
	if(pwdbool[0] && pwdbool[1] && pwdbool[2])
	{
		
		$("#passwordChangeType").css("display","inline-block");
		$("#passwordTipIcon").css("display","none");
		$("#pwdCorrectIcon").css("display","block");
		$regPassword.css("border-color","#E0E0E0");
		$("#passwordTip").css("display","none");
		$("#passwordTipText").css("display","none");
		passwordTipVerify = false;
		pbool = true;
	}
	else
	{
		pbool = false;
		$("#passwordError").css("display","block");
		$regPassword.css("border-color","#f55");
	}
	testIfSubmitAvailable();
});

$("#passwordTipIcon").click(function(){
	if(passwordTipVerify)
	{
		$("#passwordTip").css("display","none");
		$("#passwordTipText").css("display","none");
		passwordTipVerify = false;
	}
	else
	{
		$("#passwordTip").css("display","block");
		$("#passwordTipText").css("display","block");
		passwordTipVerify = true;
	}
});

var switchBackground = 0;
var $passwordChangeType = $("#passwordChangeType");
$passwordChangeType.click(function(){
	switch (switchBackground){
		case (0):
			$passwordChangeType.css("background-image","url(img/show-2x.png)");
			switchBackground = 1;
			$regPassword.prop("type","text");
			break;
		case (1):
			$passwordChangeType.css("background-image","url(img/hide-2x.png)");
			switchBackground = 0;
			$regPassword.prop("type","password");
			break;
		default:
			break;
	}
});

$passwordChangeType.hover(function(){
	switch (switchBackground){
		case (0):
			$passwordChangeType.css("background-image","url(img/hide-2x-hover.png)");
			break;
		case (1):
			$passwordChangeType.css("background-image","url(img/show-2x-hover.png)");
			break;
		default:
			break;
	}
},function(){
	switch (switchBackground){
		case (0):
			$passwordChangeType.css("background-image","url(img/hide-2x.png)");			
			break;
		case (1):
			$passwordChangeType.css("background-image","url(img/show-2x.png)");
			break;
		default:
			break;
		}
});
//设置松开按键设置错误信息
var pwdbool = new Array(3);
$regPassword.keyup(function(){
	var pwdVal = $("#reg-password").val();
			if(0==pwdVal)
			{
					$("#pwdErrorText1").css("color","#FFFFFF");
					pwdbool[0] = false;
					$("#pwdErrorText2").css("color","#FFFFFF");
					pwdbool[1] = false;
					$("#pwdErrorText3").css("color","#FFFFFF");
					pwdbool[2] = false;
					$(".pwdErrorIcon").css("display","none");
					return;
			}
				if(pwdVal.length<8 || pwdVal.length>14)
				{
					$("#pwdErrorIcon1").css("background-image","url(img/pwd-error.png)");
					$("#pwdErrorText1").css("color","#F55");
					pwdbool[0] = false;
				}
				else
				{
					$("#pwdErrorIcon1").css("background-image","url(img/pwd-right.png)");
					$("#pwdErrorText1").css("color","#FFFFFF");
					pwdbool[0] = true;
				}
				
				//(?!^(\d+|[a-zA-Z]+|[~!@#$%^&*?]+)$)^[\w~!@#$%^&*?]
				if(!/(?!^([\s\d]+|[a-zA-Z\s]+|[\s~!@#$%^&*?]+)$)^[\s\w~!@#$%^&*?]/.test(pwdVal))
				{
					$("#pwdErrorIcon2").css("background-image","url(img/pwd-error.png)");
					$("#pwdErrorText2").css("color","#F55");
					pwdbool[1] = false;
				}
				else
				{
					$("#pwdErrorIcon2").css("background-image","url(img/pwd-right.png)");
					$("#pwdErrorText2").css("color","#FFFFFF");
					pwdbool[1] = true;
				}
				if(!/[^\u4e00-\u9fa5]+/.test(pwdVal) || !/^[\S]*$/.test(pwdVal))
				{
					$("#pwdErrorIcon3").css("background-image","url(img/pwd-error.png)");
					$("#pwdErrorText3").css("color","#F55");
					pwdbool[2] = false;
				}
				else
				{
					$("#pwdErrorIcon3").css("background-image","url(img/pwd-right.png)");
					$("#pwdErrorText3").css("color","#FFFFFF");
					pwdbool[2] = true;
				}
	$(".pwdErrorIcon").css("display","inline-block");
});
//这三个变量分别代表了，用户电话密码，的值是否正确
var ubool;
var phbool;
var pbool;
$("#reg-from").submit(function(){
	
	if (available) {
		return true;
	}
	else if($("#agreement-check").prop("checked") != true)
	{
		$("#checkError").css("display","inline");
		return false;
	}
	else{
		return false;
	}
});
var available = false;
function testIfSubmitAvailable()
{
	if(ubool && phbool && pbool && $("#agreement-check").prop("checked") == true)
	{
		$("#reg-submit").css("background","#2E58FF");
		$("#reg-submit").css("box-shadow","0 8px 20px 0 #8f9fff");
		available = true;
	}
	else
	{
		$("#reg-submit").css("background"," #BDCEFC");
		$("#reg-submit").css("box-shadow","");
		available = false;
	}
	
};
$("#agreement-check").change(function(){
	if($("#agreement-check").prop("checked") == true)
	{
		$("#checkError").css("display","none");
	}
	testIfSubmitAvailable();
});

