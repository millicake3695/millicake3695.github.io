### Redis API

### Key (键)

  keys  
  exists key  
  type key  
  del key | key ... | Array(key)

### String (字符串)

  set key value  
  get key  
  incr key  
  incrby key increment  
  mset key value | key value ... | Map(key -> value) | Object(key, value)  
  mget key | key ... | Array(key)  
  mget2obj key | key ... | Array(key)  
  setex key value  
  setnx key value  

### SortedSet (有序集合)

  zadd key score member | score member ... | Map(member -> score) | Object(member: score)  
  zcard key  
  zcount key min max  
  zscore key member  
  zincrby key increment member  
  zrem key member | member ... | Array(member) | Set(member)   zremrangebyscore key min max  
  zremrangebyrank key start stop  
  zrange key start stop [WITHSCORES]  
  zrevrange key start stop [WITHSCORES]  
  zrangebyscore key min max [WITHSCORES] [LIMIT offset count]  
  zrevrangebyscore key max min [WITHSCORES] [LIMIT offset count]  
  zrangebyscore2map key min max [WITHSCORES] [LIMIT offset count]  
  zrevrangebyscore2map key max min [WITHSCORES] [LIMIT offset count]  
  zrank key member  
  zrevrank key member  

### Hash (哈希表)

  hset key field value  
  hsetnx key field value  
  hget key field  
  hgetall key  
  mhgetall key | [ key ...]  
  mhgetall2obj key | [ key ...]  
  hincrby key field increment  
  hmset key field value | field value ... | Object(field, value)  
  hmget key field | field ... | Array(field) | Set(field)  
  hdel key field | field ... | Array(field) | Set(field)  
  hexists key field | field ... | Array(field) | Set(field)  
  hkeys key  
  hlen key  

### List (列表)

  lpop, lpush, lrange, lrem, lset, rpop, rpush

### Set (集合)

  sadd key member | member ... | Array(member) | Set(member)  
  scard key  
  srem key member | member ... | Array(member) | Set(member)  
  smembers key  
  sismember key member

```js
const proxyTarget = 'DCache.XXXXProxyServer.ProxyObj@tcp -h 127.0.0.1 -t 60000 -p 8888';
const moduleName = 'XXXXTgUser';
const cache = require('@up/taf-dcache-srf')(proxyTarget, moduleName).toPromise();

(async () => {
  const [ key, value ] = [ 'key', { key: 'value' } ];
  
  await cache.keys(); // 查找所有 key 值(cache && DB) 不建议使用

  await cache.del(key); // 总是返回 true
  await cache.del('key1', 'key2'); // 删除多个 key

  // 将key设置为指定的字符串值。无论key是否有值
  await cache.set(key, value); // true
  // 返回 value 或 null
  await cache.get(key); // { AAA: 'value' }

  // 批量设置 [key1, value1, key2, value2] | { key: value }
  await cache.mset(['a', 1, 'b', 2]); // true
  await cache.mset({ c: 3, d: 4 }); // true

  // 批量获取(100条以下为宜) 返回 Array
  await cache.mget('a', 'b', 'c', 'd'); // [1, 2, 3, 4]
  await cache.mget(['a', 'b', 'c', 'd']); // [1, 2, 3, 4]

  // 对key对应的value执行原子的+1操作。
  // key对应的value被解析为10进制的64位有符号整型数据。value不存在时置为0
  // 返回执行递增操作后的value
  await cache.incr('a'); // 2
  // 将key对应的value加increment, 返回操作后的value。value不存在时置为0
  await cache.incrby('a', 2) // 4

  // 将所有指定成员添加到键为key有序集合, 添加时可以指定多个分数/成员对
  // score/member: new Map() | {key: 'value'} | [value, key] | value, key
  // 置顶|点赞|关注|子产品...
  await cache.zadd('key', { a: 1, b: 2, c: 3 }); // true

  // 返回有序集合key中指定索引范围的元素
  // 元素按得分从低到高排序。得分相同，按字典排序。
  // 参数start和stop都是基于零的索引。
  // 负索引表示从有序集合末尾的偏移量，-1是有序集合最后一个元素。
  await cache.zrange('key', 1, 1); // ['b']
  await cache.zrange('key', 1, 2, cache.CONSTANT.WITHSCORES); // ['b', 2, 'c', 3]

  // 返回有序集合key中分数处于[min, max]的所有元素。
  // 元素从低分到高分排序。
  await cache.zrangebyscore('key', '-inf', '+inf'); // [ 'a', 'b', 'c' ]
  await cache.zrangebyscore('key', '-inf', '+inf', cache.CONSTANT.WITHSCORES); // [ 'a', 1, 'b', 2, 'c', 3 ]
  await cache.zrangebyscore('key', '-inf', '+inf', cache.CONSTANT.WITHSCORES, cache.CONSTANT.LIMIT, 0, 2); // [ 'a', 1, 'b', 2 ]

  // 返回指定区间内的成员。成员的位置按score值递减来排列。具有相同score值的成员按字典序的反序排列。
  await cache.zrevrange('key', 0, 0); // ['c']

  // 返回有序集合中指定分数区间内的成员，分数由高到低排序
  // ZREVRANGEBYSCORE key max min [WITHSCORES] [LIMIT offset count]
  // LIMIT: 返回结果是否分页, 指令中包含LIMIT后 offset、count 必须输入
  await cache.zrevrangebyscore('key', '+inf', '-inf'); // ['c', 'b', 'a']
  await cache.zrevrangebyscore('key', '+inf', '-inf', cache.CONSTANT.WITHSCORES); // ['c', 3, 'b', 2, 'a', 1]
  await cache.zrevrangebyscore('key', '+inf', '-inf', cache.CONSTANT.WITHSCORES, cache.CONSTANT.LIMIT, 0, 2); // ['c', 3, 'b', 2]

  // 当key存在且不是zset类型，返回错误。
  // 返回从有序集合中删除的成员个数，不包括不存在的成员
  await cache.zrem('not_exist_key', d); // error
  await cache.zrem('key', d); // 0
  await cache.zrem('key', a, b); // 2

  // 删除有序集合key中所有分数介于[min, max]的成员, 返回被删除成员个数
  await cache.zremrangebyscore('key', 1, 1); // 1

  // 删除有序集中指定排名[start, stop]之间的成员, 返回被删除成员个数。
  // 下标参数start和stop都以0为底，0处是分数最小的那个元素。
  // 索引也可以为负数，-1是分数最高的元素。
  await cache.zremrangebyrank('key', 0, 0); // 1

  // 返回有序集key中成员member的排名。有序集成员默认按score值递增顺序排列。
  // score值最小的成员排名为0
  // 使用ZREVRANK命令可以获得成员按score值递减(从大到小)排列的排名。
  await cache.zrank('key', 'a'); // 0 
  await cache.zrevrank('key', 'a'); // 3 

  // 返回key的有序集元素个数，key不存在返回0
  await cache.zcard('key');

  // 返回有序集key中score值在[min, max]之间的成员
  await cache.zcount('key');

  // 返回有序集key中成员member的score值。如果member元素不是成员或key不存在，返回null。
  await cache.zscore('key', 'd'); // null

  // 设置hkey指定的哈希集中指定字段的值。重写hkey指定的哈希集，不管是否存在。返回true。field只能为字符串！！！
  // 名称-id 搜索
  await cache.hset('hkey', 'field', { a: 1 }); // true
  await cache.hset('hkey', 'field', { a: 2 }); // true

  // 返回hkey指定的哈希集中field所关联的值; field不存在或者hkey不存在时返回null。
  await cache.hget('hkey', 'field2'); // null
  await cache.hget('hkey', 'field'); // { a: 2 }

  // 设置hkey指定的哈希集中指定field的值
  await cache.hmset('hkey2', { a: '11', b: '22' }); // true
  await cache.hmset('hkey2', c, '33', b, '44'); // true

  // 返回hkey指定的哈希集中所有的field和value。返回值中，每个字段名的下一个是它的值。
  // 当hkey指定的哈希集不存在时返回null。
  await cache.hgetall('hkey2'); // { c: '33', d: '44', a: '11', b: '22' }
  await cache.hgetall('hkey3'); // null

  // 返回hkey指定的哈希集中指定字段的值
  await cache.hmget('hkey2', ['a', 'b']); // { a: '11', b: '22' }
  await cache.hmget('hkey2', 'c', 'd'); // { c: '33', d: '44' }
  await cache.hmget('hkey2', 'e'); // {}
  await cache.hmget('hkey3', 'e'); // null

  // 从hkey指定的哈希集中移除指定的field。不存在的field将被忽略。返回成功删除的field的数量。
  await cache.hdel('hkey2', 'a'); // 1
  await cache.hdel('hkey2', 'e'); // 0

  // 增加hkey指定的field中指定字段的数值。
  // 如果hkey不存在，会创建一个新的哈希集并与hkey关联。
  // 如果field不存在，则field的值在该操作执行前被设置为 0。
  // HINCRBY 支持的值的范围限定在 64位 有符号整数
  await cache.hincrby('hkey2', 'b', 10); // 32
  await cache.hincrby('hkey2', 'b', -5); // 27

})();
```


### DCache Notes

1. 单条记录大小存储不要超过 `2M`，记录太大影响性能，也可能导致 db 落地写入超时等；

2. 批量读写，一次不要超过 `100条` Key；(`mget`, `mset`, `hgetall`)

3. 数据记录 `value` 为二进制时（比如`jce`序列化的结果）且落库选择的是序列化结果落地的情况下，落地库value字段要用 `blob` （最大`65K`）或者 `mediumblob`，不能用 `text` 或者 `mediumtext`; 在 `blob` 和 `mediumblob` 或者 `text`和 `mediumtext` 选择的时候， 如果记录大小确定小于小于`65K`， 那么可以选择 `blob` 或者 `text`， 否则选择 `mediumblob` 或 `mediumtext`；

4. DCache 落地数据库：预计所有的数据记录条数，到不了`100w`条，`1库10表`；总记录条数不到1亿，`10库10表`；超过1亿：`10库100表`；

5. 部署时注意检查 dcache 的 `value` 类型，要 `midblob` (不能为`varchar`)，dcache 内存大小不能是 `1m` 的。

### DCache Configuration Introduce

  1. ShmKey 共享内存key：从节点配置项列表中查看，显示内容为共享内存key（10进制显示）。该配置项不能随便改动，否则会造成数据丢失！

  2. ShmSize Cache已分配的内存大小：从节点配置项列表中查看。注意这里再应用配置列表中也可以看到，但是一般在节点配置中都有这个配置项，相同的配置项节点配置覆盖应用配置。该配置项不能随便改动，否则会造成cache启动失败。如果是测试环境，数据丢失没用关系，那么可以改了清理共享内存内容再重启cacheserver可以生效，正式环境一定不要改这个配置项，内存不够那么就需要进行cache扩容操作。

  3. EnableErase 当容量达到阀值时，是否允许自动淘汰旧的数据。注意这里的淘汰只是淘汰内存的数据，一般我们都是选择了数据落地db，所以这里的数据并不会丢，而是不进行内存缓存，节省内存cache空间。这里就是冷数据淘汰到db，缓存中保存热数据。 没有特殊要求，这里一律配置 Y。 即允许自动淘汰。

  4. SyncTime 回写时间(默认值300s)。即回写多久以前的数据，时间越大，保留脏数据越多。（脏数据：即数据在内存中，还没有更新落地到db的数据）

  5. SyncInterval 回写操作的时间间隔(默认值300s)。一般不用修改。如果对数据落地实时性要求较高，而数据量不大，可以适当修改该配置。

  6. EraseInterval 每次淘汰数据的时间间隔(默认值5s)。一般不用修改。

  7. SyncThreadNum 回写脏数据的线程数(默认值1)。线程越大，回写越快，DB压力越大。一般不用修改。

  8. SyncSpeed 回写速度(默认值0，不限制)。即每秒钟回写db的数量限制。

  9. SaveOnlyKey 是否保存OnlyKey数据(Y/N)。没有特殊要求，这里一般配置 Y

      (1) ONLY_KEY是什么，有什么作用？

      当DCache对应模块后端有落地db的时候，如果查找某个key在cache中没有value，则会回源到db里面去查找，如果有大量这种查找情况，那么后端db读取量就会非常大从而导致db的压力非常大。 ONLY_KEY就是DCache解决以上问题而做的一个优化设计，当打开ONLY_KEY开关时，对于某个指定key，如果再cache中没有查找到对应的value，则会去db读取，如果db中也没有记录，那么cache中会保存该key，并把它标识为ONLY_KEY，下次再读取该key的时候，则不需要回源到db去查找，减少db的读取量，从而减少db的压力。

      (2) 业务什么时候选择打开ONLY_KEY？

      业务没有特殊要求时，一般都建议打开ONLY_KEY。

      (3) 打开ONLY_KEY有什么影响？

      可能会多占用一些DCache的内存，但是我们一般key都比较短，所以这里占用的内存一般不会太大。另外，打开ONLY_KEY不会影响DCache的正常逻辑，不会因为打开了ONLY_KEY而导致正常能读取到的value而读取不到。

  10. StartExpireThread 是否启动过期数据自动清除线程(默认值Y)。一般不需要修改。

  11. ExpireInterval 每次清除过期数据的时间间隔，单位秒(默认值3600)。一般不用修改。

  12. ExpireDb 过期清理是否同时清理数据库数据(默认值Y)。这里指的是通过api设置了数据过期的场景，一般淘汰就要同时cache和db，否则只是讨论cache的话，那么淘汰之后，再次读的话， 还会从db里面读出来，可能不是业务预期的结果。

  13. MaxLine 每次同步binlog的行数(默认值10000)。这里一般不用修改，但是可能有些特殊场景，比如一条数据记录过大，导致这里10000行超过10M会有问题，这里就需要调整配置。

  14. Record 是否记录binlog(默认Y)。这里不要修改。

  15. DBFlag 是否存在DB或文件存储，Y/N，数据是否落地db，在cache申请的时候选择。如果开始申请的时候不落地db，后来想主动增加DBAccess落地，那么需要修改这里的配置。

  16. ReadDbFlag 当Cache中没有数据时，是否从DB或文件查询, Y/N。这里是针对数据落地的场景，默认配置Y，即cache中没有数据，会落地db。如果是数据总量比较小，可以全量cache，落地db只是为了数据持久化备份用，那么可以改为否，以提高数据不存在时候的读取效率。

  17. ObjName DbAccess的obj名称(以obj结尾)。即该模块对应后端DBAccess服务的obj全称。

  18. EraseRadio 开始淘汰数据的比率（已用chunk/所有chunk数据块*100），即当内存使用率达到该比例后进行冷数据淘汰，以空出内存写入新数据，对于申请内存大于2G的，建议配置90，小于2G的场景，建议配置为85。注意这里如果配置太大，比如95，在总内存比较小而业务写入比较大的情况下，可能会导致写失败，报内存不足。

  19. AvgDataSzie 内存结构优化chunk自动分配大小参数项，配置之后，原有chunk大小配置无效，一般无需修改。

