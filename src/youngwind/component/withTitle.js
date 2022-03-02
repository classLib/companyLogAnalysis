import { withTooltip } from './withTooltip.js'

function withTitle(chart) {
  withTooltip(chart)

  withTitleGroup(chart, chart._domId)
  const { title: { text, subText } } = chart._option;
  addTitle(chart, text)
  addSubTitle(chart, subText)
}

function addTitle(chart, data) {
  chart._title = chart._titleGroup
    .selectAll(".title")
    .data([data])
    .join("text")
    .attr('class', 'title')
    .text(d => d)
    .attr('dy', '1em')
    .style('cursor', 'pointer')
    .on('mouseover', () => {
      chart.showTooltip();
    }).on('mouseout', () => {
      chart.hideTooltip();
    })
}

function addSubTitle(chart, data) {
  chart._subTitle = chart._titleGroup
    .selectAll(".subTitle")
    .data([data])
    .join("text")
    .attr('class', 'subTitle')
    .text(d => d)
    .attr('dy', '3em')
}

function withTitleGroup(chart, domId) {
  if (chart._titleGroup)
    return;
  chart._titleGroup = chart._svg.append('g')
    .attr('id', `${domId}TitleGroup`)
    .attr('class', `title-group`)
    .attr('transform', `translate(0,0)`)
}

export { withTitle }