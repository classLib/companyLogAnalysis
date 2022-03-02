import { factory } from '../factory.js'
import { withLayout } from '../../component/withLayout.js'
import { withTitle } from "../../component/withTitle.js"

class MultiLine {
    constructor(domId, option) {
        this._domId = domId;
        this._option = option;
        withLayout(this)
    }

    render() {
        withTitle(this)
        this.renderData();
        this.renderScale();
        this.renderAxes();
        this.renderLines(this._data, this._option);

    }
    
    renderData() {
        const { xAxis: { key: xKey }, yAxis: { key: yKey } } = this._option
        this._seriesData = yKey.map(yk => {
            return (
                this._data.map(d => ({ x: d[xKey], y: d[yk] }))
            )
        })
    }

    renderScale() {
        this.renderXScale();
        this.renderYScale();
    }
    renderXScale() {
        const { xAxis: { key: xKey } } = this._option
        this._xAxisScale = d3.scaleTime().domain(d3.extent(this._data, d => new Date(d[xKey]))).nice().range([0, this._innerWidth])

        this._xScale = (d) => this._xAxisScale(new Date(d))
    }
    renderYScale() {
        const { yAxis: { key: yKey } } = this._option
        this._yAxisScale = d3.scaleLinear()
            .domain([0, 24])
            .nice()
            .range([this._innerHeight, 0])

        this._yScale = (d) => this._yAxisScale(d.getHours() + d.getMinutes() / 60)
    }

    renderAxes() {
        const xTimeFormat = d3.utcFormat("%d")

        this._xAxisGroup.transition()
            .call(
                d3.axisBottom(this._xAxisScale)
                    .tickSizeInner(-this._innerHeight)
                    .tickSizeOuter(-this._innerHeight)
                    .tickFormat(xTimeFormat)
            )
        this._yAxisGroup.transition()
            .call(
                d3.axisLeft(this._yAxisScale)
                    .tickSizeInner(-this._innerWidth)
                    .tickSizeOuter(-this._innerWidth)
                    .ticks(12)
            )
    }

    renderLines() {
        const { line: { curve } } = this._option;
        this._lineGroup = this._mainGroup

        this._lineElements = this._mainGroup
            .selectAll('path')
            .data(this._seriesData)
            .join('path')
            .transition()
            .attr("d", d3.line()
                .curve(curve)
                .x(d => this._xScale(d['x']))
                .y(d => this._yScale(new Date(d['y'])))
            );
    }
}

const register = () => {
    factory.register('multiLine', (domId, option) => {
        return new MultiLine(domId, option);
    })
}

export { register }    