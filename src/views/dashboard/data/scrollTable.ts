export const columns = [
  { title: '排名', dataIndex: 'rank', width: '80px', color: '#40a9ff' },
  { title: '城市', dataIndex: 'city', width: '120px' },
  {
    title: '销售额',
    dataIndex: 'sales',
    width: '150px',
    formatter: (value: number) => `¥${(value / 10000).toFixed(2)}万`,
  },
  {
    title: '增长率',
    dataIndex: 'growth',
    width: '150px',
    formatter: (value: number) => `${value}%`,
    color: (value: number) => (value > 0 ? '#52c41a' : '#f5222d'),
  },
  {
    title: '完成率',
    dataIndex: 'completion',
    width: '150px',
    formatter: (value: number) => `${value}%`,
  },
];
export const tableData = [
  { rank: 1, city: '上海市', sales: 12560000, growth: 12.5, completion: 98 },
  { rank: 2, city: '北京市', sales: 11230000, growth: 8.7, completion: 95 },
  { rank: 3, city: '深圳市', sales: 9850000, growth: 15.3, completion: 92 },
  { rank: 4, city: '广州市', sales: 8765000, growth: 10.2, completion: 89 },
  { rank: 5, city: '杭州市', sales: 7654000, growth: 18.9, completion: 96 },
  { rank: 6, city: '南京市', sales: 6543000, growth: 7.3, completion: 85 },
  { rank: 7, city: '成都市', sales: 5987000, growth: 11.4, completion: 91 },
  { rank: 8, city: '重庆市', sales: 5432000, growth: 9.8, completion: 88 },
  { rank: 9, city: '武汉市', sales: 4987000, growth: 14.2, completion: 93 },
  { rank: 10, city: '西安市', sales: 4321000, growth: 6.5, completion: 82 },
];
