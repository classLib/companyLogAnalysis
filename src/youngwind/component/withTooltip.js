function withTooltip(chart) {
  withTooltipDiv(chart)
  addShow(chart)
  addHide(chart)
}

function withTooltipDiv(chart) {
  if (chart._tooltip)
    return;

  const { title: { info } } = chart._option
  chart._tooltip = d3.select(`#${chart._domId}`).append('div')
    .attr('id', `${chart._domId}Tooltip`)
    .attr('class', 'chart-tooltip')
    .classed('active', false)
    .html(info)
}

function addShow(chart) {
  chart.showTooltip = () => {
    chart._tooltip.classed('active', true)
  }
}

function addHide(chart) {
  chart.hideTooltip = () => {
    chart._tooltip.classed('active', false)
  }
}

export { withTooltip }