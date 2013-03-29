var updates = require('lib/update');

exports['test for nodeunit working'] = function(test) {
    test.ok(true, 'everything is ok');
    test.done();
};

exports['test for add form'] = function(test) {
    // var req={form:{a:"b"}};
    var req={form:{"title":"a","locationDesc":"b"}};
    //coupling with form logic
    //possible: req also generated using the form
    //fill using "addForm"
    test.equal(updates.update_my_form(null,req), 'hello bar');
    test.done();

};

