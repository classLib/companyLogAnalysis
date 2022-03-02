import { factory } from '../factory.js'
import { withLayout } from '../../component/withLayout.js'
import { withTooltip } from '../../component/withTooltip.js'
import { withTitle } from '../../component/withTitle.js'
import { withZoom } from '../../component/withZoom.js'
import { withMainTopAxis } from '../../component/withGroups/withMainTopAxis.js'
import { withRect } from '../../component/withGroups/withRect.js'
import { primaryColor } from '../../utils/colorTheme.js'
import { withText } from '../../component/withGroups/withText.js'

class Timeline {
  constructor(domId, option) {
    this._domId = domId
    this._option = option
    withLayout(this)
  }

  render() {
    withTooltip(this)
    withTitle(this)
    withZoom(this)

    withMainTopAxis(this)
    withRect(this)
    withText(this)

    this.renderData()
    this.renderScale()
    this.renderAxis()
    this.renderRect()
    this.renderText()
  }

  renderData() {
    const {
      timeline: {
        startTimeKey,
        endTimeKey,
        orderKey
      }
    } = this._option
    this._data.forEach(d => {
      d[startTimeKey] = new Date(d[startTimeKey])
      d[endTimeKey] = new Date(d[endTimeKey])
    })

    this._data.sort((a, b) => a[orderKey] - b[orderKey])
    this._rectHeight = this._innerHeight / this._data.length;
  }

  renderScale() {
    const {
      timeline: {
        startTimeKey,
        endTimeKey,
        groupKey
      }
    } = this._option

    let timeExtent = [d3.min(this._data, d => d[startTimeKey]), d3.max(this._data, d => d[endTimeKey])];
    let wholeTime = (timeExtent[1] - timeExtent[0]) / this._innerWidth;
    this._topAxisScale = d3.scaleTime()
      .domain(timeExtent)
      .nice()
      .range([0, this._innerWidth])

    this._topAxisScaleBindWidth = (duration) => duration / wholeTime

    this._groupScale = d3.scaleOrdinal()
      .domain(d3.map(this._data, d => d[groupKey]))
      .range(primaryColor)
  }

  renderAxis() {
    this._topAxis.transition()
      .call(
        d3.axisTop(this._topAxisScale)
      )
  }

  renderRect() {
    const {
      timeline: {
        startTimeKey,
        endTimeKey,
        groupKey
      }
    } = this._option

    this._rectGroup.selectAll('rect')
      .data(this._data)
      .join('rect')
      .transition()
      .attr('width', d => this._topAxisScaleBindWidth(d[endTimeKey] - d[startTimeKey]))
      .attr('height', this._rectHeight * 0.8)
      .attr('y', (d, i) => (i + 1) * this._rectHeight)
      .attr('x', d => this._topAxisScale(d[startTimeKey]))
      .attr('fill', d => this._groupScale(d[groupKey]))
  }

  renderText() {
    const {
      timeline: {
        startTimeKey,
        endTimeKey,
        messageKey,
        groupKey
      }
    } = this._option
    this._textGroup.selectAll('text')
      .data(this._data)
      .join('text')
      .text(d => d[messageKey])
      .transition()
      .attr('y', (d, i) => (i + 1) * this._rectHeight)
      .attr('x', d => {
        let xs = this._topAxisScale(d[startTimeKey])
        let xe = this._topAxisScale(d[endTimeKey])
        return xe < this._innerWidth / 1.5 ? xe + 10 : xs;
      })
      .attr('dy', '1.05em')
      .attr('dx', (d, i) => {
        let xe = this._topAxisScale(d[endTimeKey])
        return xe < this._innerWidth / 1.5 ? 0 : -10;
      })
      .attr('text-anchor', d => {
        let xe = this._topAxisScale(d[endTimeKey])
        return xe < this._innerWidth / 1.5 ? "start" : "end";
      })
      .attr('fill', d => this._groupScale(d[groupKey]))
      .style('font-size', `${this._rectHeight / 2}px`)
  }
}

const register = () => {
  factory.register('timeline', (domId, option) => {
    return new Timeline(domId, option);
  })
}

export { register }    