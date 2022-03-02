/**
 * 图表坐标轴
 */


function withAxes(chart) {
    const { layout: { type } } = chart._option
    addAxes(chart, type, chart._option)
}

function addAxes(chart, type, option) {
    switch (type) {
        case 'basic': {
            break
        }
        case 'descartes': {
            createDescartesAxes(chart, option)
            break;
        }
        case 'polar': {
            createPolarAxes(chart, option)
            break
        }
        default: {
            throw new Error(`【坐标轴配置错误】：layout.type -> ${type}`)
        }
    }
}

function createDescartesAxes(chart, option) {
    chart._xAxisGroup.transition()
        .call(
            d3.axisBottom(chart._xAxisScale)
            .tickSizeInner(-chart._innerHeight)
            .tickSizeOuter(-chart._innerHeight)
        )
    chart._yAxisGroup.transition()
        .call(
            d3.axisLeft(chart._yAxisScale)
            .tickSizeInner(-chart._innerWidth)
            .tickSizeOuter(-chart._innerWidth)
        )
}

function createPolarAxes() {

}

export { withAxes }