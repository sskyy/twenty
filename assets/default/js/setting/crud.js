angular.module('setting.crud',[]).controller("setting.crud",function($scope, $http){
  var originConfig
  $http.get('/config/list').success(function(config){
    originConfig = config
    $scope.config = config
  })

  $scope.reset = function(){
    $scope.config = originConfig
  }

  $scope.save = function(){
    $scope.saved = false
    $http.put('/config/save',{config:$scope.config}).success(function(){
      console.log( $scope.config)
      $scope.saved =true
      console.log( "saved")
    }).error(function(err){
      console.log( err )
    })
  }

})