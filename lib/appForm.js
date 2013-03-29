var Type = require('couchtypes/types').Type;
var Form = require('couchtypes/forms').Form;
var fields = require('couchtypes/fields');
log("fields");
log(fields);//missing here
//fields init in appForm and update.js
exports.addForm = new Form({
        title : fields.string({
            label : '{{t "add.title"}}'
        }),
        locationDesc : fields.string({
            label : '{{t "add.title"}}'
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
