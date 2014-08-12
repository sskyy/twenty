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

    model.attributes = model.attributes || {}
    return model
  }
}