/**
 * Created by jiamiu on 14-8-9.
 */

angular.module('util',[])
  .filter('time',function(){
    return function( input){
      return moment(input).format('MM-DD hh:mm:ss')
    }
  })