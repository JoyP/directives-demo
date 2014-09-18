(function(){
  'use strict';

  angular.module('jpMoviesModule', [])
  .factory('MoviesApi', ['$http', function($http){
    function info(title){
      return $http.jsonp('http://api.rottentomatoes.com/api/public/v1.0/movies.json?q=' + title + '&page_limit=1&page=1&apikey=65d93wmdkwm3859unwkue8jj&callback=JSON_CALLBACK');
    }

    return {info:info};
  }])

  .directive('jpMovies', [function(){
    var o = {};

    o.restrict    = 'A';
    o.templateUrl = '/components/directives/jp-movies/jp-movies.html';
    o.scope       = {title:'@', remove:'&'};
    o.link        = function(scope, element, attrs){
                    };

    o.controller  = ['$scope', 'MoviesApi', function($scope, MoviesApi){
                      MoviesApi.info($scope.title).then(function(response){
                        $scope.movie = response.data.movies[0];
                        $scope.poster = $scope.movie.posters.thumbnail.replace(/_tmb/, '_pos');
                      });
                    }];

    return o;
  }]);
})();
