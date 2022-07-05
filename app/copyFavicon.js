// include fs-extra package
var fs = require("fs-extra");
var source = './favicon';
var destination = './dist/favicon';
fs.copy(source, destination, function (err) {
    if (err){
        console.log('An error occured while copying the folder.')
        return console.error(err)
    }
    console.log('[Favicon] Copy completed!')
});

/* var source = './src/.well-known';
var destination = './dist/.well-known';
fs.copy(source, destination, function (err) {
    if (err){
        console.log('An error occured while copying the folder.')
        return console.error(err)
    }
    console.log('[Well Known] Copy completed!')
}); */