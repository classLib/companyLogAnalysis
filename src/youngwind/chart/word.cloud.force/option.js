const option = {
  name: 'wordCloudForce',
  nodes: {
    key: 'nodes',
    nameKey: 'name',
    sizeKey: 'size',
    nodeSizeExtent: [15, 100],
    nodeOpacityExtent: [0.5, 1],
    onClick: (event, d) => {
      console.log(event, d);
    }
  },
  links: {
    key: 'links',
    sourceKey: 'source',
    targetKey: 'target',
    valueKey: 'value'
  },
  forceSimulation: {
    forceCollide: {
      radius: 50,
      strength: 1
    },
    forceManyBody: {
      strength: -30,
      theta: 0.9,
      distanceMin: 10
    }
  },
  title: {
    text: '词云',
    subText: '力导向布局',
  },
  tooltip: {
    info: "通过公司的邮件日志数据，提取邮件主题词，进行自然语言处理，获取到该员工员工发送邮件的特征词，并将其用基于力导向算法的布局模型进行展示，提供缩放、拖拽功能。"
  },
  layout: {
    type: 'basic',
    margin: {
      top: 60,
      right: 25,
      bottom: 50,
      left: 50
    },
    zoom: true
  }
}

export { option }