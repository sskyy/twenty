var hooks = ["beforeValidate",
"afterValidate", 
"beforeCreate", 
"afterCreate", 
"beforeUpdate",
"afterUpdate", 
"beforeDestroy",
"afterDestroy"]

var Index = require('../models/Index.js'),
  q = require('q')

module.exports = {
  addHooks : function( name, model ){
    hooks.forEach( function( hook ){
      model[hook] = function( v, cb ){
        var _promises = []
        sails.emit("hook:"+name+":"+hook,v, function gatherListenerResult( result ){
          if(q.isPromise( result) ){
            _promises.push(result)
          }
        })
        if( _promises.length == 0 ){
//          console.log("doesn't has hooks for", name, hook)
          cb()
        }else{
          q.allSettled( _promises).then(function(){
            cb()
          }).fail(function(err){
            sails.error(err)
            cb()
          })
        }
      }
    })

    if( model.toJSON ){
      var _toJSON = model.toJSON
      model.toJSON = function(){
        sails.emit("hook:"+name+":get",this)
        return _toJSON.call(this)
      }
    }

    model.attributes = model.attributes || {}
    return model
  },
  //make Node Model
  node : function( name, model ){
    model = this.addHooks(name, model)
    model.isNode = true
    return model
  },
  //make Index Model
  index : function( model ){
    model = _.defaults( model, Index)
    model.isIndex = true

    return model
  },
  file : function( name, model ){
    model.attribute = model.attribute || {}

    model.isFile = true
    return model
  }
}

