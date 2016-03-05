/// <reference path="C:\code\provisioning-js-sites-core\typings\main.d.ts" />
"use strict";
var AttemptConfiguration = function () {
    SP.SOD.registerSod('jquery-2.2.1.min.js', '//code.jquery.com/jquery-2.2.1.min.js');
    LoadSodByKey('jquery-2.2.1.min.js', function () {
        var promise = jQuery.ajax({ url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/allProperties?$select=PnPTemplateId,PnPTemplateApplied", type: 'get', headers: { accept: 'application/json;odata=verbose' } });
        promise.done(function (result) {
            var pnpconfig = result.d;
            if (pnpconfig.PnPTemplateApplied !== "0")
                return;
            var templateId = pnpconfig.PnPTemplateId;
            promise = jQuery.ajax({ url: _spPageContextInfo.siteAbsoluteUrl + "/_api/web/lists/getByTitle('SiteTemplates')/Items(" + templateId + ")?$select=FileLeafRef", type: 'get', headers: { accept: 'application/json;odata=verbose' } });
            promise.done(function (result) {
                var template = _spPageContextInfo.siteAbsoluteUrl + "/SiteTemplates/" + result.d.FileLeafRef;
                console.log("We will now call PnP.SharePoint.Provisioning.Core.applyTemplate() with URL '" + template + "'.");
            });
        });
    });
};
ExecuteOrDelayUntilBodyLoaded(AttemptConfiguration);
