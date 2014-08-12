/**
 * Created by jiamiu on 14-8-9.
 * You must use `angular.module('node.curd').value('config',{})` to specify which type of node you want to operate.
 */
angular.module('node.create',[])
  .controller('create',function($scope,$http,config){
    if( !config || !config.type ){
      return console.log("You must use `angular.module('node.curd').value('config',{})` to specify which type of node you want to operate.")
    }

    $scope.title = ''
    $scope.content = ''

    $scope.submit = function(){
      $http.post('/'+config.type,{
        title : $scope.title,
        content : $scope.content
      }).success(function( node ){
        window.location.href= "/page/"+config.type+"/"+node.id
      }).error(function(err){
        console.log( err)
      })
    }
  })