(function(){
  'use strict';

  angular.module('directives-demo')
  .controller('HomeCtrl', ['$scope', '$interval', 'Home', function($scope, $interval, Home){
    $scope.people = [{name:'Bob', age:25},{name:'Joy', age:34}];
    $scope.symbols = ['AAPL', 'GOOG', 'MSFT', 'AMZN'];
    $scope.movies = ['Avengers', 'Lord of the Rings', 'Contact'];

    $scope.delMovie = function(index){
      $scope.titles.splice(index, 1);
    };

    $scope.addMovie = function(){
      $scope.titles.push($scope.title);
      $scope.title = null;
    };

  }]);
})();

