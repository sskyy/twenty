angular.module('statistic.duoshuo.hotest',['preload']).controller('statistic.duoshuo.hottest',function($scope, $http,$attrs,preload){

  var duoshuoName = $attrs['duoshuoName'] || preload.item('duoshuo')
  if( !duoshuoName ){
    $scope.posts = [{'title':'多说评论组件未初始化，请到根目录 .sailsrc 文件中找到 duoshuo 选项，并填入你的多说站点名。'}]
    return console.log("you need to use duoshuo-name to specify the name of your site")
  }

  var data = {
    range:"weekly",
    num_items:5,
    require:["site","visitor","nonce","serverTime","lang","unread","log","extraCss"]
  }

  $http.get('http://'+duoshuoName+'.duoshuo.com/api/sites/listTopThreads.json',data).success(function(res){
    $scope.posts = res.response
  })

})
