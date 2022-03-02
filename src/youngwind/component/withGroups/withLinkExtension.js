function withLinkExtension(chart) {
  withLinkExtensionGroup(chart, chart._domId)
}

function withLinkExtensionGroup(chart, domId) {
  if (chart._linkExtensionGroup)
    return;
  chart._linkExtensionGroup = chart._mainGroup.append('g')
    .attr('id', `${domId}LinkExtensionGroup`)
    .attr('class', `link-extension-group`)
}



export { withLinkExtension }