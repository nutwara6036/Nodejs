$(function() {

    var socket = io();
    $('form').submit(function(e) {
        e.preventDefault(); // prevents page reloading
        socket.emit('chat message', $('#m').val());
        $('#m').val('');
        return false;
    });

    socket.on('chat message', function(msg) {
        $('#messages').append($('</pre><ul><li>').text(msg));
        var json = $.parseJSON(msg);
        var timestamp = (new Date(json.timeCreated)).getTime();
        var seriesModule1 = chartLine.series[0];
        var x = timestamp + 07; // UTC time
        var y = json.machine.temperature; // get json
        seriesModule1.addPoint([x, y], true, true);
    })

    var chartLine = Highcharts.chart('charts-1', {
        chart: {
            type: 'spline',
            animation: Highcharts.svg, // don't animate in old IE
            marginRight: 10,
            events: {}
        },
        title: {
            text: 'Temperature emulation (utc)'
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 200
        },
        yAxis: {
            title: {
                text: 'Combined scale'
            },
            plotLines: [{
                    value: 0.5,
                    width: 1,
                    color: '#808080'
                },
                {
                    value: 0,
                    width: 1,
                    color: '#808080'
                }
            ]
        },
        tooltip: {
            formatter: function() {
                return '<b>' + this.series.name + '</b>' +
                    Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '' +
                    Highcharts.numberFormat(this.y, 2);
            }
        },
        legend: {
            enabled: true
        },
        exporting: {
            enabled: false
        },
        series: [{
            name: 'Temperature',
            data: (function() {
                // generate an array of random data
                var data = [],
                    time = (new Date()).getTime(),
                    i;
                for (i = -12; i <= 0; i += 1) {
                    data.push({
                        x: time + i * 300000,
                        y: 30
                    });
                }
                return data;
            }())
        }]
    });
});