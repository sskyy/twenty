/**
 * Created by jiamiu on 14-8-9.
 * You must use `angular.module('index.curd').value('config',{})` to specify which type of index you want to operate.
 */
angular.module('index.crud',['util','ngResource']).controller('categoryCrud',function($scope,$resource,indexConfig,crud){

  if( !indexConfig || !indexConfig.type ){
    return console.log("You must use `angular.module('index.curd').value('config',{})` to specify which type of index you want to operate.")
  }

  var limit = 5,
    range  = 10

  var Crud = crud( {type:indexConfig.type,limit:limit,range:range}, $scope)

  $scope.next = Crud.next
  $scope.prev = Crud.prev
  $scope.goto = Crud.goto
  $scope.currentPage = Crud.current

  console.log("index.crud")
  $scope.indexes = Crud.query()
  $scope.pages = Crud.pages()


})