var client = require("./webdriverjs_client").client;
var url = "http://www.google.com/ncr";
//ncr for no redirection

//pure selenium test, run with node
client.testMode().init().url(url).tests.titleEquals("Google", "Title is Google").end();

// }

/*
 * TO be run by Nodeunit
 */
exports['webdriverjs learning test'] = function(test) {
    client.init().url(url).getTitle(function(title) {
        console.log(title)
        test.equal(title, 'Google');
        test.done();
    }).end();

};

exports['return false for non-exist element getAttr'] = function(test) {
    // RESULT              "NoSuchElement" -- how to get this?
    client.init().url(url).getAttribute('#non-exist', 'display123', function(result) {
        console.log(result);
        test.equal(result, false);
        test.done();
    }).end();

}
exports['webdriverjs can use selenium to execute js inside the page'] = function(test) {
    var js = 'return document.getElementById(\'gbqfsa\');';
    client.init().url(url).execute(js, function(value) {
        console.log(value);
        //value is only selenium response, not able to get value of js
        test.done();
    }).end();

}
exports['can use addCommand to encapsulate test logic'] = function(test) {
    var enterCheeseAndSearch = function(callback) {
        this.setValue('#gbqfq', 'cheese').click('#gbqfb').waitFor('#resultStats', 5000, function(result) {
        }).getTitle(function(title) {

            test.equal(title, 'cheese - Google Search');
            //can assert here, or
            //may pass grouped result for further validation. better move test.done() away in this casss
            callback(title);
        });
    };
    client.addCommand("enterCheeseAndSearch", enterCheeseAndSearch);

    client.init().url(url).enterCheeseAndSearch(function(value) {
        console.log(value)
        test.done()
    }).end();

}
// will call assert inside, and capture by nodeunit?

// exports['return false for non-exist element getAttr'] = function(test) {
// RESULT              "NoSuchElement"

