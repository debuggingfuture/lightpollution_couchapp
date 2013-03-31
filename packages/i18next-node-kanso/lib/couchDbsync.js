var cradle = {}
var db = require('db');

module.exports = {
    getDBURL : function(req) {
        return utils.getBaseURL(req) + '/_db';
    },
    // __connect:__ connects the underlaying database.
    //
    // `storage.connect(callback)`
    //
    // - __callback:__ `function(err, storage){}`
    connect : function(options, callback) {
        this.isConnected = false;

        if( typeof options === 'function')
            callback = options;

        var defaults = {
            host : 'http://localhost',
            port : 5984,
            dbName : 'i18next',
            resCollectionName : 'resources'
        };

        options = mergeOptions(options, defaults);

        var defaultOpt = {
            cache : true,
            raw : false//,
            // secure: true,
            // auth: { username: 'login', password: 'pwd' }
        };

        options.options = options.options || {};

        options.options = mergeOptions(options.options, defaultOpt);

        this.resCollectionName = options.resCollectionName;

        var self = this;

        var client = new (cradle.Connection)(options.host, options.port, options.options);
        var db = client.database(options.dbName);
        db.exists(function(err, exists) {

            function finish() {
                self.client = client;
                self.db = db;
                self.isConnected = true;

                if(callback) {
                    return callback(null, self);
                }
            }

            if(err) {
                if(callback) {
                    return callback(err);
                }
            } else if(!exists) {
                db.create(function(err) {
                    finish();
                });
            } else {
                finish();
            }
        });
    },
    saveResourceSet : function(lng, ns, resourceSet, cb) {
        var id = ns + '_' + lng;
        var self = this;
        // this.db.get(this.resCollectionName + ':' + id, function (err, res) {
        // self.db.save(res._id, res._rev, resourceSet, cb);
        // });

    },
    fetchOne : function(lng, ns, cb) {

        var id = ns + '_' + lng;
        var self = this;

        //Hardcode

        // var appdb = db.use(this.getDBURL(req));
        // appdb.getDoc("4c38c9943bd348d2c570ec53c57cb50c", req.query, function (err, doc) {
        // });
        // var current_req = (utils.currentRequest() || {});
        // if (current_req.uuid === req.uuid) {
        // if (err) {
        // return callback(err);
        // }
        // var res = exports.runShow(fn, doc, req);
        // events.emit('afterResponse', info, req, res);
        // if (res) {
        // exports.handleResponse(req, res);
        // }
        // else {

        // var req={headers:{},query:{db:"light",ddoc:"light-app"}, path:"1"}
        //Once I changed into core2 instead it works!?

        //detection seems client side  only

        var utils = require('duality/utils');
        var core = require('duality/core2');
        var req = (utils.currentRequest() || {});
        log(req);

        function getGlobal() {
            return (function() {
                return this;
            }).call(null);
        }

        var global = getGlobal();
        // log("global");
        //in this case even if I repeat the request I should got same res correct?
        // res will be returned as fn(head, req);
        //1st arg is the list fx itself..not loading from lists.js

        //Try with some other request?
        //How to do a app state? for locale

        //Another problem: considered no change, even locale may changed?

        // var res = core.runList(function(head, req) {
        //
        // //defined but rows is null
        // var rows = getRow();
        //
        // log("rows" + rows)
        // // var doc = rows[0].doc;
        //
        // }, null, req);
        // log(req)//do have sth
        // log("res:" + res)
        //
        //
        //
        // if(res) {
        // core.handleResponse(req, res);
        // }

        // self.functions.log('loaded from redis: ' + res);
        //

        //Super Dirty workaround, better use i18n.init({ resStore: resources });
        //TODO render form db (this db or other db using list / show / connection )

        //load during build
        //load from static file
        //meed to do this to change server 's lng? i18next.setLng(lng, callback)

        // since whenever exist will be used for fall back e.g pass both en-US and en-110,
        //harder to match should talk higher priority

        log("couchid:" + id + "lng:" + lng)
        if(lng == "en-US") {
            res = {
                "app" : {
                    "name" : "Light Pollution Map"
                },
                "header1" : {
                    "title" : "Hong Kong Light Pollution Map",
                    "desc" : "Database for reporting the light pollution black spots in Hong Kong"
                },
                "header2" : {
                    "title" : "Brigther after light out",
                    "desc" : "Database for reporting the light pollution black spots in Hong Kong"
                },
                "nav" : {
                    "home" : "Home",
                    "light_pollution" : "Light Pollution",
                    "add" : "Add",
                    "search" : "Search"
                },
                "about" : {
                    "heading1" : "Light pollution",
                    "desc1" : "is any adverse effect of artificial light, including sky glow, glare, light trespass, light clutter, decreased visibility at night and energy waste.",
                    "desc_sub1" : "Give us the details about the light pollution spot. Let the media follow up.",
                    "desc_link1" : "Definition by International Dark SKy Association",
                    "heading2" : "Energy Waste",
                    "desc2" : "Light Pollution",
                    "desc_sub2" : "Light Pollution",
                    "heading3" : "Impact on Astronomy",
                    "desc3" : "People don't believe they can see the Milky way in Hong Kong. It is possible but not any more if light pollution is getting worse.",
                    "desc_sub3" : "Light Pollution",
                    "heading4" : "To Know more",
                    "desc4" : "Visit these websites",
                    "desc_link4" : "Earth hour",

                },
                "add" : {
                    form : {
                        "title" : "Title",
                        "desc" : "Description",
                        "locationDesc" : "Locaiton",
                        "captureDate" : "Capture Date"
                    },
                    "title" : "Mark the light pollution spot on the map.",
                    "desc" : "Your actions make the world a beter place.",
                    "desc_sub" : "Give us the details about the light pollution spot. Let the media follow up.",
                    "mark" : "Mark Light Pollution Spot",
                    "mark_now" : "Mark Now",
                    "submit" : "Mark"
                }

            };
        } else {
            res = {
                "app" : {
                    "name" : "香港光害地圖"
                },
                "header1" : {
                    "title" : "香港光害地圖",
                    "desc" : "舉報香港光害黑點"
                },
                "header2" : {
                    "title" : "Hong Kong Light Pollution Map"
                },
                "nav" : {
                    "home" : "目錄",
                    "light_pollution" : "關於光污染",
                    "add" : "舉報黑點",
                    "search" : "搜尋"
                },
                "add" : {
                    form : {
                        "title" : "標題",
                        "desc" : "光害情況",
                        "locationDesc" : "地點",
                        "captureDate" : "Capture Date",
                        "formatted_address":"圖標地址"
                    },
                    "title" : "在地圖舉報光害黑點",
                    "desc" : "令香港成為一個更少污染的城市",
                    "desc_sub" : "舉報光害黑點，讓傳媒及市民監察",
                    "mark" : "舉報光害黑點",
                    "mark_now" : "舉報",
                    "submit" : "舉報"
                }
            };
        }
        cb(null, res);

        // this.db.get(this.resCollectionName + ':' + id, function (err, res) {
        // if (err && err.error !== 'not_found') {
        // cb(err);
        // } else {
        // if(!res) {
        // cb(null, { });
        // } else {
        // self.functions.log('loaded from redis: ' + id);
        // cb(null, res);
        // }
        // }
        // });
    },
    saveMissing : function(lng, ns, key, defaultValue, callback) {
        // add key to resStore
        // var keys = key.split(this.options.keyseparator);
        // var x = 0;
        // var value = this.resStore[lng][ns];
        // while (keys[x]) {
        // if (x === keys.length - 1) {
        // value = value[keys[x]] = defaultValue;
        // } else {
        // value = value[keys[x]] = value[keys[x]] || {};
        // }
        // x++;
        // }
        //
        // var self = this;
        // this.saveResourceSet(lng, ns, this.resStore[lng][ns], function(err) {
        // if (err) {
        // self.functions.log('error saving missingKey `' + key + '` to redis');
        // } else {
        // self.functions.log('saved missingKey `' + key + '` with value `' + defaultValue + '` to redis');
        // }
        // if (typeof callback === 'function') callback(err);
        // });
    },
    postChange : function(lng, ns, key, newValue, callback) {
        // var self = this;
        //
        // this.load([lng], {ns: {namespaces: [ns]}}, function(err, fetched) {
        // // change key in resStore
        // var keys = key.split(self.options.keyseparator);
        // var x = 0;
        // var value = fetched[lng][ns];
        // while (keys[x]) {
        // if (x === keys.length - 1) {
        // value = value[keys[x]] = newValue;
        // } else {
        // value = value[keys[x]] = value[keys[x]] || {};
        // }
        // x++;
        // }
        //
        // self.saveResourceSet(lng, ns, fetched[lng][ns], function(err) {
        // if (err) {
        // self.functions.log('error updating key `' + key + '` to redis');
        // } else {
        // self.functions.log('updated key `' + key + '` with value `' + newValue + '` to redis');
        // }
        // if (typeof callback === 'function') callback(err);
        // });
        // });
    },
    postRemove : function(lng, ns, key, callback) {
        // var self = this;
        //
        // this.load([lng], {ns: {namespaces: [ns]}}, function(err, fetched) {
        // // change key in resStore
        // var keys = key.split(self.options.keyseparator);
        // var x = 0;
        // var value = fetched[lng][ns];
        // while (keys[x]) {
        // if (x === keys.length - 1) {
        // delete value[keys[x]];
        // } else {
        // value = value[keys[x]] = value[keys[x]] || {};
        // }
        // x++;
        // }
        //
        // self.saveResourceSet(lng, ns, fetched[lng][ns], function(err) {
        // if (err) {
        // self.functions.log('error removing key `' + key + '` to redis');
        // } else {
        // self.functions.log('removed key `' + key + '` to redis');
        // }
        // if (typeof callback === 'function') callback(err);
        // });
        // });
    }
};

// helpers
// var handleResultSet = function(err, res, callback) {
//     if (err) {
//         callback(err);
//     }
//     else if (res && res.length > 0) {
//         var arr = [];

//         res.forEach(function(item) {
//             arr.push(JSON.parse(item));
//         });

//         callback(null, arr);
//     }
//     else {
//         callback(null, []);
//     }
// };

var mergeOptions = function(options, defaultOptions) {
    if(!options || typeof options === 'function') {
        return defaultOptions;
    }

    var merged = {};
    for(var attrname in defaultOptions) {
        merged[attrname] = defaultOptions[attrname];
    }
    for(attrname in options) {
        if(options[attrname])
            merged[attrname] = options[attrname];
    }
    return merged;
};
