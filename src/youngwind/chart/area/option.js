/**
 * bar 默认配置项
 */

const option = {
    name: 'area',
    area:{
        curve: d3.curveNatural,
    },
    title:{
        text:'面积图',
        subText:'面积图',
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
            name: 'time',
        }
    },
    yAxis: {
        key: 'other',
        type: {
            name: 'value',
            extent: false
        },
    }
}

export { option }