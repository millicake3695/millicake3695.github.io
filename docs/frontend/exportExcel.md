---
title: 数据导出为 excel 文件
categories:
 - frontEnd
---

:::tip
分别介绍了前台导出和后台导出的方法。
:::

<!-- more -->

#### 1. node.js 后端导出 (前端使用a标签)

```js
import nodeExcel from 'excel-export';
import axios from 'axios';

async excelExport (req, res) {
  const res = await axios.get('url');
  const conf = {};
  // type: string | number
  conf.cols = [
    { caption: '时间', captionStyleIndex: 1, type: 'string' },
    { caption: '价格', captionStyleIndex: 1, type: 'number' }
  ];
  const rows = [];
  if (res.state === 200 && res.data.code === 0) {
    res.data.list.forEach(v => {
      rows.push([ v.creataTime, +v.price ]);
    });
    conf.rows = rows;
    const excel = nodeExcel.execute(conf);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats');
    res.setHeader("Content-Disposition", `attachment; filename=excel${Date.now()}.xlsx`);
    res.end(excel, 'binary');
  } else {
    res.end(res.data.message || 'Network Error');
  }
}
```


#### 2. 前端导出 excel 表格

依赖 `xlsx`。

<a href="/excel.js" target="_blank">excel.js</a>

```js
// index.vue
import("./excel.js").then((excel) => {
  const tHeader = ["姓名", "年龄"];
  const filterVal = ["name", "age"];
  const data = formatJson(filterVal, content);
  excel.export_json_to_excel({
    header: tHeader,
    data,
    filename: "list",
  });
});

// 数据转换
formatJson(filterVal, jsonData) {
  return jsonData.map(v => filterVal.map(j => v[j]));
}
```
