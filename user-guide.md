
# Mastersoft Address Magento2 User Guide

Mastersoft Address Autocomplete extension module for Magento2

## Features
- Autocomplete billing and shipping address in Checkout page
- Autocomplete address in My Account page for Customer's billing address and shipping address
- Only enabled when country is selected as Australia or New Zealand
- Configuration for address lookup options, such as Source of Truth
- Control user authorisation via Access Control List (ACL) rules
- Enable/Disable the module in Magento2 Admin

## Releases
- v1.0.x is compatible for Magento 2.2 (tested with Magento 2.2.4)
- v1.1.x is compatible for Magento 2.3 (tested with Magento 2.3.4 and 2.2.4)

## Installation
Go to your Magento2 Home (usually is in `/var/www/html` directory).

It is recommended to backup the existing composer.json in your Magento2 Home directory:
```bash
/var/www/html# cp composer.json composer.json.old
```

### Composer Installation
It is available in both [GitHub](https://github.com/MastersoftGroup/mastersoft-address-magento) and [Packagist](https://packagist.org/packages/mastersoft/address-widget#dev-master).

1. Make sure git is installed: `apt-get install git`.

2. (Optional) To install from GitHub: add this GitHub Repository link to Magento2 composer.json:
   ```bash
   composer config repositories.mastersoft vcs https://github.com/MastersoftGroup/mastersoft-address-magento
   ```

   This will append 'mastersoft' Repository reference with GitHub Repository URL in composer.json:
   ```javascript
   {
     ....
     "repositories": {
       "mastersoft": {
         "type": "vcs",
         "url": "https://github.com/MastersoftGroup/mastersoft-address-magento"
       }
     }
   }
   ```
   While to install from Packagist, there is no need to do this step.

3. To install the latest release: `composer require mastersoft/address-widget`.

   If you encounter this error:   
   > InvalidArgumentException: Could not find package mastersoft/address-widget at any version for your minimum-stability (stable). Check the package spelling or your minimum-stability.
   
   This is because there is no release yet, alternative option is to install from `dev-master` branch: 
   ```bash
   composer require mastersoft/address-widget:dev-master
   ```

   You can specify a specific version to be installed: `composer require <component-name>:<version>`.

If successful, you should find the module source in `/var/www/html/vendor/mastersoft/address-widget/` directory.

### Updating Existing Composer Installation
1. Update `./composer.json` with the version to be downloaded: `composer require mastersoft/address-widget:<version> --no-update`. For example to get the latest `mastersoft/address-widget` from `dev-master` branch: 
```bash
composer require mastersoft/address-widget:dev-master --no-update
```
2. Downloading and installing the specified `mastersoft/address-widget` version: `composer update`.
3. Clear the compiled code and cache in general: `php bin/magento setup:upgrade`.
4. **(For Production mode only)** Recompile your Magento project: `php bin/magento setup:di:compile`.
5. **(For Production mode only)** Deploy static files to `pub/static/` directory: 
   ``` bash
   php bin/magento setup:static-content:deploy en_AU en_US
   ```

If you know the files and content that have been updated in this new version, you should be able to verify in the module source:  `/var/www/html/vendor/mastersoft/address-widget/` directory.

If after this installation, the page is blank or encounter permission error or other errors, please follow some commands in [Post Installation](#post-installation).

### Manual Installation
1. Download the zip file in `ZIP` directory.
2. Unzip it in your Magento2 Home directory, it will merge with existing directories and files.

You should find the module source in `/var/www/html/app/code/Mastersoft/AddressWidget/` directory.
   
Alternatively, you can also use the zip file downloaded from GitHub:
1. In GitHub -> click `Clone or download` button on top right corner -> click `Download ZIP` link in GitHub
2. In Magento2 Home, create sub-directories `app/code/Mastersoft/AddressWidget/`.
3. Unzip the content of the zip file to `app/code/Mastersoft/AddressWidget/` directory. You should see `composer.json` and `registration.php` files directly in this directory.


### Post Installation
These steps must be followed after [Composer Installation](#composer-installation) or [Manual Installation](#manual-installation) steps above.

1. Verify `Mastersoft_AddressWidget` module is installed properly: `php bin/magento module:status`. It is now should be listed in the  Disabled Modules.

2. Enable the module: `php bin/magento module:enable Mastersoft_AddressWidget`.

3. Register the extension and update the database: `php bin/magento setup:upgrade`.

4. **(For Production mode only)** Recompile your Magento project: `php bin/magento setup:di:compile`.

5. **(For Production mode only)** Deploy static files to `pub/static/` directory: 
   ``` bash
   php bin/magento setup:static-content:deploy en_AU en_US
   ```
   This is very important for Production mode, otherwise your store and store admin will not load correctly because of some js and css files are not found, and users will not be able to load Checkout and edit Customer Address.

6. Verify `Mastersoft_AddressWidget` module is enabled: `php bin/magento module:status`. It is now should be listed in the Enabled Modules.

7. (Optional) Other commands maybe needed if the page is blank or encounter permission error or other errors:
   ``` bash
   php bin/magento cache:clean
   php bin/magento cache:flush
   chown -R :www-data var/cache
   chmod -R 777 app/ var/ pub/ generated/ 
   rm -rf var/cache/* var/page_cache/*
   ```
8. Update Mastersoft Address [Configuration](#configuration).

## Disabling/Enabling Module
There are 2 ways to disable/enable this module:
1. Magento Admin   
   Go to [Mastersoft Address Configuration](#configuration): in `Enable Module` field, select `No` to disable module or `Yes` to enable module, and click `Save Config` button.

   By disabling the module via Mastersoft Address Configuration, the module status is still enabled but it will not load the module javascript. 

   OR

2. Magento Command   
   To disable module: 
   ```bash
   php bin/magento module:disable Mastersoft_AddressWidget --clear-static-content
   php bin/magento setup:upgrade
   php bin/magento module:status
   ```

  You can enable the module easily by following the [Post Installation](#post-installation) steps.

## Uninstallation

Following these steps will fully uninstall this module: clean the module code, database, and any module references. You will need to follow the installation steps to be able to use this module again.

### Composer Uninstallation
**This will work only if the module was installed using Composer.**

1. Disable `Mastersoft_AddressWidget` module by following [Disabling/Enabling Module](#disablingenabling-module) using **Magento Command** steps.

2. Uninstall module: 
   ```
   php bin/magento module:uninstall Mastersoft_AddressWidget -r -c
   ```
   - `-r` or `--remove-data`: very important to remove the relevant configuration data stored in the database
   - `-c` or `--clear-static-content`: remove the static content
   - `--backup-db`: backup the Magento2 database
   - `--backup-code`: backup Magento file system (excluding `var` and `pub/static` directories)
   - `--backup-media`: backup `pub/media` directory
   
   These backup files will be stored in `var/backup/` directory.

   If the module was not installed using Composer, running this command will give an error. Continue the uninstallation by following the [Manual Uninstallation](#manual-uninstallation) steps.

3. Update database: `php bin/magento setup:upgrade`.

4. IMPORTANT: If the module source under `vendor/mastersoft/address-widget/` directory is still not deleted, run: 
   ```
   composer remove mastersoft/address-widget
   ```
   This will delete `mastersoft` directory under `vendor` directory and properly clean all module references in composer configuration files.

### Manual Uninstallation
1. Disable `Mastersoft_AddressWidget` module by following [Disabling/Enabling Module](#disablingenabling-module) using **Magento Command** steps.

2. Delete module source directory: 
   - Composer installation: `rm -rf vendor/mastersoft` or 
   - Manual installation: `rm -rf app/code/Mastersoft`

3. Clean database by logging in to magento2 database and execute these queries:
   ```sql
   // Delete module registration
   DELETE FROM setup_module WHERE module='Mastersoft_AddressWidget';
   
   // Delete module configuration
   DELETE FROM core_config_data WHERE path like 'Mastersoft_AddressWidget/%';
   ```
  
4. Remove module reference `Mastersoft_AddressWidget` in `app/etc/config.php`.

5. Compile the code and clear the cache
   ```
   php bin/magento setup:upgrade
   php bin/magento cache:flush
   ```
   
  
## Configuration
In Magento Admin Dashboard of your Store: `Stores` -> `Configuration` -> `Services` -> `Mastersoft Address`.

- **Licence Key** (Mandatory)  
  Default value: blank/empty. Must be in this format: **username-without-domain:password**.    
  **Get your FREE licence key [here](https://hosted.mastersoftgroup.com/console/#/).**  

- **URL** (Mandatory)    
  Default value: `https://hosted.mastersoftgroup.com`
  
- **Default Widget Options**    
  Generic Widget Options for both AUSTRALIA and NEW ZEALAND.    
  Default value: `{ singleLineHitNumber: 5, caseType: 'TITLE' }`

- **Widget Options for AUSTRALIA**  
  Default value: `{ sot: 'GNAF' }`

- **Widget Options for NEW ZEALAND**    
  Default value: `{ sot: 'NZPAF' }`

- **Enable Module**    
  Default value: `Yes`

All Widget Options must be in valid JSON format and must use single-quote for String value, **DO NOT use double-quote anywhere**. 

For Widget Options for certain country, if the same option key is defined in the Default Widget Options, the value in the Widget Options for certain country will take precedence over the value in the Default Widget Options.

To configure the Widget Options, here is the full list of [FeatureOption](http://developer.mastersoftgroup.com/harmony/api/object/address.html#FeatureOption) available.


## Setting ACL Rules

In Magento Admin Dashboard of your Store: `System` -> `User Roles` -> `Add/Edit Role` -> `Role Resources`.

Select `Custom` from `Resource Access` dropdown menu, you will see `Mastersoft Address Configuration` rule, which now you can assign to admin roles in the system, and those admin roles can be assigned to users.

When this `Mastersoft Address Configuration` rule is not checked for that particular role, whoever is assigned to this role will not be able to see and access the Mastersoft Address Configuration link and page.


## Support
If you have any questions or issues with this module, open an issue on [GitHub](https://github.com/MastersoftGroup/mastersoft-address-magento/issues). Alternatively you can contact us via e-mail or via our website below.

E-mail: <msg.support@gbgplc.com>  
Homepage: <https://www.mastersoftgroup.com/>

## Copyright
(c) 2020 Mastersoft



