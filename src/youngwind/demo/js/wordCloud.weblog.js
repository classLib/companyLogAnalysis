import { factory } from '../../chart/factory.js'

const option = {
  name: 'wordCloudForce',
  nodes: {
    key: 'nodes',
    nameKey: 'name',
    sizeKey: 'size',
    nodeSizeExtent: [30, 60],
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
    text: '网站浏览情况',
    subText: '邮件号：1067',
    info: "通过公司的网站访问日志数据，提取网站的域名主题词，进行自然语言处理，<br /><br />获取到该员工员工浏览的网站的关键词<br /><br />将其用基于力导向算法的布局模型进行展示，提供缩放、拖拽功能。"
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

const [wordCloud, setWordCloud] = factory.init('wordCloudWeblog', option);

const emailWordFreqData = d3.json('./data/word.weblog.json');

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