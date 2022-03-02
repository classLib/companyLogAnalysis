function withZoom(chart) {
  chart._svg
    .call(d3.zoom()
      .on('zoom', (event) => {
        chart._zoomGroup.attr('transform', `translate(${event.transform.x},${event.transform.y}) scale(${event.transform.k})`)
      })
    )
}

export { withZoom }