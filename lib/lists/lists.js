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
    var rows = getRows();
    var doc = rows[0].doc;

    return {
        title : doc.title,
        // content : templates.render('spot.html', req, {
        // doc : doc,
        // nav : 'blog'
        // })
    };

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
        row.value.pp_date = new Date(row.value.pubdate).toDateString();

        return row;
    });

    return {
        title : 'spots',
        content : templates.render('spots.html', req, {
            rows : rows
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
