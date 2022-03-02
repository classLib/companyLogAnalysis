import { factory } from '../factory.js'
import { withLayout } from '../../component/withLayout.js'
import { withScale } from "../../component/withScale.js"
import { withAxes } from "../../component/withAxes.js"
import { withTitle } from "../../component/withTitle.js"
class Area {
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

    renderRects(data, option) {
        const { xAxis: { key: xKey }, yAxis: { key: yKey } } = option
        const { area: { curve } } = option;
        this._rectElements = this._mainGroup
            .selectAll('path')
            .data([data])
            .join('path')
            .transition()
            .attr("d", d3.area()
                .curve(curve)
                .x(d => this._xScale(d[xKey]))
                .y0(this._yScale(0))
                .y1(d => this._yScale(+d[yKey]))
            );
    }
}

const register = () => {
    factory.register('area', (domId, option) => {
        return new Area(domId, option);
    })
}

export { register }    
