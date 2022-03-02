import { factory } from '../factory.js'
import { withLayout } from '../../component/withLayout.js'
import { withScale } from "../../component/withScale.js"
import { withAxes } from "../../component/withAxes.js"
import { withTitle } from "../../component/withTitle.js"
class Bar {
    constructor(domId, option) {
        this._domId = domId
        this._option = option
        withLayout(this)
    }

    render() {
        withScale(this)
        withAxes(this)
        withTitle(this)

        this.renderRects(this._data, this._option);
    }

    renderRects(data) {
        const {
            xAxis: { key: xKey },
            yAxis: { key: yKey },
            bar: { onClick }
        } = this._option



        this._rectElements = this._mainGroup
            .selectAll('rect')
            .data(data, d => d['date'])
            .join('rect')
            .transition()
            .attr('width', this._xAxisScaleWidth())
            .attr('height', d => this._innerHeight - this._yAxisScale(d[yKey]))
            .attr('y', d => this._yScale(d[yKey]))
            .attr('x', d => +this._xScale(d[xKey]))
            .selection()
            .on('click', onClick)
    }
}

const register = () => {
    factory.register('bar', (domId, option) => {
        return new Bar(domId, option);
    })
}

export { register }    
