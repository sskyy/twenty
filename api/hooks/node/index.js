var htmlToText = require('html-to-text');

module.exports  =  function( sails){
  var nodeModels = Object.keys(sails.models).filter( function( name ){
    return sails.models[name].isNode
  })


  function brief( req, res, next ){
    if( req.param(config.field).length > config.limit + config.overflow ){
      //TODO 摘要规则进一步优化

      req.body[config.toField] =
        htmlToText.fromString(req.param(config.field), {
          wordwrap: config.limit
        })

    }
    next()
  }

  var config = sails.config.cms.node.brief
  return config.auto == true ? {
    routes : {
      before : _.reduce( nodeModels,function( a, b){
        a['post /'+b] = brief
        a['put /'+b] = brief
        return a
      },{})
    }
  } : {}
}