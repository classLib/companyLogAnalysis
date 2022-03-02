import { factory } from '../../chart/factory.js'
import { renderCheck } from '../js/check.js'
import { renderTcpDownload } from './tcp.download.js'
import { renderTcpUpload } from './tcp.upload.js'
import { renderTcpTrend as renderTcpDownTrend } from './tcp.download.trend.js'
import { renderTcpTrend as renderTcpUpTrend } from './tcp.upload.trend.js'

import { renderWordCloud as renderWordCloudEmailSend } from '../js/wordCloud.email.send.js'
import { render as renderWordCloudEmailReceive } from '../js/wordCloud.email.receive.js'
import { renderWordCloud as renderWordWeblog } from '../js/wordCloud.weblog.js'

import {renderByUser} from './loginDirected.js'

const option = {
  name: 'polarClusterTree',
  tree: {
    nameKey: 'name',
    childrenKey: 'branchset',
    valueKey: 'value',
    colorKeys: ['609', '603', '602', '599', '577'],
    isShowBranchLength: false,
    cluster: {
      angle: 360,
    },
    text: {
      size: '5',
      family: '微软雅黑'
    },
    onTextClick: (event, d) => {
      renderCheck(d.data.name)
      renderWordCloudEmailSend(d.data.name)
      renderWordCloudEmailReceive(d.data.name)
      renderWordWeblog(d.data.name)
      renderTcpDownload(d.data.name)
      renderTcpUpload(d.data.name)
      renderTcpDownTrend(d.data.name)
      renderTcpUpTrend(d.data.name)
      renderByUser(d.data.name)
    }
  },
  title: {
    text: '公司员工层次结构',
    subText: '树形结构',
    info: `基于邮件日志，获取公司所有员工的邮件发送日志，<br/><br/>
    提取邮件的关键词，基于关键词的逆文档词频和余弦距离，<br/><br/>
    计算各个邮件之间的相似度，通过余弦距离的层次聚类算法，<br/><br/> 将各个员工的相似性。 聚类结果如图所示。 `
  },
  layout: {
    type: 'polar',
    margin: {
      top: 50,
      right: 0,
      bottom: 50,
      left: 0
    },
    zoom: true
  }
}

const [tree, setTree] = factory.init('polarTree', option);

d3.json('./data/polarTree.json').then(data => {
  setTree(data, option)
})