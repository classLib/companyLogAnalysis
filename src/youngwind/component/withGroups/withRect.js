function withRect(chart) {
  withRectGroup(chart, chart._domId)
}

function withRectGroup(chart, domId) {
  if (chart._rectGroup)
    return;
  chart._rectGroup = chart._mainGroup.append('g')
    .attr('id', `${domId}RectGroup`)
    .attr('class', `rect-group`)
}

export { withRect }