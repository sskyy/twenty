angular.module('node.upload',['angularFileUpload']).config(function ($provide) {

  var actionData = {
    $deferred : null,
    restoreSelection : null,
    editor : null,
    savedSelection : null
  }

  var insertListener = _.once(function( $rootScope ){
    $rootScope.$on('node.create:upload.insert',function(e,file){
      actionData.restoreSelection( actionData.savedSelection )
      actionData.editor.wrapSelection('insertImage', window.location.origin + '/media/'+file.id+'/download', true);
      //this maybe a little confusion here, we have to save our selection manually, or we may lose selection after insert one image
      actionData.savedSelection = rangy.saveSelection()
      actionData.restoreSelection = rangy.restoreSelection
    })
    $rootScope.$on('node.create:upload.complete',function(){
      actionData.$deferred.resolve()
    })
  })

  $provide.decorator('taOptions', ['taRegisterTool', '$delegate', function (taRegisterTool, taOptions) {
    taRegisterTool('uploadFile', {
      iconclass: "fa fa-cloud-upload",
      action: function ($deferred,restoreSelection) {
        var self = this
        this.$root.$broadcast('node.create:upload.activate')

        //this will only run once
        insertListener( this.$root )

        actionData.restoreSelection = restoreSelection
        actionData.$deferred = $deferred
        actionData.editor = self.$editor()
        return false
      }
    });
    // add the button to the default toolbar definition
    taOptions.toolbar[1].push('uploadFile');
    return taOptions;
  }]);
}).factory('uploadFactory',function( $upload){
  return {
    explodeUploadApi : function( $scope ){
      $scope.upload = {
        active : false,
        data : {},
        uploader : null,
        files : []
      }

      $scope.onFileSelect = function ($files) {
        //$files: an array of files selected, each file has name, size, and type.
        for (var i = 0; i < $files.length; i++) {
          var file = $files[i];
          $scope.upload.uploader = $upload.upload({
            url: '/media', //upload.php script, node.js route, or servlet url
            method: 'POST',
            file: file,
            data : $scope.upload.data
          }).progress(function (evt) {
            console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
          }).success(function (data) {
            $scope.upload.files.push( data )
          });
        }
      }

      $scope.select = function( file ){
        $scope.$emit('node.create:upload.insert', file)
        file.inserted = true
      }

      $scope.onUploadComplete = function(){
        $scope.upload.active = false
        $scope.$emit('node.create:upload.complete')
      }

      $scope.$on('node.create:upload.activate',function(){
        $scope.upload.active = true
      })
    }
  }
})