/**
 * Created by jiamiu on 14-8-9.
 * You must use `angular.module('node.crud').value('nodeConfig',{})` to specify which type of node you want to operate.
 * and use `angular.module('node.crud').value('indexConfig',[])` to specify which indexes node may have
 */
angular.module('node.create',['textAngular'])
  .controller('create',function($scope,$http,nodeConfig, indexConfig){

    if( !nodeConfig || !nodeConfig.type ){
      return console.log("You must use `angular.module('node.curd').value('config',{})` to specify which type of node you want to operate.")
    }

    $scope.title = ''
    $scope.content = ''

    $scope.submit = function(){
      $http.post('/'+nodeConfig.type,{
        title : $scope.title,
        content : $scope.content
      }).success(function( node ){
        window.location.href= "/page/"+nodeConfig.type+"/"+node.id
      }).error(function(err){
        console.log( err)
      })
    }

    //fetch indexes
    var indexResources = {}
    if( indexConfig && indexConfig.length!==0 ){
      _.forEach( indexConfig, function( index ){
        indexResources[index] = $resource('/'+index+'/:id',{id:'@id'})
        $scope[index] = []

        Category.query().$promise.then(function(data){
          $scope[index+'s'] = data
          $scope[0] = data[0]
        })
      })
    }

    $scope.submit = function(){
      if( !$scope.title || !$scope.content ){
        return alert('title or content cannot be null')
      }
      $http.post('/post', _.pick($scope,['title','content'].concat(indexConfig||[]))).success(function( node ){
        window.location.href= "/page/post/"+node.id
      }).error(function(err){
        console.log( err)
      })
    }

  })