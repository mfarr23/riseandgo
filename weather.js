$(document).ready(function(){


    var location = 'Arlington, VA'

  	// var query = escape('SELECT * FROM weather.forecast WHERE woeid IN (SELECT woeid FROM geo.places(1) WHERE text="' + location + '")'),
    var query = escape('SELECT * FROM weather'),
    url = "https://query.yahooapis.com/v1/public/yql?q=" + query + "&format=json&callback=?"; 

	$.getJSON(url, function(response) {
    console.log(response);
  		//  $(".city").html("<h1>" + response.query.results.channel.location.city + " Weather Details</h1>");
    //     $(".wind").html("Wind Speed: " + response.query.results.channel.wind.speed);
    //     $(".humidity").html("Humidity: " + response.query.results.channel.atmosphere.humidity);
    //     $(".temp").html("Temperature (F) " + response.query.results.channel.item.condition.temp);

        var forecast = response.query.results.channel.item.forecast;
        // $("#forecast").empty();

        // for(var i = 0; i<forecast.length; i++){
        //   $("#forecast").append("<p>" + forecast[i].day + " High: " + forecast[i].high + " Low: " + forecast[i].low + " conditions: " + forecast[i].text + "</p>");
        // }
	});

});