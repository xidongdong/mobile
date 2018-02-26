window.alert=function(e,fn){
  var alertPop=document.createElement('div');
  alertPop.className='alert';
  alertPop.innerHTML='<div class="mubu"></div><div class="alertBox"><h2>提示</h2><p>'+e+'</p><b class="closed">关闭</b></div>';
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
    },750);
    fn && fn();
  }
};
/*解释*/
window.addEventListener('load',function(){
  if(document.querySelectorAll('.popCP')[0]){
    document.querySelectorAll('.popCP')[0].querySelectorAll('b')[0].addEventListener('touchend',function(){
     document.querySelectorAll('.popCP')[0].style.display='none';
    })
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
            if(patternCheck(keyReset.passTrue)){
              alert("不能输入6个连续相同的数字！");
              keyReset.passTrue='';
              keyReset.cleanPass(); 
              return;
            }else{
              fn(keyReset.passTrue);
            }
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
alert(1);