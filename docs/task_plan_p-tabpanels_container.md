# 任务：p-tabpanels 的 overflow 和 container-type 控制

## 原始需求
首页业务信息 Card 内的 Tabs 组件，其 `p-tabpanels`（面板容器）需要：
1. 根据 `overY` 配置，获得 `overY`（纵向滚动）或 `overHidden`（双向隐藏）原子类
2. 设置 `container-type: size`，使内部元素可用 `cqh` 单位填充高度

## 实现方案
通过 PrimeVue Tabs 组件的 PT 系统，使用 `tabpanels` 键（复数，对应 panels 容器 DOM 元素）配置类名和样式。

`preSet.ts` 新增 `tabsPt` 工厂函数：
```ts
export const tabsPt = (opt: { overY?: boolean } = {}) => ({
  tabpanels: {
    class: `fullWH ${opt.overY ? 'overY' : 'overHidden'}`,
    style: { 'container-type': 'size' }
  }
});
```

`HomePage.vue` 业务信息 Card 的 Tabs 标签使用：
```vue
<Tabs lazy value="0" :pt="tabsPt({ overY: true })">
```

## 验收标准
- p-tabpanels 元素在 DOM 上具有 `overY` 或 `overHidden` 类名
- p-tabpanels 的 computed style 中 `container-type` 为 `size`
- 内容溢出时，p-tabpanels 纵向可滚动（overY）或隐藏（overHidden）
- 页面无 console error