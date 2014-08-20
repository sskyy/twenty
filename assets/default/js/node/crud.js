/**
 * Created by jiamiu on 14-8-9.
 * You must use `angular.module('node.curd').value('config',{})` to specify which type of node you want to operate.
 */
var app = angular.module('node.crud',['util','ngResource','ngSanitize'])
.directive('nodeCrud',function( $resource,crud,$location ){
    return function( $scope, ele, attrs ){
      var type = attrs['nodeCrud']

      if( !type ){
        return console.log("You must use attr `node-crud=[type]` to specify which type of node you want to operate.")
      }
      var options = {
        type:type,
        limit: 10,
        range:4
      }

      var preload= function(){}
      try{
        angular.module('preload') && angular.injector(['preload']).invoke(['preload',function( p ){ preload = function(item){ p(item)}}])
      }catch(e){
        console.log("module preload not loaded",e)
      }

      if( preload(type )){
        options = _.defaults(_.pick($location.search(),['limit','skip']), options)
        options.records = preload(type)
      }

      var Crud = crud( options )

      $scope.next = Crud.next
      $scope.prev = Crud.prev
      $scope.goto = Crud.goto
      $scope.currentPage = Crud.current

      //pass true to method query means we have preload data
      $scope.nodes = Crud.query( options.records ? true : false)
      $scope.pages = Crud.pages()
    }
  })