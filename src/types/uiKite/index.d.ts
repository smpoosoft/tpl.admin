/** popover弹出窗体的列表项接口 */
export interface TPopoverItem {
  label: string;
  description?: string;
  value: string | number;
  image?: string;
  icon?: string;
}

export interface IHomeToolBarItem {
  overlay?: number;
  vals?: TPopoverItem[]
}

export interface IHomeToolBar {
  comments?: IHomeToolBarItem,
  notifications?: IHomeToolBarItem,
  mails?: IHomeToolBarItem,
  user?: IHomeToolBarItem
}

/** 图标上的徽章覆盖层接口 */
export interface IBadgeOverlay {
  val?: number;
  type?: 'val' | 'dot';
  color?: string;
}

// #region 临时
/** 菜单的类型分组 */
export type TMenuGoup = 'dict' | 'home' | 'master' | 'bill' | 'report' | 'setting';

/** 键值对接口 */
export interface IKv {
  id: number,
  namezh: string
}
/** 树结构的节点通用定义 */
export interface ITreeNode extends IKv {
  /** 父级节点ID */
  pid: number,
  /** 所属项目id */
  projId: number,
  /** 节点代码或唯一码 */
  code: string,
  /** 父级节点的代码或唯一码 */
  pCode: string,
  /** 是否为叶节点 */
  isLeaf?: boolean,
  /** 节点层级 */
  nodeLevel: number,
  /** 同级节点的排序值，起始于 1 */
  idx: number,
  /** 备注 */
  memo: string,
  /** 子节点数组 */
  children?: ITreeNode[]
}

export interface IMenuItem extends ITreeNode {
  /** 业务分组 */
  group: TMenuGoup,
  /** url 路径 */
  path: string,
  /** 元集合 */
  metas: string[],
  /** 图标 */
  icon: string,
  /** 子节点数组 */
  children?: IMenuItem[]
  /** 权限菜单 */
  btns?: string[]
}
// #endregion
