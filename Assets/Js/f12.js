/*Template Name:禁止F12 极客主题jktheme.com*/
((function () {
    var callbacks = [],
    timeLimit = 50,
    open = false;
    setInterval(loop, 1);
    return {
    addListener: function (fn) {
    callbacks.push(fn);
    },
cancleListenr: function (fn) {
    callbacks = callbacks.filter(function (v) {
    return v !== fn;
    });
    }
    }
function loop() {
    var startTime = new Date();
    //debugger;
    if (new Date() - startTime > timeLimit) {
    if (!open) {
    callbacks.forEach(function (fn) {
    fn.call(null);
    });
    }
    open = true;
    window.stop();
    alert('警告：请不要打开浏览器调试模式，否则该网页无法正常工作！');
    document.body.innerHTML = "";
    } else {
    open = false;
    }
    }
})()).addListener(function () {
    window.location.reload();
});

function collect() {
//开始javascript执行过程的数据收集
    console.profile();
//配合profile方法，作为数据收集的结束
    console.profileEnd();
//判断profiles里有无内容,若有,则说明按下了F12  
    if (console.clear) {
//清空控制台
    console.clear()
    }
    if (typeof console.profiles == "object") {
      return console.profiles.length > 0;
    }
}
function check() {
    if ((window.console && (console.firebug || console.table && /firebug/i.test(console.table()))) || (typeof opera == 'object' && typeof opera.postError == 'function' && console.profile.length > 0)) {
    jump();
    }
    if (typeof console.profiles == "object" && console.profiles.length > 0) {
    jump();
    }
}
check();
window.onresize = function() {
//判断当前窗口内页高度和窗口高度
    if ((window.outerHeight - window.innerHeight) > 200)
    jump();
}
function jump() {
    window.location = "https://sjcnh.cn/go2.php?url=https://www.baidu.com/s?wd=sjcnh.cn&tn=52176495_dg&ch=2&ie=utf-8";
}