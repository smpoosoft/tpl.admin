export interface FormField {
  key: string;
  label: string;
  type: 'text' | 'select' | 'date' | 'textarea';
  required: boolean;
  options?: { label: string; value: string }[];
}

export interface OrderDetail {
  orderNo: string;
  customer: string;
  product: string;
  amount: number;
  status: string;
  createdAt: string;
  remark: string;
}

export const STATUS_OPTIONS: { label: string; value: string }[] = [
  { label: '待处理', value: 'pending' },
  { label: '处理中', value: 'processing' },
  { label: '已完成', value: 'completed' },
  { label: '已取消', value: 'cancelled' },
  { label: '已退款', value: 'refunded' }
];

export const FORM_FIELDS: FormField[] = [
  { key: 'orderNo', label: '订单编号', type: 'text', required: true },
  { key: 'customer', label: '客户名称', type: 'text', required: true },
  { key: 'product', label: '产品品类', type: 'select', required: true, options: [
    { label: '电子产品', value: 'electronics' },
    { label: '服装鞋帽', value: 'apparel' },
    { label: '食品饮料', value: 'food' },
    { label: '家居用品', value: 'home' },
    { label: '办公耗材', value: 'office' },
    { label: '其他', value: 'other' }
  ]},
  { key: 'amount', label: '订单金额', type: 'text', required: true },
  { key: 'status', label: '订单状态', type: 'select', required: true, options: STATUS_OPTIONS },
  { key: 'orderDate', label: '下单日期', type: 'date', required: true },
  { key: 'deliveryDate', label: '交货日期', type: 'date', required: false },
  { key: 'handler', label: '经办人', type: 'text', required: true },
  { key: 'department', label: '所属部门', type: 'select', required: false, options: [
    { label: '销售一部', value: 'sales1' },
    { label: '销售二部', value: 'sales2' },
    { label: '采购部', value: 'procurement' },
    { label: '客服部', value: 'service' }
  ]},
  { key: 'remark', label: '备注说明', type: 'textarea', required: false }
];

export const ORDER_DETAIL: OrderDetail = {
  orderNo: 'ORD-2025-0001',
  customer: '深圳智创科技有限公司',
  product: '电子产品',
  amount: 158000.00,
  status: 'processing',
  createdAt: '2025-03-15 09:30:00',
  remark: '客户要求分批交货，第一批次 30% 于 3 月底前发出'
};