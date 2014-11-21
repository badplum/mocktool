var fs = require('fs');
var path = require('path');
var config = require('./config');

exports.main = function (context) {
    var pathname = context.request.pathname;
    var method = context.request.method;
    var conf = context.conf;
    var docRoot  = conf.documentRoot;
    var prefix = docRoot + config.mockupDir + pathname.replace(/^\/api/, '');
    var filePath = prefix;
    var handleJs = filePath + '.js';
    context.filePath = filePath;
    if (fs.existsSync(handleJs)) {
        var apiMock = require(filePath);
        apiMock.handler(context, exports);
    }
    else {
        var handler = require('./commonHandler');
        handler.main(context);
    }
};

exports.schema = require('./schema');