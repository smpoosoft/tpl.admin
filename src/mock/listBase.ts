import type { ColumnProps } from 'primevue/column';

export interface Customer {
  id: string;
  name: string;
  phone: string;
  tag: string;
  tagClass: string;
  source: string;
  createdAt: string;
  avatar: string;
  contractAmount: number;
  [key: string]: unknown;
}

export const TABLE_COLUMNS: ColumnProps[] = [
  { field: 'name', header: '客户', headerStyle: { width: '180px' } },
  { field: 'phone', header: '联系方式', headerStyle: { width: '140px' } },
  { field: 'tag', header: '标签', headerStyle: { width: '100px' } },
  { field: 'source', header: '来源', headerStyle: { width: '120px' } },
  { field: 'createdAt', header: '创建时间', headerStyle: { width: '130px' } },
  { field: 'address', header: '地址', headerStyle: { width: '320px' } },
  { field: 'company', header: '所属公司', headerStyle: { width: '120px' } },
  { field: 'title', header: '职位', headerStyle: { width: '120px' } },
  { field: 'contractAmount', header: '合同金额', headerStyle: { width: '130px' } },
  { field: 'lastContact', header: '最后联系日', headerStyle: { width: '130px' } },
  { field: 'email', header: '电子邮箱', headerStyle: { width: '180px' } },
  { field: 'wechat', header: '微信', headerStyle: { width: '160px' } },
  { field: 'industry', header: '所属行业', headerStyle: { width: '120px' } },
  { field: 'notes', header: '备注', headerStyle: { width: '200px' } },
  { field: 'department', header: '部门', headerStyle: { width: '100px' } },
  { field: 'region', header: '所属区域', headerStyle: { width: '100px' } },
  { field: 'creditCode', header: '信用代码', headerStyle: { width: '180px' } },
  { field: 'contractNo', header: '合同编号', headerStyle: { width: '140px' } },
  { field: 'registerDate', header: '注册日期', headerStyle: { width: '130px' } },
  { field: 'actions', header: '操作', headerStyle: { width: '120px' } }
];

const NAMES: string[] = ['张明', '李华', '王芳', '赵强', '孙丽', '周杰', '吴敏', '郑涛', '冯雅', '陈志',
  '杨洋', '黄磊', '林娜', '何平', '马超', '罗琳', '梁宇', '宋佳', '唐峰', '韩雪'];
const AVATARS: string[] = ['张', '李', '王', '赵', '孙', '周', '吴', '郑', '冯', '陈',
  '杨', '黄', '林', '何', '马', '罗', '梁', '宋', '唐', '韩'];
const TAGS: string[] = ['VIP', '新客', '老客', '流失', '意向'];
const TAG_CLASSES: string[] = ['tag-vip', 'tag-new', 'tag-regular', 'tag-lost', 'tag-intent'];
const SOURCES: string[] = ['线上渠道', '线下活动', '朋友推荐', '广告投放', '自行注册'];
const ADDRESSES: string[] = [
  '北京市朝阳区建国路88号SOHO现代城A座',
  '上海市浦东新区张江高科技园区博云路2号',
  '广州市天河区珠江新城华夏路16号',
  '深圳市南山区科技园南区R2-B栋',
  '杭州市西湖区文三路478号华星科技大厦',
  '成都市高新区天府大道中段688号',
  '南京市鼓楼区汉中路2号金陵饭店',
  '武汉市洪山区珞喻路1037号华中科技大学',
  '西安市高新区锦业路1号都市之门',
  '重庆市渝北区金开大道68号协信中心',
  '长沙市岳麓区梅溪湖路88号',
  '郑州市郑东新区商务外环路28号',
  '济南市历下区泉城路180号齐鲁国际大厦',
  '合肥市蜀山区黄山路622号',
  '厦门市思明区软件园二期观日路34号',
  '青岛市市南区香港中路76号颐和国际',
  '大连市中山区人民路15号国际金融大厦',
  '昆明市五华区东风西路125号',
  '福州市鼓楼区五四路158号环球广场',
  '沈阳市和平区太原北街86号中兴大厦'
];
const COMPANIES: string[] = ['深普软件', '云帆科技', '锐思数据', '明源云', '聚光科技', '蓝凌软件', '鼎捷软件', '泛微网络', '用友网络', '金蝶国际',
  '浪潮信息', '中科曙光', '紫光股份', '中国软件', '东软集团', '恒生电子', '广联达', '石基信息', '卫宁健康', '万达信息'];
const TITLES: string[] = ['销售经理', '技术总监', '产品运营', '市场主管', '客户成功', '项目经理', '架构师', '前端组长', '后端开发', '测试主管',
  '运维顾问', '商务代表', '实施顾问', '数据分析师', 'UI设计师', '安全工程师', '渠道经理', '售前顾问', '售后主管', '产品经理'];
const LAST_CONTACTS: string[] = ['2025-06-15', '2025-06-28', '2025-07-01', '2025-07-03', '2025-07-05',
  '2025-06-20', '2025-07-02', '2025-06-25', '2025-07-06', '2025-06-30',
  '2025-06-18', '2025-07-04', '2025-06-22', '2025-07-07', '2025-06-10',
  '2025-07-08', '2025-06-05', '2025-06-12', '2025-06-08', '2025-07-09'];
const NOTES: string[] = ['重点客户，跟进中', '有意向合作，待演示', '已签约，实施阶段', '老客户续约谈判中', '新注册用户，需跟进',
  '对产品很满意，转介绍', '需求暂不匹配，保持联系', '已发报价单，等待回复', '试用中，体验良好', '竞争对手客户，争取中',
  '批量采购意向', '技术验证阶段', '框架协议已签', '预算审批中', '年度合同续签',
  '需要定制开发', '行业标杆案例', '合作意向强烈', '初步接触阶段', '已流失，需召回'];

const INDUSTRIES: string[] = ['信息技术', '金融服务', '医疗健康', '教育培训', '制造加工', '零售电商', '能源环保', '建筑地产', '交通运输', '文化传媒',
  '餐饮酒店', '农业科技', '物流仓储', '电商平台', '游戏娱乐', '电子通信', '法律咨询', '人力资源', '广告营销', '保险服务'];
const DEPARTMENTS: string[] = ['销售部', '技术部', '市场部', '产品部', '客户成功部', '研发部', '运维部', '前端部', '后端部', '测试部',
  '数据部', '商务部', '实施部', '分析部', '设计部', '安全部', '渠道部', '售前部', '售后部', '产品部'];
const REGIONS: string[] = ['华北', '华东', '华南', '华中', '西南', '西北', '东北', '华北', '华东', '华南',
  '华中', '西南', '西北', '东北', '华北', '华东', '华南', '华中', '西南', '西北'];
const CREDIT_CODES: string[] = [
  '91440101MA5AKD9E2X', '91310000MA1K36LQ0R', '91440300MA5D8Q0E1K', '91320100MA1MD87B4A', '91330100MA2AYJ0Q7L',
  '91510100MA6CM6QR0R', '91320100MA1MD87B4B', '91420100MA4KL8QH5N', '91610100MA6U0CYD0T', '91500100MA5U6QFR1R',
  '91430100MA4L2QCY0K', '91410100MA3X9K0P7Y', '91370100MA3C6QN99H', '91340100MA2N0BLX4R', '91350200MA31D0R0P',
  '91370200MA3C6QRQH', '91420200MA4870B2KM', '91530100MA6K3CWH0K', '91350100MA31D0T4G', '91420100MA4KL8QH6M'
];
const CONTRACT_NOS: string[] = [
  'HT-2025-0001', 'HT-2025-0002', 'HT-2025-0003', 'HT-2025-0004', 'HT-2025-0005',
  'HT-2025-0006', 'HT-2025-0007', 'HT-2025-0008', 'HT-2025-0009', 'HT-2025-0010',
  'HT-2025-0011', 'HT-2025-0012', 'HT-2025-0013', 'HT-2025-0014', 'HT-2025-0015',
  'HT-2025-0016', 'HT-2025-0017', 'HT-2025-0018', 'HT-2025-0019', 'HT-2025-0020'
];

export const TABLE_CUSTOMERS: Customer[] = Array.from({ length: 20 }, (_, i) => ({
  id: `C${String(i + 1).padStart(3, '0')}`,
  name: NAMES[i] as string,
  phone: `138-0000-${String(1000 + i).slice(1)}`,
  tag: TAGS[i % 5] as string,
  tagClass: TAG_CLASSES[i % 5] as string,
  source: SOURCES[i % 5] as string,
  createdAt: `2025-${String(Math.floor(i / 2) + 1).padStart(2, '0')}-${String(10 + (i % 20)).padStart(2, '0')}`,
  avatar: AVATARS[i] as string,
  address: ADDRESSES[i] as string,
  company: COMPANIES[i] as string,
  title: TITLES[i] as string,
  contractAmount: 50000 + ((i * 87631) % 450000),
  lastContact: LAST_CONTACTS[i] as string,
  email: `${NAMES[i]}@company.com`,
  wechat: `wx_${NAMES[i]}_${String(i + 1).padStart(3, '0')}`,
  industry: INDUSTRIES[i] as string,
  notes: NOTES[i] as string,
  department: DEPARTMENTS[i] as string,
  region: REGIONS[i] as string,
  creditCode: CREDIT_CODES[i] as string,
  contractNo: CONTRACT_NOS[i] as string,
  registerDate: `2024-${String((i % 12) + 1).padStart(2, '0')}-${String(1 + (i % 28)).padStart(2, '0')}`
}));

export const FILTER_TABS = [
  { key: 'all', label: '全部', count: 20 },
  { key: 'vip', label: 'VIP', count: 4 },
  { key: 'new', label: '新客', count: 6 },
  { key: 'active', label: '活跃', count: 8 },
  { key: 'lost', label: '流失', count: 2 }
];