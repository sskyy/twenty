angular.module('user.edit',['user.session']).controller('user.edit',function($scope,$http,session){

  $scope.user = session.item('user')
  $scope.systemFields = ['id','name','email','createdAt','updatedAt']

  $scope.isSystemField = function( name ){
    console.log( _.indexOf($scope.systemFields, name), String(name))
    return _.indexOf($scope.systemFields, name) !== -1
  }

  $scope.update = function(){
    if( !$scope.user || !$scope.user.id ){
      return alert('user not logged in')
    }

    $scope.saved = false
    console.log(_.filter($scope.user,function(v){ return v!==null}))
    $http.put('/user/'+$scope.user.id, $scope.user).success(function(savedUser){
      $scope.user = savedUser
      $scope.saved = true
    })
  }

})