$(document).ready(function(){

// home address to work address
// total transporation time = time to get ready + commute time

var currentTimeSeconds = null,
	date = null;
var currentTimeMinutes = null;
var currentTimeDate = null;
var commuteTime = 30;
var timeToGetReady = 20;
var totalTimeNeededBeforeDeparture = commuteTime + timeToGetReady;


// Gives you the ETA by adding the total commute time and the time to get ready with the current time
// ie. 50 mins to get ready plus current Time: 8:00 = 8:50
var estimatedArrivalTimeUser = "";
var estimatedArrivalTimeGoogle = ""; // 8:00 AM
var timeYouWantToArrive = "8:00 AM"; // 8:00 AM

$('#commuteTime').html("Commute Time: " + commuteTime + " minutes");
$('#timeToGetReady').html("Time to Get Ready: " + timeToGetReady + " minutes");
$('#totalTimeNeededBeforeDeparture').html("Commute Time plus Time to Get Ready: " + totalTimeNeededBeforeDeparture + " minutes");
$('#timeYouWantToArrive').html("Time You Want to Arrive At: " + timeYouWantToArrive);



function alertPossibleLateness() {
	if ((timeYouWantToArrive) === estimatedArrivalTime) {
		alert("You must leave now")
	}
	else if ((timeYouWantToArrive) > estimatedArrivalTime) {
		alert("You are late")
	}
}



// -----------------CONTINUOUS CLOCK UPDATE

function update() {
    date = moment(new Date())
	currentTimeSeconds.html(date.format('h:mm:ss a'));
    currentTimeMinutes.html(date.format('h:mm a'));
    currentTimeDate.html(date.format('dddd, MMMM Do YYYY, h:mm:ss a'));

};

	currentTimeDate = $('#currentTimeDate')
    currentTimeSeconds = $('#currentTimeSeconds')
    currentTimeMinutes = $('#currentTimeMinutes')
    update();
    setInterval(update, 1000);
});
// ---------------

function eta() {
	var estimatedArrivalTime = currentTimeSeconds + totalTimeNeededBeforeDeparture;
	$('#estimatedArrivalTime').html("ETA: " + estimatedArrivalTime);
}

eta();


// // Subtracting two times (estimatedArrivalTime - totalTime)
// // parse time using 24-hour clock and use UTC to prevent DST issues
// var start = moment.utc(startTime, "HH:mm");
// var end = moment.utc(endTime, "HH:mm");

// // account for crossing over to midnight the next day
// if (end.isBefore(start)) end.add(1, 'day');

// // calculate the duration
// var d = moment.duration(end.diff(start));

// // subtract the lunch break
// d.subtract(30, 'minutes');

// // format a string result
// var s = moment.utc(+d).format('H:mm');
