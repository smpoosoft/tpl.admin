// uno.config.ts
// 当前预设文件，对应原 preSet.scss 及 preBuild/css/ 下静态具名样式类的完整迁移版本
// 说明：所有间距类均以 8px 为最小刻度单位（$loopTimes 概念已废弃，改为按需匹配，无需预先声明循环上限）
// 原子函数命名规则：rules_XXName → preBuild/css/XX.name.css
import { defineConfig, type Rule } from 'unocss';
import presetUno from 'unocss/preset-uno';


// #region 共享配置
// 间距基准单位：1 个刻度 = 8px
const SPACE_UNIT = 8;

// 预设具名值（对应原 $namedKey）
const namedKey: Record<string, string> = {
  Min: '1px',
  Sm: '2px',
  Md: '4px'
};

// 方向映射（对应原 $spaceDirection）
const dirMap: Record<string, string> = {
  T: 'top',
  R: 'right',
  B: 'bottom',
  L: 'left'
};

/** 根据方向生成对应的 padding / margin 样式对象
 * @param prop 'padding' | 'margin'
 * @param dir 'X'(左右) | 'Y'(上下) | 'T'/'R'/'B'/'L'(单边) | ''(全向)
 * @param val 具体数值，如 '8px'
 */
const spaceCss = (prop: 'padding' | 'margin', dir: string, val: string) => {
  if (dir === 'X') return { [`${prop}-left`]: val, [`${prop}-right`]: val };
  if (dir === 'Y') return { [`${prop}-top`]: val, [`${prop}-bottom`]: val };
  if (dir in dirMap) return { [`${prop}-${dirMap[dir]}`]: val };
  return { [prop]: val };
};
// #endregion

// #region preBuild/css/01.layout.css
const rules_01Layout = (): Rule[] => [
  /** 允许 flex 子项换行 */
  ['flexWrap', { 'flex-wrap': 'wrap' }],
  /** flex 子项平分剩余空间 */
  ['flexSplit', { flex: '1' }],

  /** 在主轴上首端对齐 */
  ['mainStart', { 'justify-content': 'flex-start', 'justify-items': 'flex-start' }],
  /** 在主轴上尾端对齐 */
  ['mainEnd', { 'justify-content': 'flex-end', 'justify-items': 'flex-end' }],
  /** 在主轴上居中对齐 */
  ['mainCenter', { 'justify-content': 'center', 'justify-items': 'center' }],

  /** 在副轴上首端对齐 */
  ['crossStart', { 'align-items': 'flex-start' }],
  /** 在副轴上尾端对齐 */
  ['crossEnd', { 'align-items': 'flex-end' }],
  /** 在副轴上居中对齐 */
  ['crossCenter', { 'align-items': 'center' }]
];
// #endregion

// #region preBuild/css/03.size.css
const rules_03Size = (): Rule[] => [
  /** 全容器宽度（单位 %） */
  ['fullW', { width: '100%' }],
  /** 全容器高度 */
  ['fullH', { height: '100%' }],
  /** 全屏宽度（单位 vw） */
  ['fullW-W', { width: '100vw' }],
  /** 全屏高度（单位 vh） */
  ['fullH-H', { height: '100vh' }],
  /** 全容器宽高 */
  ['fullWH', { width: '100%', height: '100%' }],
  /** 全屏宽高 */
  ['fullW-H', { width: '100vw', height: '100vh' }]
];
// #endregion

// #region preBuild/css/04.border.css
const rules_04Border = (): Rule[] => [
  /** 顶部边框 */
  ['borderTop', { 'border-top': '1px var(--color-border) solid' }],
  /** 右侧边框 */
  ['borderRight', { 'border-right': '1px var(--color-border) solid' }],
  /** 底部边框 */
  ['borderBottom', { 'border-bottom': '1px var(--color-border) solid' }],
  /** 左侧边框 */
  ['borderLeft', { 'border-left': '1px var(--color-border) solid' }],
  /** 全边框，预设仅对全边框应用了圆角，圆角值取决于根变量 */
  ['borderAll', { 'border': '1px var(--color-border) solid', 'border-radius': 'var(--border-round)' }],
  /** 以项目主色为边线色的全边框 */
  ['borderPrimary', { 'border': '1px var(--color-primary) solid', 'border-radius': 'var(--border-round)' }],
  /** 应用全局圆角变量 */
  ['roundAll', { 'border-radius': 'var(--border-round)' }],
  /** 水平分隔线 */
  ['dividX', {
    'width': '100%',
    'margin': '0 auto',
    'background-image': 'linear-gradient(-90deg, rgba(238,238,238,0) 1%, var(--color-border) 51%, rgba(216,216,216,0) 100%)',
    'height': '1px'
  }]
];
// #endregion

// #region preBuild/css/05.font.css
const rules_05Font = (): Rule[] => [
  /** 小号字体 12px */
  ['fontSm', { 'font-size': '12px' }],
  /** 中号字体 13px */
  ['fontMd', { 'font-size': '13px' }],
  /** 大号字体 16px */
  ['fontLg', { 'font-size': '16px' }],
  /** 特大号字体 24px */
  ['fontXl', { 'font-size': '24px' }],
  /** 标题字体，字号取自 CSS 变量 */
  ['fontTitle', { 'font-size': 'var(--font-size-large)' }],

  /** 文本对齐：居中 / 居左 / 居右 */
  [/^text(Center|Left|Right)$/, ([, dir]) => ({ 'text-align': dir.toLowerCase() })],

  /** 单行文本截断（溢出显示省略号） */
  ['txtFlow', { 'white-space': 'nowrap', 'text-overflow': 'ellipsis', 'overflow': 'hidden' }],
  /** 禁止文本折行 */
  ['textNoWrap', { 'word-break': 'keep-all', 'white-space': 'nowrap' }],
  /** 单行文本超出显示省略号 */
  ['textOverHidden', { 'white-space': 'nowrap', 'text-overflow': 'ellipsis', 'overflow': 'hidden' }],
  /** 宽文本模式下的文字间距 */
  ['wideLetterSpace', { 'letter-spacing': '2px' }]
];
// #endregion

// #region preBuild/css/06.color.css
const rules_06Color = (): Rule[] => [
  /** 背景颜色：主色 / 信息 / 成功 / 警告 / 异常 / 灰 / 白 / 黑 */
  [
    /^(bg)(Primary|Blue|Green|Yellow|Red|Gray|White|Black)$/,
    ([, , key]) => ({ 'background-color': `var(--color-${key.toLowerCase()})` })
  ],

  /** 文本颜色：主色 / 信息 / 成功 / 警告 / 异常 / 灰 / 黑 / 白 */
  [
    /^(text)(Primary|Blue|Green|Yellow|Red|Gray|White|Black)$/,
    ([, , key]) => ({ color: `var(--color-${key.toLowerCase()})` })
  ]
];
// #endregion

// #region preBuild/css/07.over.css
const rules_07Over = (): Rule[] => [
  /** 横向滚动，纵向隐藏 */
  ['overX', { 'overflow-x': 'auto', 'overflow-y': 'hidden', 'scroll-behavior': 'smooth' }],
  /** 纵向滚动，横向隐藏 */
  ['overY', { 'overflow-x': 'hidden', 'overflow-y': 'auto', 'scroll-behavior': 'smooth' }],
  /** 双向滚动 */
  ['overBoth', { 'overflow': 'auto', 'scroll-behavior': 'smooth' }],
  /** 双向隐藏溢出 */
  ['overHidden', { overflow: 'hidden' }],
  /** 横向隐藏溢出 */
  ['overHiddenX', { 'overflow-x': 'hidden' }],
  /** 纵向隐藏溢出 */
  ['overHiddenY', { 'overflow-y': 'hidden' }]
];
// #endregion

// #region preBuild/css/08.loadding.css
const rules_08Loading = (): Rule[] => [
  /** loading 遮罩层，覆盖全屏 */
  ['loadding-mask', { 'position': 'absolute', 'width': '100vw', 'height': '100vh', 'top': '0', 'left': '0', 'background-color': 'rgba(0, 0, 0, 0.16)', 'z-index': '99999' }],
  /** loading 容器，居中展示加载条 */
  ['loader', { 'position': 'fixed', 'display': 'flex', 'justify-content': 'center', 'align-items': 'center', 'width': '100vw', 'height': '100vh', 'top': '0', 'left': '0', 'background-color': '#000aff29', 'overflow': 'hidden', 'z-index': '99998' }],
  /** loading 进入过渡 */
  ['loader-enter', { animation: 'loaddingFadeIn 0.3s ease-out forwards' }],
  /** loading 离开过渡 */
  ['loader-leave', { animation: 'loaddingFadeOut 0.1s ease-out forwards' }],
  /** loading 标题文字 */
  ['loaderTitle', { 'color': '#fff', 'margin-top': '32px', 'user-select': 'none' }]
];
// #endregion

// #region preBuild/css/30.extend.css
const rules_30Extend = (): Rule[] => [
  /** 手型光标 */
  ['handLike', { cursor: 'pointer' }],
  /** 可 hover 元素，光标变为手型 */
  // ['hoverAble', { cursor: 'pointer' }],
  /** 屏蔽鼠标选择 DOM 文本 */
  ['noSelect', { 'user-select': 'none' }],
  /** 形状阴影 */
  ['boxShadow', { 'box-shadow': '1px 1px 6px 0 var(--color-shadow)' }],
  /** 文本阴影 */
  ['textShadow', { 'text-shadow': '0.1em 0.1em 0.3em #333' }]
];
// #endregion

// #region preBuild/css/98.overrids.css
/** 预留：各组件库临时具名覆盖样式占位。当前项目已从 Arco Design 迁移至 PrimeVue，原有 Arco 覆写规则已移除。 */
const rules_98Overrids = (): Rule[] => [];
// #endregion

// #region preBuild/css/99.preSet.css
const rules_99PreSet = (): Rule[] => [
  /** 内外间距 — 数字档位，1 刻度 = 8px：p1~pN、pX1、pY3、pT2、mR5 ...（无需预先声明上限） */
  [
    /^([pm])([XYTRBL]?)(\d+)$/,
    ([, type, dir, n]) => {
      const prop = type === 'p' ? 'padding' : 'margin';
      return spaceCss(prop, dir, `${Number(n) * SPACE_UNIT}px`);
    }
  ],

  /** 内外间距 — 具名档位：pMin(1px)、pSm(2px)、pMd(4px) 及方向变体 */
  [
    /^([pm])([XYTRBL]?)(Min|Sm|Md)$/,
    ([, type, dir, key]) => {
      const prop = type === 'p' ? 'padding' : 'margin';
      return spaceCss(prop, dir, namedKey[key]);
    }
  ],

  /** z-index 数字档位，匹配任意整数：zIndex-10、zIndex0、zIndex100 */
  [/^zIndex(-?\d+)$/, ([, n]) => ({ 'z-index': Number(n) })],

  /** z-index 极端值：zIndexTop(999999) 代表最顶层 */
  ['zIndexTop', { 'z-index': '999999' }],
  /** z-index 极端值：zIndexBottom(-999999) 代表最底层 */
  ['zIndexBottom', { 'z-index': '-999999' }],

  /** font-weight 数字档位：fontW1(100) ~ fontW9(900) */
  [/^fontW([1-9])$/, ([, n]) => ({ 'font-weight': Number(n) * 100 })],

  /** font-weight 具名档位：Bold / Max / Lighter */
  ['fontWBold', { 'font-weight': 'bold' }],
  ['fontWMax', { 'font-weight': 'bolder' }],
  ['fontWLighter', { 'font-weight': 'lighter' }],

  /** flex 横向布局 */
  ['flex', { 'display': 'flex', 'flex-direction': 'row' }],
  /** flex 纵向布局 */
  ['flexV', { 'display': 'flex', 'flex-direction': 'column' }],

  /** flex 横向排列 + 主轴（水平）居中 */
  ['flexX', { 'display': 'flex', 'flex-direction': 'row', 'justify-content': 'center' }],
  /** flex 横向排列 + 交叉轴（垂直）居中 */
  ['flexY', { 'display': 'flex', 'flex-direction': 'row', 'align-items': 'center' }],

  /** flex 纵向排列 + 交叉轴（水平）居中 */
  ['flexVX', { 'display': 'flex', 'flex-direction': 'column', 'align-items': 'center' }],
  /** flex 纵向排列 + 主轴（垂直）居中 */
  ['flexVY', { 'display': 'flex', 'flex-direction': 'column', 'justify-content': 'center' }],

  /** flex 横向排列 + 双轴居中 */
  ['flexXY', { 'display': 'flex', 'flex-direction': 'row', 'justify-content': 'center', 'align-items': 'center' }],
  /** flex 纵向排列 + 双轴居中 */
  ['flexVXY', { 'display': 'flex', 'flex-direction': 'column', 'justify-content': 'center', 'align-items': 'center' }],

  /** grid 等分列 / 等分行：grid3 → 三列等分、gridV2 → 两行等分 */
  [
    /^grid(V?)(\d+)$/,
    ([, v, n]) =>
      v === 'V'
        ? { 'display': 'grid', 'grid-template-rows': `repeat(${n}, 1fr)` }
        : { 'display': 'grid', 'grid-template-columns': `repeat(${n}, 1fr)` }
  ],

  /** grid 子项水平居中 */
  ['gridX', { 'justify-items': 'center' }],
  /** grid 子项垂直居中 */
  ['gridY', { 'align-items': 'center' }],
  /** grid 子项双轴居中 */
  ['gridXY', { 'justify-items': 'center', 'align-items': 'center' }],

  /** row-gap / column-gap 数字档位，1 刻度 = 8px：gapX2(16px)、gapY3(24px) */
  [
    /^gap([XY])(\d+)$/,
    ([, d, n]) => ({ [`${d === 'X' ? 'column' : 'row'}-gap`]: `${Number(n) * SPACE_UNIT}px` })
  ],

  /** row-gap / column-gap 具名档位：gapXMin(1px)、gapYSm(2px)、gapXMd(4px) */
  [
    /^gap([XY])(Min|Sm|Md)$/,
    ([, d, key]) => ({ [`${d === 'X' ? 'column' : 'row'}-gap`]: namedKey[key] })
  ]
];
// #endregion

export default defineConfig({
  // 不引入任何默认预设，避免和自定义命名冲突
  presets: [
    presetUno({ preflight: false })
  ],

  rules: [
    ...rules_01Layout(),
    ...rules_03Size(),
    ...rules_04Border(),
    ...rules_05Font(),
    ...rules_06Color(),
    ...rules_07Over(),
    ...rules_08Loading(),
    ...rules_30Extend(),
    ...rules_98Overrids(),
    ...rules_99PreSet()
  ],

  // hoverAble 的 :hover 伪类、loading 的 ::after/::before 伪元素及 @keyframes 需要通过 preflight 注入
  preflights: [
    // {
    //   getCSS: () => '.hoverAble:hover { will-change: transform, opacity; color: var(--color-primary); background-color: var(--color-hover); }'
    // },
    {
      getCSS: () => `
.loader::after {
  content: '';
  position: absolute;
  width: 20vw;
  height: 4px;
  top: 50%;
  left: 40vw;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 30px;
  z-index: 99999;
}
.loader::before {
  content: '';
  position: absolute;
  width: 20vw;
  height: 4px;
  top: 50%;
  left: 40vw;
  transform: translateY(-50%) scaleX(0);
  transform-origin: left;
  background-color: #121ad1;
  border-radius: 30px;
  z-index: 99999;
  animation: loaderAnim 2s ease-in-out infinite;
}
@keyframes loaddingFadeIn {
  from { background-color: rgba(0, 0, 0, 0); }
  to   { background-color: rgba(0, 0, 0, 0.16); }
}
@keyframes loaddingFadeOut {
  from { background-color: rgba(0, 0, 0, 0.16); }
  to   { background-color: rgba(0, 0, 0, 0); }
}
@keyframes loaderAnim {
  0%   { transform: translateY(-50%) scaleX(0); opacity: 0; }
  10%  { opacity: 1; }
  50%  { transform: translateY(-50%) scaleX(1); opacity: 1; }
  90%  { transform: translateY(-50%) scaleX(1); opacity: 0; }
  100% { transform: translateY(-50%) scaleX(0); opacity: 0; }
}`
    }
  ]
});
