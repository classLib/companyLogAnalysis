function withNode(chart) {
  withNodeGroup(chart, chart._domId)
}

function withNodeGroup(chart, domId) {
  if (chart._nodeGroup)
    return;
  chart._nodeGroup = chart._mainGroup.append('g')
    .attr('id', `${domId}NodeGroup`)
    .attr('class', `node-group`)
}

export { withNode }