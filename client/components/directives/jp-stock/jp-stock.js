(function(){
  'use strict';

  angular.module('jpStockModule', [])
  .factory('StockApi', ['$http', function($http){
    function quote(symbol){
      // need to use jsonp because we're calling an outside site, otherwise considered unsafe
      return $http.jsonp('http://dev.markitondemand.com/Api/v2/Quote/jsonp?symbol=' + symbol + '&callback=JSON_CALLBACK');
    }

    return {quote:quote};
  }])

  .directive('jpStock', ['$interval', function($interval){
    var o = {};

    o.restrict    = 'A';
    o.templateUrl = '/components/directives/jp-stock/jp-stock.html';
    o.scope       = {symbol:'@'};
    o.link        = function(scope, element, attrs){
                      element.on('$destroy', function(){
                        $interval.cancel(scope.id);
                      });
                    };

    o.controller  = ['$scope', '$interval', 'StockApi', function($scope, $interval, StockApi){
                      function getQuote(){
                        StockApi.quote($scope.symbol).then(function(response){
                          $scope.quote = response.data.LastPrice;
                        });
                      }

                      $interval(getQuote, 300000);

                      getQuote();
                    }];

    return o;
  }]);
})();
