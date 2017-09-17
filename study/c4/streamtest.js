/**
 * Created by whobird on 17/9/8.
 */
var fs=require('fs')
var join=require('path').join
var static_root=__dirname+'/static'
var readStream=fs.createReadStream(join(static_root,'index.html'));

var writeStream=fs.createWriteStream(join(static_root,'index_res.html'));

readStream.pipe(writeStream)











