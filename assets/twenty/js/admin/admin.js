angular.module('admin',['ui.router','admin.post.manage','admin.dashboard','admin.category.manage','user.edit'])
  .config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
      var path = window.location.pathname
      console.log(path)
      $stateProvider
        .state('dashboard', {
          url : "/",
          templateUrl: '/twenty/js/admin/dashboard.html',
          controller: 'dashboard'
        })
        .state('posts', {
          url : "/posts",
          templateUrl: '/twenty/js/admin/post-manage.html',
          controller: 'postManage'
        })
        .state('create', {
          url : "/create",
          templateUrl: '/twenty/js/admin/create.html',
          controller: 'twentyCreate'
        })
        .state('categories',{
          url : '/categories',
          templateUrl : '/twenty/js/admin/category-manage.html',
          controller: 'categoryManage'
        })
        .state('statistic',{
          url : '/statistic',
          templateUrl : '/twenty/js/admin/category-manage.html',
          controller: 'categoryManage'
        })
        .state('user',{
          url : '/user',
          templateUrl : '/twenty/js/admin/user.html',
          controller : 'user.edit'
        })

      $urlRouterProvider.otherwise("/");
      //configure html5 to get links working on jsfiddle
//      $locationProvider.html5Mode(true);
    }])
