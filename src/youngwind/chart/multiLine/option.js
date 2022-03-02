/**
 * bar 默认配置项
 */

const option = {
    name: 'multiLine',
    line: {
        // https://github.com/d3/d3-shape/blob/v2.0.0/README.md#curves
        curve: d3.curveNatural,
    },
    title: {
        text: '多条折线图',
        subText: 'x轴为离散值',
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
        name:'日期',
    },
    yAxis: {
        key: ['begin', 'end'],
        name:'上下班时间'
    },
}

export { option }