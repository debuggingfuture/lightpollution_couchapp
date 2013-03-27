/**
 * Module dependencies
 */

var utils = require('duality/utils'), handlebars = require('handlebars'), flashmessages;
var _ = require('underscore')._;

try {
    flashmessages = require('./flashmessages');
} catch (e) {
    // flashmessages module may not be available
}

/**
 * Synchronously render dust template and return result, automatically adding
 * baseURL to the template's context. The request object is required so we
 * can determine the value of baseURL.
 *
 * @name render(name, req, context)
 * @param {String} name
 * @param {Object} req
 * @param {Object} context
 * @returns {String}
 * @api public
 */

var i18n = require('i18next-node-kanso');

// log(utils.currentRequest().query.setLng);
// log("detect by i18" + i18n.detectLanguage())

// TODO
handlebars.registerHelper('t', function(str) {

    //Need to do it here since render before there
    //set programatically whenever changed
    log("translate str:" + str + " with locale:" + i18n.lng());
    log("result:" + i18n.t(str));
    return new handlebars.SafeString(i18n.t(str));
    // return i18n.t(str);

});
handlebars.registerHelper('isBrowser', utils.isBrowser);

exports.renderHTML = function(html, req, context) {
    log("req state , in templates.js");
/*
 * 
 * TODO Refactor locale detection
 */
    var locale = req.query.setLng;
    log("detect by i18" + i18n.detectLanguage())
    log(locale);
    i18n.init({
        lng : locale
    })

    context.userCtx = req.userCtx;
    if(!context.flashMessages && flashmessages) {
        context.flashMessages = flashmessages.getMessages(req);
    }

    var compiledTempalte = handlebars.compile(html);

    return compiledTempalte(context);

};

exports.render = function(name, req, context) {
    log("req state , in templates.js");

    var locale = req.query.setLng;
    log("detect by i18" + i18n.detectLanguage())
    log(locale);
    i18n.init({
        lng : locale,
        fallbackLng: 'en-US' 
    })

    handlebars.registerHelper('baseURL', function() {
        return utils.getBaseURL(req);
    });

    context.userCtx = req.userCtx;
    if(!context.flashMessages && flashmessages) {
        context.flashMessages = flashmessages.getMessages(req);
    }
    if(!handlebars.templates[name]) {
        throw new Error('Template Not Found: ' + name);
    }
    return handlebars.templates[name](context, {});
};
/*
 *
 * Copied from underscore
 */

var entityMap = {
    escape : {
        '&' : '&amp;',
        '<' : '&lt;',
        '>' : '&gt;',
        '"' : '&quot;',
        "'" : '&#x27;',
        '/' : '&#x2F;'
    },
    unescape : {
        '&amp;' : '&',
        '&lt;' : '<',
        '&gt;' : '>',
        '&quot;' : '"',
        "&#x27;" : "'",
        '&#x2F;' : '/'
    }
};

//not support in this unescape
// entityMap.unescape = _.invert(entityMap.escape);

var entityRegexes = {
    escape : new RegExp('[' + _.keys(entityMap.escape).join('') + ']', 'g'),
    unescape : new RegExp('(' + _.keys(entityMap.unescape).join('|') + ')', 'g')
};

exports._unescape = function(string) {
    var method="unescape";
    if(string == null)
        return '';
    return ('' + string).replace(entityRegexes[method], function(match) {
        return entityMap[method][match];
    });
};
