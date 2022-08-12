function getId (str) {
	return document.getElementById(str);
}
var time = getId("time");
var timeOut = getId("timeOut")
var input = getId("input");
var ss = getId("startStop");
var audio = getId("audio");
var t;
var lstTime;
var flag;
function res(n) {
    var b = Math.floor(n / 3600000);
    var c = Math.floor(n % 3600000 / 60000);
    var d = Math.floor(n % 60000 / 1000);
    var e = Math.floor(n % 1000 / 10);
	var res = (b < 10 ? '0' : '') + b + ' : ' + (c < 10 ? '0' : '') + c + ' : ' + (d < 10 ? '0' : '') + d + ' . ' + (e < 10 ? '0' : '') + e;
    return res;	
}
function timeO() {
	time.innerHTML = '00 : 00 : 00 . 00';
	timeOut.innerHTML = 'Time Out';
	audio.play();
	return ;
}
function count(){
	tmp = t - (new Date()).getTime() + lstTime;
	if (tmp <= 0) {
		timeO();
		stop();
		return ;
	}
    time.innerHTML = res(tmp);
}
function pd(s) {
	var i;
	for (i = 0; i < s.length; ++i)
		if (s[i] > '9' || s[i] < '0') return false;
	return true;
}
function start(){
	lstTime = (new Date()).getTime();
	if (t > 0) flag = setInterval("count();", 10);
}

function stop(){
    t -= (new Date()).getTime() - lstTime;
    clearInterval(flag);
}

function startStop(){
	if (ss.value == 'Start') {
		if (!(pd(getId("hour").value) && pd(getId("minute").value) && pd(getId("second").value) && pd(getId("msecond").value))) return ;
		t = parseInt(getId("hour").value) * 3600000 + parseInt(getId("minute").value) * 60000 + parseInt(getId("second").value) * 1000 + parseInt(getId("msecond").value);
		if (t <= 0) return ;
		input.innerHTML = '';
		time.innerHTML = '';
		ss.value = 'Continue';
	}
    if (ss.value == "Continue") {
        ss.value = "Stop";
        start();
    } else {
        ss.value = "Continue";
        stop();
    }
}
function clearClick() {
	if (ss.value == 'Stop') stop();
	audio.load();
	ss.value = "Start";
	timeOut.innerHTML = '<br />';
	time.innerHTML = '';
	input.innerHTML = '<input id="hour" class="input" value="00" /> : <input id="minute" class="input" value="00" /> : <input id="second" class="input" value="00" /> . <input id="msecond" class="input" value="00" />';
}
