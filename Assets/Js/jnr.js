/*Template Name:全站变灰
 * 极客主题jktheme.com！
 * */
var date = new Date();
var year = date.getFullYear();
var currentMonth = date.getMonth() + 1;
var currentDay = date.getDate();
var grayDates = [
    {month: 7, day: 7},
    {month: 9, day: 18},
    {month: 12, day: 13}
];
for (var i = 0; i < grayDates.length; i++) {
    if (currentMonth == grayDates[i].month && currentDay == grayDates[i].day) {
        $("html").css({
            "filter": "progid:DXImageTransform.Microsoft.BasicImage(grayscale=1)",
            "-webkit-filter": "grayscale(100%)"
        });
        console.log("昭昭前事，惕惕后人，铭记历史，吾辈奋进。");
    }
}