<?php

class EntityManager_9a5be93 extends \Doctrine\ORM\EntityManager implements \ProxyManager\Proxy\VirtualProxyInterface
{
    /**
     * @var \Doctrine\ORM\EntityManager|null wrapped object, if the proxy is initialized
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

    public function getConnection()
    {
        $this->initializer471e0 && ($this->initializer471e0->__invoke($valueHolderb41fb, $this, 'getConnection', array(), $this->initializer471e0) || 1) && $this->valueHolderb41fb = $valueHolderb41fb;

        return $this->valueHolderb41fb->getConnection();
    }

    public function getMetadataFactory()
    {
        $this->initializer471e0 && ($this->initializer471e0->__invoke($valueHolderb41fb, $this, 'getMetadataFactory', array(), $this->initializer471e0) || 1) && $this->valueHolderb41fb = $valueHolderb41fb;

        return $this->valueHolderb41fb->getMetadataFactory();
    }

    public function getExpressionBuilder()
    {
        $this->initializer471e0 && ($this->initializer471e0->__invoke($valueHolderb41fb, $this, 'getExpressionBuilder', array(), $this->initializer471e0) || 1) && $this->valueHolderb41fb = $valueHolderb41fb;

        return $this->valueHolderb41fb->getExpressionBuilder();
    }

    public function beginTransaction()
    {
        $this->initializer471e0 && ($this->initializer471e0->__invoke($valueHolderb41fb, $this, 'beginTransaction', array(), $this->initializer471e0) || 1) && $this->valueHolderb41fb = $valueHolderb41fb;

        return $this->valueHolderb41fb->beginTransaction();
    }

    public function getCache()
    {
        $this->initializer471e0 && ($this->initializer471e0->__invoke($valueHolderb41fb, $this, 'getCache', array(), $this->initializer471e0) || 1) && $this->valueHolderb41fb = $valueHolderb41fb;

        return $this->valueHolderb41fb->getCache();
    }

    public function transactional($func)
    {
        $this->initializer471e0 && ($this->initializer471e0->__invoke($valueHolderb41fb, $this, 'transactional', array('func' => $func), $this->initializer471e0) || 1) && $this->valueHolderb41fb = $valueHolderb41fb;

        return $this->valueHolderb41fb->transactional($func);
    }

    public function wrapInTransaction(callable $func)
    {
        $this->initializer471e0 && ($this->initializer471e0->__invoke($valueHolderb41fb, $this, 'wrapInTransaction', array('func' => $func), $this->initializer471e0) || 1) && $this->valueHolderb41fb = $valueHolderb41fb;

        return $this->valueHolderb41fb->wrapInTransaction($func);
    }

    public function commit()
    {
        $this->initializer471e0 && ($this->initializer471e0->__invoke($valueHolderb41fb, $this, 'commit', array(), $this->initializer471e0) || 1) && $this->valueHolderb41fb = $valueHolderb41fb;

        return $this->valueHolderb41fb->commit();
    }

    public function rollback()
    {
        $this->initializer471e0 && ($this->initializer471e0->__invoke($valueHolderb41fb, $this, 'rollback', array(), $this->initializer471e0) || 1) && $this->valueHolderb41fb = $valueHolderb41fb;

        return $this->valueHolderb41fb->rollback();
    }

    public function getClassMetadata($className)
    {
        $this->initializer471e0 && ($this->initializer471e0->__invoke($valueHolderb41fb, $this, 'getClassMetadata', array('className' => $className), $this->initializer471e0) || 1) && $this->valueHolderb41fb = $valueHolderb41fb;

        return $this->valueHolderb41fb->getClassMetadata($className);
    }

    public function createQuery($dql = '')
    {
        $this->initializer471e0 && ($this->initializer471e0->__invoke($valueHolderb41fb, $this, 'createQuery', array('dql' => $dql), $this->initializer471e0) || 1) && $this->valueHolderb41fb = $valueHolderb41fb;

        return $this->valueHolderb41fb->createQuery($dql);
    }

    public function createNamedQuery($name)
    {
        $this->initializer471e0 && ($this->initializer471e0->__invoke($valueHolderb41fb, $this, 'createNamedQuery', array('name' => $name), $this->initializer471e0) || 1) && $this->valueHolderb41fb = $valueHolderb41fb;

        return $this->valueHolderb41fb->createNamedQuery($name);
    }

    public function createNativeQuery($sql, \Doctrine\ORM\Query\ResultSetMapping $rsm)
    {
        $this->initializer471e0 && ($this->initializer471e0->__invoke($valueHolderb41fb, $this, 'createNativeQuery', array('sql' => $sql, 'rsm' => $rsm), $this->initializer471e0) || 1) && $this->valueHolderb41fb = $valueHolderb41fb;

        return $this->valueHolderb41fb->createNativeQuery($sql, $rsm);
    }

    public function createNamedNativeQuery($name)
    {
        $this->initializer471e0 && ($this->initializer471e0->__invoke($valueHolderb41fb, $this, 'createNamedNativeQuery', array('name' => $name), $this->initializer471e0) || 1) && $this->valueHolderb41fb = $valueHolderb41fb;

        return $this->valueHolderb41fb->createNamedNativeQuery($name);
    }

    public function createQueryBuilder()
    {
        $this->initializer471e0 && ($this->initializer471e0->__invoke($valueHolderb41fb, $this, 'createQueryBuilder', array(), $this->initializer471e0) || 1) && $this->valueHolderb41fb = $valueHolderb41fb;

        return $this->valueHolderb41fb->createQueryBuilder();
    }

    public function flush($entity = null)
    {
        $this->initializer471e0 && ($this->initializer471e0->__invoke($valueHolderb41fb, $this, 'flush', array('entity' => $entity), $this->initializer471e0) || 1) && $this->valueHolderb41fb = $valueHolderb41fb;

        return $this->valueHolderb41fb->flush($entity);
    }

    public function find($className, $id, $lockMode = null, $lockVersion = null)
    {
        $this->initializer471e0 && ($this->initializer471e0->__invoke($valueHolderb41fb, $this, 'find', array('className' => $className, 'id' => $id, 'lockMode' => $lockMode, 'lockVersion' => $lockVersion), $this->initializer471e0) || 1) && $this->valueHolderb41fb = $valueHolderb41fb;

        return $this->valueHolderb41fb->find($className, $id, $lockMode, $lockVersion);
    }

    public function getReference($entityName, $id)
    {
        $this->initializer471e0 && ($this->initializer471e0->__invoke($valueHolderb41fb, $this, 'getReference', array('entityName' => $entityName, 'id' => $id), $this->initializer471e0) || 1) && $this->valueHolderb41fb = $valueHolderb41fb;

        return $this->valueHolderb41fb->getReference($entityName, $id);
    }

    public function getPartialReference($entityName, $identifier)
    {
        $this->initializer471e0 && ($this->initializer471e0->__invoke($valueHolderb41fb, $this, 'getPartialReference', array('entityName' => $entityName, 'identifier' => $identifier), $this->initializer471e0) || 1) && $this->valueHolderb41fb = $valueHolderb41fb;

        return $this->valueHolderb41fb->getPartialReference($entityName, $identifier);
    }

    public function clear($entityName = null)
    {
        $this->initializer471e0 && ($this->initializer471e0->__invoke($valueHolderb41fb, $this, 'clear', array('entityName' => $entityName), $this->initializer471e0) || 1) && $this->valueHolderb41fb = $valueHolderb41fb;

        return $this->valueHolderb41fb->clear($entityName);
    }

    public function close()
    {
        $this->initializer471e0 && ($this->initializer471e0->__invoke($valueHolderb41fb, $this, 'close', array(), $this->initializer471e0) || 1) && $this->valueHolderb41fb = $valueHolderb41fb;

        return $this->valueHolderb41fb->close();
    }

    public function persist($entity)
    {
        $this->initializer471e0 && ($this->initializer471e0->__invoke($valueHolderb41fb, $this, 'persist', array('entity' => $entity), $this->initializer471e0) || 1) && $this->valueHolderb41fb = $valueHolderb41fb;

        return $this->valueHolderb41fb->persist($entity);
    }

    public function remove($entity)
    {
        $this->initializer471e0 && ($this->initializer471e0->__invoke($valueHolderb41fb, $this, 'remove', array('entity' => $entity), $this->initializer471e0) || 1) && $this->valueHolderb41fb = $valueHolderb41fb;

        return $this->valueHolderb41fb->remove($entity);
    }

    public function refresh($entity)
    {
        $this->initializer471e0 && ($this->initializer471e0->__invoke($valueHolderb41fb, $this, 'refresh', array('entity' => $entity), $this->initializer471e0) || 1) && $this->valueHolderb41fb = $valueHolderb41fb;

        return $this->valueHolderb41fb->refresh($entity);
    }

    public function detach($entity)
    {
        $this->initializer471e0 && ($this->initializer471e0->__invoke($valueHolderb41fb, $this, 'detach', array('entity' => $entity), $this->initializer471e0) || 1) && $this->valueHolderb41fb = $valueHolderb41fb;

        return $this->valueHolderb41fb->detach($entity);
    }

    public function merge($entity)
    {
        $this->initializer471e0 && ($this->initializer471e0->__invoke($valueHolderb41fb, $this, 'merge', array('entity' => $entity), $this->initializer471e0) || 1) && $this->valueHolderb41fb = $valueHolderb41fb;

        return $this->valueHolderb41fb->merge($entity);
    }

    public function copy($entity, $deep = false)
    {
        $this->initializer471e0 && ($this->initializer471e0->__invoke($valueHolderb41fb, $this, 'copy', array('entity' => $entity, 'deep' => $deep), $this->initializer471e0) || 1) && $this->valueHolderb41fb = $valueHolderb41fb;

        return $this->valueHolderb41fb->copy($entity, $deep);
    }

    public function lock($entity, $lockMode, $lockVersion = null)
    {
        $this->initializer471e0 && ($this->initializer471e0->__invoke($valueHolderb41fb, $this, 'lock', array('entity' => $entity, 'lockMode' => $lockMode, 'lockVersion' => $lockVersion), $this->initializer471e0) || 1) && $this->valueHolderb41fb = $valueHolderb41fb;

        return $this->valueHolderb41fb->lock($entity, $lockMode, $lockVersion);
    }

    public function getRepository($entityName)
    {
        $this->initializer471e0 && ($this->initializer471e0->__invoke($valueHolderb41fb, $this, 'getRepository', array('entityName' => $entityName), $this->initializer471e0) || 1) && $this->valueHolderb41fb = $valueHolderb41fb;

        return $this->valueHolderb41fb->getRepository($entityName);
    }

    public function contains($entity)
    {
        $this->initializer471e0 && ($this->initializer471e0->__invoke($valueHolderb41fb, $this, 'contains', array('entity' => $entity), $this->initializer471e0) || 1) && $this->valueHolderb41fb = $valueHolderb41fb;

        return $this->valueHolderb41fb->contains($entity);
    }

    public function getEventManager()
    {
        $this->initializer471e0 && ($this->initializer471e0->__invoke($valueHolderb41fb, $this, 'getEventManager', array(), $this->initializer471e0) || 1) && $this->valueHolderb41fb = $valueHolderb41fb;

        return $this->valueHolderb41fb->getEventManager();
    }

    public function getConfiguration()
    {
        $this->initializer471e0 && ($this->initializer471e0->__invoke($valueHolderb41fb, $this, 'getConfiguration', array(), $this->initializer471e0) || 1) && $this->valueHolderb41fb = $valueHolderb41fb;

        return $this->valueHolderb41fb->getConfiguration();
    }

    public function isOpen()
    {
        $this->initializer471e0 && ($this->initializer471e0->__invoke($valueHolderb41fb, $this, 'isOpen', array(), $this->initializer471e0) || 1) && $this->valueHolderb41fb = $valueHolderb41fb;

        return $this->valueHolderb41fb->isOpen();
    }

    public function getUnitOfWork()
    {
        $this->initializer471e0 && ($this->initializer471e0->__invoke($valueHolderb41fb, $this, 'getUnitOfWork', array(), $this->initializer471e0) || 1) && $this->valueHolderb41fb = $valueHolderb41fb;

        return $this->valueHolderb41fb->getUnitOfWork();
    }

    public function getHydrator($hydrationMode)
    {
        $this->initializer471e0 && ($this->initializer471e0->__invoke($valueHolderb41fb, $this, 'getHydrator', array('hydrationMode' => $hydrationMode), $this->initializer471e0) || 1) && $this->valueHolderb41fb = $valueHolderb41fb;

        return $this->valueHolderb41fb->getHydrator($hydrationMode);
    }

    public function newHydrator($hydrationMode)
    {
        $this->initializer471e0 && ($this->initializer471e0->__invoke($valueHolderb41fb, $this, 'newHydrator', array('hydrationMode' => $hydrationMode), $this->initializer471e0) || 1) && $this->valueHolderb41fb = $valueHolderb41fb;

        return $this->valueHolderb41fb->newHydrator($hydrationMode);
    }

    public function getProxyFactory()
    {
        $this->initializer471e0 && ($this->initializer471e0->__invoke($valueHolderb41fb, $this, 'getProxyFactory', array(), $this->initializer471e0) || 1) && $this->valueHolderb41fb = $valueHolderb41fb;

        return $this->valueHolderb41fb->getProxyFactory();
    }

    public function initializeObject($obj)
    {
        $this->initializer471e0 && ($this->initializer471e0->__invoke($valueHolderb41fb, $this, 'initializeObject', array('obj' => $obj), $this->initializer471e0) || 1) && $this->valueHolderb41fb = $valueHolderb41fb;

        return $this->valueHolderb41fb->initializeObject($obj);
    }

    public function getFilters()
    {
        $this->initializer471e0 && ($this->initializer471e0->__invoke($valueHolderb41fb, $this, 'getFilters', array(), $this->initializer471e0) || 1) && $this->valueHolderb41fb = $valueHolderb41fb;

        return $this->valueHolderb41fb->getFilters();
    }

    public function isFiltersStateClean()
    {
        $this->initializer471e0 && ($this->initializer471e0->__invoke($valueHolderb41fb, $this, 'isFiltersStateClean', array(), $this->initializer471e0) || 1) && $this->valueHolderb41fb = $valueHolderb41fb;

        return $this->valueHolderb41fb->isFiltersStateClean();
    }

    public function hasFilters()
    {
        $this->initializer471e0 && ($this->initializer471e0->__invoke($valueHolderb41fb, $this, 'hasFilters', array(), $this->initializer471e0) || 1) && $this->valueHolderb41fb = $valueHolderb41fb;

        return $this->valueHolderb41fb->hasFilters();
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

        \Closure::bind(function (\Doctrine\ORM\EntityManager $instance) {
            unset($instance->config, $instance->conn, $instance->metadataFactory, $instance->unitOfWork, $instance->eventManager, $instance->proxyFactory, $instance->repositoryFactory, $instance->expressionBuilder, $instance->closed, $instance->filterCollection, $instance->cache);
        }, $instance, 'Doctrine\\ORM\\EntityManager')->__invoke($instance);

        $instance->initializer471e0 = $initializer;

        return $instance;
    }

    protected function __construct(\Doctrine\DBAL\Connection $conn, \Doctrine\ORM\Configuration $config, \Doctrine\Common\EventManager $eventManager)
    {
        static $reflection;

        if (! $this->valueHolderb41fb) {
            $reflection = $reflection ?? new \ReflectionClass('Doctrine\\ORM\\EntityManager');
            $this->valueHolderb41fb = $reflection->newInstanceWithoutConstructor();
        \Closure::bind(function (\Doctrine\ORM\EntityManager $instance) {
            unset($instance->config, $instance->conn, $instance->metadataFactory, $instance->unitOfWork, $instance->eventManager, $instance->proxyFactory, $instance->repositoryFactory, $instance->expressionBuilder, $instance->closed, $instance->filterCollection, $instance->cache);
        }, $this, 'Doctrine\\ORM\\EntityManager')->__invoke($this);

        }

        $this->valueHolderb41fb->__construct($conn, $config, $eventManager);
    }

    public function & __get($name)
    {
        $this->initializer471e0 && ($this->initializer471e0->__invoke($valueHolderb41fb, $this, '__get', ['name' => $name], $this->initializer471e0) || 1) && $this->valueHolderb41fb = $valueHolderb41fb;

        if (isset(self::$publicProperties62ad9[$name])) {
            return $this->valueHolderb41fb->$name;
        }

        $realInstanceReflection = new \ReflectionClass('Doctrine\\ORM\\EntityManager');

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

        $realInstanceReflection = new \ReflectionClass('Doctrine\\ORM\\EntityManager');

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

        $realInstanceReflection = new \ReflectionClass('Doctrine\\ORM\\EntityManager');

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

        $realInstanceReflection = new \ReflectionClass('Doctrine\\ORM\\EntityManager');

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
        \Closure::bind(function (\Doctrine\ORM\EntityManager $instance) {
            unset($instance->config, $instance->conn, $instance->metadataFactory, $instance->unitOfWork, $instance->eventManager, $instance->proxyFactory, $instance->repositoryFactory, $instance->expressionBuilder, $instance->closed, $instance->filterCollection, $instance->cache);
        }, $this, 'Doctrine\\ORM\\EntityManager')->__invoke($this);
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
