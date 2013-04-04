exports.spots_by_pubdate = {
	map : function(doc) {
	    log("spots_by_pubdate")
		if (doc.type == "lightspot" && doc.upload_date_timestamp) {
			timestamp = doc.upload_date_timestamp;
			// emit whole doc for simplicity at the moment
			
            
			emit(timestamp, doc);
		}
	}
};

exports.spots_by_slug = {
    map : function(doc) {
        if(doc.type === 'lightspot') {
            emit([doc._id], doc);
            // , new Date(doc.pubdate).getTime()
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
