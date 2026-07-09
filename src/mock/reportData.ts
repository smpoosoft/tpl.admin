export interface StatCard {
  label: string;
  value: string;
  trend: string;
  trendUp: boolean;
}

export interface SalesRecord {
  id: string;
  product: string;
  category: string;
  amount: number;
  qty: number;
  date: string;
  region: string;
}

export interface ProductRecord {
  id: string;
  name: string;
  sales: number;
  stock: number;
  profit: number;
  category: string;
}

export const SALES_STATS: StatCard[] = [
  { label: '总营收', value: '¥1,284,560', trend: '+12.5%', trendUp: true },
  { label: '总订单数', value: '3,842', trend: '+8.3%', trendUp: true },
  { label: '转化率', value: '3.24%', trend: '-0.6%', trendUp: false },
  { label: '平均客单价', value: '¥334.20', trend: '+5.1%', trendUp: true }
];

const PRODUCT_NAMES = [
  '智能手表 Pro', '无线降噪耳机', '机械键盘 K1', '便携式充电宝',
  '4K 网络摄像头', '蓝牙音箱 Mini', '人体工学鼠标', 'USB-C 扩展坞',
  '笔记本电脑支架', '桌面拾音麦克风', '电竞显示器 27"', '手写绘画板',
  '智能台灯 L1', '移动硬盘 2TB', '路由器 AX6000'
];

const CATEGORIES = ['数码配件', '智能穿戴', '音频设备', '电脑外设', '网络设备'];

const REGIONS = ['华东', '华南', '华北', '华中', '西南', '西北', '东北'];

export const SALES_DATA: SalesRecord[] = [
  { id: 'S001', product: '智能手表 Pro', category: '智能穿戴', amount: 2999, qty: 12, date: '2025-06-01', region: '华东' },
  { id: 'S002', product: '无线降噪耳机', category: '音频设备', amount: 1899, qty: 23, date: '2025-06-02', region: '华南' },
  { id: 'S003', product: '机械键盘 K1', category: '电脑外设', amount: 899, qty: 35, date: '2025-06-03', region: '华北' },
  { id: 'S004', product: '便携式充电宝', category: '数码配件', amount: 299, qty: 78, date: '2025-06-04', region: '华东' },
  { id: 'S005', product: '4K 网络摄像头', category: '数码配件', amount: 1299, qty: 15, date: '2025-06-05', region: '华南' },
  { id: 'S006', product: '蓝牙音箱 Mini', category: '音频设备', amount: 599, qty: 42, date: '2025-06-06', region: '西南' },
  { id: 'S007', product: '人体工学鼠标', category: '电脑外设', amount: 449, qty: 56, date: '2025-06-07', region: '华中' },
  { id: 'S008', product: 'USB-C 扩展坞', category: '数码配件', amount: 699, qty: 28, date: '2025-06-08', region: '华东' },
  { id: 'S009', product: '笔记本电脑支架', category: '电脑外设', amount: 349, qty: 33, date: '2025-06-09', region: '华北' },
  { id: 'S010', product: '桌面拾音麦克风', category: '音频设备', amount: 899, qty: 19, date: '2025-06-10', region: '华南' },
  { id: 'S011', product: '电竞显示器 27"', category: '电脑外设', amount: 3999, qty: 8, date: '2025-06-11', region: '西南' },
  { id: 'S012', product: '路由器 AX6000', category: '网络设备', amount: 799, qty: 25, date: '2025-06-12', region: '西北' },
  { id: 'S013', product: '智能台灯 L1', category: '数码配件', amount: 499, qty: 31, date: '2025-06-13', region: '华东' },
  { id: 'S014', product: '移动硬盘 2TB', category: '数码配件', amount: 1099, qty: 17, date: '2025-06-14', region: '东北' },
  { id: 'S015', product: '手写绘画板', category: '电脑外设', amount: 1599, qty: 11, date: '2025-06-15', region: '华北' }
];

export const PRODUCT_STATS: StatCard[] = [
  { label: '在售商品', value: '156', trend: '+3.3%', trendUp: true },
  { label: '总库存量', value: '12,480', trend: '-2.1%', trendUp: false },
  { label: '月销售额', value: '¥1,284,560', trend: '+12.5%', trendUp: true },
  { label: '平均利润率', value: '23.8%', trend: '+1.2%', trendUp: true }
];

const PRODUCT_NAMES_POOL = [
  '智能手表 Pro', '无线降噪耳机', '机械键盘 K1', '便携式充电宝',
  '4K 网络摄像头', '蓝牙音箱 Mini', '人体工学鼠标', 'USB-C 扩展坞',
  '笔记本电脑支架', '桌面拾音麦克风', '电竞显示器 27"', '手写绘画板'
];

const PRODUCT_CATEGORIES = ['智能穿戴', '音频设备', '电脑外设', '数码配件'];

export const PRODUCT_DATA: ProductRecord[] = [
  { id: 'P001', name: '智能手表 Pro', sales: 284700, stock: 320, profit: 85410, category: '智能穿戴' },
  { id: 'P002', name: '无线降噪耳机', sales: 189900, stock: 560, profit: 56970, category: '音频设备' },
  { id: 'P003', name: '机械键盘 K1', sales: 157800, stock: 420, profit: 47340, category: '电脑外设' },
  { id: 'P004', name: '便携式充电宝', sales: 145600, stock: 1200, profit: 29120, category: '数码配件' },
  { id: 'P005', name: '4K 网络摄像头', sales: 129800, stock: 180, profit: 38940, category: '数码配件' },
  { id: 'P006', name: '蓝牙音箱 Mini', sales: 112400, stock: 680, profit: 33720, category: '音频设备' },
  { id: 'P007', name: '人体工学鼠标', sales: 98300, stock: 750, profit: 29490, category: '电脑外设' },
  { id: 'P008', name: 'USB-C 扩展坞', sales: 87600, stock: 340, profit: 26280, category: '数码配件' },
  { id: 'P009', name: '笔记本电脑支架', sales: 73400, stock: 280, profit: 22020, category: '电脑外设' },
  { id: 'P010', name: '桌面拾音麦克风', sales: 68900, stock: 190, profit: 20670, category: '音频设备' },
  { id: 'P011', name: '电竞显示器 27"', sales: 63900, stock: 90, profit: 19170, category: '电脑外设' },
  { id: 'P012', name: '手写绘画板', sales: 55800, stock: 130, profit: 16740, category: '数码配件' }
];

export const ANALYSIS_CONFIG: { rows: string[]; cols: string[]; values: string[] } = {
  rows: ['category', 'region'],
  cols: ['date'],
  values: ['amount', 'qty']
};