import { factory } from '../factory.js'
import { withLayout } from '../../component/withLayout.js'
import { withTitle } from "../../component/withTitle.js"
import { withZoom } from '../../component/withZoom.js'

import { withLink } from "../../component/withGroups/withLink.js"
import { withLinkText } from "../../component/withGroups/withLinkText.js"
import { withLinkExtension } from "../../component/withGroups/withLinkExtension.js"

import { primaryColor } from '../../utils/colorTheme.js'

class PolarClusterTree {
  constructor(domId, option) {
    this._domId = domId
    this._option = option
    withLayout(this)
  }

  render() {
    withLink(this)
    withTitle(this)
    withLinkExtension(this)
    withLinkText(this)
    withZoom(this)

    this.renderCluster()
    this.renderColor()
    this.renderLink()
    this.renderLinkExtension()
    this.renderText()
    this.renderBranch()
  }

  // 更新数据
  renderCluster() {
    const { tree: { childrenKey, valueKey } } = this._option;
    const { tree: { cluster: { angle, radius } } } = this._option;

    this._root = d3.hierarchy(this._data, d => d[childrenKey])
      .sum(d => d[childrenKey] ? 0 : 1)
      .sort((a, b) => (a[valueKey] - b[valueKey]) || d3.ascending(a.data.length, b.data.length));

    d3.cluster()
      .size([angle, this._radius])
      .separation((a, b) => 1)(this._root)

    setRadius(this._root, this._root.data.length = 0, this._radius / maxLength(this._root));

    function maxLength(d) {
      return d.data.length + (d.children ? d3.max(d.children, maxLength) : 0);
    }

    function setRadius(d, y0, k) {
      d.radius = (y0 += d.data.length) * k;
      if (d.children) d.children.forEach(d => setRadius(d, y0, k));
    }
  }

  // 更新聚类颜色比例尺
  renderColor() {
    const { tree: { nameKey, colorKeys } } = this._option;
    this._color = d3.scaleOrdinal()
      .domain(colorKeys)
      .range(primaryColor)
    const setColor = (d) => {
      let name = d.data[nameKey];
      d.color = this._color.domain()
        .indexOf(name) >= 0
        ? this._color(name)
        : d.parent
          ? d.parent.color
          : null;
      if (d.children) d.children.forEach(setColor);
    }
    setColor(this._root);
  }

  // 更新文字
  renderText() {
    const { tree: { text: { size, family } } } = this._option;
    const { tree: { nameKey } } = this._option;
    const { tree: { onTextClick } } = this._option;
    this._linkTextGroupElements = this._linkTextGroup
      .selectAll("text")
      .data(this._root.leaves())
      .join("text")
      .attr("dy", ".31em")
      .attr("transform", d => `rotate(${d.x - 90}) translate(${this._radius + 4},0)${d.x < 180 ? "" : " rotate(180)"}`)
      .attr("text-anchor", d => d.x < 180 ? "start" : "end")
      .text(d => d.data[nameKey].replace(/_/g, " "))
      .attr("font-family", family)
      .attr("font-size", size)
      .on("mouseover", mouseovered(true))
      .on("mouseout", mouseovered(false))
      .on('click', onTextClick)

    function mouseovered(active) {
      return function (event, d) {
        d3.select(this).classed("label--active", active);
        d3.select(d.linkExtensionNode)
          .classed("link-extension--active", active)
          .raise();
        do d3.select(d.linkNode)
          .classed("link--active", active)
          .raise();
        while (d = d.parent);
      }
    }
  }

  // 更新普通线
  renderLink() {
    this._linkGroupElements = this._linkGroup
      .selectAll("path")
      .data(this._root.links())
      .join("path")
      .each(function (d) { d.target.linkNode = this; })
      .attr("d", d => this.linkConstant(d))
      .attr("stroke", d => d.target.color);
  }

  // 更新拓展线
  renderLinkExtension() {
    this._linkExtensionGroupElements = this._linkExtensionGroup
      .selectAll("path")
      .data(this._root.links().filter(d => !d.target.children))//过滤undefined
      .join("path")
      .each(function (d) { d.target.linkExtensionNode = this; })
      .attr("d", d => this.linkExtensionConstant(d));
  }

  linkConstant(d) {
    return this.linkStep(d.source.x, d.source.y, d.target.x, d.target.y);
  }

  linkExtensionConstant(d) {
    return this.linkStep(d.target.x, d.target.y, d.target.x, this._radius);
  }

  linkStep(startAngle, startRadius, endAngle, endRadius) {
    const c0 = Math.cos(startAngle = (startAngle - 90) / 180 * Math.PI);
    const s0 = Math.sin(startAngle);
    const c1 = Math.cos(endAngle = (endAngle - 90) / 180 * Math.PI);
    const s1 = Math.sin(endAngle);
    return "M" + startRadius * c0 + "," + startRadius * s0
      + (endAngle === startAngle ? "" : "A" + startRadius + "," + startRadius + " 0 0 " + (endAngle > startAngle ? 1 : 0) + " " + startRadius * c1 + "," + startRadius * s1)
      + "L" + endRadius * c1 + "," + endRadius * s1;
  }

  // 拓展线变化
  renderBranch() {
    const { tree: { isShowBranchLength } } = this._option;
    const t = d3.transition().duration(750);
    this._linkExtensionGroupElements
      .transition(t)
      .attr("d", isShowBranchLength ? this.linkExtensionVariable.bind(this) : this.linkExtensionConstant.bind(this));
    this._linkGroupElements
      .transition(t)
      .attr("d", isShowBranchLength ? this.linkVariable.bind(this) : this.linkConstant.bind(this));
  }

  linkVariable(d) {
    return this.linkStep(d.source.x, d.source.radius, d.target.x, d.target.radius);
  }

  linkExtensionVariable(d) {
    return this.linkStep(d.target.x, d.target.radius, d.target.x, this._radius);
  }
}

const register = () => {
  factory.register('polarClusterTree', (domId, option) => {
    return new PolarClusterTree(domId, option);
  })
}

export { register }    