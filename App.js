var App = App || {}; //sigh jslint

Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',

    _bucketByDay:{

    },
    _bucketByMonth:{

    },

    _displayData:function() {
        console.log(this.results);
        Ext.each(this.results, function(question) {
            var date = Ext.Date.format((Ext.Date.parse(question.creation_date, "U")), "c").split('T')[0];
            if (this._bucketByDay[date]) {
                this._bucketByDay[date]++;
            }
            else {
                this._bucketByDay[date] = 1;
            }

            var monthString = date.substring(0, 7);
            if (this._bucketByMonth[monthString]) {
                this._bucketByMonth[monthString]++;
            }
            else {
                this._bucketByMonth[monthString] = 1;
            }


        }, this);
        this.createChart();
    },

    createChart:function() {
        //[Date.UTC(1970, 9, 27), 0   ],
        var data = [];
        debugger;
        var sorted = Ext.Object.getKeys(this._bucketByDay).sort();
        Ext.each(sorted, function(key) {
            var date = Ext.Date.parse(key, "c");
//            debugger;
            data.push(date, this._bucketByDay[key])
        }, this);

        new Highcharts.Chart({
            chart: {
                renderTo: this.getEl().id,
                type: 'spline'
            },
            title: {
                text: 'I gotz some dataz now'
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                type: 'datetime',
                dateTimeLabelFormats: {
                    month: '%e. %b',
                    year: '%b'
                }
            },
            yAxis: {
                title: {
                    text: 'Snow depth (m)'
                },
                min: 0
            },
            tooltip: {
                formatter: function() {
                    return '<b>' + this.series.name + '</b><br/>' +
                        Highcharts.dateFormat('%e. %b', this.x) + ': ' + this.y + ' m';
                }
            },

            series: [
                {
                    name: 'Awesome Question Dataz',
                    data: data
                }
            ]
        });
    },

    launch: function() {
        var me = this;
        App.StackOverflowDataGrabber.getData(function(results) {
            me.results = results;
            me._displayData();
        });
    }
})
    ;
