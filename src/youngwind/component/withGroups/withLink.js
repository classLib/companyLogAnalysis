function withLink(chart) {
  withLinkGroup(chart, chart._domId)
}

function withLinkGroup(chart, domId) {
  if (chart._linkGroup)
    return;
  chart._linkGroup = chart._mainGroup.append('g')
    .attr('id', `${domId}LinkGroup`)
    .attr('class', `link-group`)
}

export { withLink }