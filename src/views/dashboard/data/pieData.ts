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
    extraCssText: 'box-shadow: 0 4px 12px rgba(0,0,0,0.1); border-radius: 6px;',
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
      text: '数据总览',
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
          shadowBlur: 14,
          shadowColor: 'rgba(0, 0, 0, 0.15)',
        },
      },
      data: [
        {
          value: 1820,
          name: 'C',
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [
                { offset: 0, color: '#ff9a9e' },
                { offset: 1, color: '#fad0c4' },
              ],
            },
          },
        },
        {
          value: 1530,
          name: 'C++',
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [
                { offset: 0, color: '#a1c4fd' },
                { offset: 1, color: '#c2e9fb' },
              ],
            },
          },
        },
        {
          value: 1260,
          name: 'Java',
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [
                { offset: 0, color: '#d4fc79' },
                { offset: 1, color: '#96e6a1' },
              ],
            },
          },
        },
        {
          value: 980,
          name: 'JavaScript',
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [
                { offset: 0, color: '#fbc2eb' },
                { offset: 1, color: '#a6c1ee' },
              ],
            },
          },
        },
        {
          value: 2150,
          name: 'Python',
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [
                { offset: 0, color: '#6a85f2' },
                { offset: 1, color: '#8bd3f7' },
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
