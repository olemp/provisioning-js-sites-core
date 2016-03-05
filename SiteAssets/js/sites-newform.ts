/// <reference path="C:\code\provisioning-js-sites-core\typings\main.d.ts" />
"use strict";

var CreatePnPSubsite = function(title: string, url: string, inheritPermissions: boolean, templateId: number) {
    var clientContext = SP.ClientContext.get_current();
    var currentWeb = clientContext.get_web();
    var webCreateInfo = new SP.WebCreationInformation();
    webCreateInfo.set_description("");
    webCreateInfo.set_language(1033);
    webCreateInfo.set_title(title);
    webCreateInfo.set_url(url);
    webCreateInfo.set_useSamePermissionsAsParentSite(inheritPermissions);
    webCreateInfo.set_webTemplate("STS#0");
    var newWeb = currentWeb.get_webs().add(webCreateInfo);
    newWeb.get_allProperties().set_item("PnPTemplateId", templateId);
    newWeb.get_allProperties().set_item("PnPTemplateApplied", "0");
    var userCustomActions = newWeb.get_userCustomActions();
    var setupAction = userCustomActions.add();
    setupAction.set_location('ScriptLink');
    setupAction.set_sequence(100);
    setupAction.set_scriptSrc("~sitecollection/SiteAssets/js/sites-setup.js");
    setupAction.set_name("sites-setup.js");
    setupAction.set_title("sites-setup.js");
    setupAction.update();
    newWeb.update();
    clientContext.load(newWeb);
    clientContext.executeQueryAsync(
        () => {
            alert("Success");
        },
        (sender, args) => {
            alert("Error. See console");
            if(console && console.log) {
                console.log(sender, args);
            }
        });
}

var OnPnPSubsiteNewFormClick = function() {
    let title                   = jQuery("input[id*='Title']").val();
    let url                     = jQuery("input[id*='PnPURL']").val();
    let inheritPermissions      = jQuery("input[id*='PnPInheritPermissions']").prop("checked");
    let templateId              = jQuery("select[id*='PnPTemplate']").val();
    CreatePnPSubsite(title, url, inheritPermissions, templateId);
}

ExecuteOrDelayUntilBodyLoaded(function() {
    jQuery("#pageTitle").text("PnP Provisioning Client Side");
    jQuery("input[id*='SaveItem']").replaceWith("<input type='button' value='Create' onclick='OnPnPSubsiteNewFormClick()' />")
});