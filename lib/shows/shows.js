var templates = require('duality/templates');
var dutils = require('duality/utils');

exports.about = function(doc, req) {
    if(req.client && req.initial_hit) {
        // no need for double render on first hit
        return;
    }
    return {
        title : 'About',
        content : templates.render('about.html', req, {
            nav : 'about'
        })
    };
};
exports.add = function(doc, req) {
    if(req.client && req.initial_hit) {
        // no need for double render on first hit
        return;
    }
    return {
        title : 'Add',
        content : templates.render('add.html', req, {
            nav : 'add'
        })
    };
};
exports.lightpollution = function(doc, req) {
    if(req.client && req.initial_hit) {
        // no need for double render on first hit
        return;
    }
    return {
        title : 'What is Light Pollution',
        content : templates.render('lightpollution.html', req, {
            nav : 'add'
        })
    };
};

//Need to skip base.html for these show functions

// exports.image = function(doc, req) {
// 
    // var image = doc._id + "/attachment";
    // // redirect only. dirty workaround, not a real show
    // //No difference with redirect directly!
    // // should use DB API?
//     
    // var url = dutils.getBaseURL() +"/_db/"+image;
    // return {code: 301, headers: {location:url}};
// };

//
//exports.moved = function (doc, req) {
//    return {code: 301, headers: {location: req.query.loc}};
//};
