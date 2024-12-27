/*Template Name:阅读进度条 极客主题jktheme.com*/
$(window).scroll(function() {
var a = $(window).scrollTop(),
c = $(document).height(),
b = $(window).height();
scrollPercent = a / (c - b) * 100;
scrollPercent = scrollPercent.toFixed(1);
$("#percentageCounter").css({
width: scrollPercent + "%"
});
}).trigger("scroll");