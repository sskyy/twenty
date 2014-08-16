module.exports = function( sails ){
  var models = Object.keys(sails.models)

  return {
    routes : {
      //this is a little bit ugly, we can not use after
      before : _.merge(_.zipObject( models.map(function( name ){
        return 'get /'+name+'/:id'
      }), models.map(updateStatic('feed'))),_.zipObject( models.map(function( name ){
          return 'get /page/'+name+'/:id'
      }), models.map(updateStatic('view'))))
    }
  }

  function updateStatic( field ){
    return function( name ){
      return function( req, res, next){
        var id = req.param('id'),
          modelIns = global[UtilService.upperCapital(name)]


        modelIns.findOne( id ).then(function( r){
          var  updateObj = {}
          updateObj[field] = r[field] ? r[field] +1 : 1

          return modelIns.update(id, updateObj)
        }).fail(function( err ){
          sails.error(err)
        }).finally(function(err){
          next()
        })
      }
    }
  }
}