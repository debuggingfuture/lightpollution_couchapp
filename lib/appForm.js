var Type = require('couchtypes/types').Type, fields = require('couchtypes/fields'); 
var Form = require('couchtypes/forms').Form;
exports.addForm = new Form({
        title : fields.string({
            label : '{{t "add.form.title"}}'
        })
        // ,
        // locationDesc : fields.string({
            // label : '{{t "add.form.locationDesc"}}'
        // }),
        // //locationX and locationY
// 
        // captureDate : fields.number(
        // {
        // label : '{{t "add.form.captureDate"}}'
        // }
        // )
        // ,
        //hidden or show as timestamp
        // pubdate : fields.createdTime()
    });
