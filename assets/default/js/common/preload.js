angular.module('preload',[]).factory('preload',function(){
  var data = window.PRELOAD
  return function( item ){
    return data[item]
  }
})
