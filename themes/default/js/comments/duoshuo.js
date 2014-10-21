angular.module('comments.duoshuo.newest',['preload']).controller('comments.duoshuo.newest',function($scope, $http,$attrs,preload){

  var duoshuoName = $attrs['duoshuoName'] || preload.item('duoshuo')
  if( !duoshuoName ){
    $scope.comments = [{'message':'多说评论组件未初始化，请到根目录 .sailsrc 文件中找到 duoshuo 选项，并填入你的多说站点名。'}]
    return console.log("you need to use duoshuo-name to specify the name of your site")
  }
  var data = {
    show_avatars:1,
    show_time:1,
    show_admin:1,
    excerpt_length:70,
    num_items:10,
    require:["site","visitor","nonce","serverTime","lang","unread","log","extraCss"]
  }

  $http.get('http://'+duoshuoName+'.duoshuo.com/api/sites/listRecentPosts.json',data).success(function(res){
    var indexedComments = _.indexBy(res.response,'post_id')
    _.forEach( res.response,function(c){
      if(c.parent_id!==0 && indexedComments[c.parent_id] ){
        c.replyTo = indexedComments[c.parent_id].author.name
      }
    })
    console.log( indexedComments, res.response)
    $scope.comments = res.response

  })

})
