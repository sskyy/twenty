angular.module('statistic.duoshuo.hotest',[]).controller('statistic.duoshuo.hotest',function($scope, $http){

  var data = {
    range:"weekly",
    num_items:5,
    require:["site","visitor","nonce","serverTime","lang","unread","log","extraCss"],
    site_ims:1408004101,
    v:140327
  }

  $http.get('http://zerojs.duoshuo.com/api/sites/listTopThreads.json',data).success(function(res){
    $scope.posts = res.response
  })

})
