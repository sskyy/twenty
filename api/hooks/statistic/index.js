module.exports  = function( sails ) {
  var requireDir = require('require-dir')
  var tosource = require('tosource')
  var drivers = {}

  var configDrivers = (sails.config.cms.statistic === undefined ||  sails.config.cms.statistic.drivers === undefined )? true :  sails.config.cms.statistic.drivers
  if( configDrivers === true ){
    drivers = _.map(requireDir('./drivers'),function( f){ return f(sails)})
  }else if(_.isArray(configDrivers) ){
    drivers = _.zipObject( configDrivers, configDrivers.map(function(name){ return require('./drivers/'+name)(sails)}) )
  }else if(_.isPlainObject(configDrivers)){
    drivers = configDrivers
  }

  // we will read
//  sails.log( tosource( _.reduce( drivers, function(a, b){ return _.merge(a, b.routes || {})}, {}).after) )
  return {
    routes : _.reduce( drivers, function(a, b){ return _.merge(a, b.routes || {})}, {}),
    configure : function(){
      _.forEach( drivers,function(driver){
        if( driver.configure ){
          driver.configure()
        }
      })
    }
  }


}