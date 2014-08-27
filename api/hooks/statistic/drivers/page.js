module.exports = function( sails ){
  var moment = require('moment'),
    type = "dailyPageView"


  function logDailyView( req, res, next ){
    var key = moment(new Date()).format('YYYY-MM-DD')
    Statistic.findOne({key: key,type:type}).then(function(s){

      return s ? Statistic.update({key:key,type:type},{value: s.value+1}): Statistic.create({key:key,value:1,type:type})

    }).finally(function(){
      next()
    })
  }

  return {
    routes : {
      before : {
        'get /' : logDailyView,
        'get /page/*' : logDailyView
      }
    }
  }

}