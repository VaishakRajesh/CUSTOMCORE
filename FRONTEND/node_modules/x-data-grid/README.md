# x-data-grid

## 安装
```
npm install x-data-grid -S
```

## 使用
```
import Vue from 'vue'

import xDataGrid from 'x-data-grid'
Vue.use(xDataGrid)
import 'x-data-grid/lib/xDataGrid.css'
```



**Demo** ：https://wuchuanxun.github.io/x-data-grid/

#### 参数配置

| 参数         | 类型         | 说明                 |
| ------------ | ------------ | -------------------- |
| columns      | Object Array | 列定义               |
| source       | Object Array | 数据                 |
| pageSize     | Number       | 0表示不分页          |
| editable     | Boolean      | 表格是否可以编辑     |
| height       | String       | 内表格高度，可用calc |
| rowKey       | String       | 行的键，默认用_index |
| hiddenSearch | Boolean      | 隐藏搜索行           |
| hiddenFooter | Boolean      | 隐藏底部分页栏       |
| noDataText   | String       | 没有数据显示的文本   |
| overwriteSearch   | Boolean  | 用slot=_search替换搜索框 |
| hiddenInfo | Boolean | 是否隐藏表格左下角统计信息 |
| enableExpand | Boolean | 是否允许展开行，默认false |
| clickExpand | Boolean | 单机展开行，建议不与editable混用, 默认false |
| loading | Boolean | 是否加载中，显示加载动画 |
| enableActiveRow | Boolean | 是否允许高亮行 |
| zebra | Boolean | 是否启用斑马条纹 |
| groupKey | Function | 输入行数据，放回group的名称 |
| showGroupQty | Boolean | 展示group成员数目，分组等级低于分页 |
| checkedKeys | Array | 用sync双向绑定选择的行 |
| expandedKeys | Array | 用sync双向绑定展开的行 |
| rowStyle | Object \| Function | 返回行的class定义，用于行自定义样式 |



#### 列定义

| 属性        | 类型                  | 选项                 | 说明                             |
| ----------- | --------------------- | -------------------- | -------------------------------- |
| type        | Sting                 | text\|number\|_check | _check表示勾选框                 |
| width       | Number                |                      |                                  |
| title       | String                |                      | 行标题                           |
| key         | String\|Number        |                      | 属性索引，可使用.                |
| adjustable  | Boolean               |                      | 可调整列宽                       |
| filterable  | Boolean               |                      | 加入搜索，默认False              |
| sortable    | Boolean               |                      | 是否可以搜索                     |
| sortFn      | function(a,b): number |                      | 自定义排序比较函数，可以不指定   |
| slot        | String                |                      | 自定义插槽                       |
| align       | String                | left\|center\|right  | 对齐方式                         |
| ellipsis    | Boolean               |                      | 是否使用省略号                   |
| _sortType   | String                | normal\|asc\|desc    | 默认排序方式                     |
| customAttrs | Function              |                      | 自定义单元格属性，用于合并单元格 |



#### 插槽使用

```vue
<template
    slot="slotName"
    slot-scope="text,record,index"
>
	<a>
    	{{ text }}
    </a>
</template>
```

其中 text = record[key] 



#### 事件

| 事件名称         | 参数          | 说明                   |
| ---------------- | ------------- | ---------------------- |
| selectChanged    | selectRowKeys | 选择的行key列表        |
| editCell         | cellData      | 编辑单元格编辑后的数据 |
| activeRowChanged | rowData       | 点选行，参数表示行数据 |

注：双击启用编辑，回车确定更改



#### 行选择

`_checked` 属性表示是否选中



#### 行展开

`_expanded` 属性表示是否展开， 展开渲染插槽

```vue
<p
   slot="expandedRowRender"
   slot-scope="record,index"
>
    {{record}} {{index}}
</p>
```



#### 自定义筛选

`overwriteSearch` 用自己的筛选代替原有的
调用节点函数 `filterData`, 传入筛选的函数，函数接收原始的数组作为输入，返回筛选后的数组



#### 修改行间距

```scss
.x-data-grid {
    th,td{
      padding: 4px 6px !important;
    }
}
```



#### 单元格合并案例

```js
const renderAttrs = function(value,row,index,source){
  // 如果重复就不画
  if (index > 0 && source[index].pCode === source[index - 1].pCode) {
    return {
      rowspan: 0
    }
  }

  let rowspan = 1
  const pCode = source[index].pCode

  let i = index + 1
  while (i < source.length && source[i].pCode === pCode) {
    i++
    rowspan++
  }

  // 合并同类项
  return {
    rowspan: rowspan
  }
}
```

函数第一个参数是当前单元格数值、第二个参数是当前行，第三个参数是下标，第四个参数是数据列表

最后返回行列合并的配置：

```js
{
    rowspan: 1,
    colspan: 1
}
```

