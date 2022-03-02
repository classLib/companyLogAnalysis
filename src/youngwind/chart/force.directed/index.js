import { factory } from '../factory.js'
import { withLayout } from '../../component/withLayout.js'
import { withTitle } from "../../component/withTitle.js"
import { withZoom } from '../../component/withZoom.js'
import { withCenterText } from '../../component/withGroups/withCenterText.js'
import { withLink } from '../../component/withGroups/withLink.js'
import { withNode } from '../../component/withGroups/withNode.js'


class ForceDirected {
  constructor(domId, option) {
    this._domId = domId
    this._option = option
    withLayout(this)
  }

  render() {
    withTitle(this)
    withZoom(this)
    withLink(this)
    withNode(this)
    withCenterText(this)

    this.renderData()
    this.renderScale()
    this.renderForce()
    this.renderNodes()
    this.renderTexts()
    this.renderLinks()
    this.renderTick()
  }

  renderData() {
    const { nodes: { key: nodesKey }, links: { key: linksKey } } = this._option;
    this._nodes = this._data[nodesKey];
    this._links = this._data[linksKey];
  }

  renderScale() {
    const {
      nodes: {
        nodeSizeExtent, nodeOpacityExtent, sizeKey
      },
      links: {
        lineWidthExtent, valueKey
      }
    } = this._option;
    this._nodeSizeScale = d3.scaleLinear()
      .domain(d3.extent(this._nodes, d => d[sizeKey]))
      .range(nodeSizeExtent)

    this._nodeOpacityScale = d3.scaleLinear()
      .domain(d3.extent(this._nodes, d => d[sizeKey]))
      .range(nodeOpacityExtent)

    this._linkWidthScale = d3.scaleLinear()
      .domain(d3.extent(this._links, d => d[valueKey]))
      .range(lineWidthExtent)
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

  renderNodes() {
    const { nodes: { sizeKey, onClick } } = this._option;
    this._nodeGroupElements = this._nodeGroup
      .selectAll('circle')
      .data(this._nodes)
      .join('circle')
      .attr('fill-opacity', d => this._nodeOpacityScale(d[sizeKey]))
      .attr('r', d => this._nodeSizeScale(d[sizeKey]))
      .on('click', (event, d) => onClick(event, d, this._data))
      .call(d3.drag()
        .on("start", this.started)
        .on("drag", this.dragged)
        .on("end", this.ended)
      )

  }

  renderLinks() {
    const { links: { sourceKey, targetKey, valueKey } } = this._option;
    this._linkGroupElements = this._linkGroup
      .selectAll('line')
      .data(this._links)
      .join('line')
      .attr("d", (d) => 'M ' + d[sourceKey].x + ' ' + d[sourceKey].y + ' L ' + d[targetKey].x + ' ' + d[targetKey].y)
      .attr('stroke-width', d => this._linkWidthScale(d[valueKey]))
  }

  renderTexts() {
    const { nodes: { nameKey, sizeKey, onClick } } = this._option;
    this._textGroupElements = this._textGroup
      .selectAll('text')
      .data(this._nodes)
      .join('text')
      // .attr('text-anchor', 'end')
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
    const { links: { sourceKey, targetKey } } = this._option;

    this._forceSimulation.on('tick', () => {

      this._textGroupElements.attr("transform", function (d) {
        return `translate(${d.x + 30},${d.y})`
      });

      this._nodeGroupElements.attr("transform", function (d) {
        return `translate(${d.x},${d.y})`
      });


      this._linkGroupElements
        .attr("x1", (d) => d[sourceKey].x)
        .attr("y1", (d) => d[sourceKey].y)
        .attr("x2", (d) => d[targetKey].x)
        .attr("y2", (d) => d[targetKey].y);

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
  factory.register('forceDirected', (domId, option) => {
    return new ForceDirected(domId, option);
  })
}

export { register }