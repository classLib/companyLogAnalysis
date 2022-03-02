import { factory } from '../../chart/factory.js'

const option = {
  name: 'bar',
  bar: {
    onClick: () => {

    }
  },
  title: {
    text: 'TCP流量下载情况',
    subText: '员工号：1067',
    info: "tooltip"
  },
  layout: {
    type: 'descartes',
    margin: {
      top: 60,
      right: 25,
      bottom: 20,
      left: 80
    }
  },
  xAxis: {
    key: 'key',
    type: {
      name: 'category',
      paddingInner: 0.5,
      paddingOuter: 0.7,
    }
  },
  yAxis: {
    key: 'download',
    type: {
      name: 'value',
      extent: false
    },
  }
}

const [bar, setBar] = factory.init('tcpDonwload', option);

d3.csv('./data/tcp/tcp_1067.csv').then(data => {
  setBar(getStdData(data));
})

function getStdData(data) {
  let groupedData = d3.group(data, d => d['proto'])
  let result = [];
  groupedData.forEach((val, key) => {
    let download = d3.sum(val, d => d['downlink_length']);
    let upload = d3.sum(val, d => d['uplink_length']);
    result.push({
      key,
      download,
      upload
    })
  })
  return result
}

function renderTcpDownload(id) {
  d3.csv(`./data/tcp/tcp_${id}.csv`).then(data => {
    option.title.subText = `员工号：${id}`
    setBar(getStdData(data));
  }).catch(e => {
    console.error(e);
  })
}

export { renderTcpDownload }