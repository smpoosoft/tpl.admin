# TTableList 组件

## 功能清单

| 功能 | 功能说明 | 影响数据 | 用户操作 | 交互反馈 | 约束 |
|------|----------|----------|----------|----------|------|
| 筛选标签 | 按分类查看数据 | 是，影响表格显示哪些数据 | 点击某个标签 | 选中标签高亮，表格内容立即切换到对应分类 | 标签上的数字由 prop 传入，组件不自动统计 |
| 关键词搜索 | 按关键词查找数据 | 是，影响表格显示哪些数据 | 在搜索框输入文字 | 每次按键后表格实时过滤，逐字符更新 | 搜索范围由使用方决定；无防抖 |
| 列显隐 | 控制列的显示和隐藏 | 否，仅改变列的可视状态 | 在列设置面板中勾选或取消勾选列名 | 勾选/取消后列立即显示/隐藏，表格列宽自动调整 | 列设置面板通过按钮触发 |
| 列顺序重排 | 调整列的前后排列顺序 | 否，仅改变列的视觉顺序 | 在列设置面板中拖拽列名 | 拖拽时有半透明鬼影跟随鼠标，目标位置虚线轮廓；松开后列立即移动到新位置 | 不支持跨表格拖拽 |
| 列配置重置 | 恢复列显隐和顺序到初始状态 | 否，仅改变列的可视状态 | 点击列设置面板右上角的重置按钮 | 列显隐和顺序恢复为刚加载时的状态 | 初始状态由 defaultColumns prop 确定 |
| 全屏切换 | 将表格容器放大到浏览器全屏窗口 | 否，仅改变显示区域 | 点击全屏按钮 | 表格区域占满全屏，背景自动适配亮色/暗色主题；按钮图标在进入/退出时切换 | 依赖浏览器 Fullscreen API；不支持 IE；全屏背景色由通用方案 `data-fs-bg` 提供（见技术要点） |
| 行选择 | 选中或取消选中数据行 | 是，产生选中的行数据集合 | 点击行任意位置切换选中状态；点击行左侧勾选框也可切换 | 选中行高亮显示，勾选框切换状态，页脚已选计数自动更新 | 再次点击已选行取消选中 |
| 行双击 | 双击行触发事件 | 否，仅通知父组件 | 鼠标双击某行 | 无内置视觉反馈，父组件收到事件后可自行处理 | 父组件监听 `rowDblClick` 事件 |
| 斑马色 | 表格行交替背景色 | 否，仅视觉区分 | 无，自动启用 | 相邻行背景色交替不同 | 由 `stripedRows` prop 控制 |
| 行悬停 | 鼠标悬停时行高亮 | 否，仅视觉反馈 | 鼠标移动到某行 | 悬停行背景色变浅，移出后恢复 | 150ms 过渡动画 |
| 虚拟滚动 | 大数据量下控制 DOM 数量 | 否，仅影响渲染性能 | 无，自动启用 | 表头固定，表格主体可滚动；滚动时动态加载和回收行 | 行高随 tableSize 取值映射（small≈25 / 默认≈37 / large≈45），并以首行实测校正 |
| 水平滚动 | 列总宽度超出容器时出现水平滚动条 | 否，仅改变可视区域 | 无，自动启用 | 列宽超出容器时底部出现水平滚动条，可左右拖动查看隐藏列 | 由内容宽度自动触发，无需配置；水平滚动时表头与表体同步滚动 |
| 列排序 | 点击列头按该列排序 | 是，影响数据显示顺序 | 点击列头切换排序状态；多列排序时按住 Ctrl/Cmd 点击 | 点击一次升序，再次点击降序，第三次取消排序；排序列头显示箭头指示方向 | 支持多列排序（Ctrl/Cmd+点击）；排序可取消（removable）；排序在客户端执行 |
| 列冻结 | 操作列固定在表格右侧 | 否，仅改变列的可视位置 | 无，自动启用 | 水平滚动时操作列始终可见，不随其他列滚动 | 仅 actions 列冻结在右侧，其他列不冻结 |
| 水平滚动定位 | 将表格水平滚动条一键移到最左/最右 | 否，仅改变可视区域 | 点击工具栏的左/右箭头按钮 | 表格平滑滚动到对应端点，不改变数据 | 列总宽超过容器时才有可见效果，否则无可滚动距离 |
| 合计行 | 对指定列求和并展示在表格底部 | 否，仅展示统计结果 | 无，由父组件传入合计值 | 底部固定一行，参与合计的列显示数值，其余列空占位 | 仅渲染传入 footers 中可见的列；前 3 列（含勾选列）合并为"合计"标识 |
| 列宽拖拽 | 拖动列头边框调整列宽 | 否，仅改变列显示宽度 | 鼠标悬停在列头边框处，光标变为双向箭头时拖拽 | 拖拽时列宽实时变化，松开后固定 | 拖拽不影响后续列宽度（expand 模式） |

## 技术要点

### 全屏背景配置（通用方案，与 TTableList 解耦）

全屏背景色定义在 preSet.ts 的 `colorScheme` 中。亮色模式白色（surface-0），暗色模式透明。全局样式 `[data-fs-bg]:fullscreen` 在 preSet.ts 模块加载时注入 document head。

方案不绑定任何特定容器名，任意组件的根 wrapper 添加 `data-fs-bg` 属性即生效，无需编写额外 CSS。TTableList 仅是在根 wrapper 上加了该属性，并非此方案的独占使用者。

### 功能实现要点

#### 筛选标签
- 使用 PrimeVue Tabs 组件，不含 TabPanels（仅用于切换，不承载面板内容）
- 标签切换触发 `update:activeFilter` 事件，父组件据此重新计算数据
- `filterTabs` 中的 `count` 值只展示，不参与计算

#### 关键词搜索
- 通过 `update:searchKeyword` 事件通知父组件，组件自身不做搜索
- 搜索范围由父组件的过滤逻辑决定，不限字段

#### 列显隐
- 使用 PrimeVue Checkbox 组件，通过 `v-model` 绑定到 `visibleFields` 数组
- `visibleFields` 为 `string[]`，存储可见列的 field 值
- 列设置面板为 PrimeVue Popover，通过 ref.toggle 打开

#### 列顺序重排
- 基于 HTML5 Drag and Drop API
- 重排逻辑在 `drop` 事件中执行，不在 `dragend` 中
- 拖拽鬼影通过 `dataTransfer.setDragImage` 设置
- 目标位置样式：`drop-target` class（虚线轮廓 + 主题色背景），过渡动画 150ms

#### 列配置重置
- `reset()` 函数：`visibleFields` 恢复为所有 field，`columns` 恢复为 `defaultColumns` 的副本
- `defaultColumns` 作为 prop 传入，组件不修改原始数据

#### 全屏切换
- 使用 Fullscreen API：`element.requestFullscreen()` / `document.exitFullscreen()`
- 图标状态通过 `fullscreenchange` 事件同步，支持 Escape 退出
- 全屏背景色由通用方案 `data-fs-bg` 提供（见下方"全屏背景配置"），非 tableListWrapper 专用逻辑

#### 行选择
- 使用 PrimeVue DataTable 的 `v-model:selection`
- 选择列通过 `<Column selection-mode="multiple" />` 独立设置，不参与列显隐控制
- 点击行任意位置切换选中状态（再次点击已选行取消选中）
- `selectedItems` 为内部状态，仅用于页脚计数

#### 行双击
- DataTable 监听 `@row-dblclick`，向上抛出 `rowDblClick` 事件
- 事件载荷为当前行数据对象
- TTableList 透传该事件，父组件可通过 `@row-dbl-click` 监听

#### 斑马色与悬停
- DataTable 设置 `stripedRows` 启用斑马色交替行
- 鼠标悬停行时背景色变浅（`--p-primary-50`），150ms 过渡
- 暗色模式悬停色为 `--p-primary-900` 混合透明

#### 虚拟滚动
- 通过 DataTable 的 `virtual-scroller-options="{ itemSize }"` 启用，`itemSize` 由 tableSize 经 `SIZE_ITEM_SIZE` 映射给出初始值（small 25 / 默认 37 / large 45）
- 挂载后实测首行 `offsetHeight` 覆盖初始估算值，避免 itemSize 与实际行高不一致导致虚拟滚动错位
- 配合 `scrollable` 和 `scrollHeight="flex"` 实现固定表头
- 切换 size 或数据变化时重测行高并重新合并合计行

#### 水平滚动
- 通过 `scrollable` prop 启用水平滚动能力
- 每列通过 `headerStyle` 设置 `min-width`（长文本列 200px，信用代码列 180px，其余 120px），防止 PrimeVue 自动压缩列宽
- 列宽之和超出容器宽度时，底部自动出现水平滚动条
- 水平滚动与虚拟滚动共存，不冲突
- 不设置 `scrollWidth`，由内容宽度自然驱动

#### 列排序
- DataTable 设置 `sort-mode="multiple"` 和 `removable-sort`
- 每个 Column 设置 `sortable` 属性
- 排序在客户端执行，DataTable 内部维护排序状态，不涉及父组件
- 多列排序：点击列头切换排序方向，按住 Ctrl/Cmd 点击另一列头追加排序列
- 可取消排序：同一列点击三次分别经历 未排序→升序→降序→未排序

#### 列冻结
- actions 列设置 `frozen` 和 `align-frozen="right"`，冻结在表格右侧
- 水平滚动时 actions 列始终可见，不随其他列滚动

#### 水平滚动定位
- `scrollXLeft` / `scrollXRight` 通过 `el.scrollTo({ left, behavior: 'smooth' })` 平滑滚动
- 滚动容器为当前组件作用域内的 `.tableListContent .p-datatable-table-container`（即 DataTable 的 scrollable 表格容器，承担水平滚动）
- 选用 `scrollTo + smooth` 而非直接置 `scrollLeft`，以提供视觉过渡；列宽不足触发水平滚动时函数无可见效果，但不会报错
- 按钮图标使用本地图标 `arrow/prev`、`arrow/next`（prev.ts 通过对 next 路径整体 X 镜像 transform 得到，保证圆角与原风格一致）

#### 合计行
- 由父组件传入 `footers: Record<string, string | number>`，键为列 field，值为合计文案
- TTableList 透传 footers 至 TDataTableList；TDataTableList 对每个可见列渲染 footer，未在 footers 中的列输出空串占位，保持列宽与表体对齐
- 合计行前 N 列合并为"合计"标识：选择列存在时 N=3，否则 N=2；合并通过 DOM 操作给首个 td 设置 colspan 并删除其后 N-1 个 td 实现
- 合计行整行挂 `mergeTextCell` class，合并单元格靠 `td[colspan]` 选择器居中；样式可在 TDataTableList.vue 的 `:deep(.mergeTextCell)` 处改造

#### 列宽拖拽
- DataTable 设置 `resizable-columns` 和 `column-resize-mode="expand"`
- 光标移至列头边框处变为双向箭头，拖拽调整列宽
- expand 模式调整列宽时不影响后续列

#### 列宽规则
- 列定义通过 `headerStyle.width` 设定显式宽度
- 有显式宽度的列，内容溢出时以 `...` 省略
- 无显式宽度的列，由 `table-layout: auto` 规则自适应内容宽度
- 客户列（avatar + 姓名 + ID）使用 flex 单行布局，垂直方向不折行

### TDataTableList body 映射规则

TDataTableList 根据 field 值匹配渲染方式：

| field | 渲染内容 |
|-------|----------|
| name | 首字圆形徽标 + 姓名 + 编号 |
| tag | PrimeVue Tag 组件，severity 按 tagClass 映射 |
| actions | 编辑和删除按钮 |
| 其他 | 纯文本 |

### Props 参考

| prop | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| filterTabs | `{ key; label; count }[]` | — | 筛选标签列表，key 为唯一标识、label 为显示名、count 仅展示不参与统计 |
| dataList | `any[]` | — | 表格渲染的数据源（已过滤/搜索之后的最终数据） |
| totalCount | `number` | — | 总记录数，仅用于页脚展示 |
| defaultColumns | `ColumnProps[]` | — | 列定义初始快照（顺序、显隐），作为列重置基准 |
| activeFilter | `string` | — | 当前激活的筛选标签 key，v-model:active-filter 支持 |
| searchKeyword | `string` | — | 当前搜索关键字，v-model:search-keyword 支持 |
| tableSize | `'small' \| 'large' \| undefined` | `undefined` | 行高尺寸：传给 TDataTableList 的 size prop |
| hideOptCol | `boolean` | `false` | 隐藏操作列 |
| footers | `Record<string, string \| number>` | — | 合计行：键为列 field，值为合计文案；仅渲染 footers 中可见列 |
| opt-col slot | — | — | 自定义操作列内容，接收 `{ data: any }` |

### Events 参考

| event | 载荷 | 说明 |
|-------|------|------|
| update:activeFilter | `string` | 切换筛选标签时触发，父组件据此重新计算 dataList |
| update:searchKeyword | `string` | 搜索框输入变化时触发，父组件据此重新计算 dataList |
| rowDblClick | `any` | 双击行触发，载荷为该行数据对象 |

### TEmptyPanel

空数据状态提示组件（`@/components/dataKit/TEmptyPanel.vue`），居中显示图标 + "暂无数据" + "请尝试调整筛选条件"。TDataTable 的 `#empty` 插槽中使用此组件替代硬编码 HTML。

新增映射需在 TDataTableList 的 body 模板中增加 `v-if` 分支。
