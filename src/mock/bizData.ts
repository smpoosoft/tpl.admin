export interface Contract {
  id: string;
  name: string;
  party: string;
  amount: number;
  signDate: string;
  status: string;
  manager: string;
}

export interface ProcessItem {
  id: string;
  name: string;
  group: string;
  icon: string;
  description: string;
}

export const CONTRACTS: Contract[] = [
  { id: 'CT-2025-001', name: '企业年度软件许可协议', party: '云创科技', amount: 480000, signDate: '2025-01-15', status: 'active', manager: '张明' },
  { id: 'CT-2025-002', name: '数据中心托管服务合同', party: '数海信息', amount: 1250000, signDate: '2025-02-20', status: 'active', manager: '李华' },
  { id: 'CT-2025-003', name: '品牌策划与设计外包协议', party: '锐意广告', amount: 260000, signDate: '2025-03-08', status: 'pending', manager: '王芳' },
  { id: 'CT-2025-004', name: '人力资源外包服务合同', party: '智联人力', amount: 720000, signDate: '2025-03-25', status: 'active', manager: '赵强' },
  { id: 'CT-2025-005', name: '办公设备采购合同', party: '晨光办公', amount: 185000, signDate: '2025-04-10', status: 'draft', manager: '孙丽' },
  { id: 'CT-2025-006', name: '物流配送年度框架协议', party: '顺捷物流', amount: 960000, signDate: '2025-05-06', status: 'active', manager: '周杰' },
  { id: 'CT-2025-007', name: '网络安全审计服务合同', party: '安恒信息', amount: 340000, signDate: '2025-06-18', status: 'expired', manager: '吴敏' },
  { id: 'CT-2025-008', name: '员工培训体系建设合同', party: '博学教育', amount: 158000, signDate: '2025-07-01', status: 'pending', manager: '郑涛' },
  { id: 'CT-2025-009', name: '云计算资源租赁协议', party: '阿里云', amount: 2100000, signDate: '2025-08-12', status: 'active', manager: '冯雅' },
  { id: 'CT-2025-010', name: '市场推广年度合作合同', party: '引力传媒', amount: 580000, signDate: '2025-09-05', status: 'terminated', manager: '陈志' }
];

export const PROCESS_ITEMS: ProcessItem[] = [
  { id: 'P001', name: '员工入职流程', group: 'HR', icon: 'pi pi-user-plus', description: '新员工入职登记、账号创建与部门分配' },
  { id: 'P002', name: '请假审批流程', group: 'HR', icon: 'pi pi-calendar-clock', description: '员工请假申请、审批与考勤同步' },
  { id: 'P003', name: '转正评估流程', group: 'HR', icon: 'pi pi-star', description: '试用期员工转正评估与审批' },
  { id: 'P004', name: '出差申请流程', group: 'Admin', icon: 'pi pi-send', description: '员工出差申请、审批与行程安排' },
  { id: 'P005', name: '固定资产采购流程', group: 'Admin', icon: 'pi pi-shopping-cart', description: '办公资产采购申请、比价与验收' },
  { id: 'P006', name: '会议室预约流程', group: 'Admin', icon: 'pi pi-building', description: '会议室预约、审批与冲突协调' },
  { id: 'P007', name: '费用报销流程', group: 'Finance', icon: 'pi pi-money-bill', description: '员工费用报销申请与财务审核' },
  { id: 'P008', name: '合同付款流程', group: 'Finance', icon: 'pi pi-file-invoice', description: '合同付款申请、审批与资金划拨' },
  { id: 'P009', name: '预算调整流程', group: 'Finance', icon: 'pi pi-chart-pie', description: '部门预算调整申请与审批' }
];

export const CONTRACT_STATUS_OPTS: { label: string; value: string; severity: string }[] = [
  { label: '生效中', value: 'active', severity: 'success' },
  { label: '待审批', value: 'pending', severity: 'warn' },
  { label: '草稿', value: 'draft', severity: 'info' },
  { label: '已到期', value: 'expired', severity: 'contrast' },
  { label: '已终止', value: 'terminated', severity: 'danger' }
];