module.exports = {
  count : function(req, res){
    Post.count(function(err,count){
      res.json(200,{count:count})
    })
  }
}