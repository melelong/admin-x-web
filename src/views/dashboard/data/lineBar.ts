export const lineBar = {
  backgroundColor: '#fff',
  grid: {
    left: '3%',
    right: '5%',
    bottom: '10%',
    top: '30%',
    containLabel: true,
  },
  xAxis: {
    type: 'category',
    data: ['量子计算', '神经网络', '区块链', '边缘计算', '数字孪生', '元宇宙', 'AIoT'],
    axisLine: {
      lineStyle: {
        color: '#f5f5f5',
        width: 1,
      },
    },
    axisLabel: {
      color: '#333',
      fontSize: 12,
      fontWeight: 'bold',
    },
  },
  yAxis: {
    type: 'value',
    name: '技术指数',
    nameTextStyle: {
      color: '#666',
      fontSize: 12,
      padding: [0, 0, 10, -10],
    },
    splitLine: {
      lineStyle: {
        color: '#eee',
        type: 'dashed',
      },
    },
    axisLabel: {
      color: '#666',
    },
  },
  series: [
    {
      name: '2025',
      type: 'bar',
      data: [85, 92, 78, 88, 76, 95, 82],
      itemStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: '#00E5FF' },
            { offset: 1, color: '#0958d9' },
          ],
        },
        borderRadius: [6, 6, 0, 0],
      },
      label: {
        show: true,
        position: 'top',
        color: '#0D8BBD',
        fontWeight: 'bold',
      },
    },
    {
      name: '趋势线',
      type: 'line',
      data: [85, 92, 78, 88, 76, 95, 82],
      symbol: 'circle',
      symbolSize: 10,
      lineStyle: {
        width: 4,
        color: '#FF6B6B',
        shadowBlur: 15,
        shadowColor: '#FF6B6B',
      },
      itemStyle: {
        color: '#fff',
        borderWidth: 2,
        borderColor: '#FF6B6B',
      },
    },
  ],
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(13,139,189,0.85)',
    borderWidth: 0,
    textStyle: {
      color: '#fff',
    },
    axisPointer: {
      type: 'shadow',
      shadowStyle: {
        color: 'rgba(0,229,255,0.2)',
      },
    },
  },
  title: {
    text: '前沿科技发展指数 (2025)',
    left: '2%',
    top: '3%',
    textStyle: {
      color: '#001529',
      fontSize: 16,
      fontWeight: 'bold',
    },
  },
  legend: {
    right: '3%',
    top: '3%',
    textStyle: {
      color: '#666',
    },
  },
};
