/**
 * 图表比例尺
 */


function withScale(chart) {
    withXAxisScale(chart, chart._data, chart._option)
    withYAxisScale(chart, chart._data, chart._option)
}
/**
 * X轴
 */
function withXAxisScale(chart, data, option) {
    const { xAxis } = option
    const { key, type } = xAxis
    const { name: typeName, extent } = type;
    const { _innerWidth } = chart;

    try {
        switch (typeName) {
            case 'category': {
                addXScaleBand(chart, data.map(d => d[key]), [0, _innerWidth], type)
                break;
            }
            case 'value': {
                addXScaleLinear(chart, extent
                    ? d3.extent(data, d => +d[key])
                    : [0, d3.max(data, d => +d[key])]
                    , [0, _innerWidth], type)
                break;
            }
            case 'time': {
                addXScaleTime(chart, d3.extent(data, d => new Date(d[key])), [0, _innerWidth], type);
                break;
            }
            default: {
                throw new Error(`【比例尺配置错误】：axis.type -> ${typeName}`)
            }
        }
    } catch (e) {
        console.error(e)
    }
}

function addXScaleBand(chart, domain, range, type) {
    const { paddingInner, paddingOuter } = type;
    chart._xAxisScale = d3.scaleBand()
        .domain(domain)
        .range(range)
        .paddingInner(paddingInner)
        .paddingOuter(paddingOuter)
    chart._xAxisScaleWidth = () => chart._xAxisScale.bandwidth()
    chart._xScale = (d) => chart._xAxisScale(d)
}

function addXScaleLinear(chart, domain, range, type) {
    chart._xAxisScale = d3.scaleLinear()
        .domain(domain)
        .nice()
        .range(range)
    chart._xScale = (d) => chart._xAxisScale(d)
}

function addXScaleTime(chart, domain, range, type) {
    chart._xAxisScale = d3.scaleTime()
        .domain(domain)
        .nice()
        .range(range)
    chart._xScale = (d) => chart._xAxisScale(new Date(d))
}

/**
 * Y轴
 */
function withYAxisScale(chart, data, option) {
    const { yAxis } = option
    const { key, type } = yAxis
    const { name: typeName, extent } = type;
    const { _innerHeight } = chart;

    try {
        switch (typeName) {
            case 'value': {
                addYScaleLinear(chart, extent
                    ? d3.extent(data, d => +d[key])
                    : [0, d3.max(data, d => +d[key])]
                    , [_innerHeight, 0], type)
                break;
            }
            default: {
                throw new Error(`【比例尺配置错误】：axis.type -> ${typeName}`)
            }
        }
    } catch (e) {
        console.error(e)
    }
}

function addYScaleLinear(chart, domain, range) {
    chart._yAxisScale = d3.scaleLinear()
        .domain(domain)
        .nice()
        .range(range)

    chart._yScale = (d) => chart._yAxisScale(d)
}

export { withScale }