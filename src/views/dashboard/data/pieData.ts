import { t } from '@/i18n';

export const pieData = {
  backgroundColor: '#fff',
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: <span style="font-weight:700">{c}</span> ({d}%)',
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderColor: '#eee',
    borderWidth: 1,
    textStyle: { color: '#333', fontSize: 12 },
    padding: [10, 15],
    extraCssText: 'box-shadow: 0 4px 12px rgba(255,255,255,0.01); border-radius: 6px;',
  },
  legend: {
    type: 'scroll',
    orient: 'vertical',
    right: 20,
    top: 'center',
    textStyle: { color: '#666' },
    itemGap: 12,
    itemWidth: 14,
    itemHeight: 14,
    pageIconColor: '#888',
    pageTextStyle: { color: '#444' },
  },
  graphic: {
    type: 'text',
    left: '36%',
    top: 'center',
    style: {
      text: t('编程语言'),
      textAlign: 'center',
      fill: '#999',
      fontSize: 14,
      fontWeight: 'normal',
    },
  },
  series: [
    {
      name: '数据分布',
      type: 'pie',
      radius: ['45%', '75%'],
      center: ['40%', '50%'],
      avoidLabelOverlap: true,
      hoverOffset: 10,
      itemStyle: {
        borderRadius: 8,
        borderWidth: 2,
        shadowBlur: 0,
        shadowColor: 'rgba(200, 200, 200, 0)',
        borderColor: '#fff',
      },
      label: {
        show: true,
        position: 'outside',
        formatter: (params: Record<string, any>) => {
          return `{name|${params.name}}\n{value|${params.percent}%}`;
        },
        rich: {
          name: {
            fontSize: 11,
            padding: [2, 0],
            color: '#555',
          },
          value: {
            fontSize: 13,
            fontWeight: 'bold',
            color: '#333',
          },
        },
        distanceToLabelLine: 5,
      },
      labelLine: {
        length: 15,
        length2: 20,
        smooth: true,
        lineStyle: {
          width: 1.5,
          type: 'dashed',
        },
      },
      emphasis: {
        scale: true,
        scaleSize: 8,
        itemStyle: {
          shadowBlur: 15,
          shadowColor: 'rgba(200, 200, 200, 0.2)',
        },
      },
      data: [
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
      ],
      animationType: 'scale',
      animationEasing: 'elasticOut',
    },
  ],
};
