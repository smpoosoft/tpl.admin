const dataMenusLists = [
  { label: '简单列表', icon: 'pi pi-list', shortcut: '⌘+L', path: '/list/simple' },
  { label: '表格列表', icon: 'pi pi-list', shortcut: '⌘+L', path: '/list/table' }
];

const dataMenusViews = [
  { label: '表单页面', icon: 'pi pi-chart-line', shortcut: '⌘+R', path: '/view/form' },
  { label: '详情页面', icon: 'pi pi-chart-line', shortcut: '⌘+R', path: '/view/detail' }
];

const dataMenusBiz = [
  { label: '合同管理', icon: 'pi pi-chart-line', shortcut: '⌘+R', path: '/biz/contract' },
  { label: '流程设计', icon: 'pi pi-chart-bar', shortcut: '⌘+R', path: '/biz/process-design' }
];

const dataMenusReports = [
  { label: '业务报表', icon: 'pi pi-chart-line', shortcut: '⌘+R', path: '/report/sales' },
  { label: '数据报表', icon: 'pi pi-list', shortcut: '⌘+R', path: '/report/products' },
  { label: '透视报表', icon: 'pi pi-chart-bar', shortcut: '⌘+R', path: '/report/analysis' }
];

const dataMenusSysInfo = [
  { label: '组织管理', icon: 'pi pi-cog', shortcut: '⌘+O', path: '/sys/org/organization' },
  { label: '职员管理', icon: 'pi pi-cog', shortcut: '⌘+O', path: '/sys/org/employee' },
  { label: '安全中心', icon: 'pi pi-cog', shortcut: '⌘+O', path: '/sys/org/users' },
  { label: '提醒管理', icon: 'pi pi-cog', shortcut: '⌘+O', path: '/sys/org/reminder' },
  { label: '系统日志', icon: 'pi pi-cog', shortcut: '⌘+O', path: '/sys/log/audit' },
  { label: '个人中心', icon: 'pi pi-cog', shortcut: '⌘+O', path: '/sys/profile/user' }
];

export const dataMenus = [
  { label: '首页', icon: 'pi pi-home', shortcut: '⌘+H', path: '/' },
  { label: '列表集合', icon: 'pi pi-list', shortcut: '⌘+L', items: dataMenusLists },
  { label: '数据视图', icon: 'pi pi-chart-line', shortcut: '⌘+R', items: dataMenusViews },
  { label: '业务管理', icon: 'pi pi-chart-line', shortcut: '⌘+R', items: dataMenusBiz },
  { label: '综合报表', icon: 'pi pi-chart-bar', shortcut: '⌘+R', items: dataMenusReports },
  // { label: '基础资料', icon: 'pi pi-user', shortcut: '⌘+W' },
  { label: '系统信息', icon: 'pi pi-cog', shortcut: '⌘+O', items: dataMenusSysInfo }
  // { label: '系统设置', icon: 'pi pi-cog', shortcut: '⌘+O' }
];
