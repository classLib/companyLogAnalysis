function withCenterPath(chart) {
  withCenterPathGroup(chart, chart._domId)
}

function withCenterPathGroup(chart, domId) {
  if (chart._pathGroup)
    return;
  chart._pathGroup = chart._mainGroup.append('g')
    .attr('id', `${domId}PathGroup`)
    .attr('class', `path-group`)
}

export { withCenterPath }