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
    
    
     // additional fields will cause error during validation
     //being caught when isValid()?   
     //add before submit..
        
    var unescapedHTMLForAddForm = _unescape(addForm.toHTML(req));
    log(unescapedHTMLForAddForm);

    log("isFormValid");
    if(addForm.isValid()) {
        //TODO redirect after 3sec OR Disable the button
        var link = '<a href="{{baseURL}}/spots/' + req.uuid + '/view">Created Spot</a>';
        //Mark another
        var modalHtml = "<p>Status</p><p>{{status}}</p>" + link;
        
        var doc=addForm.values;
        doc.type='lightspot';
        //TODO set upload date
        doc.upload_date_timestamp = new Date().getTime();
        return [doc, templates.renderHTML(modalHtml, req, {
            status : "Add Successfully"
        })]
    } else {
        log("[INFO]Form is invalid");

        return [null, templates.renderHTML(unescapedHTMLForAddForm, req, {})]
    }

};
