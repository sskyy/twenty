(function(){
  var modules = []
  var _moduleFunction = angular.module
  angular.module = function(name ,dependency){
    modules.push(name)
    return _moduleFunction.call(angular, name, dependency)
  }

  $(function(){
    angular.bootstrap(document,modules)
  })
})()

