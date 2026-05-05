<?php

class EntityManager_9a5be93 extends \Doctrine\ORM\EntityManager implements \ProxyManager\Proxy\VirtualProxyInterface
{
    /**
     * @var \Doctrine\ORM\EntityManager|null wrapped object, if the proxy is initialized
     */
    private $valueHolder78df4 = null;

    /**
     * @var \Closure|null initializer responsible for generating the wrapped object
     */
    private $initializerc206d = null;

    /**
     * @var bool[] map of public properties of the parent class
     */
    private static $publicPropertiesc3619 = [
        
    ];

    public function getConnection()
    {
        $this->initializerc206d && ($this->initializerc206d->__invoke($valueHolder78df4, $this, 'getConnection', array(), $this->initializerc206d) || 1) && $this->valueHolder78df4 = $valueHolder78df4;

        return $this->valueHolder78df4->getConnection();
    }

    public function getMetadataFactory()
    {
        $this->initializerc206d && ($this->initializerc206d->__invoke($valueHolder78df4, $this, 'getMetadataFactory', array(), $this->initializerc206d) || 1) && $this->valueHolder78df4 = $valueHolder78df4;

        return $this->valueHolder78df4->getMetadataFactory();
    }

    public function getExpressionBuilder()
    {
        $this->initializerc206d && ($this->initializerc206d->__invoke($valueHolder78df4, $this, 'getExpressionBuilder', array(), $this->initializerc206d) || 1) && $this->valueHolder78df4 = $valueHolder78df4;

        return $this->valueHolder78df4->getExpressionBuilder();
    }

    public function beginTransaction()
    {
        $this->initializerc206d && ($this->initializerc206d->__invoke($valueHolder78df4, $this, 'beginTransaction', array(), $this->initializerc206d) || 1) && $this->valueHolder78df4 = $valueHolder78df4;

        return $this->valueHolder78df4->beginTransaction();
    }

    public function getCache()
    {
        $this->initializerc206d && ($this->initializerc206d->__invoke($valueHolder78df4, $this, 'getCache', array(), $this->initializerc206d) || 1) && $this->valueHolder78df4 = $valueHolder78df4;

        return $this->valueHolder78df4->getCache();
    }

    public function transactional($func)
    {
        $this->initializerc206d && ($this->initializerc206d->__invoke($valueHolder78df4, $this, 'transactional', array('func' => $func), $this->initializerc206d) || 1) && $this->valueHolder78df4 = $valueHolder78df4;

        return $this->valueHolder78df4->transactional($func);
    }

    public function wrapInTransaction(callable $func)
    {
        $this->initializerc206d && ($this->initializerc206d->__invoke($valueHolder78df4, $this, 'wrapInTransaction', array('func' => $func), $this->initializerc206d) || 1) && $this->valueHolder78df4 = $valueHolder78df4;

        return $this->valueHolder78df4->wrapInTransaction($func);
    }

    public function commit()
    {
        $this->initializerc206d && ($this->initializerc206d->__invoke($valueHolder78df4, $this, 'commit', array(), $this->initializerc206d) || 1) && $this->valueHolder78df4 = $valueHolder78df4;

        return $this->valueHolder78df4->commit();
    }

    public function rollback()
    {
        $this->initializerc206d && ($this->initializerc206d->__invoke($valueHolder78df4, $this, 'rollback', array(), $this->initializerc206d) || 1) && $this->valueHolder78df4 = $valueHolder78df4;

        return $this->valueHolder78df4->rollback();
    }

    public function getClassMetadata($className)
    {
        $this->initializerc206d && ($this->initializerc206d->__invoke($valueHolder78df4, $this, 'getClassMetadata', array('className' => $className), $this->initializerc206d) || 1) && $this->valueHolder78df4 = $valueHolder78df4;

        return $this->valueHolder78df4->getClassMetadata($className);
    }

    public function createQuery($dql = '')
    {
        $this->initializerc206d && ($this->initializerc206d->__invoke($valueHolder78df4, $this, 'createQuery', array('dql' => $dql), $this->initializerc206d) || 1) && $this->valueHolder78df4 = $valueHolder78df4;

        return $this->valueHolder78df4->createQuery($dql);
    }

    public function createNamedQuery($name)
    {
        $this->initializerc206d && ($this->initializerc206d->__invoke($valueHolder78df4, $this, 'createNamedQuery', array('name' => $name), $this->initializerc206d) || 1) && $this->valueHolder78df4 = $valueHolder78df4;

        return $this->valueHolder78df4->createNamedQuery($name);
    }

    public function createNativeQuery($sql, \Doctrine\ORM\Query\ResultSetMapping $rsm)
    {
        $this->initializerc206d && ($this->initializerc206d->__invoke($valueHolder78df4, $this, 'createNativeQuery', array('sql' => $sql, 'rsm' => $rsm), $this->initializerc206d) || 1) && $this->valueHolder78df4 = $valueHolder78df4;

        return $this->valueHolder78df4->createNativeQuery($sql, $rsm);
    }

    public function createNamedNativeQuery($name)
    {
        $this->initializerc206d && ($this->initializerc206d->__invoke($valueHolder78df4, $this, 'createNamedNativeQuery', array('name' => $name), $this->initializerc206d) || 1) && $this->valueHolder78df4 = $valueHolder78df4;

        return $this->valueHolder78df4->createNamedNativeQuery($name);
    }

    public function createQueryBuilder()
    {
        $this->initializerc206d && ($this->initializerc206d->__invoke($valueHolder78df4, $this, 'createQueryBuilder', array(), $this->initializerc206d) || 1) && $this->valueHolder78df4 = $valueHolder78df4;

        return $this->valueHolder78df4->createQueryBuilder();
    }

    public function flush($entity = null)
    {
        $this->initializerc206d && ($this->initializerc206d->__invoke($valueHolder78df4, $this, 'flush', array('entity' => $entity), $this->initializerc206d) || 1) && $this->valueHolder78df4 = $valueHolder78df4;

        return $this->valueHolder78df4->flush($entity);
    }

    public function find($className, $id, $lockMode = null, $lockVersion = null)
    {
        $this->initializerc206d && ($this->initializerc206d->__invoke($valueHolder78df4, $this, 'find', array('className' => $className, 'id' => $id, 'lockMode' => $lockMode, 'lockVersion' => $lockVersion), $this->initializerc206d) || 1) && $this->valueHolder78df4 = $valueHolder78df4;

        return $this->valueHolder78df4->find($className, $id, $lockMode, $lockVersion);
    }

    public function getReference($entityName, $id)
    {
        $this->initializerc206d && ($this->initializerc206d->__invoke($valueHolder78df4, $this, 'getReference', array('entityName' => $entityName, 'id' => $id), $this->initializerc206d) || 1) && $this->valueHolder78df4 = $valueHolder78df4;

        return $this->valueHolder78df4->getReference($entityName, $id);
    }

    public function getPartialReference($entityName, $identifier)
    {
        $this->initializerc206d && ($this->initializerc206d->__invoke($valueHolder78df4, $this, 'getPartialReference', array('entityName' => $entityName, 'identifier' => $identifier), $this->initializerc206d) || 1) && $this->valueHolder78df4 = $valueHolder78df4;

        return $this->valueHolder78df4->getPartialReference($entityName, $identifier);
    }

    public function clear($entityName = null)
    {
        $this->initializerc206d && ($this->initializerc206d->__invoke($valueHolder78df4, $this, 'clear', array('entityName' => $entityName), $this->initializerc206d) || 1) && $this->valueHolder78df4 = $valueHolder78df4;

        return $this->valueHolder78df4->clear($entityName);
    }

    public function close()
    {
        $this->initializerc206d && ($this->initializerc206d->__invoke($valueHolder78df4, $this, 'close', array(), $this->initializerc206d) || 1) && $this->valueHolder78df4 = $valueHolder78df4;

        return $this->valueHolder78df4->close();
    }

    public function persist($entity)
    {
        $this->initializerc206d && ($this->initializerc206d->__invoke($valueHolder78df4, $this, 'persist', array('entity' => $entity), $this->initializerc206d) || 1) && $this->valueHolder78df4 = $valueHolder78df4;

        return $this->valueHolder78df4->persist($entity);
    }

    public function remove($entity)
    {
        $this->initializerc206d && ($this->initializerc206d->__invoke($valueHolder78df4, $this, 'remove', array('entity' => $entity), $this->initializerc206d) || 1) && $this->valueHolder78df4 = $valueHolder78df4;

        return $this->valueHolder78df4->remove($entity);
    }

    public function refresh($entity)
    {
        $this->initializerc206d && ($this->initializerc206d->__invoke($valueHolder78df4, $this, 'refresh', array('entity' => $entity), $this->initializerc206d) || 1) && $this->valueHolder78df4 = $valueHolder78df4;

        return $this->valueHolder78df4->refresh($entity);
    }

    public function detach($entity)
    {
        $this->initializerc206d && ($this->initializerc206d->__invoke($valueHolder78df4, $this, 'detach', array('entity' => $entity), $this->initializerc206d) || 1) && $this->valueHolder78df4 = $valueHolder78df4;

        return $this->valueHolder78df4->detach($entity);
    }

    public function merge($entity)
    {
        $this->initializerc206d && ($this->initializerc206d->__invoke($valueHolder78df4, $this, 'merge', array('entity' => $entity), $this->initializerc206d) || 1) && $this->valueHolder78df4 = $valueHolder78df4;

        return $this->valueHolder78df4->merge($entity);
    }

    public function copy($entity, $deep = false)
    {
        $this->initializerc206d && ($this->initializerc206d->__invoke($valueHolder78df4, $this, 'copy', array('entity' => $entity, 'deep' => $deep), $this->initializerc206d) || 1) && $this->valueHolder78df4 = $valueHolder78df4;

        return $this->valueHolder78df4->copy($entity, $deep);
    }

    public function lock($entity, $lockMode, $lockVersion = null)
    {
        $this->initializerc206d && ($this->initializerc206d->__invoke($valueHolder78df4, $this, 'lock', array('entity' => $entity, 'lockMode' => $lockMode, 'lockVersion' => $lockVersion), $this->initializerc206d) || 1) && $this->valueHolder78df4 = $valueHolder78df4;

        return $this->valueHolder78df4->lock($entity, $lockMode, $lockVersion);
    }

    public function getRepository($entityName)
    {
        $this->initializerc206d && ($this->initializerc206d->__invoke($valueHolder78df4, $this, 'getRepository', array('entityName' => $entityName), $this->initializerc206d) || 1) && $this->valueHolder78df4 = $valueHolder78df4;

        return $this->valueHolder78df4->getRepository($entityName);
    }

    public function contains($entity)
    {
        $this->initializerc206d && ($this->initializerc206d->__invoke($valueHolder78df4, $this, 'contains', array('entity' => $entity), $this->initializerc206d) || 1) && $this->valueHolder78df4 = $valueHolder78df4;

        return $this->valueHolder78df4->contains($entity);
    }

    public function getEventManager()
    {
        $this->initializerc206d && ($this->initializerc206d->__invoke($valueHolder78df4, $this, 'getEventManager', array(), $this->initializerc206d) || 1) && $this->valueHolder78df4 = $valueHolder78df4;

        return $this->valueHolder78df4->getEventManager();
    }

    public function getConfiguration()
    {
        $this->initializerc206d && ($this->initializerc206d->__invoke($valueHolder78df4, $this, 'getConfiguration', array(), $this->initializerc206d) || 1) && $this->valueHolder78df4 = $valueHolder78df4;

        return $this->valueHolder78df4->getConfiguration();
    }

    public function isOpen()
    {
        $this->initializerc206d && ($this->initializerc206d->__invoke($valueHolder78df4, $this, 'isOpen', array(), $this->initializerc206d) || 1) && $this->valueHolder78df4 = $valueHolder78df4;

        return $this->valueHolder78df4->isOpen();
    }

    public function getUnitOfWork()
    {
        $this->initializerc206d && ($this->initializerc206d->__invoke($valueHolder78df4, $this, 'getUnitOfWork', array(), $this->initializerc206d) || 1) && $this->valueHolder78df4 = $valueHolder78df4;

        return $this->valueHolder78df4->getUnitOfWork();
    }

    public function getHydrator($hydrationMode)
    {
        $this->initializerc206d && ($this->initializerc206d->__invoke($valueHolder78df4, $this, 'getHydrator', array('hydrationMode' => $hydrationMode), $this->initializerc206d) || 1) && $this->valueHolder78df4 = $valueHolder78df4;

        return $this->valueHolder78df4->getHydrator($hydrationMode);
    }

    public function newHydrator($hydrationMode)
    {
        $this->initializerc206d && ($this->initializerc206d->__invoke($valueHolder78df4, $this, 'newHydrator', array('hydrationMode' => $hydrationMode), $this->initializerc206d) || 1) && $this->valueHolder78df4 = $valueHolder78df4;

        return $this->valueHolder78df4->newHydrator($hydrationMode);
    }

    public function getProxyFactory()
    {
        $this->initializerc206d && ($this->initializerc206d->__invoke($valueHolder78df4, $this, 'getProxyFactory', array(), $this->initializerc206d) || 1) && $this->valueHolder78df4 = $valueHolder78df4;

        return $this->valueHolder78df4->getProxyFactory();
    }

    public function initializeObject($obj)
    {
        $this->initializerc206d && ($this->initializerc206d->__invoke($valueHolder78df4, $this, 'initializeObject', array('obj' => $obj), $this->initializerc206d) || 1) && $this->valueHolder78df4 = $valueHolder78df4;

        return $this->valueHolder78df4->initializeObject($obj);
    }

    public function getFilters()
    {
        $this->initializerc206d && ($this->initializerc206d->__invoke($valueHolder78df4, $this, 'getFilters', array(), $this->initializerc206d) || 1) && $this->valueHolder78df4 = $valueHolder78df4;

        return $this->valueHolder78df4->getFilters();
    }

    public function isFiltersStateClean()
    {
        $this->initializerc206d && ($this->initializerc206d->__invoke($valueHolder78df4, $this, 'isFiltersStateClean', array(), $this->initializerc206d) || 1) && $this->valueHolder78df4 = $valueHolder78df4;

        return $this->valueHolder78df4->isFiltersStateClean();
    }

    public function hasFilters()
    {
        $this->initializerc206d && ($this->initializerc206d->__invoke($valueHolder78df4, $this, 'hasFilters', array(), $this->initializerc206d) || 1) && $this->valueHolder78df4 = $valueHolder78df4;

        return $this->valueHolder78df4->hasFilters();
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

        $instance->initializerc206d = $initializer;

        return $instance;
    }

    protected function __construct(\Doctrine\DBAL\Connection $conn, \Doctrine\ORM\Configuration $config, \Doctrine\Common\EventManager $eventManager)
    {
        static $reflection;

        if (! $this->valueHolder78df4) {
            $reflection = $reflection ?? new \ReflectionClass('Doctrine\\ORM\\EntityManager');
            $this->valueHolder78df4 = $reflection->newInstanceWithoutConstructor();
        \Closure::bind(function (\Doctrine\ORM\EntityManager $instance) {
            unset($instance->config, $instance->conn, $instance->metadataFactory, $instance->unitOfWork, $instance->eventManager, $instance->proxyFactory, $instance->repositoryFactory, $instance->expressionBuilder, $instance->closed, $instance->filterCollection, $instance->cache);
        }, $this, 'Doctrine\\ORM\\EntityManager')->__invoke($this);

        }

        $this->valueHolder78df4->__construct($conn, $config, $eventManager);
    }

    public function & __get($name)
    {
        $this->initializerc206d && ($this->initializerc206d->__invoke($valueHolder78df4, $this, '__get', ['name' => $name], $this->initializerc206d) || 1) && $this->valueHolder78df4 = $valueHolder78df4;

        if (isset(self::$publicPropertiesc3619[$name])) {
            return $this->valueHolder78df4->$name;
        }

        $realInstanceReflection = new \ReflectionClass('Doctrine\\ORM\\EntityManager');

        if (! $realInstanceReflection->hasProperty($name)) {
            $targetObject = $this->valueHolder78df4;

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

        $targetObject = $this->valueHolder78df4;
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
        $this->initializerc206d && ($this->initializerc206d->__invoke($valueHolder78df4, $this, '__set', array('name' => $name, 'value' => $value), $this->initializerc206d) || 1) && $this->valueHolder78df4 = $valueHolder78df4;

        $realInstanceReflection = new \ReflectionClass('Doctrine\\ORM\\EntityManager');

        if (! $realInstanceReflection->hasProperty($name)) {
            $targetObject = $this->valueHolder78df4;

            $targetObject->$name = $value;

            return $targetObject->$name;
        }

        $targetObject = $this->valueHolder78df4;
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
        $this->initializerc206d && ($this->initializerc206d->__invoke($valueHolder78df4, $this, '__isset', array('name' => $name), $this->initializerc206d) || 1) && $this->valueHolder78df4 = $valueHolder78df4;

        $realInstanceReflection = new \ReflectionClass('Doctrine\\ORM\\EntityManager');

        if (! $realInstanceReflection->hasProperty($name)) {
            $targetObject = $this->valueHolder78df4;

            return isset($targetObject->$name);
        }

        $targetObject = $this->valueHolder78df4;
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
        $this->initializerc206d && ($this->initializerc206d->__invoke($valueHolder78df4, $this, '__unset', array('name' => $name), $this->initializerc206d) || 1) && $this->valueHolder78df4 = $valueHolder78df4;

        $realInstanceReflection = new \ReflectionClass('Doctrine\\ORM\\EntityManager');

        if (! $realInstanceReflection->hasProperty($name)) {
            $targetObject = $this->valueHolder78df4;

            unset($targetObject->$name);

            return;
        }

        $targetObject = $this->valueHolder78df4;
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
        $this->initializerc206d && ($this->initializerc206d->__invoke($valueHolder78df4, $this, '__clone', array(), $this->initializerc206d) || 1) && $this->valueHolder78df4 = $valueHolder78df4;

        $this->valueHolder78df4 = clone $this->valueHolder78df4;
    }

    public function __sleep()
    {
        $this->initializerc206d && ($this->initializerc206d->__invoke($valueHolder78df4, $this, '__sleep', array(), $this->initializerc206d) || 1) && $this->valueHolder78df4 = $valueHolder78df4;

        return array('valueHolder78df4');
    }

    public function __wakeup()
    {
        \Closure::bind(function (\Doctrine\ORM\EntityManager $instance) {
            unset($instance->config, $instance->conn, $instance->metadataFactory, $instance->unitOfWork, $instance->eventManager, $instance->proxyFactory, $instance->repositoryFactory, $instance->expressionBuilder, $instance->closed, $instance->filterCollection, $instance->cache);
        }, $this, 'Doctrine\\ORM\\EntityManager')->__invoke($this);
    }

    public function setProxyInitializer(\Closure $initializer = null) : void
    {
        $this->initializerc206d = $initializer;
    }

    public function getProxyInitializer() : ?\Closure
    {
        return $this->initializerc206d;
    }

    public function initializeProxy() : bool
    {
        return $this->initializerc206d && ($this->initializerc206d->__invoke($valueHolder78df4, $this, 'initializeProxy', array(), $this->initializerc206d) || 1) && $this->valueHolder78df4 = $valueHolder78df4;
    }

    public function isProxyInitialized() : bool
    {
        return null !== $this->valueHolder78df4;
    }

    public function getWrappedValueHolderValue()
    {
        return $this->valueHolder78df4;
    }
}
