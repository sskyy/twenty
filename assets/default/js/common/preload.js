angular.module('preload',[]).factory('preload',function(){
  return {
    data : function( item ){
      var data = window.PRELOAD ? window.PRELOAD.data  :  {}
      return data[item]
    },
    query : function(){
      return window.PRELOAD.query
    }
  }

})
