import { getLessVar } from '@/utils';

export const doubleBar = () => {
  return {
    backgroundColor: getLessVar('--color-bg-container'),
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(15, 30, 50, 0.95)',
      borderColor: '#00ced1',
      borderWidth: 1,
      textStyle: {
        color: '#fff',
        fontSize: 14,
      },
      axisPointer: {
        type: 'shadow',
        shadowStyle: {
          color: 'rgba(0, 150, 255, 0.1)',
        },
      },
      formatter: (params: Record<string, any>) => {
        const tech = params[0].name;
        const maturity = params[0].value;
        const popularity = params[1].value;

        return `
        <div style="font-size:16px;font-weight:bold;margin-bottom:8px;color:#00ced1">${tech}</div>
        <div style="display:flex;align-items:center;margin-bottom:5px">
            <span style="display:inline-block;width:12px;height:12px;background:linear-gradient(to right, #8a2be2, #4b0082);border-radius:2px;margin-right:8px"></span>
            技术成熟度: <b style="margin-left:8px;color:#fff">${maturity}</b>
        </div>
        <div style="display:flex;align-items:center">
            <span style="display:inline-block;width:12px;height:12px;background:linear-gradient(to right, #00ced1, #008b8b);border-radius:2px;margin-right:8px"></span>
            市场热度: <b style="margin-left:8px;color:#fff">${popularity}</b>
        </div>
                    `;
      },
    },
    legend: {
      data: ['技术成熟度', '市场热度'],
      right: '3%',
      top: 20,
      textStyle: {
        color: '#333',
        fontSize: 14,
        fontWeight: 'bold',
      },
      itemWidth: 25,
      itemHeight: 12,
      itemGap: 20,
    },
    grid: {
      left: '3%',
      right: '5%',
      bottom: '10%',
      top: '20%',
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
        fontSize: 13,
        fontWeight: 'bold',
        interval: 0,
        rotate: 0,
      },
      axisTick: {
        show: false,
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
          color: '#f0f0f0',
          width: 1,
          type: 'dashed',
        },
      },
      axisLabel: {
        color: '#333',
        fontSize: 12,
        fontWeight: 'bold',
      },
      min: 0,
      max: 100,
    },
    series: [
      {
        name: '技术成熟度',
        type: 'bar',
        barWidth: 30,
        data: [82, 88, 75, 85, 78, 92, 80],
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: '#8a2be2' },
              { offset: 1, color: '#4b0082' },
            ],
          },
          borderRadius: [8, 8, 0, 0],
          borderWidth: 0,
        },
        label: {
          show: true,
          position: 'top',
          color: '#4b0082',
          fontWeight: 'bold',
          fontSize: 13,
          formatter: '{c}',
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 15,
            shadowColor: 'rgba(138, 43, 226, 0.6)',
          },
        },
      },
      {
        name: '市场热度',
        type: 'bar',
        barWidth: 30,
        data: [65, 92, 80, 78, 85, 88, 75],
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: '#00ced1' },
              { offset: 1, color: '#008b8b' },
            ],
          },
          borderRadius: [8, 8, 0, 0],
          borderWidth: 0,
        },
        label: {
          show: true,
          position: 'top',
          color: '#008b8b',
          fontWeight: 'bold',
          fontSize: 13,
          formatter: '{c}',
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 15,
            shadowColor: 'rgba(0, 206, 209, 0.6)',
          },
        },
      },
    ],
    animation: true,
    animationDuration: 1500,
    animationEasing: 'cubicOut',
  };
};
