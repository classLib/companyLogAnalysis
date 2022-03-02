import { factory } from '../factory.js'
import { withLayout } from '../../component/withLayout.js'
import { withTitle } from "../../component/withTitle.js"
import { withZoom } from '../../component/withZoom.js'
import { withCenterText } from '../../component/withGroups/withCenterText.js'
import { withLink } from '../../component/withGroups/withLink.js'


class WordCloudForce {
  constructor(domId, option) {
    this._domId = domId
    this._option = option
    withLayout(this)
  }

  render() {
    withTitle(this)
    withZoom(this)
    withCenterText(this)
    // withLink(this)

    this.renderData()
    this.renderScale()
    this.renderForce()
    this.renderTexts()
    // this.renderLinks()
    this.renderTick()
  }

  renderData() {
    const { nodes: { key: nodesKey }, links: { key: linksKey } } = this._option;
    this._nodes = this._data[nodesKey];
    this._links = this._data[linksKey];
  }

  renderScale() {
    const { nodes: { nodeSizeExtent, nodeOpacityExtent } } = this._option;
    this._nodeSizeScale = d3.scaleLinear()
      .domain(d3.extent(this._nodes, d => d['size']))
      .range(nodeSizeExtent)

    this._nodeOpacityScale = d3.scaleLinear()
      .domain(d3.extent(this._nodes, d => d['size']))
      .range(nodeOpacityExtent)

  }

  renderForce() {
    const { nodes: { nameKey } } = this._option
    const {
      forceSimulation: {
        forceCollide: { radius, strength: collideStrength },
        forceManyBody: { strength: manyBodystrength, theta, distanceMin }
      }
    } = this._option
    this._forceSimulation = d3.forceSimulation(this._nodes)
      .force("link", d3.forceLink(this._links).id(d => d[nameKey]))
      .force("charge", d3.forceManyBody().strength(manyBodystrength).theta(theta).distanceMin(distanceMin))
      .force("center", d3.forceCenter(this._innerWidth / 2, this._innerHeight / 2))
      .force("collide", d3.forceCollide().radius(radius).strength(collideStrength))
  }

  renderLinks() {
    const { links: { sourceKey, targetKey } } = this._option;
    this._linkGroupElements = this._linkGroup
      .selectAll('line')
      .data(this._links)
      .join('line')
      .attr('stroke', 'black')
      .attr("d", (d) => 'M ' + d[sourceKey].x + ' ' + d[sourceKey].y + ' L ' + d[targetKey].x + ' ' + d[targetKey].y)
  }

  renderTexts() {
    const { nodes: { nameKey, sizeKey, onClick } } = this._option;
    this._textGroupElements = this._textGroup
      .selectAll('text')
      .data(this._nodes)
      .join('text')
      .attr('text-anchor', 'end')
      .text(d => d[nameKey])
      .attr('fill-opacity', d => this._nodeOpacityScale(d[sizeKey]))
      .style("font-size", d => this._nodeSizeScale(d[sizeKey]))
      .call(d3.drag()
        .on("start", this.started)
        .on("drag", this.dragged)
        .on("end", this.ended)
      )
      .on('click', onClick)
  }

  renderTick() {
    // const { links: { sourceKey, targetKey } } = this._option;

    this._forceSimulation.on('tick', () => {

      this._textGroupElements.attr("transform", function (d) {
        return `translate(${d.x},${d.y})`
      });

      // this._linkGroupElements
      //   .attr("x1", (d) => d[sourceKey].x)
      //   .attr("y1", (d) => d[sourceKey].y)
      //   .attr("x2", (d) => d[targetKey].x)
      //   .attr("y2", (d) => d[targetKey].y);

    })
  }

  // 拖拽
  started = (event, d) => {
    if (!event.active) {
      this._forceSimulation.alphaTarget(0.3).restart();
    }
    event.subject.fx = d.x;
    event.subject.fy = d.y;
  }
  dragged = (event, d) => {
    event.subject.fx = event.x;
    event.subject.fy = event.y;
  }
  ended = (event, d) => {
    if (!event.active) {
      this._forceSimulation.alphaTarget(0);
    }
    event.subject.fx = null;
    event.subject.fy = null;
  }
}

const register = () => {
  factory.register('wordCloudForce', (domId, option) => {
    return new WordCloudForce(domId, option);
  })
}

export { register }