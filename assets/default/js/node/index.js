angular.module('node.index',['ngResource']).factory('indexFactory',function(indexConfig,$resource){
  return {
    explodeIndexApi : function(  $scope){
      //fetch indexes
      var indexResources = {}
      console.log( indexConfig )
      if (indexConfig && indexConfig.length !== 0) {
        _.forEach(indexConfig, function (index) {
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
  }
})