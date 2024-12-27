/*T
 * 极客底部滚动公告*/
jQuery(document).ready(function($) {
    $('.marquee').each(function() {
        var container = $(this);
        var content = container.html();
        container.empty();
        container.append('<span>' + content + '</span>');
    });
});

