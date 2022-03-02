function withText(chart) {
  withTextGroup(chart, chart._domId)
}

function withTextGroup(chart, domId) {
  if (chart._textGroup)
    return;
  chart._textGroup = chart._mainGroup.append('g')
    .attr('id', `${domId}TextGroup`)
    .attr('class', `text-group`)
}

export { withText }