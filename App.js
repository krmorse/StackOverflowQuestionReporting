var App = App || {}; //sigh jslint

Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',

    _bucketByDay:{

    },

    _displayData:function() {
        console.log(this.results);
        Ext.each(this.results, function(question) {
            var date = Ext.Date.format((Ext.Date.parse(question.creation_date, "U")),"c").split('T')[0];
            console.log(date);
            if (this._bucketByDay[date]) {
                this._bucketByDay[date]++;
            }
            else {
                this._bucketByDay[date] = 1;
            }
        }, this);
        var sorted = Ext.Object.getKeys(this._bucketByDay).sort();
        Ext.each(sorted,function(key){
            this.add({
                html:key+" "+this._bucketByDay[key]
            });
        },this);


    },
    launch: function() {
        var me = this;
        App.StackOverflowDataGrabber.getData(function(results) {
            me.results = results;
            me._displayData();
        });
    }
});
