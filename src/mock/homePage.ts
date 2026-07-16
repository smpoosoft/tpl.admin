
const dataMenusLists = [
  { label: '简单列表', icon: 'pi pi-list', shortcut: '⌘+L', path: '/Crud/TListBase' },
  { label: '表单页面', icon: 'pi pi-chart-line', shortcut: '⌘+R', path: '/Crud/TForm' }
];

const dataMenusBiz = [
  { label: '合同管理', icon: 'pi pi-chart-line', shortcut: '⌘+R', path: '/Biz/TContract' },
  { label: '流程设计', icon: 'pi pi-chart-bar', shortcut: '⌘+R', path: '/Biz/TProcessDesign' }
];

const dataMenusReports = [
  { label: '业务报表', icon: 'pi pi-chart-line', shortcut: '⌘+R', path: '/Report/TSalesReport' },
  { label: '数据报表', icon: 'pi pi-list', shortcut: '⌘+R', path: '/Report/TProductsReport' },
  { label: '透视报表', icon: 'pi pi-chart-bar', shortcut: '⌘+R', path: '/Report/TAnalysisReport' }
];

const dataMenusSysInfo = [
  { label: '组织管理', icon: 'pi pi-cog', shortcut: '⌘+O', path: '/Sys/TOrganization' },
  { label: '职员管理', icon: 'pi pi-cog', shortcut: '⌘+O', path: '/Sys/TEmployee' },
  { label: '安全中心', icon: 'pi pi-cog', shortcut: '⌘+O', path: '/Sys/TUsers' },
  { label: '提醒管理', icon: 'pi pi-cog', shortcut: '⌘+O', path: '/Sys/TReminder' },
  { label: '系统日志', icon: 'pi pi-cog', shortcut: '⌘+O', path: '/Sys/TLogAudit' },
  { label: '个人中心', icon: 'pi pi-cog', shortcut: '⌘+O', path: '/Sys/TUserProfile' }
];

export const dataMenus = [
  { label: '首页', icon: 'pi pi-home', shortcut: '⌘+H', path: '/' },
  { label: 'CRUD', icon: 'pi pi-list', shortcut: '⌘+L', items: dataMenusLists },
  { label: '业务管理', icon: 'pi pi-chart-line', shortcut: '⌘+R', items: dataMenusBiz },
  { label: '综合报表', icon: 'pi pi-chart-bar', shortcut: '⌘+R', items: dataMenusReports },
  // { label: '基础资料', icon: 'pi pi-user', shortcut: '⌘+W' },
  { label: '系统信息', icon: 'pi pi-cog', shortcut: '⌘+O', items: dataMenusSysInfo }
  // { label: '系统设置', icon: 'pi pi-cog', shortcut: '⌘+O' }
];


export const todoLists = [
  {
    id: 1, title: '完成Q2客户回访计划', done: false, priority: 'high' as const, children: [
      { id: 11, title: '整理客户名单', done: true, priority: 'medium' as const },
      {
        id: 12, title: '电话回访A类客户', done: false, priority: 'high' as const, children: [
          { id: 121, title: '联系张总确认合同', done: false, priority: 'high' as const },
          { id: 122, title: '发送报价单', done: true, priority: 'medium' as const }
        ]
      },
      { id: 13, title: '汇总回访记录', done: false, priority: 'low' as const }
    ]
  },
  { id: 2, title: '审批新员工入职申请', done: true, priority: 'medium' as const },
  {
    id: 3, title: '更新产品价格表', done: false, priority: 'medium' as const, children: [
      { id: 31, title: '核对供应商报价', done: false, priority: 'medium' as const },
      { id: 32, title: '同步到系统', done: false, priority: 'low' as const }
    ]
  },
  { id: 4, title: '准备周会演示文稿', done: false, priority: 'low' as const }
];

export const birthdays = [
  { id: 1, namezh: '张明', department: '销售部', date: '06-18', age: 28, dateLunar: '六月初八', avatar: '张' },
  { id: 2, namezh: '李晓华', department: '市场部', date: '06-20', age: 30, dateLunar: '六月初二十', avatar: '李' },
  { id: 3, namezh: '王芳', department: '客服部', date: '06-25', age: 25, dateLunar: '六月初二十五', avatar: '王' },
  { id: 4, namezh: '赵六', department: '销售部', date: '06-28', age: 26, dateLunar: '六月初二十八', avatar: '赵' },
  { id: 5, namezh: '王芳', department: '客服部', date: '06-25', age: 25, dateLunar: '六月初二十五', avatar: '王' },
  { id: 6, namezh: '赵六', department: '销售部', date: '06-28', age: 26, dateLunar: '六月初二十八', avatar: '赵' },
  { id: 7, namezh: '王芳', department: '客服部', date: '06-25', age: 25, dateLunar: '六月初二十五', avatar: '王' },
  { id: 8, namezh: '赵六', department: '销售部', date: '06-28', age: 26, dateLunar: '六月初二十八', avatar: '赵' },
  { id: 9, namezh: '王芳', department: '客服部', date: '06-25', age: 25, dateLunar: '六月初二十五', avatar: '王' },
  { id: 10, namezh: '赵六', department: '销售部', date: '06-28', age: 26, dateLunar: '六月初二十八', avatar: '赵' },
  { id: 11, namezh: '王芳', department: '客服部', date: '06-25', age: 25, dateLunar: '六月初二十五', avatar: '王' }
];

// 公告
export const publicNotice = [
  { id: 1, name: 'CRM系统升级通知', namezh: '本周六凌晨2-6点系统维护升级', type: 'system', time: '2小时前' },
  { id: 2, name: '新功能上线', namezh: '客户分层标签功能已上线，欢迎体验', type: 'feature', time: '昨天' }
];

export const notifications = [
  { id: 1, name: '客户反馈', namezh: '收到3条新的客户评价待处理', unread: true, time: '10分钟前' },
  { id: 2, name: '任务提醒', namezh: '您有2个任务即将到期', unread: true, time: '30分钟前' },
  { id: 3, name: '系统通知', namezh: '您的密码将在7天后过期', unread: false, time: '1天前' }
];

export const systemMessage = [
  { id: 1, name: '系统通知', namezh: '您的密码将在7天后过期', unread: false, time: '1天前' }
];

export const bizExecMessage = [
  { id: 1, name: '待接收', namezh: '您有3个待接收的客户分配', unread: false, time: '1天前' },
  { id: 2, name: '待审批', namezh: '您有2个待审批的客户订单', unread: false, time: '1天前' }
];
