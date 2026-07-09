# CHANGELOG

## [Unreleased]

### Fixed
- 升级 primevue 至 v5 后 `pnpm dev` 报 `Rolldown failed to resolve import "primeicons/primeicons.css"`：primevue v5 不再依赖 `primeicons` 字体包（改以 `@primeicons/vue` + `@primevue/icons` 提供 SVG 图标），但项目仍通过 `pi pi-*` 类使用图标字体，需在 `package.json` 显式声明 `primeicons` 为直接依赖以恢复本地链接
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