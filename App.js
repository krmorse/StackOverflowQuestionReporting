var App = App || {}; //sigh jslint

Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',

    _bucketByDay:{

    },
    _bucketByMonth:{

    },

    _displayData:function() {
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
        var sorted = Ext.Object.getKeys(this._bucketByMonth).sort();
        Ext.each(sorted, function(key) {
            data.push(this._bucketByMonth[key])
        }, this);

        new Highcharts.Chart({
                chart: {
                    renderTo: this.getEl().id,
                    type: 'spline'
                },
                title: {
                    text: 'StackOverflow Questions Overtime'
                },
                subtitle: {
                    text: ''
                },
                xAxis: {
                    type: 'datetime',
                    labels:{
                        formatter:function() {
                            var date = Ext.Date.parse(sorted[this.value], "c");
                            return Ext.Date.format(date, "F");
                        }
                    }
                },
                yAxis: {
                    title: {
                        text: 'Question Count'
                    },
                    min: 0
                },
                tooltip: {
                    formatter: function() {

                        var date = Ext.Date.parse(sorted[this.x], "c");
                        var x = Ext.Date.format(date, "F");
                        return '<b>' + this.y + ' questions asked during </b><br/>' + x;
                    }
                },

                series: [
                    {
                        name: 'Months',
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
