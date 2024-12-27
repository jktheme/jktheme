/*Template Name:动态标题
 * 极客主题jktheme.com！
 * */var OriginTitile = document.title,
    titleTime;
document.addEventListener("visibilitychange",
function () {
    if (document.hidden) {
        document.title = "该网页崩溃了 o(╥﹏╥)o";
        clearTimeout(titleTime)
    } else {
        document.title = "哇，突然好了ヾ(o´∀｀o)ﾉ  ";
        titleTime = setTimeout(function () {
                document.title = OriginTitile
            },
            2000)
    }
});