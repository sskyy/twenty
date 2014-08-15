module.exports = {
  key : function( type, str ){
    return [type, str].join(":")
  }
}