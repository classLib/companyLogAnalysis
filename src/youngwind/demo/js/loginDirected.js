import { factory } from '../../chart/factory.js'
import { render } from './loginTimeLine.js'
const option = {
  name: 'forceDirected',
  nodes: {
    key: 'nodes',
    nameKey: 'name',
    sizeKey: 'size',
    nodeSizeExtent: [10, 30],
    nodeOpacityExtent: [0.5, 1],
    onClick: (event, d, data) => {
      if (d.name.includes(".")) {
        let sip = d.name;
        let user = "";
        const { links } = data;
        links.forEach(l => {
          debugger
          if (l.target.name === sip)
            user = l.source.name;
        })
        render(sip, user)
      } else {
        let user = d.name;
        let sip = "";
        const { links } = data;
        links.forEach(l => {
          debugger
          if (l.target.name === user)
            sip = l.source.name;
        })
        render(sip, user)
      }

    }
  },
  links: {
    key: 'links',
    sourceKey: 'source',
    targetKey: 'target',
    valueKey: 'value',
    lineWidthExtent: [1, 10]
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
    text: '失败情况下：登录用户与源IP关系图',
    subText: '一个账号被多个IP登录',
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

const [wordCloud, setWordCloud] = factory.init('loginDirected', option);

d3.csv('./data/loginError/loginError_1211.csv').then(data => {
  // let stdData = getSipToUser("10.64.105.4", data);
  let stdData = getUserToSip("1211", data);
  setWordCloud(stdData)
})

function getSipToUser(sip, data) {
  let map = new Map();
  let nodes = [];
  let links = [];

  nodes.push({
    name: sip,
    size: data.length,
  })
  let count = 0;
  data.forEach(d => {
    if (map.has(d['user'])) {
      map.set(d['user'], map.get(d['user']) + 1);
    } else {
      map.set(d['user'], 1);
    }
  })
  map.forEach((val, key) => {
    nodes.push({
      name: key,
      size: val
    })

    links.push({
      source: sip,
      target: key,
      value: val
    })
  })
  return {
    nodes,
    links
  }
}

function getUserToSip(user, data) {
  let map = new Map();
  let nodes = [];
  let links = [];

  nodes.push({
    name: user,
    size: data.length,
  })
  let count = 0;
  data.forEach(d => {
    if (map.has(d['sip'])) {
      map.set(d['sip'], map.get(d['sip']) + 1);
    } else {
      map.set(d['sip'], 1);
    }
  })
  map.forEach((val, key) => {
    nodes.push({
      name: key,
      size: val
    })

    links.push({
      source: user,
      target: key,
      value: val
    })
  })
  return {
    nodes,
    links
  }
}

function renderBySip(sip) {
  d3.csv(`./data/loginError/loginError_${sip}.csv`).then(data => {
    let stdData = getSipToUser(`${sip}`, data);
    option.title.subText = `一个IP登录多个账户`
    setWordCloud(stdData, option)
  })
}

function renderByUser(user) {
  d3.csv(`./data/loginError/loginError_${user}.csv`).then(data => {
    let stdData = getUserToSip(`${user}`, data);
    option.title.subText = `一个账号被多个IP登录`
    setWordCloud(stdData, option)
  })
}

export { renderBySip, renderByUser }