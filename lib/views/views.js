exports.spots_by_pubdate = {
	map : function(doc) {
	    log("spots_by_pubdate")
		if (doc.type == "lightspot" && doc.pubdate) {
			timestamp = new Date(doc.pubdate).getTime()
			// emit whole doc for simplicity at the moment
			emit(timestamp, doc);
		}
	}
};
// 
// 
// exports.spots_image = {
    // map : function(doc) {
        // if (doc.type == "lightspot" && doc._attachments) {
            // // emit whole doc for simplicity at the moment
            // emit(timestamp, doc);
        // }
    // }
// };



//_attachments

// exports.all_spots_wit = {
// map : function(doc) {
// if (doc.title && doc.locationX && doc.locationY) {
// if (doc.type == "spot") {
// emit(doc._id, doc);
// }
// }
// }
// };
