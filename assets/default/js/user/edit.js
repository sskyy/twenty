angular.module('user.edit',['user.session']).controller('user.edit',function($scope,$http,session){

  $scope.user = session.item('user')
  $scope.systemFields = ['id','name','email','createdAt','updatedAt','lastLogin']

  $scope.isSystemField = function( name ){
    return _.indexOf($scope.systemFields, name) !== -1
  }

  $scope.update = function(){
    if( !$scope.user || !$scope.user.id ){
      return alert('user not logged in')
    }

    $scope.saved = false
    $http.put('/user/'+$scope.user.id,$scope.user).success(function(savedUser){
      $scope.user = savedUser
      $scope.saved = true
    })
  }

})