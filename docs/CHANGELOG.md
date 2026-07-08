# CHANGELOG

## [Unreleased]

### Changed
- 替换 oxfmt 为 prettier 作为项目格式化工具
- `.prettierrc`：2 空格、singleQuote、semi、no trailingComma
- 调整 `format` 脚本为 `prettier --write src`
- 调整 TIcon.vue SCSS 嵌套写法以兼容 prettier 格式化

### Removed
- 移除 `oxfmt` 依赖（oxlint 保留用于 lint）
- 删除 `pnpm-workspace.yaml`（独立项目，无需 monorepo 配置）
- 删除独立 `e2e/` 测试目录，归入 `test/`