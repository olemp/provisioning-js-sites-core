# Introduction
This repo contains the resources you need to get started with using github.com/olemp/js-sites-core.

# How to deploy
The template.xml is the main file.

This is the file that you want to apply to your site collection using PnP-PowerShell (https://github.com/OfficeDev/PnP-PowerShell).

* cd .../provisioning-js-sites-core
* Connect-SPOnline **[URL of your site collection]** -Credentials **(Get-Credential)**
* Apply-SPOProvisioningTemplate .\template.xml

# What will be deployed?
### Site Fields
Name|Type|Description
--------|----|-----------
Key|string|Key field used in Provisioning Settings List
Value|string|Value field used in Provisioning Settings List
URL|string|Used in Provisioning List
Inherit Permissions|boolean|Used in Provisioning List
Template|Lookup|Lookup to the Site Templates List

### Content Types
Name|Description
--------|-----------
Config|Used in Provisioning Settings List
Subsite|Used in Sites List
Template|Used in Site Templates List

### Lists
Name|Description
--------|-----------
SiteTemplates|Your templates (.txt files)
ProvisioningSettings|Used for Provisioning Settings
Sites|Used for creating new sites

### Files
Name|Description
--------|-----------
sites-setup.js|Handles configuration. Uses js-sites-core to add site modificatins
sites-newform.js|Handles provisioning of new sites
sites-newform.css|Styling on the NewForm of Lists/Sits
sites-newform.txt|Added in a CEWP in the NewForm of Lists/Sites
