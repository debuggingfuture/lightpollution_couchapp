var fields = require('couchtypes/fields');
var widgets = require('couchtypes/widgets');
log("fields");
log(fields);
//failed to load fields here
var Type = require('couchtypes/types').Type;
var Form = require('couchtypes/forms').Form;
//missing here
//fields init in appForm and update.js

/*
 // hidden:true also wont work..
 * Needed: placeholders
 * use options
 *
 * Framework not working...
 * refer to widgets.core.js Widget.prototype.toHTML
 */

exports.addForm = new Form({
    title : fields.string({
        label : '{{t "add.form.title"}}',
        default_value : '{{t "add.form_default.title"}}',
    }),
    locationDesc : fields.string({
        label : '{{t "add.form.locationDesc"}}',
        default_value : '{{t "add.form_default.locationDesc"}}',
    }),
    locationLat : fields.number({
        // widget : widgets.hidden()
    }),
    locationLng : fields.number({
        // widget : widgets.hidden()
    }),
    description:fields.string({
        label : '{{t "add.form.description"}}',
        default_value : '{{t "add.form_default.description"}}',
             widget : widgets.textarea({cols: 40, rows: 10})
    }),
    captureDateTime : fields.number(
        {
        label : '{{t "add.form.captureDateTime"}}'
        }
    ),
    uploader : fields.string(
        {
        label : '{{t "add.form.uploader"}}',
        // widget : widgets.hidden(),
        default_value : 'Anonymous'
        }
    )

    // ,
    //hidden or show as timestamp
    // pubdate : fields.createdTime()
});
