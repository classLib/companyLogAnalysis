import { factory } from '../../chart/factory.js'

const option = {
  name: 'scatter',
  scatter: {
    radius: 15,
  },
  title: {
    text: '散点图',
    subText: '散点图',
    info: "tooltip"
  },
  layout: {
    type: 'descartes',
    margin: {
      top: 60,
      right: 25,
      bottom: 50,
      left: 50
    }
  },
  xAxis: {
    key: 'other',
    type: {
      name: 'value',
    }
  },
  yAxis: {
    key: 'amount',
    type: {
      name: 'value',
      extent: false
    },
  },
}

const [scatter, setScatter] = factory.init('scatter', option);

d3.csv('../chart/scatter/data.csv').then(data => {
  setScatter(data);
})