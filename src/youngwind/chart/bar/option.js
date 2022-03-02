/**
 * bar 默认配置项
 */

const option = {
    name: 'bar',
    bar: {
        onClick: (event, d) => {
            console.log(event, d);
        }
    },
    title: {
        text: '柱状图',
        subText: '柱状图',
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
        key: 'amount',
        type: {
            name: 'value',
            extent: false
        },
    }
}

export { option }