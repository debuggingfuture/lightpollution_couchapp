var templates = require('duality/templates'), dutils = require('duality/utils');
//

/*
* fetches all rows from the view and returns as an array, after mapping each
* row through iterator
*/

//TODO: pagination later?

var getRows = function(iterator) {
    var row, rows = [];
    while( row = getRow()) {
        if(iterator) {
            row = iterator(row);
        }
        rows.push(row);
    }
    return rows;
};

//use row.value vs use row.doc
var processSpotRow = function(row) {
    row.value.upload_date = new Date(row.value.upload_date_timestamp).toDateString();
    row.value.capture_date = new Date(row.value.captureDateTime).toDateString();
    //tags
    var current = new Date().getTime();
    var A_WEEK_IN_MS = 604800000;
    //1000* 60 *60 * 24 *7
    if(current - row.value.upload_date_timestamp < A_WEEK_IN_MS) {
        row.value.newTag = true;
    }
    // if(row.value.upload_date_timestamp<1){
    row.value.seriousTag = true;
    // }
    // row.value.imagelink = createImageLink(row.value._id, row.value.image_name);
    return row;
}
// var createImageLink = function(id, name) {
    // var link = "" + id + "/" + name;
    // return link;
// }

exports.spot = function(head, req) {

    if(req.client && req.initial_hit) {
        // no need for double render on first hit
        return;
    }
    start({
        code : 200,
        headers : {
            'Content-Type' : 'text/html'
        }
    });
    var rows = getRows(function(row) {
        row = processSpotRow(row);
        return row;
    });

    var resultRows = [];
    resultRows.push(rows[0]);

    log('[DEBUG]doc');
    log(resultRows);

    return {
        title : rows[0].value.title,
        content : templates.render('spots.html', req, {
            rows : resultRows
        })
    };

}

exports.spots_json = function(head, req) {
    // even just return used base.html?

    //also force json
    req.no_base = true;

    var rows = getRows(function(row) {
        return row;
    });

    return rows;
}

exports.spots = function(head, req) {
    if(req.client && req.initial_hit) {
        // no need for double render on first hit
        return;
    }
    start({
        code : 200,
        headers : {
            'Content-Type' : 'text/html'
        }
    });

    var rows = getRows(function(row) {
        row = processSpotRow(row);
        return row;
    });

    //Paging

    var PAGING_SIZE = 3;
    var startkey;
    if(rows.length > 0) {
        startkey = rows[0].key;
    }

    //1st page if no startkey

    var next_startkey = null;
    if(rows.length > PAGING_SIZE) {//query size
        var lastDoc = rows.pop();
        next_startkey = lastDoc.key;
        var next_startkey_docid = lastDoc._id;
        log(next_startkey_docid);
    }
    log("[DEBUG][_lists]result");
    log(rows);

    log("[IMPORTANT]");
    var prevkey;
    //put link creation logic in client side

    return {
        title : 'spots',
        //TODO group navigation logic? no, just hard code there
        // home: 'home',
        // lightPollution: 'light_pollution',
        content : templates.render('spots.html', req, {
            rows : rows,
            prevkey : prevkey,
            startkey : startkey,
            next_startkey : next_startkey
        })
    };
};

exports.main = function(head, req) {
    if(req.client && req.initial_hit) {
        // no need for double render on first hit
        return;
    }
    start({
        code : 200,
        headers : {
            'Content-Type' : 'text/html'
        }
    });

    var rows = getRows(function(row) {

        return row;
    });

    return {
        title : 'spots',
        content : templates.render('index.html', req, {
            rows : rows
        })
    };

};
