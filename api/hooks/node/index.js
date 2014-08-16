module.exports  =  function( sails){
  var nodeModels = Object.keys(sails.models).filter( function( name ){
    return sails.models[name].isNode
  })

  var config = sails.config.cms.node.brief
  return config.auto == true ? {
    routes : {
      before : _.zipObject( nodeModels.map(function( name ){
        return 'post /'+name
      }), nodeModels.map( function( name ){
        return function( req, res, next ){
          if( req.param(config.field).length > config.limit + config.overflow ){
            req.body[config.toField] =
              req.param(config.field)
              .replace(/\n/g,'')
                .replace(/<\/?\w+(\s[-=\w'"]+)*\s*\/?>/ig,"")
                .slice(0,config.limit ) + "..."
          }
          next()
        }
      }))
    }
  } : {}
}