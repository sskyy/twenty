angular.module('node.index',['ngResource'])
.directive('nodeIndex',function( $resource){
    return function( $scope, ele, attr ){
      console.log( $scope.$id )
      //fetch indexes
      var indexes = attr['nodeIndex'].split(','),
        indexResources = {}
      if (indexes && indexes.length !== 0) {
        _.forEach(indexes, function (index) {
          indexResources[index] = $resource('/' + index + '/:id', {id: '@id'})
          //store selected index
          $scope.node[index] = []

          indexResources[index].query().$promise.then(function (data) {
            //store all options
            $scope[index + 's'] = data
          })
        })
      }
    }
  })