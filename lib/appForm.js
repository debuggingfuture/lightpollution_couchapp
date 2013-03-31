var fields = require('couchtypes/fields');
log("fields");
log(fields); //failed to load fields here
var Type = require('couchtypes/types').Type;
var Form = require('couchtypes/forms').Form;
//missing here
//fields init in appForm and update.js
exports.addForm = new Form({
        title : fields.string({
            label : '{{t "add.form.title"}}'
        }),
        locationDesc : fields.string({
            label : '{{t "add.form.locationDesc"}}'
        }),
        //locationX and locationY
        captureDate : fields.number(
        // {
        // label : '{{t "add.title"}}'
        // }
        )
        // ,
        //hidden or show as timestamp
        // pubdate : fields.createdTime()
    });
