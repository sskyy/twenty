/**
 * Created by jiamiu on 14-8-11.
 */

angular.module('node.create').value('nodeConfig',{type:'post'})
angular.module('post.create',['node.create','ngResource']).controller('twentyCreate',function($http,$scope,$resource){

  var Category = $resource('/category/:id',{id:'@id'})

  $scope.title = ''
  $scope.content = ''
  $scope.newCategoryName = ''

  Category.query().$promise.then(function(data){
    $scope.categories = data
    $scope.category = data[0]
  })

  $scope.setNewCategory = function( name ){
    console.log(name)
    $scope.category = {name:name}
  }

  $scope.submit = function(){
    if( !$scope.title || !$scope.content ){
      return alert('title or content cannot be null')
    }
    $http.post('/post',{
      title : $scope.title,
      content : $scope.content,
      category : [_.pick($scope.category,['id','name'])]
    }).success(function( node ){
      window.location.href= "/page/post/"+node.id
    }).error(function(err){
      console.log( err)
    })
  }
})