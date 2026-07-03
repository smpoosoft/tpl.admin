# CHANGELOG

## [Unreleased]

### Changed
- 迁移至 smpoo_lint ESLint 配置体系，替换默认 Vue scaffold 配置
- 替换 oxlintrc.json 自定义配置为 `flat/recommended` 预设
- ESLint 作用域限制为 `src/` 和 `test/` 目录
- 所有源文件统一添加分号、移除尾逗号

### Removed
- 删除 `pnpm-workspace.yaml`（独立项目，无需 monorepo 配置）
- 删除独立 `e2e/` 测试目录，归入 `test/`