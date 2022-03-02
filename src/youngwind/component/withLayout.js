/**
 * 图表布局
 */
function withLayout(chart) {
    const container = d3.select(`#${chart._domId}`)
    const { layout: { type, margin } } = chart._option
    const { name } = chart._option;
    addBasicInfo(chart, container, margin)
    addBasicSvg(chart, container, chart._domId, name)
    addType(chart, type, chart._domId)
}

/**
 * 为图表添加：
 *   1.边距
 *   2.外宽高
 *   3.内宽高
 * @param {object} chart 
 * @param {Selection} container 
 * @param {object} margin 
 */
function addBasicInfo(chart, container, margin) {
    // 边距
    chart._margin = {
        top: margin.top,
        right: margin.right,
        bottom: margin.bottom,
        left: margin.left
    }
    // 外宽高
    chart._width = container.node().offsetWidth
    chart._height = container.node().offsetHeight
    // 内宽高
    chart._innerHeight = chart._height - chart._margin.top - chart._margin.bottom
    chart._innerWidth = chart._width - chart._margin.left - chart._margin.right
    chart._viewBox = `0 0 ${chart._width} ${chart._height}`
}

/**
 * 为图表添加：
 *   1.svg画布
 * @param {object} chart 
 * @param {Selection} container 
 * @param {object} domId 
 */
function addBasicSvg(chart, container, domId, name) {
    chart._svg = container.append('svg')
        .attr('id', `${domId}Svg`)
        .attr('class', `${name}`)
        .attr('viewBox', chart._viewBox)

}

function addType(chart, type, domId) {
    try {
        switch (type) {
            case 'basic': {
                createBasic(chart, domId)
                break
            }
            case 'descartes': {
                createDescartes(chart, domId)
                break;
            }
            case 'polar': {
                createPolar(chart, domId)
                break
            }
            default: {
                throw new Error(`【布局配置错误】：layout.type -> ${type}`)
            }
        }
    } catch (e) {
        console.error(e)
    }
}

/**
 * 普通布局
 */
function createBasic(chart, domId) {
    const { layout: { zoom } } = chart._option;
    if (zoom) {
        chart._zoomGroup = chart._svg.append('g')
            .attr('id', `${domId}ZoomGroup`)
            .attr('class', `zoom-group`)
        chart._mainGroup = chart._zoomGroup.append('g')
            .attr('id', `${domId}MainGroup`)
            .attr('class', `main-group`)
            .attr('transform', `translate(${chart._margin.left},${chart._margin.top})`)
    } else {
        chart._mainGroup = chart._svg.append('g')
            .attr('id', `${domId}MainGroup`)
            .attr('class', `main-group`)
            .attr('transform', `translate(${chart._margin.left},${chart._margin.top})`)
    }
}

/**
 * 笛卡尔坐标系
 */
function createDescartes(chart, domId) {
    chart._xAxisGroup = chart._svg.append('g')
        .attr('id', `${domId}XAxisGroup`)
        .attr('class', `x-axis-group`)
        .attr('transform', `translate(${chart._margin.left},${chart._margin.top + chart._innerHeight})`)

    chart._yAxisGroup = chart._svg.append('g')
        .attr('id', `${domId}YAxisGroup`)
        .attr('class', `y-axis-group`)
        .attr('transform', `translate(${chart._margin.left},${chart._margin.top})`)

    chart._mainGroup = chart._svg.append('g')
        .attr('id', `${domId}MainGroup`)
        .attr('class', `main-group`)
        .attr('transform', `translate(${chart._margin.left},${chart._margin.top})`)
}

/**
 * 极坐标系
 */
function createPolar(chart, domId) {
    const { layout: { zoom } } = chart._option;
    if (zoom) {
        chart._zoomGroup = chart._svg.append('g')
            .attr('id', `${domId}ZoomGroup`)
            .attr('class', `zoom-group`)

        chart._mainGroup = chart._zoomGroup.append('g')
            .attr('id', `${domId}MainGroup`)
            .attr('class', `main-group`)
            .attr('transform', `translate(${chart._width / 2},${chart._height / 2})`)
    } else {
        chart._mainGroup = chart._svg.append('g')
            .attr('id', `${domId}MainGroup`)
            .attr('class', `main-group`)
            .attr('transform', `translate(${chart._width / 2},${chart._height / 2})`)
    }


    chart._radius = (chart._innerWidth < chart._innerHeight ? chart._innerWidth : chart._innerHeight) / 2;
}

export { withLayout }