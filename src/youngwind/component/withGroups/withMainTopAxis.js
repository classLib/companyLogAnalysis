function withMainTopAxis(chart) {
  withMainTopAxisGroup(chart, chart._domId)
}

function withMainTopAxisGroup(chart, domId) {
  if (chart._topAxis)
    return;
  chart._topAxis = chart._mainGroup.append('g')
    .attr('id', `${domId}TopAxisGroup`)
    .attr('class', `top-axis-group`)
}

export { withMainTopAxis }
