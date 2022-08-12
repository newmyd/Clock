var time = document.getElementById("time");
var date = document.getElementById("date");
var week = document.getElementById("week");
var w = ["Sunday", "Monday","Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
function run(){
    d = new Date();
    time.innerHTML = (d.getHours() < 10 ? '0' : '') + d.getHours() + ' : ' + (d.getMinutes() < 10 ? '0' : '') + d.getMinutes() + ' : ' + (d.getSeconds() < 10 ? '0' : '') + d.getSeconds() + ' . ' + (d.getMilliseconds() < 100 ? '0' : '') + Math.floor(d.getMilliseconds() / 10);
	date.innerHTML = d.getFullYear() + ' / ' + (d.getMonth() + 1) + ' / ' + d.getDate();
	week.innerHTML = w[d.getDay()];
}

function main(){
    setInterval("run();",10);
}

main();