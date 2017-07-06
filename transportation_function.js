$(document).ready(function(){

var currentTimeHours = null,
	date = null;
var currentTimeMinutes = null;
var currentTime = null;
var commuteTime = 90;
var timeToGetReady = 20;
var totalTimeNeededBeforeDepartureHours = 0;
var	totalTimeNeededBeforeDepartureMinutes = 0;
// Gives you the ETA by adding the total commute time and the time to get ready with the current time
// ie. 50 mins to get ready plus current Time: 8:00 = 8:50
var estimatedArrivalTimeUser = "";
var estimatedArrivalTimeUserHour = 0;
var estimatedArrivalTimeUserMinutes = 0;
var estimatedArrivalTimeGoogle = ""; // 8:00 AM from google API
var timeYouWantToArrive = "8:00"; 

$('#timeYouWantToArrive').html(timeYouWantToArrive);

// BREAKING DOWN TIME INTO HOURS AND MINS
	var timeToGetReadyHours = Math.floor(timeToGetReady / 60);          
	var timeToGetReadyMinutes = timeToGetReady % 60;

	  $('#timeToGetReady').html(timeToGetReadyHours + " hours, " + timeToGetReadyMinutes + " minutes");

	var commuteTimeHours = Math.floor(commuteTime / 60);          
	var commuteTimeMinutes = commuteTime % 60;

	  $('#commuteTime').html(commuteTimeHours + " hours, " + commuteTimeMinutes + " minutes");

	var totalTimeNeededBeforeDepartureHours = Math.floor((commuteTime + timeToGetReady) / 60);
	var	totalTimeNeededBeforeDepartureMinutes = (commuteTime + timeToGetReady) % 60;

// SOMETIMES YOU GET 21:6 for six minutes
	$('#totalTimeNeededBeforeDeparture').html(totalTimeNeededBeforeDepartureHours + " hours, " + totalTimeNeededBeforeDepartureMinutes + " minutes");


// -----------------CONTINUOUS CLOCK UPDATE

function update() {
    date = moment(new Date())
	currentTime.html(date.format('HH:mm:ss'));
	currentTimeHours.html(date.format('HH'));
    currentTimeMinutes.html(date.format('mm'));
    // currentTimeDate.html(date.format("DD/MM/YYYY HH:mm"));

// converts current time and total time needed before departure into only minutes 1:10 = 70 mins
	var currentTimeConvertedMinutes = ((parseInt(currentTimeHours[0].innerHTML)) * 60) + (parseInt(currentTimeMinutes[0].innerHTML));
    var totalTimeNeededBeforeDepartureConvertedMinutes = (commuteTimeHours * 60) + commuteTimeMinutes + (timeToGetReadyHours * 60) + timeToGetReadyMinutes;

// finds hour
	var estimatedArrivalTimeUserHour = Math.floor((parseInt(currentTimeConvertedMinutes) + totalTimeNeededBeforeDepartureConvertedMinutes) / 60);
	console.log(estimatedArrivalTimeUserHour);

// finds minutes
	var estimatedArrivalTimeUserMinutes = (currentTimeConvertedMinutes + totalTimeNeededBeforeDepartureConvertedMinutes) % 60;
	console.log(estimatedArrivalTimeUserMinutes);

// combines minutes and hours
	var estimatedArrivalTimeUser = (estimatedArrivalTimeUserHour + ":" + estimatedArrivalTimeUserMinutes);
    $('#estimatedArrivalTimeUser').html(estimatedArrivalTimeUser);
};

// sets times equal to divs and updates every second
    currentTime = $('#currentTime')
    currentTimeHours = $('#currentTimeHours')
    currentTimeMinutes = $('#currentTimeMinutes')
    update();
    setInterval(update, 1000);

// ---------------

});

// window.setInterval(function(){ // Set interval for checking

    	

//     }
// }, 60000); // Repeat every 60000 milliseconds (1 minute)

// 2. This code loads the IFrame Player API code asynchronously.
      var tag = document.createElement('script');
      tag.src = "http://www.youtube.com/player_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // 3. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.
      var player;
      var date = new Date();
      if(date.getHours() === 12) {
      function onYouTubePlayerAPIReady() {
        player = new YT.Player('player', {
          playerVars: { 'autoplay': 1, 'controls': 1,'autohide':1,'wmode':'opaque' },
          videoId: 'flN21pCpfZk',
          events: {
            'onReady': onPlayerReady}
        });
      }

      // 4. The API will call this function when the video player is ready.
      function onPlayerReady(event) {
        event.target.mute();
      }
};

// // 2. This code loads the IFrame Player API code asynchronously.
//       var tag = document.createElement('script');
//       tag.src = "http://www.youtube.com/player_api";
//       var firstScriptTag = document.getElementsByTagName('script')[0];
//       firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

//       // 3. This function creates an <iframe> (and YouTube player)
//       //    after the API code downloads.
//       var player;
//       function onYouTubePlayerAPIReady() {
//         player = new YT.Player('player', {
//           playerVars: { 'autoplay': 1, 'controls': 1,'autohide':1,'wmode':'opaque' },
//           videoId: 'flN21pCpfZk',
//           events: {
//             'onReady': onPlayerReady}
//         });
//       }

//       // 4. The API will call this function when the video player is ready.
//       function onPlayerReady(event) {
//         event.target.mute();
//       }
// NEED A IF THEN STATEMENT
// IF TOTAL COMMUTE TIME IS LESS THAN 30 MINS THEN SOUND ALARM AT 7AM
// IF MORE THAN 30 MINS THEN SOUND ALARM AT 7AM MINUS EXTRA TIME NEEDED
// function alertPossibleLateness() {
//       if (parseInt(estimatedArrivalTimeUser) === parseInt("9:19")) {
//       	onYouTubePlayerAPIReady();
//       }
//       else {
//       	onPlayerReady();
//       };
// }
// alertPossibleLateness()



// SCRAPWORK------------------------******************************

// // --------difference inbetween current time and alarm time
//     var ms = moment(currentTimeDate[0].innerHTML,"DD/MM/YYYY HH:mm").diff(moment(alarm,"DD/MM/YYYY HH:mm"));
// 	var d = moment.duration(ms);
// 	var s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm");
// 	console.log("Hours until 8 am: " + s);

// ----------------

// var startTime = "";
// var endTime = "";

// // // Subtracting two times (estimatedArrivalTimeUser - totalTime)
// // // parse time using 24-hour clock and use UTC to prevent DST issues
// var start = moment.utc(startTime, "HH:mm");
// var end = moment.utc(endTime, "HH:mm");
// console.log(start);
// console.log(end);

// // account for crossing over to midnight the next day
// if (end.isBefore(start)) end.add(1, 'day');

// // calculate the duration
// var d = moment.duration(end.diff(start));

// // subtract the lunch break
// d.subtract(30, 'minutes');
// console.log(d);

// // format a string result
// var s = moment.utc(+d).format('H:mm');
