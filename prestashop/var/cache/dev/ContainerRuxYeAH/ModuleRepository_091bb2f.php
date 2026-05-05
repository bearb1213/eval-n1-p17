<?php

class ModuleRepository_091bb2f extends \PrestaShop\PrestaShop\Core\Module\ModuleRepository implements \ProxyManager\Proxy\VirtualProxyInterface
{
    /**
     * @var \PrestaShop\PrestaShop\Core\Module\ModuleRepository|null wrapped object, if the proxy is initialized
     */
    private $valueHolderb41fb = null;

    /**
     * @var \Closure|null initializer responsible for generating the wrapped object
     */
    private $initializer471e0 = null;

    /**
     * @var bool[] map of public properties of the parent class
     */
    private static $publicProperties62ad9 = [
        
    ];

    public function getList() : \PrestaShop\PrestaShop\Core\Module\ModuleCollection
    {
        $this->initializer471e0 && ($this->initializer471e0->__invoke($valueHolderb41fb, $this, 'getList', array(), $this->initializer471e0) || 1) && $this->valueHolderb41fb = $valueHolderb41fb;

        return $this->valueHolderb41fb->getList();
    }

    public function getInstalledModules() : \PrestaShop\PrestaShop\Core\Module\ModuleCollection
    {
        $this->initializer471e0 && ($this->initializer471e0->__invoke($valueHolderb41fb, $this, 'getInstalledModules', array(), $this->initializer471e0) || 1) && $this->valueHolderb41fb = $valueHolderb41fb;

        return $this->valueHolderb41fb->getInstalledModules();
    }

    public function getMustBeConfiguredModules() : \PrestaShop\PrestaShop\Core\Module\ModuleCollection
    {
        $this->initializer471e0 && ($this->initializer471e0->__invoke($valueHolderb41fb, $this, 'getMustBeConfiguredModules', array(), $this->initializer471e0) || 1) && $this->valueHolderb41fb = $valueHolderb41fb;

        return $this->valueHolderb41fb->getMustBeConfiguredModules();
    }

    public function getUpgradableModules() : \PrestaShop\PrestaShop\Core\Module\ModuleCollection
    {
        $this->initializer471e0 && ($this->initializer471e0->__invoke($valueHolderb41fb, $this, 'getUpgradableModules', array(), $this->initializer471e0) || 1) && $this->valueHolderb41fb = $valueHolderb41fb;

        return $this->valueHolderb41fb->getUpgradableModules();
    }

    public function getModule(string $moduleName) : \PrestaShop\PrestaShop\Core\Module\ModuleInterface
    {
        $this->initializer471e0 && ($this->initializer471e0->__invoke($valueHolderb41fb, $this, 'getModule', array('moduleName' => $moduleName), $this->initializer471e0) || 1) && $this->valueHolderb41fb = $valueHolderb41fb;

        return $this->valueHolderb41fb->getModule($moduleName);
    }

    public function getModulePath(string $moduleName) : ?string
    {
        $this->initializer471e0 && ($this->initializer471e0->__invoke($valueHolderb41fb, $this, 'getModulePath', array('moduleName' => $moduleName), $this->initializer471e0) || 1) && $this->valueHolderb41fb = $valueHolderb41fb;

        return $this->valueHolderb41fb->getModulePath($moduleName);
    }

    public function setActionUrls(\PrestaShop\PrestaShop\Core\Module\ModuleCollection $collection) : \PrestaShop\PrestaShop\Core\Module\ModuleCollection
    {
        $this->initializer471e0 && ($this->initializer471e0->__invoke($valueHolderb41fb, $this, 'setActionUrls', array('collection' => $collection), $this->initializer471e0) || 1) && $this->valueHolderb41fb = $valueHolderb41fb;

        return $this->valueHolderb41fb->setActionUrls($collection);
    }

    public function clearCache(?string $moduleName = null, bool $allShops = false) : bool
    {
        $this->initializer471e0 && ($this->initializer471e0->__invoke($valueHolderb41fb, $this, 'clearCache', array('moduleName' => $moduleName, 'allShops' => $allShops), $this->initializer471e0) || 1) && $this->valueHolderb41fb = $valueHolderb41fb;

        return $this->valueHolderb41fb->clearCache($moduleName, $allShops);
    }

    /**
     * Constructor for lazy initialization
     *
     * @param \Closure|null $initializer
     */
    public static function staticProxyConstructor($initializer)
    {
        static $reflection;

        $reflection = $reflection ?? new \ReflectionClass(__CLASS__);
        $instance   = $reflection->newInstanceWithoutConstructor();

        \Closure::bind(function (\PrestaShop\PrestaShop\Core\Module\ModuleRepository $instance) {
            unset($instance->moduleDataProvider, $instance->adminModuleDataProvider, $instance->hookManager, $instance->cacheProvider, $instance->modulePath, $instance->installedModules, $instance->modulesFromHook, $instance->contextLangId);
        }, $instance, 'PrestaShop\\PrestaShop\\Core\\Module\\ModuleRepository')->__invoke($instance);

        $instance->initializer471e0 = $initializer;

        return $instance;
    }

    public function __construct(\PrestaShop\PrestaShop\Adapter\Module\ModuleDataProvider $moduleDataProvider, \PrestaShop\PrestaShop\Adapter\Module\AdminModuleDataProvider $adminModuleDataProvider, \Doctrine\Common\Cache\CacheProvider $cacheProvider, \PrestaShop\PrestaShop\Adapter\HookManager $hookManager, string $modulePath, int $contextLangId)
    {
        static $reflection;

        if (! $this->valueHolderb41fb) {
            $reflection = $reflection ?? new \ReflectionClass('PrestaShop\\PrestaShop\\Core\\Module\\ModuleRepository');
            $this->valueHolderb41fb = $reflection->newInstanceWithoutConstructor();
        \Closure::bind(function (\PrestaShop\PrestaShop\Core\Module\ModuleRepository $instance) {
            unset($instance->moduleDataProvider, $instance->adminModuleDataProvider, $instance->hookManager, $instance->cacheProvider, $instance->modulePath, $instance->installedModules, $instance->modulesFromHook, $instance->contextLangId);
        }, $this, 'PrestaShop\\PrestaShop\\Core\\Module\\ModuleRepository')->__invoke($this);

        }

        $this->valueHolderb41fb->__construct($moduleDataProvider, $adminModuleDataProvider, $cacheProvider, $hookManager, $modulePath, $contextLangId);
    }

    public function & __get($name)
    {
        $this->initializer471e0 && ($this->initializer471e0->__invoke($valueHolderb41fb, $this, '__get', ['name' => $name], $this->initializer471e0) || 1) && $this->valueHolderb41fb = $valueHolderb41fb;

        if (isset(self::$publicProperties62ad9[$name])) {
            return $this->valueHolderb41fb->$name;
        }

        $realInstanceReflection = new \ReflectionClass('PrestaShop\\PrestaShop\\Core\\Module\\ModuleRepository');

        if (! $realInstanceReflection->hasProperty($name)) {
            $targetObject = $this->valueHolderb41fb;

            $backtrace = debug_backtrace(false, 1);
            trigger_error(
                sprintf(
                    'Undefined property: %s::$%s in %s on line %s',
                    $realInstanceReflection->getName(),
                    $name,
                    $backtrace[0]['file'],
                    $backtrace[0]['line']
                ),
                \E_USER_NOTICE
            );
            return $targetObject->$name;
        }

        $targetObject = $this->valueHolderb41fb;
        $accessor = function & () use ($targetObject, $name) {
            return $targetObject->$name;
        };
        $backtrace = debug_backtrace(true, 2);
        $scopeObject = isset($backtrace[1]['object']) ? $backtrace[1]['object'] : new \ProxyManager\Stub\EmptyClassStub();
        $accessor = $accessor->bindTo($scopeObject, get_class($scopeObject));
        $returnValue = & $accessor();

        return $returnValue;
    }

    public function __set($name, $value)
    {
        $this->initializer471e0 && ($this->initializer471e0->__invoke($valueHolderb41fb, $this, '__set', array('name' => $name, 'value' => $value), $this->initializer471e0) || 1) && $this->valueHolderb41fb = $valueHolderb41fb;

        $realInstanceReflection = new \ReflectionClass('PrestaShop\\PrestaShop\\Core\\Module\\ModuleRepository');

        if (! $realInstanceReflection->hasProperty($name)) {
            $targetObject = $this->valueHolderb41fb;

            $targetObject->$name = $value;

            return $targetObject->$name;
        }

        $targetObject = $this->valueHolderb41fb;
        $accessor = function & () use ($targetObject, $name, $value) {
            $targetObject->$name = $value;

            return $targetObject->$name;
        };
        $backtrace = debug_backtrace(true, 2);
        $scopeObject = isset($backtrace[1]['object']) ? $backtrace[1]['object'] : new \ProxyManager\Stub\EmptyClassStub();
        $accessor = $accessor->bindTo($scopeObject, get_class($scopeObject));
        $returnValue = & $accessor();

        return $returnValue;
    }

    public function __isset($name)
    {
        $this->initializer471e0 && ($this->initializer471e0->__invoke($valueHolderb41fb, $this, '__isset', array('name' => $name), $this->initializer471e0) || 1) && $this->valueHolderb41fb = $valueHolderb41fb;

        $realInstanceReflection = new \ReflectionClass('PrestaShop\\PrestaShop\\Core\\Module\\ModuleRepository');

        if (! $realInstanceReflection->hasProperty($name)) {
            $targetObject = $this->valueHolderb41fb;

            return isset($targetObject->$name);
        }

        $targetObject = $this->valueHolderb41fb;
        $accessor = function () use ($targetObject, $name) {
            return isset($targetObject->$name);
        };
        $backtrace = debug_backtrace(true, 2);
        $scopeObject = isset($backtrace[1]['object']) ? $backtrace[1]['object'] : new \ProxyManager\Stub\EmptyClassStub();
        $accessor = $accessor->bindTo($scopeObject, get_class($scopeObject));
        $returnValue = $accessor();

        return $returnValue;
    }

    public function __unset($name)
    {
        $this->initializer471e0 && ($this->initializer471e0->__invoke($valueHolderb41fb, $this, '__unset', array('name' => $name), $this->initializer471e0) || 1) && $this->valueHolderb41fb = $valueHolderb41fb;

        $realInstanceReflection = new \ReflectionClass('PrestaShop\\PrestaShop\\Core\\Module\\ModuleRepository');

        if (! $realInstanceReflection->hasProperty($name)) {
            $targetObject = $this->valueHolderb41fb;

            unset($targetObject->$name);

            return;
        }

        $targetObject = $this->valueHolderb41fb;
        $accessor = function () use ($targetObject, $name) {
            unset($targetObject->$name);

            return;
        };
        $backtrace = debug_backtrace(true, 2);
        $scopeObject = isset($backtrace[1]['object']) ? $backtrace[1]['object'] : new \ProxyManager\Stub\EmptyClassStub();
        $accessor = $accessor->bindTo($scopeObject, get_class($scopeObject));
        $accessor();
    }

    public function __clone()
    {
        $this->initializer471e0 && ($this->initializer471e0->__invoke($valueHolderb41fb, $this, '__clone', array(), $this->initializer471e0) || 1) && $this->valueHolderb41fb = $valueHolderb41fb;

        $this->valueHolderb41fb = clone $this->valueHolderb41fb;
    }

    public function __sleep()
    {
        $this->initializer471e0 && ($this->initializer471e0->__invoke($valueHolderb41fb, $this, '__sleep', array(), $this->initializer471e0) || 1) && $this->valueHolderb41fb = $valueHolderb41fb;

        return array('valueHolderb41fb');
    }

    public function __wakeup()
    {
        \Closure::bind(function (\PrestaShop\PrestaShop\Core\Module\ModuleRepository $instance) {
            unset($instance->moduleDataProvider, $instance->adminModuleDataProvider, $instance->hookManager, $instance->cacheProvider, $instance->modulePath, $instance->installedModules, $instance->modulesFromHook, $instance->contextLangId);
        }, $this, 'PrestaShop\\PrestaShop\\Core\\Module\\ModuleRepository')->__invoke($this);
    }

    public function setProxyInitializer(\Closure $initializer = null) : void
    {
        $this->initializer471e0 = $initializer;
    }

    public function getProxyInitializer() : ?\Closure
    {
        return $this->initializer471e0;
    }

    public function initializeProxy() : bool
    {
        return $this->initializer471e0 && ($this->initializer471e0->__invoke($valueHolderb41fb, $this, 'initializeProxy', array(), $this->initializer471e0) || 1) && $this->valueHolderb41fb = $valueHolderb41fb;
    }

    public function isProxyInitialized() : bool
    {
        return null !== $this->valueHolderb41fb;
    }

    public function getWrappedValueHolderValue()
    {
        return $this->valueHolderb41fb;
    }
}
