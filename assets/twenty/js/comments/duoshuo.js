angular.module('comments.duoshuo.newest',[]).controller('comments.duoshuo.newest',function($scope, $http){

  var data = {
    show_avatars:1,
    show_time:1,
    show_admin:1,
    excerpt_length:70,
    num_items:10,
    require:["site","visitor","nonce","serverTime","lang","unread","log","extraCss"],
     site_ims:1408004101,
    v:140327
  }

  $http.get('http://zerojs.duoshuo.com/api/sites/listRecentPosts.json',data).success(function(res){
    var indexedComments = _.indexBy(res.response,'post_id')
    _.forEach( res.response,function(c){
      if(c.parent_id!==0 ){
        c.replyTo = indexedComments[c.parent_id].author.name
      }
    })
    console.log( indexedComments, res.response)
    $scope.comments = res.response

  })

})
.controller()