/// <reference path="C:\code\provisioning-js-sites-core\typings\main.d.ts" />
"use strict";

var ProvisioningSettings = function() {
    var def = jQuery.Deferred();
    var promise = jQuery.ajax({ url: `${_spPageContextInfo.siteAbsoluteUrl}/_api/web/lists/getByTitle('ProvisioningSettings')/Items?$select=PnPKey,PnPValue`, type: 'get', headers: { accept: 'application/json;odata=verbose' } });;
    promise.done(response => {
        var settings = {};
        response.d.results.forEach((item) => {
            settings[item.PnPKey] = item.PnPValue;
        });
        def.resolve(settings);
    });
    return def.promise();
}

var WebProperties = function() {
    var def = jQuery.Deferred();
    var promise =  jQuery.ajax({ url: `${_spPageContextInfo.webAbsoluteUrl}/_api/web/allProperties?$select=PnPTemplateId,PnPTemplateApplied`, type: 'get', headers: { accept: 'application/json;odata=verbose' } });;
    promise.done(response => {
       def.resolve(response.d); 
    });
    return def.promise();
}

var AttemptConfiguration = function() {
    SP.SOD.registerSod('jquery-2.2.1.min.js', '//code.jquery.com/jquery-2.2.1.min.js');
    LoadSodByKey('jquery-2.2.1.min.js', () => {        
        jQuery.when.apply(jQuery, [ProvisioningSettings(), WebProperties()]).then((settings, propertyBag) => {           
            if(propertyBag.PnPTemplateApplied !== "0") return;
            var templateId = propertyBag.PnPTemplateId;
            jQuery.ajax({ url: `${_spPageContextInfo.siteAbsoluteUrl}/_api/web/lists/getByTitle('${settings.PnPTemplateListName}')/Items(${templateId})/File?$select=ServerRelativeUrl`, type: 'get', headers: { accept: 'application/json;odata=verbose' } }).done(result => {
               var template = result.d.ServerRelativeUrl;
               console.log(`We will now call PnP.SharePoint.Provisioning.Core.applyTemplate() with URL '${template}'.`)
               console.log("Printing ProvisioningSettings:");              
               console.log(settings);
            });
        })
    });
};
ExecuteOrDelayUntilBodyLoaded(AttemptConfiguration);