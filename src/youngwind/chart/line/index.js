import { factory } from '../factory.js'
import { withLayout } from '../../component/withLayout.js'
import { withScale } from "../../component/withScale.js"
import { withAxes } from "../../component/withAxes.js"
import { withTitle } from "../../component/withTitle.js"

class Line {
    constructor(domId, option) {
        this._domId = domId;
        this._option = option;
        withLayout(this)
    }
    
    render() {
        withScale(this)
        withAxes(this)
        withTitle(this)
        this.renderLines(this._data, this._option);
    }

    renderLines(data, option) {
        const { xAxis: { key: xKey }, yAxis: { key: yKey } } = option
        const { line: { curve } } = option;
        this._lineGroup = this._mainGroup

        this._lineElements = this._mainGroup
            .selectAll('path')
            .data([data])
            .join('path')
            .transition()
            .attr("d", d3.line()
                .curve(curve)
                .x(d => this._xScale(d[xKey]))
                .y(d => this._yScale(d[yKey]))
            );
    }
}

const register = () => {
    factory.register('line', (domId, option) => {
        return new Line(domId, option);
    })
}

export { register }    