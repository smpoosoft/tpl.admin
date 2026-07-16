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
  spec: string;
  unit: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

export const productColumns = [
  { field: 'productName', header: '商品名称', headerStyle: { width: '200px' }, editType: 'text' as const },
  { field: 'spec', header: '规格', headerStyle: { width: '120px' }, editType: 'text' as const },
  { field: 'unit', header: '单位', headerStyle: { width: '80px' }, editType: 'text' as const },
  { field: 'quantity', header: '数量', headerStyle: { width: '100px' }, editType: 'number' as const },
  { field: 'unitPrice', header: '单价', headerStyle: { width: '120px' }, editType: 'number' as const, editProps: { mode: 'currency', currency: 'CNY', locale: 'zh-CN' } },
  { field: 'amount', header: '金额', headerStyle: { width: '120px' }, editType: 'number' as const, editProps: { mode: 'currency', currency: 'CNY', locale: 'zh-CN' } },
  { field: 'actions', header: '操作', headerStyle: { width: '80px' } }
];

export const productVisibleFields = ['productName', 'spec', 'unit', 'quantity', 'unitPrice', 'amount', 'actions'];

export const createProducts = (): ProductItem[] => [
  { id: 1, productName: '商品 A', spec: '规格 1', unit: '个', quantity: 10, unitPrice: 100, amount: 1000 },
  { id: 2, productName: '商品 B', spec: '规格 2', unit: '箱', quantity: 5, unitPrice: 200, amount: 1000 },
  { id: 3, productName: '商品 C', spec: '规格 3', unit: '件', quantity: 20, unitPrice: 50, amount: 1000 }
];
