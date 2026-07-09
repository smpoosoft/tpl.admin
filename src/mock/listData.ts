import type { DataTableColumns } from 'primevue/datatable';

export interface Customer {
  id: string;
  name: string;
  phone: string;
  tag: string;
  tagClass: string;
  source: string;
  createdAt: string;
  avatar: string;
  [key: string]: unknown;
}

export const LIST_CUSTOMERS: Customer[] = [
  { id: 'C001', name: '张明', phone: '138-0000-0001', tag: 'VIP', tagClass: 'tag-vip', source: '线上渠道', createdAt: '2025-03-15', avatar: '张' },
  { id: 'C002', name: '李华', phone: '138-0000-0002', tag: '新客', tagClass: 'tag-new', source: '线下活动', createdAt: '2025-03-20', avatar: '李' },
  { id: 'C003', name: '王芳', phone: '138-0000-0003', tag: '老客', tagClass: 'tag-regular', source: '朋友推荐', createdAt: '2025-04-01', avatar: '王' },
  { id: 'C004', name: '赵强', phone: '138-0000-0004', tag: 'VIP', tagClass: 'tag-vip', source: '线上渠道', createdAt: '2025-04-10', avatar: '赵' },
  { id: 'C005', name: '孙丽', phone: '138-0000-0005', tag: '新客', tagClass: 'tag-new', source: '广告投放', createdAt: '2025-04-15', avatar: '孙' }
];

export interface ColumnDef {
  key: string;
  label: string;
}

export const LIST_COLUMNS: ColumnDef[] = [
  { key: 'customer', label: '客户' },
  { key: 'contact', label: '联系方式' },
  { key: 'tag', label: '标签' },
  { key: 'source', label: '来源' },
  { key: 'date', label: '创建时间' },
  { key: 'action', label: '操作' }
];

export const TABLE_CUSTOMERS: Customer[] = Array.from({ length: 20 }, (_, i) => ({
  id: `C${String(i + 1).padStart(3, '0')}`,
  name: ['张明', '李华', '王芳', '赵强', '孙丽', '周杰', '吴敏', '郑涛', '冯雅', '陈志',
          '杨洋', '黄磊', '林娜', '何平', '马超', '罗琳', '梁宇', '宋佳', '唐峰', '韩雪'][i],
  phone: `138-0000-${String(1000 + i).slice(1)}`,
  tag: ['VIP', '新客', '老客', '流失', '意向'][i % 5],
  tagClass: ['tag-vip', 'tag-new', 'tag-regular', 'tag-lost', 'tag-intent'][i % 5],
  source: ['线上渠道', '线下活动', '朋友推荐', '广告投放', '自行注册'][i % 5],
  createdAt: `2025-${String(Math.floor(i / 2) + 1).padStart(2, '0')}-${String(10 + (i % 20)).padStart(2, '0')}`,
  avatar: ['张', '李', '王', '赵', '孙', '周', '吴', '郑', '冯', '陈',
            '杨', '黄', '林', '何', '马', '罗', '梁', '宋', '唐', '韩'][i]
}));

export const FILTER_TABS = [
  { key: 'all', label: '全部', count: 20 },
  { key: 'vip', label: 'VIP', count: 4 },
  { key: 'new', label: '新客', count: 6 },
  { key: 'active', label: '活跃', count: 8 },
  { key: 'lost', label: '流失', count: 2 }
];