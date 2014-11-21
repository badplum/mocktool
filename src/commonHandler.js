var config = require('./config');
var methodMap = require('./config').METHOD_PATH_MAP;
var fs = require('fs');

exports.main = function (context) {
    var pathname = context.request.pathname;
    var method = context.request.method;
    var conf = context.conf;
    var docRoot  = conf.documentRoot;
    var prefix = docRoot + config.mockupDir + pathname.replace(/^\/api/, '');
    var filePath = prefix;
    addJSONSuffix();
    if (!fs.existsSync(filePath)) {
        // 以数字结尾的读read.json
        // /api/ad/123 [GET] --> ad/read.json
        if (method === 'GET' && /\/api\/([^\/]+\/)+\d+$/.test(pathname)) {
            filePath = prefix.replace(/\d+$/, '') + 'read';
        }
        else {
            /**
             * /api/ad [GET] --> ad/list.json
             * /api/ad [POST] --> ad/create.json
             * /api/ad/3 [PUT] --> ad/update.json
             * /api/ad/3 [DELETE] --> ad/delete.json
             */
            filePath = prefix;
            console.log('[Test]', filePath)
            if (!/\/$/.test(filePath)) {
                filePath += '/';
            }
            filePath += config.METHOD_PATH_MAP[method];
        }
        addJSONSuffix();
    }

    function addJSONSuffix() {
        if (!/\.\w+$/.test(pathname)) {
            filePath += '.json';
            context.header[ 'Content-Type' ] = 'application/json';
        }
    }
    console.log('[MOCKUP]', pathname, '[' + method + ']', ' --> ', filePath);
    file(filePath)(context);
}