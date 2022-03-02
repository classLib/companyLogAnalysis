import { factory } from '../../chart/factory.js'
import { renderBySip } from './loginDirected.js'
const option = {
  name: 'bar',
  bar: {
    onClick: (event, d) => {
      renderBySip(d['user']);
    }
  },
  title: {
    text: '员工登录“失败”情况（二）',
    subText: '通过源IP进行统计（TOP8）',
    info: `单纯的统计高危账号找不出更多有用信息，此时换个角度思考，<br />
    因为一个人可以登录到其它人的账号，那么通过寻觅源IP的登录行为，<br />
    就可以得到一个人是否登录了其它的账号。<br/><br/>
    下图表示了，公司源IP中，登录失败次数最多的源IP。<br/>
    显然易见，有IP：10.64.105.4是特别异常的。
    `
  },
  layout: {
    type: 'descartes',
    margin: {
      top: 60,
      right: 25,
      bottom: 20,
      left: 20
    }
  },
  xAxis: {
    key: 'user',
    type: {
      name: 'category',
      paddingInner: 0.5,
      paddingOuter: 0.7,
    }
  },
  yAxis: {
    key: 'error',
    type: {
      name: 'value',
      extent: false
    },
  }
}

const [bar, setBar] = factory.init('loginErrorBySip', option);

d3.csv('./data/loginErrorBySip.csv').then(data => {
  data.sort((a, b) => b['error'] - a['error']).splice(8)
  setBar(data);
})



function render(id) {
  d3.csv(`./data/tcp/tcp_${id}.csv`).then(data => {
    option.title.subText = `员工号：${id}`
    setBar(getStdData(data));
  }).catch(e => {
    console.error(e);
  })
}

export { render }