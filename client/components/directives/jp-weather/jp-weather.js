(function(){
  'use strict';

  angular.module('jpWeatherModule', [])
  .factory('WeatherApi', ['$http', function($http){
    function weather(query){

      return $http.jsonp('http://api.wunderground.com/api/9c76c901528c0afe/conditions/q/' + query + '.json?callback=JSON_CALLBACK');
    }

    return {weather:weather};
  }])

  .directive('jpWeather', [function(){
    var o = {};

    o.restrict    = 'A';
    o.templateUrl = '/components/directives/jp-weather/jp-weather.html';
    o.scope       = {zip:'@'};
    o.link        = function(scope, element, attrs){
                    };

    o.controller  = ['$scope', 'WeatherApi', function($scope, WeatherApi){

                      $scope.$on('position', function(event, pos){
                        if($scope.zip){return;}

                        console.log('I am the weather', pos);
                        var query = pos.coords.latitude + ',' + pos.coords.longitude;
                        console.log('QUERY string:', query);
                        getWeather(query);

                      });

                      function getWeather(query){
                        WeatherApi.weather(query).then(function(response){
                          $scope.loc          = response.data.current_observation.display_location.full;
                          $scope.temperature  = response.data.current_observation.temperature_string;
                          $scope.conditions   = response.data.current_observation.weather;
                          $scope.icon         = response.data.current_observation.icon_url;
                        });
                      }

                      if($scope.zip){getWeather($scope.zip);}
                    }];

    return o;
  }]);
})();
