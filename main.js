'use strict';

var apiUrl = 'http://api.wunderground.com/api/caef4b28f0ff2f7e/'

$(document).ready(init);

function init() {
  $('#getWeather').click(getWeather);

  function currentConditions() {
    // FIND USER'S ZIP CODE
    $.get('http://api.wunderground.com/api/caef4b28f0ff2f7e/geolookup/q/autoip.json')
    .done(function(data){
      var userZip = data.location.zip
      console.log("done data", userZip);
      // GET USER'S CURRENT CONDITIONS
      $.get(apiUrl + 'conditions/q/' + userZip + '.json')
      .done(function(data){
        console.log("user zip conditions", data.current_observation)
        var current = data.current_observation;
        var icon = current.icon_url;
        var $userLocation = $('<p>').text(current.display_location.full);
        var $userCurrentIcon = $('<img>').attr('src', icon);
        var $weather = $('<p>').text(current.weather);
        var $temp_f = $('<p>').text(current.temp_f + ' degrees fahrenheit');
        var $feelslike_f = $('<p>').text(current.feelslike_f + ' degrees fahrenheit');
        var $observation_time = $('<p>').text(current.observation_time);

        $('#userCurrent').empty().append($userCurrentIcon, $userLocation, $weather, $temp_f, $feelslike_f, $observation_time);
      })
      .fail(function(error){
        console.error(error);
      })
      .always(function(data){
        console.log(data);
      })

    })
    .fail(function(error){
      console.error(error);
    })
    .always(function(data){
      console.log("current conditions data resolved", data);
    });
  };
  currentConditions();
}

function getWeather() {
  // GET CURRENT CONDITIONS FOR ZIP INPUT
  var $zip = $('#zipInput').val()
  console.log("zip code", $zip)
  var zipUrl = apiUrl + 'conditions/q/' + $zip + '.json';
  console.log("zip url", zipUrl);
  $.get(zipUrl)
  .done(function(data){
    console.log("data", data);
    // GET CURRENT CONDITIONS FOR SEARCHED ZIP CODE
    var zipCurrent = data.current_observation;
    var $zipLocation = $('<p>').text(zipCurrent.display_location.full);
    var $zipIcon = $('<img>').attr('src', zipCurrent.icon_url);
    var $zipWeather = $('<p>').text(zipCurrent.weather);
    var $zipTemp_f = $('<p>').text(zipCurrent.temp_f);
    var $zipFeelslike_f = $('<p>').text(zipCurrent.feelslike_f);
    var $zipObservation_time = $('<p>').text(zipCurrent.observation_time);
    $('#userCurrent').empty().append($zipIcon, $zipLocation, $zipWeather, $zipTemp_f, $zipFeelslike_f, $zipObservation_time);
    // GET FORECAST FOR SEARCHED ZIP CODE
    $.get(apiUrl + '/forecast/q/' + $zip + '.json')
    .done(function(data){
      console.log("user zip forecast data", data);
      var forecastData = data.forecast;
      console.log("forecast data", forecastData);
      var $weekdayOneTitle = $('<p>').text(forecastData.txt_forecast.forecastday[2].title);
      var $weekdayOneIcon = $('<img>').attr('src', forecastData.txt_forecast.forecastday[2].icon_url);
      var $weekdayOneHigh = $('<p>').text('High: ' + forecastData.simpleforecast.forecastday[0].high.fahrenheit + ' degrees fahrenheit');
      var $weekdayOneLow = $('<p>').text('Low: ' + forecastData.simpleforecast.forecastday[0].low.fahrenheit + ' degrees fahrenheit');
      var $weekdayOneSummary = $('<p>').text(forecastData.txt_forecast.forecastday[2].fcttext);
      // var $weekdayOneDiv = $('<div>').attr('id', 'weekdayOneDiv');
      $('#weekdayOneDiv').show().append($weekdayOneTitle, $weekdayOneIcon, $weekdayOneHigh, $weekdayOneLow, $weekdayOneSummary);
      
      var $weekdayTwoTitle = $('<p>').text(forecastData.txt_forecast.forecastday[4].title);
      var $weekdayTwoIcon = $('<img>').attr('src', forecastData.txt_forecast.forecastday[4].icon_url);
      var $weekdayTwoHigh = $('<p>').text('High: ' + forecastData.simpleforecast.forecastday[1].high.fahrenheit + ' degrees fahrenheit');
      var $weekdayTwoLow = $('<p>').text('Low: ' + forecastData.simpleforecast.forecastday[1].low.fahrenheit + ' degrees fahrenheit');
      var $weekdayTwoSummary = $('<p>').text(forecastData.txt_forecast.forecastday[4].fcttext);
      // var $weekdayTwoDiv = $('<div>').attr('id', 'weekdayTwoDiv');
      $('#weekdayTwoDiv').show().append($weekdayTwoTitle, $weekdayTwoIcon, $weekdayTwoHigh, $weekdayTwoLow, $weekdayTwoSummary);
      
      var $weekdayThreeTitle = $('<p>').text(forecastData.txt_forecast.forecastday[6].title);
      var $weekdayThreeIcon = $('<img>').attr('src', forecastData.txt_forecast.forecastday[6].icon_url);
      var $weekdayThreeHigh = $('<p>').text('High: ' + forecastData.simpleforecast.forecastday[2].high.fahrenheit + ' degrees fahrenheit');
      var $weekdayThreeLow = $('<p>').text('Low: ' + forecastData.simpleforecast.forecastday[2].low.fahrenheit + ' degrees fahrenheit');
      var $weekdayThreeSummary = $('<p>').text(forecastData.txt_forecast.forecastday[6].fcttext);
      // var $weekdayThreeDiv = $('<div>').attr('id', 'weekdayThreeDiv');
      $('weekdayThreeDiv').show().append($weekdayThreeTitle, $weekdayThreeIcon, $weekdayThreeHigh, $weekdayThreeLow, $weekdayThreeSummary);

      // var $weekdayForecastDiv = $('<div>').attr('id', 'weekdayForecastDiv');
      // $('#weekdayForecastDiv').append($weekdayOneDiv, $weekdayTwoDiv, $weekdayThreeDiv);
    })
    .fail(function(error){
      console.error(error);
    })
  })
  .fail(function(error){
    console.error(error);
  })
  .always(function(data){
    console.log("Promise resolved.", data);
  });


}