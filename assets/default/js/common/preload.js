angular.module('preload',[]).factory('preload',function(){
  return {
    data : function( item ){
      var data = (window.PRELOAD && window.PRELOAD.data)? window.PRELOAD.data :  {}
      return data[item]
    },
    item : function( item ){
      var preload = window.PRELOAD ||  {}
      return preload[item]
    },
    query : function(){
      return window.PRELOAD.query
    }
  }

})
