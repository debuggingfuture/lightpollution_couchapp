//function(head, req) {
//	var Mustache = require("vendor/couchapp/lib/mustache");
//	var ddoc = this;
//	var List = require("vendor/couchapp/lib/list");
//	var path = require("vendor/couchapp/lib/path").init(req);
//	var markdown = require("vendor/couchapp/lib/markdown");
//	// var textile = require("vendor/textile/textile");
//
//	var indexPath = path.list('blackspot', 'all-spots', {
//		descending : true,
//		limit : 10
//	});
//	// single spot
//	provides("html", function() {
//
//		var spot = getRow().value;
//		if(spot) {
//			if(spot.type != "spot") {
//				throw (["error", "not_found", "not a post, but " + spot.type + "id" + spot._id]);
//			} else {
//				// html is obj not the page
//				var html = Mustache.escape(spot.html);
//			}
//
//
//			var blackspot = {
//				// TODO row
//				title : spot.title,
//				author : spot.author,
//				spot_id : spot._id,
//				html : html,
//				locationX : spot.locationX,
//				locationY : spot.locationY,
//				assets : path.asset()
//			};
//
//			return Mustache.to_html(ddoc.templates.blackspot, blackspot);
//
//		}
//	});
//
//}