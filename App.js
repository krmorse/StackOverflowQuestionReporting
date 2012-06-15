Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',

    launch: function() {
        StackOverflowDataGrabber.getData(function(results){
            console.log(results);
        });
    }
});
