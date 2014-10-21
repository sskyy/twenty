module.exports = [{
  identity: 'post',
  connection: 'myLocalDisk',
  attributes: {
    title : 'string',
    content : 'string',
    category : 'array'
  },
  isNode : true,
  rest : true
},{
  identity : 'category',
  connection : 'myLocalDisk',
  attributes : {
    name : 'string',
    nodes : 'json'
  },
  isIndex : true,
  rest : true
},{
  identity : 'picture',
  connection : 'myLocalDisk',
  attributes : {
    'name' : 'string',
    'originalname' : 'string',
    'mimetype' : 'string',
    'extension' : 'string',
    'size' : 'int'
  },
  isFile : true,
  rest : true
}]