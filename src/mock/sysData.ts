export interface OrgNode {
  id: string;
  label: string;
  children?: OrgNode[];
  type?: string;
}

export interface Employee {
  id: string;
  name: string;
  dept: string;
  position: string;
  phone: string;
  email: string;
  status: string;
}

export interface SysUser {
  id: string;
  username: string;
  role: string;
  dept: string;
  status: string;
  lastLogin: string;
}

export interface Reminder {
  id: string;
  summary: string;
  unit: string;
  person: string;
  handler: string;
  supervisor: string;
  deadline: string;
  priority: string;
  status: string;
}

export interface AuditLog {
  id: string;
  user: string;
  action: string;
  target: string;
  ip: string;
  time: string;
  result: string;
}

export interface UserProfile {
  name: string;
  dept: string;
  position: string;
  phone: string;
  email: string;
  avatar: string;
  role: string;
}

export const ORG_TREE: OrgNode[] = [
  {
    id: 'root-1',
    label: '总公司',
    type: 'company',
    children: [
      { id: 'dept-1-1', label: '技术研发部', type: 'dept', children: [
        { id: 'team-1-1-1', label: '前端开发组', type: 'team' },
        { id: 'team-1-1-2', label: '后端开发组', type: 'team' },
        { id: 'team-1-1-3', label: '测试质量组', type: 'team' }
      ]},
      { id: 'dept-1-2', label: '市场营销部', type: 'dept', children: [
        { id: 'team-1-2-1', label: '品牌推广组', type: 'team' },
        { id: 'team-1-2-2', label: '渠道销售组', type: 'team' }
      ]},
      { id: 'dept-1-3', label: '人力资源部', type: 'dept', children: [
        { id: 'team-1-3-1', label: '招聘组', type: 'team' },
        { id: 'team-1-3-2', label: '员工关系组', type: 'team' }
      ]}
    ]
  },
  {
    id: 'root-2',
    label: '分公司A',
    type: 'company',
    children: [
      { id: 'dept-2-1', label: '运营部', type: 'dept', children: [
        { id: 'team-2-1-1', label: '客户服务组', type: 'team' },
        { id: 'team-2-1-2', label: '物流调度组', type: 'team' }
      ]},
      { id: 'dept-2-2', label: '财务部', type: 'dept', children: [
        { id: 'team-2-2-1', label: '会计核算组', type: 'team' },
        { id: 'team-2-2-2', label: '预算管理组', type: 'team' },
        { id: 'team-2-2-3', label: '税务风控组', type: 'team' }
      ]}
    ]
  },
  {
    id: 'root-3',
    label: '分公司B',
    type: 'company',
    children: [
      { id: 'dept-3-1', label: '产品研发部', type: 'dept', children: [
        { id: 'team-3-1-1', label: '产品设计组', type: 'team' },
        { id: 'team-3-1-2', label: '移动开发组', type: 'team' }
      ]},
      { id: 'dept-3-2', label: '行政综合部', type: 'dept', children: [
        { id: 'team-3-2-1', label: '后勤保障组', type: 'team' },
        { id: 'team-3-2-2', label: '信息管理组', type: 'team' }
      ]},
      { id: 'dept-3-3', label: '法务合规部', type: 'dept', children: [
        { id: 'team-3-3-1', label: '合同审查组', type: 'team' },
        { id: 'team-3-3-2', label: '合规稽核组', type: 'team' }
      ]}
    ]
  }
];

export const EMPLOYEES: Employee[] = [
  { id: 'E001', name: '张明', dept: '技术研发部', position: '技术总监', phone: '13800138001', email: 'zhangming@company.com', status: 'active' },
  { id: 'E002', name: '李华', dept: '技术研发部', position: '高级前端工程师', phone: '13800138002', email: 'lihua@company.com', status: 'active' },
  { id: 'E003', name: '王芳', dept: '市场营销部', position: '市场经理', phone: '13800138003', email: 'wangfang@company.com', status: 'active' },
  { id: 'E004', name: '赵强', dept: '人力资源部', position: 'HR主管', phone: '13800138004', email: 'zhaoqiang@company.com', status: 'active' },
  { id: 'E005', name: '孙丽', dept: '财务部', position: '财务主管', phone: '13800138005', email: 'sunli@company.com', status: 'active' },
  { id: 'E006', name: '周杰', dept: '运营部', position: '运营专员', phone: '13800138006', email: 'zhoujie@company.com', status: 'inactive' },
  { id: 'E007', name: '吴敏', dept: '产品研发部', position: '产品经理', phone: '13800138007', email: 'wumin@company.com', status: 'active' },
  { id: 'E008', name: '郑涛', dept: '行政综合部', position: '行政主管', phone: '13800138008', email: 'zhengtao@company.com', status: 'active' },
  { id: 'E009', name: '冯雅', dept: '法务合规部', position: '法务专员', phone: '13800138009', email: 'fengya@company.com', status: 'active' },
  { id: 'E010', name: '陈志', dept: '技术研发部', position: '后端工程师', phone: '13800138010', email: 'chenzhi@company.com', status: 'suspended' }
];

export const SYS_USERS: SysUser[] = [
  { id: 'U001', username: 'admin', role: '超级管理员', dept: '技术研发部', status: 'active', lastLogin: '2025-12-20 09:15:00' },
  { id: 'U002', username: 'zhangming', role: '系统管理员', dept: '技术研发部', status: 'active', lastLogin: '2025-12-19 18:30:00' },
  { id: 'U003', username: 'lihua_dev', role: '开发人员', dept: '技术研发部', status: 'active', lastLogin: '2025-12-20 08:45:00' },
  { id: 'U004', username: 'wangfang_mkt', role: '业务人员', dept: '市场营销部', status: 'active', lastLogin: '2025-12-18 11:20:00' },
  { id: 'U005', username: 'zhaoqiang_hr', role: 'HR专员', dept: '人力资源部', status: 'active', lastLogin: '2025-12-20 10:00:00' },
  { id: 'U006', username: 'sunli_fin', role: '财务人员', dept: '财务部', status: 'locked', lastLogin: '2025-12-15 14:30:00' },
  { id: 'U007', username: 'zhoujie_ops', role: '业务人员', dept: '运营部', status: 'inactive', lastLogin: '2025-11-30 16:00:00' },
  { id: 'U008', username: 'wumin_pm', role: '产品经理', dept: '产品研发部', status: 'active', lastLogin: '2025-12-20 09:05:00' }
];

export const REMINDERS: Reminder[] = [
  { id: 'R001', summary: '年度财务报告提交', unit: '财务部', person: '孙丽', handler: '孙丽', supervisor: '赵强', deadline: '2026-01-15', priority: 'urgent', status: 'pending' },
  { id: 'R002', summary: 'Q4绩效考核汇总', unit: '人力资源部', person: '赵强', handler: '赵强', supervisor: '张明', deadline: '2026-01-10', priority: 'high', status: 'processing' },
  { id: 'R003', summary: '服务器安全补丁更新', unit: '技术研发部', person: '陈志', handler: '陈志', supervisor: '张明', deadline: '2026-01-08', priority: 'urgent', status: 'completed' },
  { id: 'R004', summary: '新员工入职培训安排', unit: '人力资源部', person: '王芳', handler: '赵强', supervisor: '李华', deadline: '2026-01-20', priority: 'normal', status: 'pending' },
  { id: 'R005', summary: '年度合同归档整理', unit: '法务合规部', person: '冯雅', handler: '冯雅', supervisor: '郑涛', deadline: '2026-01-25', priority: 'normal', status: 'pending' },
  { id: 'R006', summary: '办公设备采购预算审批', unit: '行政综合部', person: '郑涛', handler: '郑涛', supervisor: '孙丽', deadline: '2026-01-12', priority: 'high', status: 'processing' },
  { id: 'R007', summary: '第一季度营销方案评审', unit: '市场营销部', person: '王芳', handler: '王芳', supervisor: '张明', deadline: '2026-01-18', priority: 'high', status: 'pending' },
  { id: 'R008', summary: '系统权限年度审计', unit: '技术研发部', person: '李华', handler: '李华', supervisor: 'admin', deadline: '2026-01-30', priority: 'low', status: 'pending' }
];

export const AUDIT_LOGS: AuditLog[] = [
  { id: 'A001', user: 'admin', action: '用户登录', target: '系统', ip: '192.168.1.100', time: '2025-12-20 09:15:00', result: 'success' },
  { id: 'A002', user: 'zhangming', action: '修改角色权限', target: '角色管理', ip: '192.168.1.101', time: '2025-12-20 09:30:00', result: 'success' },
  { id: 'A003', user: 'lihua_dev', action: '创建用户', target: '用户管理', ip: '192.168.1.102', time: '2025-12-20 10:00:00', result: 'success' },
  { id: 'A004', user: 'sunli_fin', action: '用户登录', target: '系统', ip: '192.168.1.105', time: '2025-12-20 10:05:00', result: 'failed' },
  { id: 'A005', user: 'admin', action: '删除日志', target: '审计日志', ip: '192.168.1.100', time: '2025-12-19 17:00:00', result: 'success' },
  { id: 'A006', user: 'zhaoqiang_hr', action: '导出员工数据', target: '员工管理', ip: '192.168.1.104', time: '2025-12-19 15:30:00', result: 'success' },
  { id: 'A007', user: 'wumin_pm', action: '修改系统配置', target: '系统设置', ip: '192.168.1.107', time: '2025-12-19 14:20:00', result: 'success' },
  { id: 'A008', user: 'unknown', action: '用户登录', target: '系统', ip: '10.0.0.55', time: '2025-12-19 03:15:00', result: 'failed' },
  { id: 'A009', user: 'admin', action: '重置用户密码', target: '用户管理', ip: '192.168.1.100', time: '2025-12-18 11:00:00', result: 'success' },
  { id: 'A010', user: 'wangfang_mkt', action: '用户登录', target: '系统', ip: '192.168.1.103', time: '2025-12-18 09:10:00', result: 'success' }
];

export const USER_PROFILE: UserProfile = {
  name: '张明',
  dept: '技术研发部',
  position: '技术总监',
  phone: '13800138001',
  email: 'zhangming@company.com',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=zhangming',
  role: '超级管理员'
};

export const PRIORITY_OPTS: { label: string; value: string }[] = [
  { label: '紧急', value: 'urgent' },
  { label: '高', value: 'high' },
  { label: '普通', value: 'normal' },
  { label: '低', value: 'low' }
];

export const STATUS_OPTS: { label: string; value: string }[] = [
  { label: '启用', value: 'active' },
  { label: '停用', value: 'inactive' },
  { label: '锁定', value: 'locked' },
  { label: '暂停', value: 'suspended' }
];