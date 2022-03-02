import { factory } from '../../chart/factory.js'

const option = {
  name: 'pie',
  pie: {
    categoryKey: 'name',
    valueKey: 'value',
    innerRadius: 100,
    legend: {
      anchor: 'start',
      size: 15,
      legendWidth: 50,
      legendHeight: 19,
      offsetX: -65,
      offsetY: -15
    }
  },
  title: {
    text: '公司人员分布情况',
    subText: '组织结构',
    info: "通过邮件文本相似度，<br />通过余弦距离进行层次聚类，<br />得到HighTech 公司 <br/>共分三个部门：<br/><br/>研发约有：256人，<br />财务约有：32人，<br />人事约有：17人。"
  },
  layout: {
    type: 'polar',
    margin: {
      top: 10,
      right: 0,
      bottom: 10,
      left: 0
    }
  }
}

const [pie, setPie] = factory.init('personnelDistribution', option);

d3.csv('./data/personnelDistribution.csv').then(data => {
  setPie(data)
})
