/**
 * Update functions to be exported from the design doc.
 */
var templates = require('duality/templates'), fields = require('couchtypes/fields'), Form = require('couchtypes/forms').Form;
var addForm = require('./appForm').addForm;   //will loading this run the script ? i think so - why init after this loaded?
var _unescape = templates._unescape;
var shows = require('./shows/shows');

log("fields in update")
log(fields);
exports.update_my_form = function(doc, req) {
    log("update_my_form fx");
    log(shows);
    log(addForm);
    log(templates);
    log(req);
    log("update_my_form");
    addForm.validate(req);
    log("form.values");
    log(addForm.values);
    addForm.values._id = req.uuid;
    log("doc")
    log(doc);
    log(addForm.values._id);
    
    //issue: modules loaded too late
    ///really: change is dangerous by default, so use test
    /*
     *
     * Refcator the form with show
     * Group those templates render somewhere
     * what if redirect? call the show ?
     * add the fx to appForm?
     */
    var unescapedHTMLForAddForm = _unescape(addForm.toHTML(req));
    log(unescapedHTMLForAddForm);

    log("isFormValid");
    if(addForm.isValid()) {
        //TODO redirect after 3sec OR Disable the button
        var link = '<a href="{{baseURL}}/spots/' + req.uuid + '/view">Created Spot</a>';
        //Mark another
        var modalHtml = "<p>Status</p><p>{{status}}</p>" + link;
        return [addForm.values, templates.renderHTML(modalHtml, req, {
            status : "Add Successfully"
        })]
    } else {
        log("Form is invalid");

        return [null, templates.renderHTML(unescapedHTMLForAddForm, req, {})]
    }

    // return [addForm.values, {
    // content : templates.render('add.html', req, {
    // nav : 'add',
    // form_title : 'add.mark',
    // method : 'POST',
    // status : 'add.success',
    // // action : '../_update/update_my_form',
    // action : 'spots/update',
    // form : templates.renderHTML(unescapedHTML, req, {})
    // // button: 'add.submit'
    // })
    // }]
    // return [doc, "testing"];
    // form.values._id = req.uuid;
    //
    // if(form.isValid()) {
    // return [form.values, {
    // content : 'Hello ' + form.values.first_name + ', ' + form.values.last_name,
    // title : 'Result'
    // }];
    // } else {
    // var content = templates.render('form.html', req, {
    // form_title : 'My Form',
    // method : 'POST',
    // action : '../_update/update_my_form',
    // form : form.toHTML(req),
    // input : 'Validate'
    // });
    // return [null, {
    // content : content,
    // title : 'My First Form'
    // }];
    // }
};
