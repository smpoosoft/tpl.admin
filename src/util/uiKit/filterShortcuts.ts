import { tDate } from 'tvoid_core';

const rangeQuarter: Record<1 | 2 | 3 | 4, [string, string]> = {
  1: ['01-01', '03-31'],
  2: ['04-01', '06-30'],
  3: ['07-01', '09-31'],
  4: ['10-01', '12-31']
};

export const getTody = (): [string, string] => {
  const dt = tDate().format();
  return [dt, dt];
};

// 2 天内
export const getOffset2 = (): [string, string] => {
  const dt = tDate();
  return [dt.getOffset(-1, 'day'), dt.format()];
};

// 3 天内
export const getOffset3 = (): [string, string] => {
  const dt = tDate();
  return [dt.getOffset(-3, 'day'), dt.format()];
};

// 7 天内
export const getOffset7 = (): [string, string] => {
  const dt = tDate();
  return [dt.getOffset(-7, 'day'), dt.format()];
};

// 本周
export const getWeek = (): [string, string] => {
  const dt = tDate();
  return [dt.getOffset((+(dt.getWeek() || 0) - 1) * -1, 'day'), dt.format()];
};

// 本月
export const getMonth = (): [string, string] => {
  const dt = tDate();
  return [dt.getOffset((dt.day - 1) * -1, 'day'), dt.format()];
};

// 本季
export const getQuarter = (): [string, string] => {
  const dt = tDate();
  const y = dt.format('YYYY');
  const q = dt.quarter as 1 | 2 | 3 | 4;
  const [a, b] = rangeQuarter[q];
  return [`${y}-${a}`, `${y}-${b}`];
};
// 上半年
export const getHalfYear1 = (): [string, string] => {
  const dt = tDate().format('YYYY');
  return [`${dt}-01-01`, `${dt}-05-31`];
};
// 下半年
export const getHalfYear2 = (): [string, string] => {
  const dt = tDate().format('YYYY');
  return [`${dt}-06-01`, `${dt}-12-31`];
};

// 当年
export const getYear = (): [string, string] => {
  const dt = tDate().format('YYYY');
  return [`${dt}-01-01`, `${dt}-12-31`];
};

/** 筛选框日期范围预设 */
export const FAST_DATE_FILTER_SHORTCUTS: { label: string, value: () => [string, string] }[] = [
  {
    label: '今日',
    value: getTody
  },
  {
    label: '3天内',
    value: getOffset3
  },
  {
    label: '7天内',
    value: getOffset7
  },
  {
    label: '本周',
    value: getWeek
  },
  {
    label: '本月',
    value: getMonth
  },
  {
    label: '本季',
    value: getQuarter
  },
  {
    label: '上半年',
    value: getHalfYear1
  },
  {
    label: '下半年',
    value: getHalfYear2
  },
  {
    label: '当年',
    value: getYear
  }
];
