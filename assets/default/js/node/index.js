angular.module('node.index',['ngResource'])
  .controller('node.index',function( $resource, $scope, $attrs){
    //fetch indexes
    var indexes = $attrs['indexType'].split(','),
      indexResources = {}
    if (indexes && indexes.length !== 0) {
      _.forEach(indexes, function (index) {
        indexResources[index] = $resource('/' + index + '/:id', {id: '@id'})
        //store selected index
        if( !$scope.$parent.node[index] ){
          $scope.$parent.node[index] = []
        }

        indexResources[index].query().$promise.then(function (data) {
          //store all options
          $scope[index + 's'] = data.map(function(i) {
            return _.pick(i, ['id', 'name'])
          })
        })
      })
    }
  })
