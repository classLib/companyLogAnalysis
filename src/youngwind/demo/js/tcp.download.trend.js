import { factory } from '../../chart/factory.js'

const option = {
    name: 'area',
    area: {
        curve: d3.curveLinear,
    },
    title: {
        text: 'TCP下载趋势',
        subText: '员工号：1067',
        info: "该员工的TCP流量下载趋势，如图所示。<br/>（流量使用越多，通常意味着在大量下载文件，存在数据被盗取的可能。）"
    },
    layout: {
        type: 'descartes',
        margin: {
            top: 60,
            right: 25,
            bottom: 50,
            left: 50
        }
    },
    xAxis: {
        key: 'key',
        type: {
            name: 'time',
        }
    },
    yAxis: {
        key: 'download',
        type: {
            name: 'value',
            extent: false
        },
    }
}

const [area, setArea] = factory.init('tcpDonwloadTrend', option);



d3.csv('./data/tcp/tcp_1067.csv').then(data => {
    setArea(getStdData(data));
})

function getStdData(data) {
    let groupedData = d3.group(data, d => d['dtime']);
    let result = [];
    groupedData.forEach((val, key) => {
        let download = d3.sum(val, d => d['downlink_length'])
        let upload = d3.sum(val, d => d['uplink_length'])
        result.push({
            key,
            download,
            upload
        })
    })
    return result;
}

function renderTcpTrend(id) {
    d3.csv(`./data/tcp/tcp_${id}.csv`).then(data => {
        option.title.subText = `员工号：${id}`
        setArea(getStdData(data));
    })
}

export { renderTcpTrend }