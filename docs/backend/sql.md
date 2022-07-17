### MYSQL GUI Tools
Mac OS X: 	http://www.sequelpro.com/
Windows: 	https://www.heidisql.com/


npm dependencies: @up/tg-data-async

```js
  const [ where, param ] = pool.buildWhere({
    'a.id': id || null,
    'a.content': [ 'like', `%${title}%` ],
    'a.status': [ 'in', status ],
    'a.id': lastId >= 0 ? [ '>', lastId ] : [ '<', startId ],
    'a.start_time': [ '>=', moment().format('YYYY-MM-DD') + ' 00:00:00' ],
    'b.org_id': org_id,
  });
  // 对于 join 联表查询，需使用 table.* 返回特定表的数据，使用 * 则返回多表相同字段覆写后的数据(类似Object.assign(a, b))
  const [ recordRows, totalRows ] = await Promise.all([
    pool.select(`select a.* from a join b_info as b on a.id = b.id where ${where} order by a.create_time desc limit ?, ?`, [ ...param, offset, size ]),
    pool.select(`select count(0) as total from a join b_info as b on a.id = b.id where ${where}`, param),
  ]);
```

```js
  await pool.select('select * from a where id = ?', [ id ]);
  await pool.select(`select id, a_name as name from ${table_name} where id in (${_.join(ids, ',')})`);
  // locate(s1, s) 从字符串 s 中获取 s1 的开始位置, 从 1 开始
  await pool.select('select * from a where locate(?,a_list) > 0', [ id ]);
  // start_time: YYYY-MM-DD HH:mm:ss
  // now() 返回当前日期和时间 2020-09-22 09:00:00
  await pool.select('select *  from a where type = 3 and status = 3 and now() > start_time and now() < end_time and UNIX_TIMESTAMP(now()) - UNIX_TIMESTAMP(start_time) < length');
```

```js
  // 一个或多个 cloumn 修改为相同 value
  await pool.update(table_name, params, 'id = ?', [ id ]);
  await pool.update(table_name, { status }, `id in (${_.join(ids, ',')})`);

  // 一个或多个 cloumn 修改为不同 value
  let sql = 'case id';
  list.forEach(v => {
    sql += ` when ${v.id} then '${v.name}'`; // 注意''
  });
  sql2 += ' case id';
  list.forEach(v => {
    sql += ` when ${v.id} then '${v.title}'`;
  });
  await pool.select(`update ${table_name} set user_name = ${sql} end, title = ${sql2} end where id in (${list.map(v => v.id).join(',')})`);
  // 不支持 pool.update(`update ${table_name} set user_name = ${sql} end, title = ${sql2} end where id in (${list.map(v => v.id).join(',')})`) ?
```

```js
  await pool.insert(table_name, pool.obj2DbRow(params));
```