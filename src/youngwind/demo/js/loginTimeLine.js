import { factory } from '../../chart/factory.js'

const option = {
  name: 'timeline',
  timeline: {
    key: 'index',
    startTimeKey: 'start',
    endTimeKey: 'end',
    messageKey: 'state',
    groupKey: 'state',
    orderKey: 'start'
  },
  title: {
    text: '服务器登录时间线',
    subText: '10.60.105.4 登录 1228',
    info: "Hello world!"
  },
  layout: {
    type: 'basic',
    margin: {
      top: 100,
      right: 50,
      bottom: 50,
      left: 50
    },
    zoom: true
  }
}

const [timeline, setTimeline] = factory.init('loginTimeline', option);

render("10.64.105.4", "1228")

function render(sip, user) {
  d3.csv('./data/login_combine.csv').then(data => {
    let result = [];
    data.forEach(d => {
      if (d['sip'] === sip && d['user'] === user) {
        d['start'] = new Date(d['time'])
        let date = new Date(d['time'])
        date.setDate(date.getDate() + 1)
        d['end'] = new Date(date)
        result.push(d)
      }
    })

    option.title.subText = `${sip} 登录 ${user}`
    setTimeline(result, option)
  })
}

export { render }