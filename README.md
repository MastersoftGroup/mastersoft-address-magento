# mastersoft-address-magento
Mastersoft Address Autocomplete extension or module for Magento2

It is recommended to backup the existing composer.json in your Magento2 Home directory:
`/var/www/html# cp composer.json composer.json.old`

## Composer Installation
1. Make sure git is installed: `apt-get install git`

2. (Optional) To install from GitHub: add this GitHub Repository link to Magento2 composer.json:
```
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
Since this module is also available in Packagist, there is no need to do this step to install from Packagist.

3. To install the latest release: `composer require mastersoft/address-widget`

If you encounter this error:
```
InvalidArgumentException: 
Could not find package mastersoft/address-widget at any version for your minimum-stability (stable). Check the package spelling or your minimum-stability.
```
This is because of there is no release yet, alternative option is to install from `dev-master` branch: 
```composer require mastersoft/address-widget:dev-master```

You can specify a specific version to be installed: `composer require <component-name>:<version>`

If successful, you should find the module source in `/var/www/html/vendor/mastersoft/address-widget/` directory.

## Manual Installation
1. Download the zip file in `ZIP` directory.
2. Unzip it in your Magento2 Home directory, it will merge with existing directories and files.

You should find the module source in `/var/www/html/app/code/Mastersoft/AddressWidget/` directory.

## Post Installation

1. Verify `Mastersoft_AddressWidget` module has been installed properly: `php bin/magento module:status`
`Mastersoft_AddressWidget` module should be listed under disabled module list.

2. Enable the module: `php bin/magento module:enable Mastersoft_AddressWidget`

3. Register the extension and update the database: `php bin/magento setup:upgrade`

4. (For Production mode only) Recompile your Magento project: `php bin/magento setup:di:compile`

5. Verify `Mastersoft_AddressWidget` module is enabled: `php bin/magento module:status`
`Mastersoft_AddressWidget` module should be listed under enabled module list.

6. (Optional) Other commands maybe needed if the page is blank or encounter permission error or other errors:
```
php bin/magento cache:clean
php bin/magento cache:flush
chown -R www-data:www-data var/cache
chmod -R 777 app/ var/ pub/ generated/ 
rm -rf var/cache/* var/page_cache/*
```

### Disabling/Enabling Module
There are 2 ways to disable this module:
1. Via Admin Store Dashboard
Login to the Admin Dashboard of your Store --> go to Stores --> Configuration --> Services --> Mastersoft Address: in `Enable Module` field, select `No` to disable module or select `Yes` to enable module, and click `Save Config` button.

By disabling the module via Mastersoft Address Configuration, the module status is still enabled but it will not load the module javascript. 

OR

2. Via Magento Command
To disable module: 
```
php bin/magento module:disable Mastersoft_AddressWidget --clear-static-content
php bin/magento setup:upgrade
php bin/magento module:status
```

You can enable the module easily by following the **Post Installation** steps.

### Composer Uninstallation
**This will work only if the module has been installed using Composer**

1. Disable `Mastersoft_AddressWidget` module by following **Disabling/Enabling Module Via Magento Command** steps.

2. Uninstall module: `php bin/magento module:uninstall Mastersoft_AddressWidget -r -c`
`-r` or `--remove-data` is necessary to remove the relevant configuration data stored in the database.

Other optional parameters:
- `--backup-db`: backup the Magento2 database
- `--backup-code`: backup Magento file system (excluding `var` and `pub/static` directories)
- `--backup-media`: backup `pub/media` directory
These backup files will be stored in `var/backup/` directory.

If the module was not installed using Composer, running this command will give an error. To continue with the installation, please follow the **Manual Installation** steps.

3. Update database: `php bin/magento setup:upgrade`

4. If the module source under `vendor/mastersoft/address-widget/` directory is still not deleted, run: 
```
composer remove mastersoft/address-widget
```
This will delete `mastersoft` directory under `vendor` directory and it will properly clean all module references in composer configuration files.


### Manual Uninstallation
1. Disable `Mastersoft_AddressWidget` module by following **Disabling/Enabling Module Via Magento Command** steps.

2. Delete module source directory: 
- Composer installation: `rm -rf vendor/mastersoft` or 
- Manual installation: `rm -rf app/code/Mastersoft`

3. Clean database:
- Delete module registration: `DELETE FROM setup_module WHERE module='Mastersoft_AddressWidget'`
- Delete module configuration: `DELETE FROM core_config_data WHERE path like 'Mastersoft_AddressWidget/%'`






