import { factory } from '../../chart/factory.js'
import { renderByUser } from './loginDirected.js'

const option = {
  name: 'bar',
  bar: {
    onClick: (event,d) => {
      renderByUser(d['user'])
    }
  },
  title: {
    text: '员工登录“失败”情况（一）',
    subText: '员工账号失败次数（TOP20）',
    info: "为寻找异常事件，定义登录失败次数过高的员工账号为高危账号，<br/ >可以简单的统计出最危险的20个高危账号。"
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

const [bar, setBar] = factory.init('loginStatus', option);

d3.csv('./data/loginStatus.csv').then(data => {
  data.sort((a, b) => b['error'] - a['error']).splice(20)
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