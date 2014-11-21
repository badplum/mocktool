exports.getSchemaObject = function (schemaFilePath) {
    var fs = require('fs');
    var schema = fs.readFileSync(schemaFilePath);
    return JSON.parse(schema);
};

exports.maker = function (schema) {
    var DataMocker = require('json-schema-mock');
    return DataMocker(schema);
};