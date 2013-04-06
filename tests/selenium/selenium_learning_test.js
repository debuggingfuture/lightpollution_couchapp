var webdriverjs = require("webdriverjs");
var settings = require("./settings");

exports['selenium learning test'] = function(test){
	//var client = webdriverjs.remote({host: "xx.xx.xx.xx"}); // to run it on a remote webdriver/selenium server
	var client = webdriverjs.remote(settings); // to run in chrome
	var url = "http://www.google.com";
	client.init().url(url).getTitle(function(title){
console.log(title)
test.equal(title, 'Google');
test.done();
}).end();




};



