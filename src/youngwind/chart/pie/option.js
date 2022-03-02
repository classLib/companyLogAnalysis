/**
 * 饼图配置项
 */
const option = {
  name: 'pie',
  pie: {
    categoryKey: 'name',
    valueKey: 'value',
    innerRadius: 200,
    legend: {
      anchor: 'start',
      size: 15,
      legendWidth: 50,
      legendHeight: 19,
      offsetX: -65,
      offsetY: -15
    }
  },
  title: {
    text: '饼图',
    subText: '分类对比',
    info:"Hello world!"
  },
  layout: {
    type: 'polar',
    margin: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }
  }
}

export { option }