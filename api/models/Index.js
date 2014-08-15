/**
 * =============================
 * NOTICE : This is an abstract class for model, you should use Model service to construct your own model.
 * =============================
 *
 * a standard index is like:
 * {
 *   name : 'photo',
 *   nodes : {
 *     post : [
 *       {id:1,title:'haha'}
 *     ],
 *     photo : [
 *       {id:2,title:'no'}
 *     ]
 *   },
 *   id : 1
 * }
 */
module.exports = {
  attributes: {
    'name' : {
      type : 'string',
      required : true
    },
    'nodes' : {
      type : 'json',
      defaultsTo : {}
    }
  }
};

