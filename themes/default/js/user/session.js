angular.module('user.session',['util']).run(function(session,$http){
  session.register('user',{},function(){
    $http.get('/user/me').success(function(user){
      session.item('user',user)
    })
  })
})