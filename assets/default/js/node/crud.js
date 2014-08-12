/**
 * Created by jiamiu on 14-8-9.
 * You must use `angular.module('node.curd').value('config',{})` to specify which type of node you want to operate.
 */
angular.module('node.crud',['util','ngResource']).controller('list',function($scope,$resource,config){

  if( !config || !config.type ){
    return console.log("You must use `angular.module('node.curd').value('config',{})` to specify which type of node you want to operate.")
  }
  var Node = $resource('/'+config.type+'/:id',{id:"@id"})
  $scope.page = 0
  $scope.nodes = Node.query({limit:10,sort:"createdAt desc"})
  $scope.remove = function( node, $index ){
    Node.remove({id:node.id}).$promise.then(function(){
      $scope.nodes.splice($index,1)
    })
  }

  $scope.edit = function( node, $index){

  }
  $scope.create = function( ){
    window.location.href='/page/static/node-create'
  }

})