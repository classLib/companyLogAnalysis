/**
 * scatter 默认配置项
 */

const option = {
  name: 'polarClusterTree',
  tree: {
    nameKey: 'name',
    childrenKey: 'branchset',
    valueKey: 'value',
    colorKeys: ['Bacteria', 'Eukaryota', 'Archaea'],
    isShowBranchLength: true,
    cluster: {
      angle: 360,
    },
    text: {
      size: '12px',
      family: '微软雅黑'
    },
    onTextClick: (event, d) => {
      console.log(event, d)
    }
  },
  title: {
    text: '生命之树',
    subText: '环状层次聚类',
  },
  layout: {
    type: 'polar',
    margin: {
      top: 0,
      right: 200,
      bottom: 0,
      left: 200
    },
    zoom: true
  }
}

export { option }