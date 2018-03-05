<?php

namespace Mastersoft\AddressWidget\Setup;

use Magento\Framework\Setup\UninstallInterface;
use Magento\Framework\Setup\SchemaSetupInterface;
use Magento\Framework\Setup\ModuleContextInterface;

class Uninstall implements UninstallInterface
{
	public function uninstall(SchemaSetupInterface $setup, ModuleContextInterface $context)
	{
		$installer = $setup;
		$installer->startSetup();
		//$setup->getConnection()->query("DELETE FROM core_config_data WHERE path LIKE 'Mastersoft_AddressWidget/%'");
		$installer->endSetup();
	}
}