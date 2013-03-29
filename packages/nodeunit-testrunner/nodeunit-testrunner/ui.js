var nodeunit = require('nodeunit'), utils = require('./utils'), _ = require('underscore')._, $ = require('jquery');

exports.init = function(baseURL) {
    var testcase = getURLParameter("testcase");
    console.log(testcase);
    var ul = $('<ul id="modules" />');
    var modules = utils.getTestModuleNames();
    _.each(modules, function(name) {
        var li = $('<li>' + name + '</li>');
        li.click(function(ev) {
            exports.run({
                'tests' : require('tests/' + name)
            }, name);
        });
        ul.append(li);
    });

    var runall = $('<div id="runall">Run all tests</div>');
    runall.click(function() {
        exports.run(utils.getTestModules(), 'all');
    });

    $('#main').html('').append(ul).append(runall);

    //need to make sure modules.js loaded before here? no even manual test has this issue
    //considered "loaded", but actually not!
    //set m.loaded=true, but actually failed to load?
    //start load only after click test
    // $(document.ready) {
        if(testcase) {
            if(testcase == 'all') {
                console.log("run all");
                exports.run(utils.getTestModules(), 'all');
                return;
            } else {
                console.log("run single testcase:" + testcase);
            }
        }
    // };
};

function getURLParameter(name) {
    return decodeURI((RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]);
}

exports.run = function(modules, name) {
    $('#nodeunit-header').text('Tests: ' + name);
    $('#main').html('<h2 id="nodeunit-banner"></h2>' + '<h2 id="nodeunit-userAgent"></h2>' + '<ol id="nodeunit-tests"></ol>' + '<p id="nodeunit-testresult"></p>');
    nodeunit.run(modules);
};
