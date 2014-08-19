
var _ = require('lodash')
module.exports  =  function( sails){
  var objectModels = Object.keys(sails.models).filter( function( name ){
    return sails.models[name].isFile
  })

  return {
    routes : {
      before : _.zipObject( objectModels.map(function( name ){
        return 'post /'+name
      }), objectModels.map( function( name ){
        return function( req, res, next ){
          req.file( 'file' ).upload(sails.config.cms.file || {},function (err, files) {
            if( err ){
              return res.serverError()
            }
            _.extend(req.body,files[0])
            next()
          })
        }
      })),
      after : _.zipObject( objectModels.map(function(name){
        return 'get /'+name+'/:id/download'
      }), objectModels.map( function( name){
        return function( req, res ){
          UtilService.getModelInstance(name).findOne( req.param('id')).then(function( r ){
            if( !r ){
              res.notFound()
            }
            //TODO 如何处理s3等第三方容器的情况
            res.sendfile( r.fd )

          }).fail(function(e){
            res.serverError(e)
          })
        }

      }))
    }
  }
}