/**
 * Created by jiamiu on 14-8-9.
 * You must use `angular.module('node.crud').value('nodeConfig',{})` to specify which type of node you want to operate.
 * and use `angular.module('node.crud').value('indexConfig',[])` to specify which indexes node may have
 */


angular.module('node.edit', ['textAngular', 'node.upload','node.index'])
  .controller( 'node.edit', function( $http, $attrs, uploadFactory,$scope){
    var type = $attrs['nodeType']
    var id = $attrs['nodeId'] ||  ($attrs['nodeHrefId'] &&  matchHref( window.location.pathname + window.location.hash,$attrs['nodeHrefId'])['id'] )
    if (!type || !id) {
      return console.log("You must use attr `node-create=[type]` to specify which type of node you want to operate, and use node-id or node-href-id to specify id.")
    }

    $scope.node = {}

    $http.get('/'+type+'/'+id).success(function( node){
      $scope.node = node
    })

    $scope.submit = function () {
      //TODO let user specify with validation rules
      if (!$scope.node.title || !$scope.node.content) {
        return alert('title or content cannot be null')
      }

      $http.put('/'+type+'/'+$scope.node.id, toPlainObject($scope.node)).success(function (node) {
        //TODO let user specify when done
        window.location.href = "/page/"+type+'/' + node.id
      }).error(function (err) {
        console.log(err)
      })
    }

    //set for uploader
    uploadFactory.explodeUploadApi( $scope )

    function toPlainObject(obj) {
      return JSON.parse(angular.toJson(obj))
    }

    function matchHref( href, wildcard ){
      var tokenRex = /\/:([a-zA-Z0-9_-]+)/g,
        matches = wildcard.match( tokenRex),
        tokens = matches ? matches.map(function( str ){
          return str.slice(2)
        }) : [],
        hrefMatchRex = new RegExp( wildcard.replace(tokenRex,"/(\\w+)")),
        hrefMatches = href.match( hrefMatchRex),
        results = {}


      hrefMatches = hrefMatches && hrefMatches.slice(1)
      console.log( tokens,hrefMatches, wildcard,tokenRex, wildcard.replace(tokenRex,"/(\\w+)"),href )
      for( var i in tokens ){
        results[tokens[i]] = hrefMatches[i]
      }
      return results

    }
  })
