/**
 * Created by jiamiu on 14-8-9.
 */
module.exports.cms = {
  view : {
    default : 'twenty'
  },
  user : {
    allowMultipleAdmin : false
  },
  node : {
    listSuffix : '-list',
    limit : 10,
    brief : {
      auto : true,
      field : 'content',
      toField : 'brief',
      limit : 300,
      overflow : 100
    },
    file : {}
  },
  preload : {
    string : true
    //duoshuo : ''
  }
};