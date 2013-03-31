var templates = require('duality/templates');
var dutils = require('duality/utils');
var Type = require('couchtypes/types').Type, fields = require('couchtypes/fields'), widgets = require('couchtypes/widgets'), Form = require('couchtypes/forms').Form;
var handlebars = require('handlebars');
// var addForm = require('./../appForm').addForm;//stil fail seems  using lib/ will fail in couchdb even can push
var _unescape = templates._unescape;
var addForm = require('./../appForm').addForm;
//failed here
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
/*
 * For Testing
 */
exports.geocode = function(doc, req) {
    if(req.client && req.initial_hit) {
        // no need for double render on first hit
        return;
    }
    return {
        content : templates.render('geocode.html', req, {
        })
    };
}

exports.add = function(doc, req) {
    //key is actual ou

    //{{t "add.mark"}} localization wont work here. nested

    if(req.client && req.initial_hit) {
        // no need for double render on first hit
        return;
    }
    log("ddoc")
    log(doc);
    log("html")
    log(addForm.toHTML(req));
    log("unescape");
    log(_unescape);
    //BAD but still doable. TODO method to render without base.html
    //Potential issue: renderfinish after addFrom added by couchtypes


/*
 * TODO put form and form_map back in same form, since this render use case dont have add.html...
 * 
 */
    //possible..combine into form?
    var mapHTML = '<div>Drag the Marker!</div><div id="map_canvas" class="map_canvas small"></div>';
    //add the html here
    var unescapedHTML = _unescape(addForm.toHTML(req));

    log(unescapedHTML);
    // var template_1=handlebars.compile(myForm.toHTML(req));
    // log( template_1({add:"a"})); //null

    //work, need add i18, register to this handlebars

    return {
        title : 'Add',
        content : templates.render('add.html', req, {
            nav : 'add',
            form_title : 'add.mark',
            method : 'POST',
            status : '',
            // action : '../_update/update_my_form',
            action : 'spots/update',
            form : templates.renderHTML(unescapedHTML, req, {}),
            form_map:mapHTML
            // button: 'add.submit'

        })
    };
};
//
// eexports.add_form = function (doc, req) {
// var myForm = new Form ({first_name: fields.string(), last_name: fields.string()});
// return {
// title : 'My First Form',
// content: templates.render('form.html', req, {
// form_title : 'My Form',
// method : 'POST',
// action : '../_update/update_my_form',
// form : myForm.toHTML(req),
// button: 'Validate'})
// }
// };
// exports.lightpollution = function(doc, req) {
// if(req.client && req.initial_hit) {
// // no need for double render on first hit
// return;
// }
// return {
// title : 'What is Light Pollution',
// content : templates.render('lightpollution.html', req, {
// nav : 'add'
// })
// };
// };

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
