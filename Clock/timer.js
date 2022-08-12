function getId (str) {
	return document.getElementById(str);
}
var time = getId("time");
var input = getId("input");
var btn = getId("btn");
var audio = getId("audio");
var desTime = getId("desTime");
var nowTime = getId("nowTime");
var t;
var flag;
function res(n) {
    var b = Math.floor(n / 3600000);
    var c = Math.floor(n % 3600000 / 60000);
    var d = Math.floor(n % 60000 / 1000);
    var e = Math.floor(n % 1000 / 10);
	var res = (b < 10 ? '0' : '') + b + ' : ' + (c < 10 ? '0' : '') + c + ' : ' + (d < 10 ? '0' : '') + d + ' . ' + (e < 10 ? '0' : '') + e;
    return res;	
}
function string(h, m, s, ms) {
	return (h < 10 ? '0' : '') + h + ' : ' + (m < 10 ? '0' : '') + m + ' : ' + (s < 10 ? '0' : '') + s + ' . ' + (ms < 100 ? '0' : '') + Math.floor(ms / 10);
}
function timeO() {
	time.innerHTML = '00 : 00 : 00 . 00';
	nowTime.innerHTML = 'Time Out';
	audio.play();
	return ;
}
function count(){
	tmp = t - (new Date()).getTime() + primaryTime;
	if (tmp <= 0) {
		timeO();
		stop();
		return ;
	}
    time.innerHTML = res(tmp);
	now = new Date();
	nowTime.innerHTML = string(now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());
}
function start(){
	flag = setInterval("count();", 10);
}

function stop(){
    clearInterval(flag);
}
function pd(str) {
	var i;
	for (i = 0; i < str.length; ++i)
		if (str[i] > '9' || str[i] < '0') return false;
	return true;
}
function startClear(){
	if (btn.value == 'Start') {
		if (!(pd(getId("hour").value) && pd(getId("minute").value) && pd(getId("second").value) && pd(getId("msecond").value))) return ;
		now = new Date();
		t = parseInt(getId("hour").value - now.getHours()) * 3600000
		  + parseInt(getId("minute").value - now.getMinutes()) * 60000
		  + parseInt(getId("second").value - now.getSeconds()) * 1000 
		  + parseInt(getId("msecond").value * 10 - now.getMilliseconds());
		if (t < 0) t += 86400000;
		primaryTime = now.getTime();
		desTime.innerHTML = string(parseInt(getId("hour").value), parseInt(getId("minute").value), parseInt(getId("second").value), parseInt(getId("msecond").value));
		input.innerHTML = '';
		btn.value = 'Clear';
		start();
	} else {
		stop();
		audio.load();
		btn.value = "Start";
		time.innerHTML = '<br />';
		nowTime.innerHTML = '<br />';
		desTime.innerHTML = '';
		input.innerHTML = '<input id="hour" value="00" /> : <input id="minute" value="00" /> : <input id="second" value="00" /> . <input id="msecond" value="00" />';
	}
}