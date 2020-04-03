'use strict';
logger.debugEnabled=true;
CONFIG.set('use_i18n', true);
CONFIG.set('modalBasePath','');
CONFIG.set('i18n_languages',['es']); //only list the languages that are not english
CONFIG.set('quickcorp_cloud_domain','https://cloud.quickcorp.org/');
CONFIG.set('quickcorp_github_api','https://api.github.com/orgs/QuickCorp/');
CONFIG.set('atomshopify_url','shopify/atom');
CONFIG.set('relativeImportPath', 'js/packages/');
CONFIG.set('componentsBasePath', 'templates/components/');
CONFIG.set('delayForReady', 1); // delay to wait before executing the first ready event, it includes imports
CONFIG.set('preserveComponentBodyTag', false); // don't use <componentBody></componentBody> tag
CONFIG.set('useConfigService', false); // Load settings from config.json
CONFIG.set('routingWay','hash');
CONFIG.set('useSDK',true);
CONFIG.set('useLocalSDK',false);
CONFIG.set('tplextension','tpl.html');
CONFIG.set('asynchronousImportsLoad',true);
CONFIG.set('serviceWorkerURI','/sw.js'); //QCObjects will register an launch this service worker automatically to work offline
Component.cached=true;
/**
 * Main import sentence.
 */
Import('org.quickcorp.custom');

Ready(function() {
    window.onpopstate = function (event) {
        event.stopImmediatePropagation();
        event.stopPropagation();
        Component.route();
    }

});
