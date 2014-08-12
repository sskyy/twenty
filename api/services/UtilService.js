/**
 * Created by jiamiu on 14-8-9.
 */

module.exports = {
  upperCapital : function( str ){
    return str[0].toUpperCase() + str.slice(1)
  },
  isModelName : function( str ){
    return typeof global[this.upperCapital(str)] !== 'undefined'
  }
}