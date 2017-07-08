$(document).ready(function(){

 var weatherIconMapping = {
    "0" :"wi-tornado",
    "1" :"wi-storm-warning",
    "2" :"wi-hurricane",
    "3" :"wi-day-thunderstorm",
    "4" :"wi-thunderstorm",
    "6" :"wi-rain-mix",
    "7" :"wi-rain-mix",
    "9" :"wi-raindrops",
    "11":"wi-rain",
    "12":"wi-rain",
    "14":"wi-raindrops",
    "16":"wi-snow",
    "17":"wi-hail",
    "18":"wi-sleet",
    "24":"wi-windy",
    "26":"wi-cloudy",
    "27":"wi-cloudy",
    "28":"wi-day-cloudy-high",
    "29":"wi-night-alt-partly-cloudy",
    "30":"wi-day-cloudy-high",
    "31":"wi-night-clear",
    "32":"wi-day-sunny",
    "34":"wi-cloud",
    "37":"wi-thunderstorm",
    "38":"wi-day-storm-showers",
    "39":"wi-day-storm-showers",
    "40":"wi-day-showers",
    "44":"wi-day-cloudy",
    "45":"wi-day-storm-showers",
    "47":"wi-thunderstorm"
}

 var location = 'Arlington, VA'
 
 var ref = firebase.database().ref('users');

 ref.orderByChild("email").equalTo(localStorage.getItem("email")).on("child_added", function(data) {
   location = (parseAddress(data.val().HomeAddress));
   getWeatherData();
 });

 // var address = "San Francisco, CA 94129";
 console.log(location);

 function parseAddress(address) {

    address = address.trim();

    // Find the comma.
    var comma = address.lastIndexOf(',');

    var state = address.slice(comma+1,comma+4).trim();

    // Pull out the city.
    var remaining = address.slice(0, comma);

    var space = remaining.indexOf(',');
    
    var city = remaining.slice(space+1,remaining.length).trim();

    return city + ', ' + state;
 }

  function getWeatherData(){

  	var query = escape('SELECT * FROM weather.forecast WHERE woeid IN (SELECT woeid FROM geo.places(1) WHERE text="' + location + '")'),
    url = "https://query.yahooapis.com/v1/public/yql?q=" + query + "&format=json&callback=?"; 

    $("#forecast_title").html('10 Day Forecast for ' + location);

	$.getJSON(url, function(response) {
  		//  $(".city").html("<h1>" + response.query.results.channel.location.city + " Weather Details</h1>");
    //     $(".wind").html("Wind Speed: " + response.query.results.channel.wind.speed);
    //     $(".humidity").html("Humidity: " + response.query.results.channel.atmosphere.humidity);
    //     $(".temp").html("Temperature (F) " + response.query.results.channel.item.condition.temp);

        var forecast = response.query.results.channel.item.forecast;
        
        $("#forecast").empty();

        for(var i = 0; i<forecast.length; i++){

          var date = moment(new Date(forecast[i].date)).format('M/DD');
          var high = forecast[i].high
          var low = forecast[i].low
          var code = forecast[i].code;
          var card = ""

          console.log(weatherIconMapping[code]);
          console.log(code);

          if (i==0){
            card = '<div class="row" style="float: left; background-color: black;">' +
            '<div class="col s1 m1">' +
              '<div class="card blue-grey darken-1">' +
                '<div class="card-content white-text">' +
                  '<span class="card-title">' + date + '</span>' +
                  '<p>H:' + high + '°</p><p>L:' + low + '°</p>' + 
                  '<i class="wi ' + weatherIconMapping[code] + '"></i>' +
                '</div>' +
              '</div>' +
            '</div>' +
          '</div>'
          }else{
            card = '<div class="row" style="float: left">' +
            '<div class="col s1 m1">' +
              '<div class="card blue-grey darken-1">' +
                '<div class="card-content white-text">' +
                  '<span class="card-title">' + date + '</span>' +
                  '<p>H:' + high + '°</p><p>L:' + low + '°</p>' + 
                  '<i class="wi ' + weatherIconMapping[code] + '"></i>' +
                '</div>' +
              '</div>' +
            '</div>' +
          '</div>'
          }

          $("#forecast").append(card);
        }
	});
 }
});