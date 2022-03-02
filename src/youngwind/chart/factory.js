/**
 * 基于工厂模式和策略模式，实现图表工厂，利于图表的注册和使用。
 */
import { setState } from '../utils/setState.js'
class Factory {
  constructor() {
    this._charts = new Map();
  }

  /**
   * 注册图表接口
   */
  register(chartName, callback) {
    try {
      if (this._charts.has(chartName)) {
        throw new Error("该图表名称，已被使用，请更换图表名称！");
      }
      this._charts.set(chartName, callback)
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * 使用图表接口
   */
  init(domId, option) {
    const { name } = option;
    try {
      if (!this._charts.has(name)) {
        throw new Error("不存在该图表，请检查配置项：option.name属性是否正确！")
      }
      const chart = this._charts.get(name)(domId, option);
      console.log(chart);
      return [chart, (data) => setState.bind(chart)(data)]
    } catch (e) {
      console.error(e);
    }
  }
}

const factory = new Factory();

export { factory }

// 注册
import { register as rgArea } from './bar/index.js'
import { register as rgBar } from './area/index.js'
import { register as rgLine } from './line/index.js'
import { register as rgMultiLine } from './multiLine/index.js'
import { register as rgScatter } from './scatter/index.js'
import { register as rgPie } from './pie/index.js'
import { register as rgTreeClusterPolar } from './tree.cluster.polar/index.js'
import { register as rgWordCloudForce } from './word.cloud.force/index.js'
import { register as rgForceDirected } from './force.directed/index.js'
import { register as rgTimeline } from './timeline/index.js'

// 调用注册事件
rgArea()
rgBar()
rgLine()
rgMultiLine()
rgScatter()
rgTreeClusterPolar()
rgPie()
rgWordCloudForce()
rgForceDirected()
rgTimeline()