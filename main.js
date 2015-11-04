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
        console.log("icon", icon);
        var $userCurrentIcon = $('<img>').attr('src', icon);
        var $weather = $('<p>').text(current.weather);
        var $temp_f = $('<p>').text(current.temp_f);
        var $feelslike_f = $('<p>').text(current.feelslike_f);
        var $observation_time = $('<p>').text(current.observation_time);
        $('#userCurrent').append($userCurrentIcon, $weather, $temp_f, $feelslike_f, $observation_time);
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

  var $zip = $('#zipInput').val()
  console.log("zip code", $zip)

  var zipUrl = apiUrl + 'forecast/q/' + $zip + '.json'
  console.log("zip url", zipUrl);
  
  $.get(zipUrl)
  .done(function(data){
    console.log("data", data.forecast);
  })
  .fail(function(error){
    console.error(error);
  })
  .always(function(data){
    console.log("Promise resolved.", data);
  });


}