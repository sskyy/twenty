var hooks = ["beforeValidate",
"afterValidate", 
"beforeCreate", 
"afterCreate", 
"beforeValidate",
"afterValidate", 
"beforeUpdate", 
"afterUpdate", 
"beforeDestroy",
"afterDestroy"]

var Index = require('../models/Index.js')

module.exports = {
  addHooks : function( name, model ){
    hooks.forEach( function( hook ){
      model[hook] = function( v, cb ){
        //any module use this hook should
        var hasHooks = sails.emit("hook:"+name+":"+hook,v,cb)
        if( !hasHooks ){
          cb()
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
  }
}

