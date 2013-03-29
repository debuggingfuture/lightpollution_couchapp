module.exports = {
    rewrites : require('./rewrites'),
    views : require('./views/views'),
    lists : require('./lists/lists'),
    shows : require('./shows/shows'),
    updates : require('./update')
    //    filters: require('./filters'),
    //    validate_doc_update: ('./validate').validate_doc_update
};

    // rewrites :  //TODO optionally concat these two objects
var test_rewrites=require('nodeunit-testrunner/rewrites');

module.exports.rewrites = module.exports.rewrites.concat(test_rewrites);



//SERVER SIDE CODE HERE?

//TODO freeze once required. Now even module not found
var i18n = require('i18next-node-kanso');
//register
var option = {
    resGetPath : 'locales/__lng__/__ns__.json'
};



// option={}

// i18n.init(option);
//Need to make sure it is finish before use it
// var db = require('db');

//can put db details here, but still server side need use getDBURL


// var appdb = db.f();
// appdb.getDoc(docid, req.query, function(err, doc) {
    // var current_req = (utils.currentRequest() || {});
    // if(current_req.uuid === req.uuid) {
        // if(err) {
            // return callback(err);
        // }
        // var res = exports.runShow(fn, doc, req);
        // events.emit('afterResponse', info, req, res);
        // if(res) {
            // exports.handleResponse(req, res);
        // } else {
            // // returned without response, meaning cookies won't be set
            // // by handleResponseHeaders
            // if(flashmessages && req.outgoing_flash_messages) {
                // flashmessages.setCookieBrowser(req, req.outgoing_flash_messages);
            // }
        // }
        // callback();
    // }
// });

// $().ready(function() {
// // "later"
// var x = $.t("app.name");
// //TODO write an unit test to check the translation ability
// // console.log("translated");
// // console.log(I18n.t("message"));
//
// });
