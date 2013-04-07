/*
* provide client with settings applied
*/


var webdriverjs = require("webdriverjs");
var settings = require("./settings");
	//var client = webdriverjs.remote({host: "xx.xx.xx.xx"}); // to run it on a remote webdriver/selenium server
	var client = webdriverjs.remote(settings); // to run in chrome

exports.client = client;
