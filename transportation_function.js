$(document).ready(function(){

var currentTimeHours = null,
  date = null;
var currentTimeMinutes = null;
var currentTime = null;
var timeToGetReady = 0;
// Gives you the ETA by adding the total commute time and the time to get ready with the current time
// ie. 50 mins to get ready plus current Time: 8:00 = 8:50
var transportationTimeGoogle = 0; // 8:00 AM from google API
var totalTimeNeededBeforeDepartureTotalMinutes = 0;
var timeYouWantToArrive = "8:00"; // 8:00 AM
var timeYouWantToArriveHours = 8;
var timeYouWantToArriveMinutes = 0;
var timeYouWantToArriveTotalMinutes = 0;
var alarmTotalMinutes = 0;
var alarmHours = 0;
var alarmMinutes = 0;
var alarm  = "";



// Turning everything into total minutes
var timeYouWantToArriveHoursInMinutes = 1 * 60;
var timeYouWantToArriveTotalMinutes = timeYouWantToArriveHoursInMinutes + timeYouWantToArriveMinutes;
var transportationTimeGoogle = 7;
var timeToGetReadyMinutes = 13;

// add latter two variables
var totalTimeNeededBeforeDepartureTotalMinutes = transportationTimeGoogle + timeToGetReadyMinutes;

// now subtract from google ETA
var alarmTotalMinutes = timeYouWantToArriveTotalMinutes - totalTimeNeededBeforeDepartureTotalMinutes;

// convert alarm into hours and minutes
var alarmHours = Math.floor(alarmTotalMinutes / 60); 
var alarmMinutes = alarmTotalMinutes % 60;
console.log(alarmHours);
console.log(alarmMinutes);
console.log(alarmTotalMinutes);

function refreshAt(hours, minutes, seconds) {
    var now = new Date();
    var then = new Date();

    if(now.getHours() > hours ||
       (now.getHours() == hours && now.getMinutes() > minutes) ||
        now.getHours() == hours && now.getMinutes() == minutes && now.getSeconds() >= seconds) {
        then.setDate(now.getDate() + 1);
    }
    then.setHours(hours);
    then.setMinutes(minutes);
    then.setSeconds(seconds);

    var timeout = (then.getTime() - now.getTime());
    setTimeout(function() { window.location.reload(true); }, timeout);
};

refreshAt(alarmHours,alarmMinutes,0);

// -----------------CONTINUOUS CLOCK UPDATE

function update() {
    date = moment(new Date())
    currentTimeDate.html(date.format("DD/MM/YYYY HH:mm:ss"));

// // converts current time and total time needed before departure into only minutes 1:10 = 70 mins
//  var currentTimeConvertedMinutes = ((parseInt(currentTimeHours[0].innerHTML)) * 60) + (parseInt(currentTimeMinutes[0].innerHTML));
//     var totalTimeNeededBeforeDepartureConvertedMinutes = (commuteTimeHours * 60) + commuteTimeMinutes + (timeToGetReadyHours * 60) + timeToGetReadyMinutes;

// // finds hour
//  var estimatedArrivalTimeUserHour = Math.floor((parseInt(currentTimeConvertedMinutes) + totalTimeNeededBeforeDepartureConvertedMinutes) / 60);
//  console.log(estimatedArrivalTimeUserHour);

// // finds minutes
//  var estimatedArrivalTimeUserMinutes = (currentTimeConvertedMinutes + totalTimeNeededBeforeDepartureConvertedMinutes) % 60;
//  console.log(estimatedArrivalTimeUserMinutes);
// }
}
// sets times equal to divs and updates every second
    currentTimeDate = $('#runningClock');
    update();
    setInterval(update, 1000);

});

// END DOCUMENT.READY
var timeToGetReady = 0;
// Gives you the ETA by adding the total commute time and the time to get ready with the current time
// ie. 50 mins to get ready plus current Time: 8:00 = 8:50
var transportationTimeGoogle = 0; // 8:00 AM from google API
var totalTimeNeededBeforeDepartureTotalMinutes = 0;
var timeYouWantToArrive = "8:00"; // 8:00 AM
var timeYouWantToArriveHours = 8;
var timeYouWantToArriveMinutes = 0;
var timeYouWantToArriveTotalMinutes = 0;
var alarmTotalMinutes = 0;
var alarmHours = 0;
var alarmMinutes = 0;
var alarm  = "";

// Turning everything into total minutes
var timeYouWantToArriveHoursInMinutes = 1 * 60;
var timeYouWantToArriveTotalMinutes = timeYouWantToArriveHoursInMinutes + timeYouWantToArriveMinutes;
var transportationTimeGoogle = 7;
var timeToGetReadyMinutes = 13;

// add latter two variables
var totalTimeNeededBeforeDepartureTotalMinutes = transportationTimeGoogle + timeToGetReadyMinutes;

// now subtract from google ETA
var alarmTotalMinutes = timeYouWantToArriveTotalMinutes - totalTimeNeededBeforeDepartureTotalMinutes;

// convert alarm into hours and minutes
var alarmHours = Math.floor(alarmTotalMinutes / 60); 
var alarmMinutes = alarmTotalMinutes % 60;
console.log(alarmHours);
console.log(alarmMinutes);
console.log(alarmTotalMinutes);
// FOR SOME REASON THE YOUTUBE ONLY LOADS WHEN OUTSIDE OF DOCUMENT.READY below:
// $( "body" ).load(function() {
  // Run code

// This code loads the IFrame Player API code asynchronously.
  var tag = document.createElement('script');
  tag.src = "http://www.youtube.com/player_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player) after the API code downloads.
  var player;
  var date = new Date();

// input wake up time here ie. 8:30 am (date.getHours() === 8 && date.getMinutes() === 30)
// if its the time you want to wake up, play youtube video, otherwise load it without autoplay
// NEED TO SET AN INTERVAL TO RELOAD THIS FUNCTION EVERY MINUTE
  function onYouTubePlayerAPIReady() {
        if(date.getHours() === alarmHours && date.getMinutes() === alarmMinutes) {
          player = new YT.Player('player', {
            playerVars: { 'autoplay': 1, 'controls': 1,'autohide':1,'wmode':'opaque' },
            videoId: 'uzt6vlpdZWM',
            events: {
              'onReady': onPlayerReady}
          })
      }
      else {
          player = new YT.Player('player', {
        playerVars: { 'autoplay': 0, 'controls': 1,'autohide':1,'wmode':'opaque' },
            videoId: 'uzt6vlpdZWM',
            events: {
              'onReady': onPlayerReady}
        });
      }
    }
// The API will call this function when the video player is ready.
  function onPlayerReady(event) {
    event.target.unmute();
    }



// --------Scrap

// window.setInterval(function(){ // Set interval for checking

//     }
// }, 60000); // Repeat every 60000 milliseconds (1 minute)

// var ytPlayVideo = setInterval(onYouTubePlayerAPIReady, 1000);
// console.log(ytPlayVideo);

// Scrap-------------

// NEED A IF THEN STATEMENT
// IF TOTAL COMMUTE TIME IS LESS THAN 30 MINS THEN SOUND ALARM AT 7AM
// IF MORE THAN 30 MINS THEN SOUND ALARM AT 7AM MINUS EXTRA TIME NEEDED
// function alertPossibleLateness() {
//  if ((estimatedArrivalTimeGoogle) === estimatedArrivalTimeUser) {
//    alert("You must leave now")
//  }
//  else if ((estimatedArrivalTimeGoogle) > estimatedArrivalTimeUser) {
//    alert("You are late! Leave NOW!!")
//  }
// };

// function alertPossibleLateness() {
//  if ((estimatedArrivalTimeGoogle) === estimatedArrivalTimeUser) {
//    alert("You must leave now")
//  }
//  else if ((estimatedArrivalTimeGoogle) > estimatedArrivalTimeUser) {
//    alert("You are late! Leave NOW!!")
//  }
// };
 
// // google.initMap.

// // Goole Distance Matrix API--------------*************************************


// function initMap() {
//         var bounds = new google.maps.LatLngBounds;
//         var markersArray = [];

//         var origin1 = "Philadelphia";
//         var origin2 = "";
//         var destinationA = "New York";
//         var destinationB = {lat: 50.087, lng: 14.421};

//         var destinationIcon = 'https://chart.googleapis.com/chart?' +
//             'chst=d_map_pin_letter&chld=D|FF0000|000000';
//         var originIcon = 'https://chart.googleapis.com/chart?' +
//             'chst=d_map_pin_letter&chld=O|FFFF00|000000';
//         var map = new google.maps.Map(document.getElementById('map'), {
//           center: {lat: 55.53, lng: 9.4},
//           zoom: 10
//         });
//         var geocoder = new google.maps.Geocoder;

//         var service = new google.maps.DistanceMatrixService;
//         service.getDistanceMatrix({
//           origins: [origin1],
//           destinations: [destinationA],
//           travelMode: 'DRIVING',
//           unitSystem: google.maps.UnitSystem.IMPERIAL,
//           avoidHighways: false,

//           avoidTolls: false
//         }, 

//         function(response, status) {
//           console.log(initMap.response)
//           if (status !== 'OK') {
//             alert('Error was: ' + status);
//           } else {
//             var originList = response.originAddresses;
//             var destinationList = response.destinationAddresses;
//             var outputDiv = document.getElementById('output');
//             outputDiv.innerHTML = '';
//             deleteMarkers(markersArray);

//             var showGeocodedAddressOnMap = function(asDestination) {
//               var icon = asDestination ? destinationIcon : originIcon;
//               return function(results, status) {
//                 if (status === 'OK') {
//                   map.fitBounds(bounds.extend(results[0].geometry.location));
//                   markersArray.push(new google.maps.Marker({
//                     map: map,
//                     position: results[0].geometry.location,
//                     icon: icon
//                   }));
//                 } else {
//                   alert('Geocode was not successful due to: ' + status);
//                 }
//               };
//             };

//             for (var i = 0; i < originList.length; i++) {
//               var results = response.rows[i].elements;
              
//               geocoder.geocode({'address': originList[i]},
//                   showGeocodedAddressOnMap(false));
//               for (var j = 0; j < results.length; j++) {
//                 geocoder.geocode({'address': destinationList[j]},
//                     showGeocodedAddressOnMap(true));
//                 outputDiv.innerHTML += originList[i] + ' to ' + destinationList[j] +
//                     ': ' + results[j].distance.text + ' in ' +
//                     results[j].duration.text + '<br>';

//                  var element = results[j];

//                  // distance variable
//                  var distance = element.distance.text;
//                  console.log(distance)

//                  // Duration variable
//                  var theDuration = element.duration.value;
//                  console.log(duration / 60 + "mins");

//                  var duration = element.duration.value;
//                  console.log(duration / 60 + " mins");
        
//               }
//             }
//           }


//         });
//       }

//       function deleteMarkers(markersArray) {
//         for (var i = 0; i < markersArray.length; i++) {
//           markersArray[i].setMap(null);
//         }
//         markersArray = [];
//       };



// console.log(theDuration)

// function alertPossibleLateness() {
//       if (parseInt(estimatedArrivalTimeUser) === parseInt("9:19")) {
//        onYouTubePlayerAPIReady();
//       }
//       else {
//        onPlayerReady();
//       };
// }
// alertPossibleLateness()

// SCRAPWORK------------------------******************************

// // --------difference inbetween current time and alarm time
//     var ms = moment(currentTimeDate[0].innerHTML,"DD/MM/YYYY HH:mm").diff(moment(alarm,"DD/MM/YYYY HH:mm"));
//  var d = moment.duration(ms);
//  var s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm");
//  console.log("Hours until 8 am: " + s);

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