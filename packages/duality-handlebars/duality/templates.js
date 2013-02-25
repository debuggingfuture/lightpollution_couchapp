/**
 * Module dependencies
 */

var utils = require('duality/utils'), handlebars = require('handlebars'), flashmessages;

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

exports.render = function(name, req, context) {
    log("req state , in templates.js");

    var locale = req.query.setLng;
    log("detect by i18" + i18n.detectLanguage())
    log(locale);
    i18n.init({
        lng : locale
    })

    handlebars.registerHelper('baseURL', function() {
        return utils.getBaseURL(req);
    });

    // TODO
    handlebars.registerHelper('t', function(str) {

        //Need to do it here since render before there
        //set programatically whenever changed
        log("translate str:" + str+" with locale:"+i18n.lng());
        log("result:"+i18n.t(str))
        return i18n.t(str);

    });
    handlebars.registerHelper('isBrowser', utils.isBrowser);
    context.userCtx = req.userCtx;
    if(!context.flashMessages && flashmessages) {
        context.flashMessages = flashmessages.getMessages(req);
    }
    if(!handlebars.templates[name]) {
        throw new Error('Template Not Found: ' + name);
    }
    return handlebars.templates[name](context, {});
};

