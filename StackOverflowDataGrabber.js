var App = App||{}; //sigh jslint
Ext.define('App.StackOverflowDataGrabber', {
    getData:function(callback) {
        var data = [];
        var pageNumber = 1;
        function aggregator(success,response) {
            pageNumber++;
            data = data.concat(response.items);
            if (response.has_more) {
                App.StackOverflowDataGrabber._getOnePage(pageNumber, aggregator);
            }
            else {
                callback(data);
            }
        }

        this._getOnePage(pageNumber, aggregator);

    },

    _getOnePage:function(pageNumber, callback) {
        Ext.data.JsonP.request({
            url: 'https://api.stackexchange.com/2.0/questions',
            params:{
                key:"U4DMV*8nvpm3EOpvf69Rxw((",
                tagged:"rally",
                site:"stackoverflow",
                pagesize:100,
                page:pageNumber
            },
            callback:callback
        });
    },

    singleton:true
});