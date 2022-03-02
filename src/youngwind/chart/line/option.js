/**
 * bar 默认配置项
 */

const option = {
    name: 'line',
    line: {
        // https://github.com/d3/d3-shape/blob/v2.0.0/README.md#curves
        curve: d3.curveNatural,
    },
    title:{
        text:'折线图',
        subText:'x轴为离散值',
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
    },
}

export { option }