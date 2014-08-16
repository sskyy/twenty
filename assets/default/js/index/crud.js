/**
 * Created by jiamiu on 14-8-9.
 * You must use `angular.module('index.curd').value('config',{})` to specify which type of index you want to operate.
 */
angular.module('index.crud', ['util', 'ngResource']).controller('index.crud', function ($scope, $resource, indexConfig, crud) {

  if (!indexConfig || !indexConfig.type) {
    return console.log("You must use `angular.module('index.curd').value('config',{})` to specify which type of index you want to operate.")
  }

  var limit = 5,
    range = 10

  var Crud = crud({type: indexConfig.type, limit: limit, range: range})

  $scope.newItem = {}
  $scope.next = Crud.next
  $scope.prev = Crud.prev
  $scope.goto = Crud.goto
  $scope.create = Crud.create
  $scope.currentPage = Crud.current

  console.log("index.crud")
  $scope.indexes = Crud.query()
  $scope.pages = Crud.pages()

})
  .filter('countNodesForIndex', function () {
    return function (nodes) {
      var count = 0
      _.forEach( nodes, function( type){
        count += Object.keys( type).length
      })
      return count
    }
  })