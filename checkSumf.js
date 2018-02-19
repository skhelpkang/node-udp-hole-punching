var crypto = require('crypto');
var fs = require('fs');

var hash = crypto.createHash('md5'), 
    stream = fs.createReadStream('C:/Users/Administrator/.docker/machine/machines/default/disk.vmdk', {'highWaterMark': 64*1024});
const start = new Date().getTime()
stream.on('data', function (data) {
    // console.log(data.length)
    hash.update(data, 'utf8')
})

stream.on('end', function () {
    const d =hash.digest('hex'); // 34f7a3113803f8ed3b8fd7ce5656ebec
    const end = new Date().getTime()
    console.log('time:', (end-start))
    console.log('hash', d)


})