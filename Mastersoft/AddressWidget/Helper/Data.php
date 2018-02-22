<?php

namespace Mastersoft\AddressWidget\Helper;

use Magento\Framework\App\Helper\AbstractHelper;
use Magento\Framework\Encryption\EncryptorInterface;

class Data extends AbstractHelper
{
	const XML_PATH_ADDRESSWIDGET = 'Mastersoft_AddressWidget/';
	
	protected $storeManager;
	protected $objectManager;
	protected $encryptor;

	public function __construct(\Magento\Framework\App\Helper\Context $context,
		\Magento\Framework\ObjectManagerInterface $objectManager,
		\Magento\Store\Model\StoreManagerInterface $storeManager,
		EncryptorInterface $encryptor
	) {
		$this->objectManager = $objectManager;
		$this->storeManager  = $storeManager;
		$this->encryptor = $encryptor;
		parent::__construct($context);
	}

	public function getEncryptedConfig($field)
	{
		$value = $this->getConfig($field);
		return $this->encryptor->decrypt($value);
	}

	public function getConfig($field)
	{		
		//"Mastersoft_AddressWidget/settings/"
		return $this->scopeConfig->getValue(self::XML_PATH_ADDRESSWIDGET .'settings/'. $field, \Magento\Store\Model\ScopeInterface::SCOPE_STORE);

//		return $this->scopeConfig->getValue(
//			"Mastersoft_AddressWidget/settings/" . $field, 
//			\Magento\Store\Model\ScopeInterface::SCOPE_STORE
//		);
	}

	public function isEnable()
	{
		return $this->getConfig('enable');
	}
}
