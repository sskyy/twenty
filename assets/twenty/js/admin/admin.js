angular.module('admin',['ui.router','admin.post.manage','admin.dashboard','index.crud','user.edit','user.session','comments.duoshuo.newest','statistic.duoshuo.hotest','setting.crud'])
  .config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
      var path = window.location.pathname
      $stateProvider
        .state('dashboard', {
          url : "/",
          templateUrl: '/twenty/templates/dashboard.html',
          controller: 'dashboard'
        })
        .state('posts', {
          url : "/posts",
          templateUrl: '/twenty/templates/post-manage.html'
        })
        .state('create', {
          url : "/create",
          templateUrl: '/twenty/templates/create.html'
        })
        .state('edit', {
          url : "/edit/:id",
          templateUrl: '/twenty/templates/edit.html'
        })
        .state('categories',{
          url : '/categories',
          templateUrl : '/twenty/templates/category-manage.html'
        })
        .state('comments',{
          url : '/comments',
          templateUrl : '/twenty/templates/comments.html',
          controller: ''
        })
        .state('statistics',{
          url : '/statistics',
          templateUrl : '/twenty/templates/statistics.html',
          controller: function(){}
        })
        .state('user',{
          url : '/user',
          templateUrl : '/twenty/templates/user.html',
          controller : 'user.edit'
        })
        .state('setting',{
          url : '/setting',
          templateUrl : '/twenty/templates/setting.html'
        })

      $urlRouterProvider.otherwise("/");
      //configure html5 to get links working on jsfiddle
//      $locationProvider.html5Mode(true);
    }]).controller( 'admin',function($scope,session){
      $scope.user = session.item('user')
  })
