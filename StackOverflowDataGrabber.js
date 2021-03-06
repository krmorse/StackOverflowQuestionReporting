Ext.define('App.StackOverflowDataGrabber', {
    getData:function(callback) {
        var data = [];
        var pageNumber = 1;
        function gatherer(success,response) {
            pageNumber++;
            data = data.concat(response.items);
            if (response.has_more) {
                App.StackOverflowDataGrabber._getOnePage(pageNumber, gatherer);
            }
            else {
                callback(data);
            }
        }

        this._getOnePage(pageNumber, gatherer);

    },

    _getOnePage:function(pageNumber, callback) {
        Ext.data.JsonP.request({
            url: 'https://api.stackexchange.com/2.0/questions',
            params:{
                key:"U4DMV*8nvpm3EOpvf69Rxw((",
                tagged:"rally",
                site:"stackoverflow",
                pagesize:100,
                page:pageNumber,
                fromDate:Ext.Date.format(new Date('2011-07-01'),'U')
            },
            callback:callback
        });
    },

    singleton:true
});