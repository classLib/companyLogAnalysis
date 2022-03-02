/**
 * scatter 默认配置项
 */

const option = {
    name: 'scatter',
    scatter: {
        radius: 15,
    },
    title:{
        text:'散点图',
        subText:'散点图',
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

export { option }