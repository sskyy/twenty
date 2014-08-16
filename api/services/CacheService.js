

module.exports = {
  _cache : {},
  cache : function( name,item){
    if( item ){
      this._cache[name] = item
      return item
    }else{
      return this._cache[name]
    }
  }
}