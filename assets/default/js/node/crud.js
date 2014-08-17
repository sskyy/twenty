/**
 * Created by jiamiu on 14-8-9.
 * You must use `angular.module('node.curd').value('config',{})` to specify which type of node you want to operate.
 */
angular.module('node.crud',['util','ngResource','preload','ngSanitize']).controller('node.crud',function($scope,$resource,nodeConfig,crud,preload,$location){

  if( !nodeConfig || !nodeConfig.type ){
    return console.log("You must use `angular.module('node.curd').value('config',{})` to specify which type of node you want to operate.")
  }
  var options = {
    type:nodeConfig.type,
    limit: 10,
    range:4
  }

  if( preload(nodeConfig.type )){
    options = _.defaults(_.pick($location.search(),['limit','skip']), options)
    options.records = preload(nodeConfig.type)
  }


  var Crud = crud( options )

  $scope.next = Crud.next
  $scope.prev = Crud.prev
  $scope.goto = Crud.goto
  $scope.currentPage = Crud.current

  //pass true to method query means we have preload data
  $scope.nodes = Crud.query( options.records ? true : false)
  $scope.pages = Crud.pages()

})