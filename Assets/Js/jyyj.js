/*Template Name:禁止右键
 * 设计趁年华www.sjcnh.cn！
 * */
//禁用CTRL+S
$(document).keydown(function(e){
   if( e.ctrlKey  == true && e.keyCode == 83 ){
      console.log('ctrl+s');
      return false; // 截取返回false就不会保存网页了
   }
});
        window.onload = function(){
            document.onkeydown = function (){
                var e = window.event || arguments[0];
                if(e.keyCode == 123){
                    return false;
                    //F12
                }else if((e.ctrlKey) && (e.shiftKey) && (e.keyCode == 73)){
                    return false;
                    //Ctrl+Shift+I
                }else if((e.shiftKey) && (e.keyCode == 121)){
                    return false;
                    //Shift+F10
                }else if((e.ctrlKey) && (e.keyCode == 85)){
                    return false;
                    //Ctrl+U
                }
            };
            document.oncontextmenu = function (){
                    return false;
            }       //禁止右键
        }