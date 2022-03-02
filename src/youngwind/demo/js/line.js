import { factory } from '../../chart/factory.js'
const option = {
  name: 'line',
  line: {
    // https://github.com/d3/d3-shape/blob/v2.0.0/README.md#curves
    curve: d3.curveCardinal.tension(1),
  },
  title: {
    text: '折线图',
    subText: 'x轴为离散值',
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
    key: 'date',
    type: {
      name: 'category',
      paddingInner: 0.5,
      paddingOuter: 0.7,
    }
  },
  yAxis: {
    key: 'other',
    type: {
      name: 'value',
      extent: false
    },
  },
}
const [line, setLine] = factory.init('line', option);

d3.csv('../chart/line/data.csv').then(data => {
  setLine(data);
})