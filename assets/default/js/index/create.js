/**
 * Created by jiamiu on 14-8-9.
 * You must use `angular.module('node.curd').value('config',{})` to specify which type of node you want to operate.
 */
angular.module('index.create',['textAngular'])
  .controller('create',function($scope,$http,indexConfig){

    if( !indexConfig || !indexConfig.type ){
      return console.log("You must use `angular.module('node.curd').value('config',{})` to specify which type of node you want to operate.")
    }

    $scope.name = ''

    $scope.submit = function(){
      $http.post('/'+indexConfig.type,{
        name : $scope.content
      }).success(function( node ){
        //
      }).error(function(err){
        console.log( err)
      })
    }
  })