/**
 * Created by jiamiu on 14-8-9.
 * You must use `angular.module('node.curd').value('config',{})` to specify which type of node you want to operate.
 */
var app = angular.module('node.crud',['util','ngResource','ngSanitize'])
  .controller('node.crud',function($scope,$resource,crud,$location,$attrs ){
    var type = $attrs['nodeType']

    if( !type ){
      return console.log("You must use attr `node-type=[type]` to specify which type of node you want to operate.")
    }
    var config = {
      type:type,
        range:4
      },
    param = {limit: 10}

    var preload
    try{
      angular.module('preload') && angular.injector(['preload']).invoke(['preload',function( p ){ preload  = p}])
    }catch(e){
      console.log("module preload not loaded",e)
    }

    if( preload && preload.data( type )){
      param = _.defaults( preload.query(), param)
      config.records = preload.data(type)
    }else{
      var crudSearchOptions = $attrs['crudSearchOptions']?$attrs['crudSearchOptions'].split(',') : []
      //TODO  $location.search() return {} ???
//      options = _.defaults(_.pick($location.search(), crudSearchOptions),options)
      var search = _.reduce(window.location.search.slice(1).split("&"),function(a, b){
        b = b.split("=")
        a[b[0]] = b[1]
        return a
      },{})

      param = _.defaults(_.pick(search , crudSearchOptions),param)
    }

    var Crud = crud( config, param )

    $scope.next = Crud.next
    $scope.prev = Crud.prev
    $scope.goto = Crud.goto
    $scope.currentPage = Crud.current
    $scope.remove = Crud.remove


    //pass true to method query means we have preload data
    $scope.nodes = Crud.query( preload && preload.data(type) !== undefined  )
    $scope.pages = Crud.pages()
  })
