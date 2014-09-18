(function(){
  'use strict';

  angular.module('jpClockModule', [])
  // HTML normalization: uses dash in HTML, but camel-case in .js
  .directive('jpClock', ['$interval', function($interval){
    var o = {};

    // use as an attribute only
    o.restrict = 'A';
    // tell app where the html file is (in public directory)
    o.templateUrl = '/components/directives/jp-clock/jp-clock.html';
    // need scope to wire up to variables, set to false, true or {}
    // false uses same scope as client controller
    // true creates own child scope and inherits from the parent controller
    // {} create an isolate scope, isolated from the system
    //
    // want scope to be self-contained (usually)- inject variables that you need
    o.scope   = {frequency:'@'};
    o.link    = function(scope, element, attrs){
                  function updateTime(){
                    scope.date = new Date();
                  }
                  // brings in frequency as a string, * 1 to convert
                  var id = $interval(updateTime, scope.frequency *1);

                  element.on('$destroy', function(){
                    $interval.cancel(id);
                  });

                  updateTime();
                };

    return o;
  }]);
})();
