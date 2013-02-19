//slug is rerserved word, use :slug
module.exports = [{
    from : '/favicon.ico',
    to : 'static/favicon.ico'

}, {
    from : '/static/*',
    to : 'static/*'
}, {
    from : '/files/*',
    to : 'files/*'
}, {
    from : '/spots',
    to : '_list/spots/spots_by_pubdate',
    query : {
        descending : 'true'
    }
}, {
    from : '/about',
    to : '_show/about'
}, {
    from : '/',
    to : '_list/spots/spots_by_pubdate',
    query : {
        descending : 'true'
    },
}, {
    from : '/spots/add',
    to : '_show/add',
},

// {
// from : '/spots/:slug/image',
// to : '_show/image/:slug'
// },
{
    from : '/spots/:slug/image',
    to : '_db/:slug/attachment'
}, {
    from : '/spots/:slug/view',
    to : '_list/spots/spots_by_pubdate',
    query : {
        startslug : [':slug'],
        endslug : [':slug', {}],
        limit : '1',
        include_docs : 'true'
    }
}, {
    from : '/spots/:slug/add',
    to : '_show/edit',
    query : {
        startslug : [':slug'],
        endslug : [':slug', {}],
        limit : '1',
        include_docs : 'true'
    }
}];
