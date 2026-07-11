# 任务：移植 primary 色板到 PrimeVue 主题

## 原始需求
把 `/smpoo_code/dev/fullStatic/playground/uex_v1/src/assets/variables.css` 第 1 节（`--primary-{50..950}`）颜色值移植到当前项目 `src/assets/ts/preSet.ts` 的 `themePreSet.semantic.primary`。

## 颜色映射

| PrimeVue `primary` 档位 | 值 | 参考项目变量 |
|---|---|---|
| 50 | `#f7f8fd` | `--primary-50` |
| 100 | `#eef0fa` | `--primary-100` |
| 200 | `#d6d9f0` | `--primary-200` |
| 300 | `#b8bfe3` | `--primary-300` |
| 400 | `#9ba3d4` | `--primary-400` |
| 500 | `#8088c4` | `--primary-500` |
| 600 | `#6a72b2` | `--primary-600` |
| 700 | `#565c9e` | `--primary-700` |
| 800 | `#454a8e` | `--primary-800` |
| 900 | `#35397e` | `--primary-900` |
| 950 | `#2c2867` | 参考项目未给 dark 950，**沿用最暗 light 900 衍生深色**；实际值来自 900 rgb(53,57,126) 提暗 |

## 实施范围
- 仅修改 `src/assets/ts/preSet.ts` 的 `themePreSet.semantic.primary`
- 不改动 `colorScheme.text`、其他字段或其他文件

## 验收
浏览器读取 `:root` 上 PrimeVue 主题生成的 CSS 变量：
- `--p-primary-color` = `#35397e`
- `--p-primary-hover-color` = `#454a8e`
- `--p-primary-active-color` = `#2c2867`
- `--p-primary-50` = `#f7f8fd`
- `--p-primary-100` = `#eef0fa`
- `--p-primary-500` = `#8088c4`
- `--p-primary-900` = `#35397e`
- `--p-primary-950` = `#2c2867`

## 关联
- Git commit：Conventional Commits（feat）
- CHANGELOG：新增条目
