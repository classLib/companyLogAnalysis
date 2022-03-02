import { factory } from '../../chart/factory.js'

const option = {
  name: 'wordCloudForce',
  nodes: {
    key: 'nodes',
    nameKey: 'name',
    sizeKey: 'size',
    nodeSizeExtent: [15, 60],
    nodeOpacityExtent: [1, 1],
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
      radius: 40,
      strength: 0.25
    },
    forceManyBody: {
      strength: -30,
      theta: 0.9,
      distanceMin: 10
    }
  },
  title: {
    text: '邮件发送情况',
    subText: '邮件号：1067',
    info: "通过公司的邮件日志数据，提取邮件主题词，进行自然语言处理，<br /><br />获取到该员工员工发送邮件的特征词<br /><br />将其用基于力导向算法的布局模型进行展示，提供缩放、拖拽功能。"
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

const [wordCloud, setWordCloud] = factory.init('wordCloudEmailSend', option);

const emailWordFreqData = d3.json('./data/word.email.json');

emailWordFreqData.then(data => {
  let id = 1067;
  const wordsData = getStdData(`${id}`, data[id]);
  setWordCloud(wordsData)
})

function renderWordCloud(id) {
  emailWordFreqData.then(data => {
    const wordsData = getStdData(`${id}`, data[id]);
    option.title.subText = `邮件号：${id}`
    setWordCloud(wordsData)
  })
}

function getStdData(id, words) {
  let nodes = [];
  let links = [];
  nodes.push({
    name: id,
    size: 0
  })
  words.forEach(([name, size]) => {
    nodes.push({
      name,
      size
    })
    links.push({
      source: id,
      target: name,
      value: 1
    })
  })
  return ({ nodes, links });
}

export { renderWordCloud }