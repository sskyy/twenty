/**
 * Created by jiamiu on 14-8-9.
 * You must use `angular.module('index.curd').value('config',{})` to specify which type of index you want to operate.
 */
angular.module('index.crud', ['util', 'ngResource']).controller('index.crud', function ($scope, $resource, $attrs, crud) {

  var type = $attrs['indexType']
  if (!type) {
    return console.log("You must use `angular.module('index.curd').value('config',{})` to specify which type of index you want to operate.")
  }

  var config = {
    type : type,
    range : 10
  },param = {
      limit : 10
  }

  var Crud = crud(config, param)

  $scope.newItem = {}
  $scope.next = Crud.next
  $scope.prev = Crud.prev
  $scope.goto = Crud.goto
  $scope.create = Crud.create
  $scope.remove = Crud.remove
  $scope.currentPage = Crud.current

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