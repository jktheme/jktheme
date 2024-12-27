/*Template Name:右下弹窗
 * 极客主题jktheme.com！
 * */var url = "https://pv.sohu.com/cityjson?ie=utf-8"
document.onkeydown=function(){
/*<!--禁止ctrl+u-->*/
if(event.ctrlKey&&window.event.keyCode==85){new Vue({data:function(){this.$notify({title:"嘿！别瞎按",message:"老弟，在干嘛呢？已记录你的IP",position:'bottom-right',offset:50,showClose:true,type:"error"});return{visible:false}}})
return false;}
/*<!--禁止F12-->*/
if(window.event&&window.event.keyCode==123){event.keyCode=0;event.returnValue=false;new Vue({data:function(){this.$notify({title:"嘿！Bingo~",message:"老弟，试试 Ctrl+F4打开调试台",position:'bottom-right',offset:50,showClose:true,type:"error"});return{visible:false}}})
return false;}
/*<!--禁止ctrl+s-->*/
if(event.ctrlKey&&window.event.keyCode==83){new Vue({data:function(){this.$notify({title:"嘿！你瞧瞧你",message:"网页得换方法保存哦~",position:'bottom-right',offset:50,showClose:true,type:"error"});return{visible:false}}})
return false;}
/*<!--禁止ctrl+shift+I-->*/
if((event.ctrlKey)&&(event.shiftKey)&&(event.keyCode==73)){new Vue({data:function(){this.$notify({title:"嘿！哈哈哈",message:"老弟，调试方法也得换换哟~",position:'bottom-right',offset:50,showClose:true,type:"error"});return{visible:false}}})
return false;}
/*<!--禁止ctrl+shit+c-->
if((event.ctrlKey)&&(event.shiftKey)&&(event.keyCode==67)){new Vue({data:function(){this.$notify({title:"嘿！兄弟",message:"嘿嘿，这可不行哦~",position:'bottom-right',offset:50,showClose:true,type:"error"});return{visible:false}}})
return false;}*/
/*<!--禁止Shit+F10-->*/
if((event.shiftKey)&&(event.keyCode==121)){new Vue({data:function(){this.$notify({title:"嘿！兄弟",message:"按错了吧！",position:'bottom-right',offset:50,showClose:true,type:"error"});return{visible:false}}})
return false;}
/*<!--禁止F1-->*/
if(window.event&&window.event.keyCode==112){event.keyCode=0;event.returnValue=false;new Vue({data:function(){this.$notify({title:"嘿！你好！",message:"哎呀，好像按错了！",position:'bottom-right',offset:50,showClose:true,type:"warning"});return{visible:false}}})
return false;}
/*<!--禁止F2-->*/
if(window.event&&window.event.keyCode==113){event.keyCode=0;event.returnValue=false;new Vue({data:function(){this.$notify({title:"嘿！大兄弟",message:"别按了，兄弟！",position:'bottom-right',offset:50,showClose:true,type:"warning"});return{visible:false}}})
return false;}
/*<!--禁止F3-->*/
if(window.event&&window.event.keyCode==114){event.keyCode=0;event.returnValue=false;new Vue({data:function(){this.$notify({title:"嘿！big boy!",message:"你怎么还在按呢！",position:'bottom-right',offset:50,showClose:true,type:"warning"});return{visible:false}}})
return false;}
/*<!--禁止F4-->*/
if(window.event&&window.event.keyCode==115){event.keyCode=0;event.returnValue=false;new Vue({data:function(){this.$notify({title:"嘿！喂喂喂",message:"F5键在右边，你按错了！",position:'bottom-right',offset:50,showClose:true,type:"warning"});return{visible:false}}})
return false;}
/*<!--禁止F6-->*/
if(window.event&&window.event.keyCode==117){event.keyCode=0;event.returnValue=false;new Vue({data:function(){this.$notify({title:"嘿！喂喂喂",message:"F5键在左边，你按错了！",position:'bottom-right',offset:50,showClose:true,type:"warning"});return{visible:false}}})
return false;}
}
/*<!--禁止鼠标右键-->*/
document.oncontextmenu = function (){new Vue({data:function(){this.$notify({title:"嘿！没有右键菜单",message:"复制请用键盘快捷键 Ctrl+C",position:'bottom-right',offset:50,showClose:true,type:"warning"});return{visible:false}}})
return false;}

/*<!--VUE复制提醒-->*/document.addEventListener("copy",function(e){
    new Vue({
        data:function(){
            this.$notify({
                title:"嘿！复制成功",
                message:"若要转载请务必保留原文链接哦！",
                position: 'bottom-right',
                offset: 50,
                showClose: false,
                type:"success"
            });
            return{visible:false}
        }
    })
    return false;
});
/*消息通知*/$(function(){
    if(window.localStorage.getItem("isClose") == 'yes'){
        return false;
    }else{
        setTimeout(function(){
            new Vue({data:function(){
                this.$notify({
                    title:"签到任务已开放",
                    dangerouslyUseHTMLString:true,
                    message:"本站已经开启签到任务！更多详情可首页侧栏<span style='color: #f00;'> 消息通知 </span>查看",
                    dangerouslyUseHTMLString:true,
                    position:'bottom-right',
                    offset:50,
                    duration:0,
                    type:"success",
                    onClose() {
                        window.localStorage.setItem("isClose", "yes");
                        console.log('设计趁年华通知状态：关闭成功');
                    }
                });
                return{visible:false}
            }});
        },5000);
    }
});