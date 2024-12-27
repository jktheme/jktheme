window.onload = function () {
    countDown();
    function addZero(i) {
    return i < 10 ? "0" + i: i + "";
    }
    function countDown() {
    var nowtime = new Date();
    var endtime = new Date("2024/12/31");
    var lefttime = parseInt((endtime.getTime() - nowtime.getTime()) / 1000);
    var d = parseInt(lefttime / (24*60*60))
    var h = parseInt(lefttime / (60 * 60) % 24);
    var m = parseInt(lefttime / 60 % 60);
    var s = parseInt(lefttime % 60);
    d = addZero(d)
    h = addZero(h);
    m = addZero(m);
    s = addZero(s);
    document.querySelector(".count").innerHTML = `活动倒计时<p class="red_p">  ${d}</p>天 <p class="red_p">${h}</p> 时 <p class="red_p">${m}</p> 分 <p class="red_p">${s} </p>秒`;
    if (lefttime <= 0) {
    document.querySelector(".count").innerHTML = "<style>.Ji-col{display: none;}</style>";
    return;
    }
    setTimeout(countDown, 1000);
    }
    }

var today = new Date().toDateString();
var isClosed = localStorage.getItem('popupClosed');
if (isClosed !== today) {
  var closeButtons = document.getElementsByClassName('close');
  for (var i = 0; i < closeButtons.length; i++) {
    closeButtons[i].addEventListener('click', function() {
      this.parentNode.style.display = 'none';
      localStorage.setItem('popupClosed', today);
    });
  }
} else {
  var jiRow = document.querySelector('.Ji-row');
  if (jiRow) {
    jiRow.style.display = 'none';
  }
}