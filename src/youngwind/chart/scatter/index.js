import { factory } from '../factory.js'
import { withLayout } from '../../component/withLayout.js'
import { withScale } from "../../component/withScale.js"
import { withAxes } from "../../component/withAxes.js"
import { withTitle } from "../../component/withTitle.js"

class Scatter {
    constructor(domId, option) {
        this._domId = domId
        this._option = option
        withLayout(this)
    }

    render() {
        withScale(this)
        withAxes(this)
        withTitle(this)
        this.renderScatters(this._data, this._option);
    }

    renderScatters(data, option) {
        const { xAxis: { key: xKey }, yAxis: { key: yKey } } = option
        const { scatter: { radius } } = option;

        this._scatterElements = this._mainGroup
            .selectAll('circle')
            .data(data)
            .join('circle')
            .transition()
            .attr('r', radius)
            .attr('cx', d => this._xScale(d[xKey]))
            .attr('cy', d => this._yScale(d[yKey]))
    }
}

const register = () => {
    factory.register('scatter', (domId, option) => {
        return new Scatter(domId, option);
    })
}

export { register }    