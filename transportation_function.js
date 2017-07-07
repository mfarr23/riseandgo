$(document).ready(function(){

// home address to work address
// total transporation time = time to get ready + commute time

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

var timeYouWantToArrive = "8:00"; // 8:00 AM
// var alarm  = "05/07/2017 08:00";


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
});
// ---------------


// NEED A IF THEN STATEMENT
// IF TOTAL COMMUTE TIME IS LESS THAN 30 MINS THEN SOUND ALARM AT 7AM
// IF MORE THAN 30 MINS THEN SOUND ALARM AT 7AM MINUS EXTRA TIME NEEDED
function alertPossibleLateness() {
	if ((estimatedArrivalTimeGoogle) === estimatedArrivalTimeUser) {
		alert("You must leave now")
	}
	else if ((estimatedArrivalTimeGoogle) > estimatedArrivalTimeUser) {
		alert("You are late! Leave NOW!!")
	}
};
 
// google.initMap.

// Goole Distance Matrix API--------------*************************************


function initMap() {
        var bounds = new google.maps.LatLngBounds;
        var markersArray = [];

        var origin1 = "Philadelphia";
        var origin2 = '';
        var destinationA = "New York";
        var destinationB = {lat: 50.087, lng: 14.421};

        var destinationIcon = 'https://chart.googleapis.com/chart?' +
            'chst=d_map_pin_letter&chld=D|FF0000|000000';
        var originIcon = 'https://chart.googleapis.com/chart?' +
            'chst=d_map_pin_letter&chld=O|FFFF00|000000';
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 55.53, lng: 9.4},
          zoom: 10
        });
        var geocoder = new google.maps.Geocoder;

        var service = new google.maps.DistanceMatrixService;
        service.getDistanceMatrix({
          origins: [origin1],
          destinations: [destinationA],
          travelMode: 'DRIVING',
          unitSystem: google.maps.UnitSystem.IMPERIAL,
          avoidHighways: false,

          avoidTolls: false
        }, 

        function(response, status) {
          console.log(response)
          if (status !== 'OK') {
            alert('Error was: ' + status);
          } else {
            var originList = response.originAddresses;
            var destinationList = response.destinationAddresses;
            var outputDiv = document.getElementById('output');
            outputDiv.innerHTML = '';
            deleteMarkers(markersArray);

            var showGeocodedAddressOnMap = function(asDestination) {
              var icon = asDestination ? destinationIcon : originIcon;
              return function(results, status) {
                if (status === 'OK') {
                  map.fitBounds(bounds.extend(results[0].geometry.location));
                  markersArray.push(new google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location,
                    icon: icon
                  }));
                } else {
                  alert('Geocode was not successful due to: ' + status);
                }
              };
            };

            for (var i = 0; i < originList.length; i++) {
              var results = response.rows[i].elements;
              
              geocoder.geocode({'address': originList[i]},
                  showGeocodedAddressOnMap(false));
              for (var j = 0; j < results.length; j++) {
                geocoder.geocode({'address': destinationList[j]},
                    showGeocodedAddressOnMap(true));
                outputDiv.innerHTML += originList[i] + ' to ' + destinationList[j] +
                    ': ' + results[j].distance.text + ' in ' +
                    results[j].duration.text + '<br>';

                 var element = results[j];

                 // distance variable
                 var distance = element.distance.text;
                 console.log(distance)

                 // Duration variable
                 var duration = element.duration.value;
                 console.log(duration / 60 + "mins")
        
              }
            }
          }


        });
      }

      function deleteMarkers(markersArray) {
        for (var i = 0; i < markersArray.length; i++) {
          markersArray[i].setMap(null);
        }
        markersArray = [];
      }

  

       console.log(initMap);
// console.log(theDuration)
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
