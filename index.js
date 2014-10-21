module.exports = {
  deps : ['theme','model','rest','index','node','file'],
  models : require('./models'),
  theme : {
    directory : 'themes/default',
    locals : {
      '*' : {
        duoshuo : 'twenty'
      }
    }
  }
}