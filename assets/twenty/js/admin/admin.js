angular.module('admin',['ui.router','admin.post.manage','admin.dashboard'])
  .config(['$stateProvider', '$locationProvider',
    function ($stateProvider, $locationProvider) {
      var path = window.location.pathname
      $stateProvider
        .state('dashboard', {
          url : path,
          templateUrl: '/twenty/js/admin/dashboard.html',
          controller: 'dashboard'
        })
        .state('posts', {
          url : path+"#posts",
          templateUrl: '/twenty/js/admin/post-manage.html',
          controller: 'postManage'
        })
        .state('posts.create', {
          parent : 'posts',
          url : path+"#create",
          templateUrl: '/twenty/js/admin/create.html',
          controller: 'create'
        })
      //configure html5 to get links working on jsfiddle
      $locationProvider.html5Mode(true);
    }])