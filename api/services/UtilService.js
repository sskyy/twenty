/**
 * Created by jiamiu on 14-8-9.
 */

module.exports = {
  upperCapital : function( str ){
    return str[0].toUpperCase() + str.slice(1)
  },
  isModelName : function( str ){
    return typeof global[this.upperCapital(str)] !== 'undefined'
  },
  naiveDecorate : function( decorater, func){
    decorater.apply( this, arguments)
    func.apply( this, arguments)
  },
  getModelInstance : function( name ){
    return global[this.upperCapital(name)]
  }
}