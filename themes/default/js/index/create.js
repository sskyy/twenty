/**
 * Created by jiamiu on 14-8-9.
 * You must use `angular.module('node.curd').value('config',{})` to specify which type of node you want to operate.
 */
angular.module('index.create',['textAngular'])
  .controller('index.create',function($scope,$http,$attrs){

    var type = $attrs['indexType']
    if( !type ){
      return console.log("You must use `angular.module('node.curd').value('config',{})` to specify which type of node you want to operate.")
    }

    $scope.name = ''

    $scope.submit = function(){
      $http.post('/'+type,{
        name : $scope.name
      }).success(function( node ){
        //
      }).error(function(err){
        console.log( err)
      })
    }
  })