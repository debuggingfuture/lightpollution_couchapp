/*
 * add spot test
 */
var client = require("./webdriverjs_client").client;
var log = console.log;
var baseURL = "http://localhost:5984/light/_design/light-app/_rewrite/";

//Still wont work , as delet session for long time e.g. 1000sec
var explicitWait = function(time, cb) {
    setTimeout(cb, time);
}
/*
 * TEMP fix for page object pattern
 */
/*
 *
 * TODO create page obj prototype
 */
var addPage = function(test) {

    page = {
        load : function() {
            //this will bound to addPage not client
            client.getTitle(function(title) {
                test.equal(title, 'Light Pollution Map | Add')
            }).click("#openModal").waitFor('#myModal', 5000, function(result) {
            }).isVisible('#myModal', function(displayed) {
                test.ok(displayed)
            })
            return page;
        },
        add : function() {

            //TODO isLoaded()

            page.load().resetValue('title', 'Dummy Title').resetValue('location', 'Chek Lap Kok Airport, Hong Kong').resetValue('description', 'Lights on');
            page.resetValue('capture_date', '11/11/2013');
            page.resetValue('capture_time', '00:00');
            // .selectDate(); TODO yet to work

            //use double clik to make sure not focus on pickers
            //TODO but actually still failed to submit

            client.submitForm('#addForm').getText('#addModalBody', function(result) {
                console.log(result);
                test.ok(result.value.indexOf("success") !== -1, "contains the word success");
                test.done();
            });
            // client.click("#mark").getText('#addModalBody', function(valueOfBody) {
            // console.log("almost");
            // console.log(valueOfBody);
            // test.done();
            // });
            //assert

            //when select Date, this has higher priority..why?
        }, //TODO auto load fields into var, use sth like title:{selector, element} then get by element?
        fields : function(name) {
            return page.fields_selector[name];
        },
        fields_selector : {//potential: get from the form objects the ids, but that is not black box
            title : '#id_title',
            location : '#id_location',
            description : '#id_description',
            capture_date : '#id_capture_date',
            capture_time : '#id_captureDateTime'
        },
        selectDate : function() {
            console.log("select date")
            var printDateValue = function() {
                client.getText('.ui-datepicker-calendar a:first', function(value) {
                    console.log("linkValue");
                    //value is -1...not found?
                    console.log(value);
                    client.click('.ui-datepicker-calendar a:first', function() {
                        client.getValue(page.fields('capture_date'), function(result) {
                            console.log(result.value);
                            //assert - has Success
                      
                            test.done();
                        });

                    });
                    //NOT WORKING, not sure why
                });
            }
            client.click(page.fields('capture_date')).waitFor('.ui-datepicker-calendar', 3000, function() {
                explicitWait(1000, printDateValue);
            });
            //here will register in init of this page object
            // explicitWait(3000, printDateValue);
            // TODO waitFor enabled

            // var capture_date_value = client.getValue(page.fields('capture_date'));
            // console.log("capture_date =" + capture_date_value);

        },
        resetValue : function(fieldName, value) {
            var field = page.fields(fieldName);
            client.clearElement(field).setValue(field, value)
            return page;
            //should in client instead
        }
    }
    return page;
}
client.addCommand("addSpotInModal", function(test, cb) {
    addPage(test).add();
    if( typeof cb == "function") {
        cb();
    }
    //put test done here will skip inside assertion
});

//
// var openModal = function(callback) {
// this.setValue('#gbqfq', 'cheese').click('#gbqfb').waitFor('#resultStats', 5000, function(result) {
// }).getTitle(function(title) {
//
// test.equal(title, 'cheese - Google Search');
// //can assert here, or
// //may pass grouped result for further validation. better move test.done() away in this casss
// callback(title);
// });
// };
// client.addCommand("enterCheeseAndSearch", enterCheeseAndSearch);
//

exports['add test'] = function(test) {
    var url = baseURL + "spots/add";
    client.init().url(url).addSpotInModal(test);
    // client.end();
    //client ended before inside done? only due to async flush of log? but when end disabled the error can be reproduce
};

exports['tearDown'] = function(callback) {
    // clean up
    console.log("test finish");
    // client.end();
    callback(null);
}

