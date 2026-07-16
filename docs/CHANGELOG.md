# CHANGELOG

## [Unreleased]

### Added
- TTableList 组件（列表容器）：筛选标签、搜索、列显隐/重排、全屏、行选择、虚拟滚动、水平滚动、列排序、列冻结、列宽拖拽、斑马色/悬停、行双击事件
- TDataTableList 组件（PrimeVue DataTable 封装）：虚拟滚动、列冻结、列宽拖拽、列排序、行选择/双击、斑马色/悬停、空状态组件
- TEmptyData 空状态组件
- TEmptyPanel 空状态提示组件
- listBase.ts（mock 数据规范文件）：Customer 类型、TABLE_COLUMNS（含 headerStyle.width）、TABLE_CUSTOMERS（20 条）、FILTER_TABS
- TTableList.md 组件文档
- preSet.ts 全屏背景色方案：data-fs-bg 属性选择器 + fullscreen.background 语义 token
- 14 个业务页面目录各自新增 `bizDef.ts`（导出 bizIdent/bizIdentNamezh/description）和 `imt.ts`（重导出 bizDef）
- 14 个 TMainView.vue 全部追加 `import * as imt from './imt'`，`<TRouterPanel>` 绑定 `:imt`

### Changed
- 路由从 16 条硬编码规则变更为 `import.meta.glob` 自动发现 `pages/bills/**/bizDef.ts` + `TMainView.vue`，通过 key 匹配自动生成路由记录
- `mock/homePage.ts` dataMenus 全部路径更新为新路由规则，移除不存在的 `/biz/file-previewer` 条目
- 14 个业务页面从单文件 `foo.vue` 移至 `foo/TMainView.vue` 子目录结构（还原点提交）
- `preSet.ts` 中 `themePreSet.semantic.primary` 11 档（50-950）替换为参考项目 `uex_v1/src/assets/variables.css` 第 1 节 `--primary-*` 值：50=`#f7f8fd`、100=`#eef0fa`、200=`#d6d9f0`、300=`#b8bfe3`、400=`#9ba3d4`、500=`#8088c4`、600=`#6a72b2`、700=`#565c9e`、800=`#454a8e`、900=`#35397e`、950=`#2c2867`
- `chartCardPt` 重命名为 `cardLayoutPt`，内置 `min-h-0` 和 `container-type: size`，消除模板层手动类名
- TabPanel 全局 PT 注入 `fullWH`，`03.layers.css` 中依据父级 `overY`/`overHidden` 条件设置 TabPanel 的 `container-type: size` 和 overflow 行为
- 升级 primevue 至 v5 后 `pnpm dev` 报 `Rolldown failed to resolve import "primeicons/primeicons.css"`：primevue v5 不再依赖 `primeicons` 字体包（改以 `@primeicons/vue` + `@primevue/icons` 提供 SVG 图标），但项目仍通过 `pi pi-*` 类使用图标字体，需在 `package.json` 显式声明 `primeicons` 为直接依赖以恢复本地链接
- TListBase/TMainView.vue 重构：筛选标签、搜索、列设置、全屏等功能拆分为 TTableList + TDataTableList 层级
- preSet.ts 添加 `fullscreen.background` 语义 token（light: surface-0, dark: transparent），注入 `[data-fs-bg]:fullscreen` 全局样式

### Removed
- mock/listData.ts 中的 TABLE_CUSTOMERS、FILTER_TABS 移至 listBase.ts，listData.ts 保留 LIST_CUSTOMERS/LIST_COLUMNS 及 re-export
- `Failed to resolve directive: tooltip`: primevue v5 要求显式注册 Tooltip 指令（`app.directive('tooltip', Tooltip)`），TDetail 和 TOrganization 两页面使用的 `v-tooltip` 在未注册时触发 Vue warn，在 `main.ts` 添加导入和注册修复

### Changed
- 14 个页面按 B 项目重构内容结构：合同管理增加筛选面板(日期/项目/人员)和导出按钮；业务报表增加时间范围按钮、营收趋势柱状图、客户来源分布、明细表格；职员管理增加全/在职/试用期/离职筛选、反选按钮；透视报表增加分析配置面板和动态透视表

### Added
- 14 个业务页面：表格列表、表单页面、详情页面、合同管理、流程设计、业务报表、数据报表、透视报表、组织管理、职员管理、安全中心、提醒管理、系统日志、个人中心
- 路由配置：16 条路由（含首页、简单列表），全部懒加载
- Mock 数据模块：`mock/listData.ts`、`mock/viewData.ts`、`mock/bizData.ts`、`mock/reportData.ts`、`mock/sysData.ts`
- 路由过渡动画：`02.animate.css`（animate.css zoomIn/zoomOutDown），`<Transition mode="out-in">` 包裹 `<router-view>`
- 恢复 primeicons CSS 导入，修复 pi-* 图标不显示问题

### Added
- TIcon 新增 `overlay` prop（IBadgeOverlay），支持右上角数值/圆点提示
- TPopoveIcon 新增 `overlay` prop 透传至 TIcon
- TDarkSwitcher 暗色模式切换组件（替代 DaisyUI swap，CSS 动画过渡）
- TPopoveIcon 图标弹出菜单组件（hover/click 触发，支持 TPopoverItem 数据）
- TIcon 新增 `strokeWidth` prop，动态调整 SVG stroke-width
- TIcon 新增 `flip` 可选属性（缺省不翻转），移除 flip 默认值
- `preSet.ts` 新增 `bg.page` 语义 token，用于页面衬底色
- 项目根全局文本 `color: var(--p-text-color)` 跟随暗色模式

### Changed
- 替换 oxfmt 为 prettier 作为项目格式化工具
- `.prettierrc`：2 空格、singleQuote、semi、no trailingComma
- 调整 `format` 脚本为 `prettier --write src`
- 调整 TIcon.vue SCSS 嵌套写法以兼容 prettier 格式化
- 图标文件从 `src/components/widget/icons/` 迁移至 `src/assets/icons/`
- TIcon.vue glob 路径适配 `assets/icons/**/*.ts` 子目录结构
- Home 页面布局使用 `--p-bg-page`、`--p-content-background` 等语义变量
- Panel header 背景色使用 `{content.background}` 语义 token

### Removed
- 移除 `oxfmt` 依赖（oxlint 保留用于 lint）
- 删除 `pnpm-workspace.yaml`（独立项目，无需 monorepo 配置）
- 删除独立 `e2e/` 测试目录，归入 `test/`
