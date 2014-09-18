(function(){
  'use strict';

  angular.module('directives-demo')
  .factory('Home', ['$http', function($http){

    function addMovie(movie){
    }

    function delMovie(movie){
    }

    return {addMovie:addMovie, delMovie:delMovie};
  }]);
})();

