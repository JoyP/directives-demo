(function(){
  'use strict';

  angular.module('jpLocateModule', [])
  .factory('LocationService', ['$q', function($q){

    function locate(){
      var deferred = $q.defer(),
          options  = {enableHighAccuracy: true, timeout: 10000, maximumAge:0};

      navigator.geolocation.getCurrentPosition(deferred.resolve, deferred.reject, options);

      return deferred.promise;
    }

    return {locate:locate};

  }])

  .directive('jpLocate', [function(){
    var o = {};

    o.restrict    = 'A';
    o.templateUrl = '/components/directives/jp-locate/jp-locate.html';
    o.scope       = {};
    o.link        = function(scope, element, attrs){
                    };

    o.controller  = ['$scope', 'LocationService', '$rootScope', function($scope, LocationService, $rootScope){
                      $scope.findMe = function(){
                        LocationService.locate().then(success, error);
                      };

                      function success(pos){
                        $rootScope.$broadcast('position', pos);
                        console.log(pos);
                      }

                      function error(err){
                        console.log(err);
                      }

                    }];

    return o;
  }]);
})();
