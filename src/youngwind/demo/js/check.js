import { factory } from '../../chart/factory.js'
const option = {
    name: 'multiLine',
    line: {
        // https://github.com/d3/d3-shape/blob/v2.0.0/README.md#curves
        curve: d3.curveLinear,
    },
    title: {
        text: '工作时长情况',
        subText: '员工号：1067',
        info: `通过员工考勤打卡数据，可以通过上下班时间，统计得到员工从11月1号到11月30号的上班时间段。<br/ ><br/ >

        以树图为主视图，通过点击员工工号，展示不同的员工工作时长。<br/ ><br/ >
        
        通过分析，可得，大多员工的上班时间在8-10点之间，下班时间在18点-21点之间，且极少休假。（换句话说，绝大部分员工都是处于997的工作状态之中。）`    },
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
        key: 'day',
    },
    yAxis: {
        key: ['checkin', 'checkout'],
        type: {
            name: 'time'
        },
    },
}
const [multiLine, setMultiLine] = factory.init('check', option);

const checkData = d3.json('./data/check.json');

checkData.then(data => {
    setMultiLine(data['1067']);
})

function renderCheck(id) {
    checkData.then(data => {
        if (!data[`${id}`]) {
            console.log("该Id不存在考勤数据！");
            return null;
        }
        option.title.subText = `员工号：${id}`;
        setMultiLine(data[`${id}`]);
    })
}

export { renderCheck }