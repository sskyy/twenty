angular.module('statistic.board',['ngResource']).controller('board',function($scope,$resource){
  var limit = 10,
    sort = "view DESC"
  var Post = $resource('/post',{sort:sort,limit:limit})

  $scope.posts = Post.query()
})