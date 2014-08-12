/**
 * Created by jiamiu on 14-7-3.
 */
var _ = require('lodash')

exports.handle = function(err, res){
    if( err instanceof Error){
        console.log("[SYSTEM ERR]:", err)
        err = [500, {msg:err.message}]

    }else if(_.isNumber( err ) ){

        err = [err]

    }else if( typeof err == 'string'){

        err = [500, {msg:err}]
    }

    if( err[0]!==200){
        console.log("[RESPOND ERR]:",err)
    }

    return res.json.apply(res, err)
}