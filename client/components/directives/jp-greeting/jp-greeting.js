(function(){
  'use strict';

  angular.module('jpGreetingModule', [])
  // HTML normalization: uses dash in HTML, but camel-case in .js
  .directive('jpGreeting', [function(){
    var o = {};

    // use as an attribute only
    o.restrict = 'A';
    // tell app where the html file is (in public directory)
    o.templateUrl = '/components/directives/jp-greeting/jp-greeting.html';
    // need scope to wire up to variables, set to false, true or {}
    // false uses same scope as client controller
    // true creates own child scope and inherits from the parent controller
    // {} create an isolate scope, isolated from the system
    //
    // want scope to be self-contained (usually)- inject variables that you need
    o.scope = {name:'@', age:'@'};

    return o;
  }]);
})();
