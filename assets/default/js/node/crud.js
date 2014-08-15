/**
 * Created by jiamiu on 14-8-9.
 * You must use `angular.module('node.curd').value('config',{})` to specify which type of node you want to operate.
 */
angular.module('node.crud',['util','ngResource']).controller('list',function($scope,$resource,nodeConfig,crud){

  if( !nodeConfig || !nodeConfig.type ){
    return console.log("You must use `angular.module('node.curd').value('config',{})` to specify which type of node you want to operate.")
  }

  var limit = 5,
    range  = 10

  var Crud = crud( {type:nodeConfig.type,limit:limit,range:range}, $scope)

  $scope.next = Crud.next
  $scope.prev = Crud.prev
  $scope.goto = Crud.goto
  $scope.currentPage = Crud.current

  $scope.nodes = Crud.query()
  $scope.pages = Crud.pages()

})