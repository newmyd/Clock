var t = document.getElementById("t");
var ss = document.getElementById("startStop");
var cr = document.getElementById("clearRemember");
var ht = document.getElementById("ht");
var time = 0;
var lstTime = 0;
var intervals = 0;
var lstIntervals = 0;
var flag;
var tot = 0;
var lstRemember = 0;
var space = "                    ";
function res(n) {
    var b = Math.floor(n / 3600000);
    var c = Math.floor(n % 3600000 / 60000);
    var d = Math.floor(n % 60000 / 1000);
    var e = Math.floor(n % 1000 / 10);
	var res = (b < 10 ? '0' : '') + b + ' : ' + (c < 10 ? '0' : '') + c + ' : ' + (d < 10 ? '0' : '') + d + ' . ' + (e < 10 ? '0' : '') + e;
    return res;	
}
function run(){
    intervals = (new Date()).getTime() - time + lstIntervals;
    t.innerHTML = res(intervals);
}

function start(){
    flag = setInterval("run();",10);
}

function stop(){
    lstIntervals += (new Date()).getTime() - lstTime;
    clearInterval(flag);
}

function remember() {
	tmp = intervals;
	ht.innerHTML = '<tr><td class=\"left\">' + (++tot) + "</td><td class=\"mid\">" + res(tmp) + '</td><td class=\"right\">+' + res(tmp - tmp % 10 - lstRemember + lstRemember % 10) + '</td></tr>' + ht.innerHTML;
	lstRemember = tmp;
}

function startStop(){
    if (ss.value == "Start" || ss.value == "Continue") {
        lstTime = time = (new Date()).getTime();
        ss.value = "Stop";
		cr.value = "Remember";
        start();
    } else {
        ss.value = "Continue";
		cr.value = "Clear";
        stop();
    }
}

function clearRemember(){
	if (cr.value == "Clear") {
		t.innerHTML = "00 : 00 : 00 . 00";
		time = lstTime = lstIntervals = intervals = tot = lstRemember = 0;
		ss.value = "Start";
		ht.innerHTML = "";
	} else {
		remember();
	}
}
