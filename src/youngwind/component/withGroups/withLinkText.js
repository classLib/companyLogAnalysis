function withLinkText(chart) {
  withLinkTextGroup(chart, chart._domId)
}

function withLinkTextGroup(chart, domId) {
  if (chart._linkTextGroup)
    return;
  chart._linkTextGroup = chart._mainGroup.append('g')
    .attr('id', `${domId}LinkTextGroup`)
    .attr('class', `link-text-group`)
}

export { withLinkText }