# 任务：引入主/次文字颜色 token

## 原始需求
将当前项目的「主文字颜色」和「次文字颜色」对齐参考项目 `/smpoo_code/dev/fullStatic/playground/uex_v1/src/assets/variables.css` 第 11 节定义的语义化变量。

## 变量定义（来自参考项目）
| token | light | dark |
|---|---|---|
| `--text-main` | `#0f172a` | `#e8eafa` |
| `--text-secondary` | `#475569` | `#9ba3d4` |

## 实施范围
- 仅修改 `src/assets/css/00.root.css`：在 `:root` 中新增上述 2 个变量，新增 `.dark` 作用域覆盖深色值。
- 不修改 `uno.config.ts`（其 `textPrimary`/`textSecondary` 命名是独立体系，与本任务无交叉）。
- 不修改 PrimeVue 主题、`preSet.ts` 或任何组件。

## 验收
启动 dev server 后用 Playwright 检查：
- 任意主文字元素 computed `color` = `rgb(15, 23, 42)`
- 任意次文字元素 computed `color` = `rgb(71, 85, 105)`
- 切换 `.dark` 后主文字 = `rgb(232, 234, 250)`，次文字 = `rgb(155, 163, 212)`

## 关联
- Git commit：Conventional Commits（feat）
- CHANGELOG：新增条目
