$(document).ready(function(){


    var location = 'Arlington, VA'

  	var query = escape('SELECT * FROM weather.forecast WHERE woeid IN (SELECT woeid FROM geo.places(1) WHERE text="' + location + '")'),
    url = "https://query.yahooapis.com/v1/public/yql?q=" + query + "&format=json&callback=?"; 

    $("#forecast_title").html('10 Day Forecast for ' + location);

	$.getJSON(url, function(response) {
    console.log(response);
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
          var condition = forecast[i].text;
          var card = ""

          if (i==0){
            card = '<div class="row" style="float: left; background-color: black">' +
            '<div class="col s1 m1">' +
              '<div class="card blue-grey darken-1">' +
                '<div class="card-content white-text">' +
                  '<span class="card-title">' + date + '</span>' +
                  '<p>H:' + high + '°</p><p>L:' + low + '°</p><p>' + condition + '</p>'
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
                  '<p>H:' + high + '°</p><p>L:' + low + '°</p><p>' + condition + '</p>' +
                '</div>' +
              '</div>' +
            '</div>' +
          '</div>'
          }

          $("#forecast").append(card);
        }
	});

});