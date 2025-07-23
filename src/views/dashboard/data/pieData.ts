import { createPie } from '@/components/ECharts/utils';
import { t } from '@/i18n';

export const pieData = () => {
  const data = [
    {
      value: 1,
      name: 'CSS',
      itemStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 0,
          colorStops: [
            { offset: 0, color: '#ff6d6d' },
            { offset: 1, color: '#fab6b6' },
          ],
        },
      },
    },
    {
      value: 42.9,
      name: 'TypeScript',
      itemStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 0,
          colorStops: [
            { offset: 0, color: '#6311a7' },
            { offset: 1, color: '#c8afdd' },
          ],
        },
      },
    },

    {
      value: 13.9,
      name: 'JavaScript',
      itemStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 0,
          colorStops: [
            { offset: 0, color: '#f2c55c' },
            { offset: 1, color: '#f4e3bd' },
          ],
        },
      },
    },
    {
      value: 7,
      name: 'HTML',
      itemStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 0,
          colorStops: [
            { offset: 0, color: '#0958d9' },
            { offset: 1, color: '#a6c1ee' },
          ],
        },
      },
    },

    {
      value: 42.4,
      name: 'Vue',
      itemStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 0,
          colorStops: [
            { offset: 0, color: '#42b883' },
            { offset: 1, color: '#c2e9fb' },
          ],
        },
      },
    },
  ];
  return createPie({ data, name: t('编程语言') });
};
