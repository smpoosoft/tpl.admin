import type { IKv } from '@/types/uiKite';

export interface FormData {
  orderNo: string;
  customer: string;
  category: number | null;
  amount: number | null;
  status: number | null;
  orderDate: Date | null;
  phone: string;
  idCard: string;
  address: string;
  tags: number[];
  handler: string;
  deliveryDate: Date | null;
  priority: number | null;
  urgent: boolean;
  isDefault: boolean;
  accessCode: string;
  validRange: Date[] | null;
  remark: string;
}

export const createFormData = (): FormData => ({
  orderNo: 'ORD-2026-0001',
  customer: '',
  category: null,
  amount: null,
  status: null,
  orderDate: null,
  phone: '',
  idCard: '',
  address: '',
  tags: [],
  handler: '',
  deliveryDate: null,
  priority: null,
  urgent: false,
  isDefault: false,
  accessCode: '',
  validRange: null,
  remark: ''
});

export const categoryOptions = (): IKv[] => [
  { id: 1, namezh: '普通订单' },
  { id: 2, namezh: '加急订单' },
  { id: 3, namezh: '退货订单' }
];

export const statusOptions = (): IKv[] => [
  { id: 1, namezh: '待处理' },
  { id: 2, namezh: '进行中' },
  { id: 3, namezh: '已完成' },
  { id: 4, namezh: '已取消' }
];

export const tagOptions = (): IKv[] => [
  { id: 1, namezh: 'VIP客户' },
  { id: 2, namezh: '新客户' },
  { id: 3, namezh: '长期合作' },
  { id: 4, namezh: '需要跟进' }
];

export const handlerOptions = (): IKv[] => [
  { id: 1, namezh: '张三' },
  { id: 2, namezh: '李四' },
  { id: 3, namezh: '王五' },
  { id: 4, namezh: '赵六' }
];

export const priorityOptions = (): IKv[] => [
  { id: 1, namezh: '低' },
  { id: 2, namezh: '中' },
  { id: 3, namezh: '高' }
];

export const formSummary = () => [
  { key: '单据状态', value: '已审批', status: 'succ' as const },
  { key: '下一步', value: '发货出库' },
  { key: '制单人', value: '系统管理员' },
  { key: '单据日期', value: '2026-07-16' }
];

export interface ProductItem {
  id: number;
  productName: string;
  category: number | null;
  spec: string;
  unit: number | null;
  quantity: number;
  unitPrice: number;
  amount: number;
  deliveryDate: Date | null;
  validPeriod: Date[] | null;
  isUrgent: boolean;
  tags: number[];
  treeNode: string | null;
  handler: string;
  accessCode: string;
  attachment: any[];
}

export const productUnitOptions = (): IKv[] => [
  { id: 1, namezh: '个' },
  { id: 2, namezh: '箱' },
  { id: 3, namezh: '件' },
  { id: 4, namezh: '套' },
  { id: 5, namezh: '公斤' }
];

export const productTreeData = () => [
  {
    key: '1',
    label: '电子产品',
    icon: 'pi pi-fw pi-inbox',
    children: [
      { key: '1-1', label: '手机', icon: 'pi pi-fw pi-mobile' },
      { key: '1-2', label: '电脑', icon: 'pi pi-fw pi-desktop' },
      { key: '1-3', label: '配件', icon: 'pi pi-fw pi-wrench' }
    ]
  },
  {
    key: '2',
    label: '办公用品',
    icon: 'pi pi-fw pi-book',
    children: [
      { key: '2-1', label: '文具', icon: 'pi pi-fw pi-pencil' },
      { key: '2-2', label: '耗材', icon: 'pi pi-fw pi-print' }
    ]
  },
  {
    key: '3',
    label: '日用品',
    icon: 'pi pi-fw pi-shopping-cart',
    children: [
      { key: '3-1', label: '洗护', icon: 'pi pi-fw pi-sun' },
      { key: '3-2', label: '清洁', icon: 'pi pi-fw pi-trash' }
    ]
  }
];

export const productColumns = [
  { field: 'productName', header: '商品名称', headerStyle: { width: '160px' }, editType: 'text' as const },
  { field: 'category', header: '分类', headerStyle: { width: '120px' }, editType: 'select' as const, editProps: { options: categoryOptions() } },
  { field: 'spec', header: '规格型号', headerStyle: { width: '140px' }, editType: 'mask' as const, editProps: { mask: '***-****-****' } },
  { field: 'unit', header: '单位', headerStyle: { width: '100px' }, editType: 'radio' as const, editProps: { options: productUnitOptions() } },
  { field: 'quantity', header: '数量', headerStyle: { width: '110px' }, editType: 'number' as const, editProps: { showButtons: true, min: 0, fractionDigits: 2 } },
  { field: 'unitPrice', header: '单价', headerStyle: { width: '130px' }, editType: 'number' as const, editProps: { mode: 'currency', currency: 'CNY', locale: 'zh-CN', fractionDigits: 4 } },
  { field: 'amount', header: '金额', headerStyle: { width: '130px' }, editType: 'number' as const, editProps: { mode: 'currency', currency: 'CNY', locale: 'zh-CN', fractionDigits: 2 } },
  { field: 'deliveryDate', header: '交货日期', headerStyle: { width: '140px' }, editType: 'date' as const },
  { field: 'validPeriod', header: '有效期', headerStyle: { width: '200px' }, editType: 'dateRange' as const },
  { field: 'isUrgent', header: '加急', headerStyle: { width: '80px' }, editType: 'switch' as const },
  { field: 'tags', header: '标签', headerStyle: { width: '180px' }, editType: 'multiSelect' as const, editProps: { options: tagOptions() } },
  { field: 'treeNode', header: '树分类', headerStyle: { width: '150px' }, editType: 'treeSelect' as const, editProps: { options: productTreeData(), placeholder: '选择分类' } },
  { field: 'handler', header: '经办人', headerStyle: { width: '130px' }, editType: 'autoComplete' as const, editProps: { options: handlerOptions() } },
  { field: 'accessCode', header: '访问密码', headerStyle: { width: '130px' }, editType: 'password' as const },
  { field: 'attachment', header: '附件', headerStyle: { width: '100px' }, editType: 'file' as const },
  { field: 'actions', header: '操作', headerStyle: { width: '80px' } }
];

export const productVisibleFields = [
  'productName', 'category', 'spec', 'unit', 'quantity', 'unitPrice', 'amount',
  'deliveryDate', 'validPeriod', 'isUrgent', 'tags', 'treeNode', 'handler',
  'accessCode', 'attachment', 'actions'
];

export const createProducts = (): ProductItem[] => [
  {
    id: 1,
    productName: '商务笔记本电脑',
    category: 1,
    spec: 'NB-2026-001',
    unit: 2,
    quantity: 10,
    unitPrice: 5999,
    amount: 59990,
    deliveryDate: new Date('2026-08-15'),
    validPeriod: [new Date('2026-07-01'), new Date('2026-12-31')],
    isUrgent: true,
    tags: [1, 3],
    treeNode: '1-2',
    handler: '张三',
    accessCode: 'abc123',
    attachment: []
  },
  {
    id: 2,
    productName: 'A4打印纸',
    category: 2,
    spec: 'PP-7500-100',
    unit: 2,
    quantity: 50,
    unitPrice: 28.5,
    amount: 1425,
    deliveryDate: new Date('2026-07-20'),
    validPeriod: [new Date('2026-07-01'), new Date('2026-09-30')],
    isUrgent: false,
    tags: [4],
    treeNode: '2-2',
    handler: '李四',
    accessCode: 'xyz789',
    attachment: []
  },
  {
    id: 3,
    productName: '洗护套装',
    category: 3,
    spec: 'WP-5000-050',
    unit: 4,
    quantity: 200,
    unitPrice: 45.5,
    amount: 9100,
    deliveryDate: new Date('2026-08-01'),
    validPeriod: [new Date('2026-07-01'), new Date('2027-06-30')],
    isUrgent: false,
    tags: [2],
    treeNode: '3-1',
    handler: '王五',
    accessCode: 'pass666',
    attachment: []
  }
];
