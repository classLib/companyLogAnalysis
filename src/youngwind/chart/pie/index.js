import { factory } from '../factory.js'
import { withLayout } from '../../component/withLayout.js'
import { withTitle } from '../../component/withTitle.js'
import { withTooltip } from '../../component/withTooltip.js'

import { withCenterPath } from '../../component/withGroups/withCenterPath.js'
import { withCenterText } from '../../component/withGroups/withCenterText.js'

import { primaryColorGreen as primaryColor } from '../../utils/colorTheme.js'

class Pie {
  constructor(domId, option) {
    this._domId = domId
    this._option = option
    withLayout(this)
  }

  render() {
    withTitle(this)
    withCenterPath(this)
    withCenterText(this)
    withTooltip(this)

    this.renderData()
    this.renderColor()
    this.renderPath()
    this.renderLabel()
  }
 
  renderData() {
    const { pie: { valueKey } } = this._option
    this._arcs = d3.pie()
      .value(d => d[valueKey])(this._data)
  }

  renderPath() {
    const { pie: { categoryKey, valueKey, innerRadius } } = this._option
    this._pathGroupElement = this._pathGroup
      .selectAll("path")
      .data(this._arcs)
      .join("path")

    this._pathGroupElement
      .transition()
      .attr("fill", d => this._colorScale(d.data[categoryKey]))
      .attr("d", (d) => d3.arc()
        .innerRadius(innerRadius)
        .outerRadius(this._radius)(d)
      );

    this._pathGroupElement
      .selectAll("title")
      .data(d => [d])
      .join('title')
      .text(d => `${d.data[categoryKey]}: ${d.data[valueKey].toLocaleString()}`);
  }

  renderColor() {
    const { pie: { categoryKey } } = this._option

    this._colorScale = d3.scaleOrdinal()
      .domain(this._data.map(d => d[categoryKey]))
      .range(primaryColor)
  }

  renderLabel() {
    const { pie: { categoryKey, valueKey } } = this._option;
    const { pie: { legend: { legendWidth, legendHeight, anchor, size, offsetX, offsetY } } } = this._option

    this._textGroup.selectAll("rect")
      .data(this._data)
      .join('rect')
      .attr("x", 0 + offsetX)
      .attr("y", 0 + offsetY)
      .attr("width", legendWidth)
      .attr("height", legendHeight)
      .attr("transform", (d, i) => `translate(0,${(i - 1) * 20})`)
      .attr("fill", d => this._colorScale(d[categoryKey]));

    this._textGroup.selectAll("text")
      .data(this._data)
      .join('text')
      .attr("text-anchor", anchor)
      .attr('font-size', size)
      .attr("x", legendWidth + 20 + offsetX)
      .attr("y", 0 + offsetY)
      .attr("dy", "1em")
      .attr("transform", (d, i) => `translate(0,${(i - 1) * 20})`)
      .text(d => `${d[categoryKey]} : ${d[valueKey]}`);
  }
}

const register = () => {
  factory.register('pie', (domId, option) => {
    return new Pie(domId, option)
  })
}

export { register }