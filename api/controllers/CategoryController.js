module.exports = {
  count : function(req, res){
    Category.count(function(err,count){
      res.json(200,{count:count})
    })
  }
}