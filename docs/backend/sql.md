---
title: Mysql
categories:
 - backend
tags:
 - mysql
---

<!-- 这里是文章摘要 -->

:::tip
简单介绍了 mysql 的基本操作及一些基本概念。
:::

<!-- more -->

### GUI Tools

Mac OS X: [sequelpro](http://www.sequelpro.com/)

Windows: [heidi](https://www.heidisql.com/)


### 数据库分类

1. 关系型数据库（Sql）- 通过表和表之间，行与列之间的关系进行数据存储

  如 Mysql, Oracle, sqlServer


2. 非关系型数据库（NoSql）- 对象存储，通过对象自身的属性来决定

  如 Redis, MongoDB


### 基础命令

1. `mysql -utafadmin -ptafadmin2017 -h 10.0.0.1;` 登录mysql

    (1) -u, -p, -h 后紧跟用户名、密码和数据库主机地址，本机可省略 -h 参数。

    (2) 命令以分号结尾。

2. `show databases;` 显示所有的数据库

3. `create database db_name;` 创建数据库

4. `drop database db_name;` 删除数据库

5. `use db_name;` 进入目标数据库

6. `show tables;` 显示当前数据库全部表

7. `drop table table_name if exists;` 删除表

8. `desc table_name;` 显示表结构

9. 复制粘贴已转储好的全部表结构，执行即可完成导入新表；

10. select, update, delete, insert 语句执行操作表数据。

11. `exit;` 退出


### 索引的分类

MySQL 把同一个数据表里的索引总数限制为16个。

用途：提高查询效率。

语法：create index 索引名 on 表(字段)
```sql
create index idx_table_xxx on table_name(age)
```

原则：

- 索引不是越多越好（占据硬盘空间）
- 不要对数据进行变动  
- 小数据的表不需要加索引  
- 索引一般加在常用查询、排序的字段  

1. 主键索引

  主键不可重复。定义时使用的关键字是 `PRIMARY`。

2. 唯一索引
  
  定义时使用的关键字是 `UNIQUE`。

3. 普通索引

  由关键字 `KEY` 或 `INDEX` 定义的索引。

4. 外键索引

  定义时使用的关键字是 `foreign key(col_name)`。建立外键的前提是本表的列必须与外键类型相同，同时外键必须是外表主键。

5. 复合索引

  `index(colA, colB)`

6. 全文索引

  关键字 `FULLTEXT`。InnoDB 数据表不支持全文索引。


### 标准 sql 语句

1. 查询语句

  `SELECT param FROM table WHERE condition ORDER BY param1;`

2. 新增语句

  `INSERT INTO table (param1，param) VALUES (value1，value2);`

3. 更新语句

  `UPDATE table SET param=new_value WHERE condition;`

4. 删除语句

  `DELETE FROM table WHERE condition`


### 一些关键字

1. `like`

  模糊查询。

  `like` 结合 `%` 代表0到任意个字符，结合 `_` 代表一个字符。

  ```sql
  select * from table_name as t where t.name like '%china';
  select * from table_name as t where t.name like '%china%';
  select * from table_name as t where t.name like '_china';
  ```

2. `in`

  查询具体的一个或者多个值。

  ```sql
  select * from table_name as t where t.age in (16,18);
  ```

3. `inner join`, `left join`, `right join`

  联表查询。

  `left join` (左联接) 返回包括左表中的所有记录和右表中联结字段相等的记录，返回记录条数与左表相同，不足的记录属性用NULL填充  
  `right join` (右联接) 返回包括右表中的所有记录和左表中联结字段相等的记录，返回记录条数与右表相同，不足的记录属性用NULL填充  
  `inner join` (等值连接) 只返回两个表中联结字段相等的行，不足的记录属性直接舍弃 

  ```sql
  select * from table_a as a left join table_b as b on a.aid = b.bid where condition;
  ```

4. `order by`

  排序。`desc` 降序， `asc` 升序，默认 `desc`。

5. `limit offset,size`

  分页。

  ```sql
  select * from table_name where condition limit 1,10;
  ```

6. `group by`

  分组。


### 防止 SQL 注入

  最佳方案：预编译`sql`语句。本质是把传递进来的参数当做字符，转义字符被直接转义。

  其它：

  - 限制数据库权限
  - 规定数据类型、长度
  - 过滤参数中的一些数据库关键词