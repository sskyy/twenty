/**
 * Created by jiamiu on 14-8-9.
 * You must use `angular.module('node.crud').value('nodeConfig',{})` to specify which type of node you want to operate.
 * and use `angular.module('node.crud').value('indexConfig',[])` to specify which indexes node may have
 */
angular.module('node.create', ['textAngular','ngResource'])
//  .config(function ($provide) {
//    $provide.decorator('taOptions', ['taRegisterTool', '$delegate', function (taRegisterTool, taOptions) {
//      // $delegate is the taOptions we are decorating
//      // register the tool with textAngular
//      taRegisterTool('colourRed', {
//        iconclass: "fa fa-square red",
//        action: function () {
//          this.$editor().wrapSelection('forecolor', 'red');
//        }
//      });
//      // add the button to the default toolbar definition
//      taOptions.toolbar[1].push('colourRed');
//      return taOptions;
//    }]);
//  })
  .controller('node.create', function ($scope, $http, nodeConfig, indexConfig,$resource) {

    if (!nodeConfig || !nodeConfig.type) {
      return console.log("You must use `angular.module('node.curd').value('config',{})` to specify which type of node you want to operate.")
    }


    $scope.node = {
      title : '',
      content : ''
    }

    //fetch indexes
    var indexResources = {}
    if (indexConfig && indexConfig.length !== 0) {
      _.forEach(indexConfig, function (index) {
        indexResources[index] = $resource('/' + index + '/:id', {id: '@id'})
        //store selected index
        $scope.node[index] = []

        indexResources[index].query().$promise.then(function (data) {
          //store all options
          $scope[index + 's'] = data
        })
      })
    }

    $scope.submit = function () {
      //TODO let user specify with validation rules
      if (!$scope.node.title || !$scope.node.content) {
        return alert('title or content cannot be null')
      }

      $http.post('/post', toPlainObject($scope.node)).success(function (node) {
        window.location.href = "/page/post/" + node.id
      }).error(function (err) {
        console.log(err)
      })
    }

    function upperCapital( name ){
      return name[0].toUpperCase() + name.slice(1)
    }

    function toPlainObject( obj ){
      return JSON.parse( angular.toJson(obj ))
    }

  })