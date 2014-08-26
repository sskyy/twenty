var fs = require('fs'),
  _ = require('lodash'),
  path = require('path'),
  sailsrcPath = path.join(__dirname,'../../.sailsrc')


module.exports = {
  list : function( req, res ){
    res.send( pickLeaves( sails.config.cms))
  },
  save : function( req, res ){
    var config = toObject( req.param('config')) || {}

    fs.readFile( sailsrcPath, 'utf8', function(err, sailsConfig){
      sailsConfig = readJSONwithComments( sailsConfig )

      fs.writeFile(sailsrcPath,JSON.stringify(_.defaults( {cms: _.defaults(config,sails.config.cms)}, sailsConfig),null,4), function(err){

        if( err ){
          console.log(err)
          return res.serverError()
        }else{
          sails.config.cms = _.merge( sails.config.cms, config)
          return res.send( 200)
        }
      })

    })
  }
}

function pickLeaves( obj, preffix){
  preffix= preffix || ''
  var res = {}

  _.forEach( obj, function( v, k){
    if(_.isObject(v)){
      _.merge( res, pickLeaves(v,preffix?preffix+"."+k:k))
    }else{
      res[preffix?preffix+"."+k:k] = v
    }
  })

  return res
}

function readJSONwithComments( s ){
  return JSON.parse( s.replace(/^\s*\/\/(.*)/img,"") )
}

function toObject( obj ){
  var result = {}

  _.forEach(obj,function(v,k){
    if(k.indexOf(".")!==-1){
      var t = result
      var ks= k.split(".")
      ks.forEach(function(kk,i){
        if(  i!=ks.length-1){
          if(t[kk] === undefined ) t[kk] = {}
          t = t[kk]
        }else{
          t[kk] = v
        }
      })
    }else{
      result[k] = v
    }
  })
  return result
}