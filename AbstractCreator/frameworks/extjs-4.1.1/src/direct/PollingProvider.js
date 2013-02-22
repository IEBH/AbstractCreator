/**
 * @class Ext.direct.PollingProvider
 *
 * <p>Provides for repetitive polling of the server at distinct {@link #interval intervals}.
 * The initial request for data originates from the client, and then is responded to by the
 * server.</p>
 * 
 * <p>All configurations for the PollingProvider should be generated by the server-side
 * API portion of the Ext.Direct stack.</p>
 *
 * <p>An instance of PollingProvider may be created directly via the new keyword or by simply
 * specifying <tt>type = 'polling'</tt>.  For example:</p>
 * <pre><code>
var pollA = new Ext.direct.PollingProvider({
    type:'polling',
    url: 'php/pollA.php',
});
Ext.direct.Manager.addProvider(pollA);
pollA.disconnect();

Ext.direct.Manager.addProvider(
    {
        type:'polling',
        url: 'php/pollB.php',
        id: 'pollB-provider'
    }
);
var pollB = Ext.direct.Manager.getProvider('pollB-provider');
 * </code></pre>
 */
Ext.define('Ext.direct.PollingProvider', {
    
    /* Begin Definitions */
    
    extend: 'Ext.direct.JsonProvider',
    
    alias: 'direct.pollingprovider',
    
    uses: ['Ext.direct.ExceptionEvent'],
    
    requires: ['Ext.Ajax', 'Ext.util.DelayedTask'],
    
    /* End Definitions */
    
    /**
     * @cfg {Number} interval
     * How often to poll the server-side in milliseconds. Defaults to every 3 seconds.
     */
    interval: 3000,

    /**
     * @cfg {Object} baseParams
     * An object containing properties which are to be sent as parameters on every polling request
     */
    
    /**
     * @cfg {String/Function} url
     * The url which the PollingProvider should contact with each request. This can also be
     * an imported Ext.Direct method which will accept the baseParams as its only argument.
     */

    // private
    constructor : function(config){
        this.callParent(arguments);
        this.addEvents(
            /**
             * @event beforepoll
             * Fired immediately before a poll takes place, an event handler can return false
             * in order to cancel the poll.
             * @param {Ext.direct.PollingProvider} this
             */
            'beforepoll',            
            /**
             * @event poll
             * This event has not yet been implemented.
             * @param {Ext.direct.PollingProvider} this
             */
            'poll'
        );
    },

    // inherited
    isConnected: function(){
        return !!this.pollTask;
    },

    /**
     * Connect to the server-side and begin the polling process. To handle each
     * response subscribe to the data event.
     */
    connect: function(){
        var me = this, url = me.url;
        
        if (url && !me.pollTask) {
            me.pollTask = Ext.TaskManager.start({
                run: function(){
                    if (me.fireEvent('beforepoll', me) !== false) {
                        if (Ext.isFunction(url)) {
                            url(me.baseParams);
                        } else {
                            Ext.Ajax.request({
                                url: url,
                                callback: me.onData,
                                scope: me,
                                params: me.baseParams
                            });
                        }
                    }
                },
                interval: me.interval,
                scope: me
            });
            me.fireEvent('connect', me);
        } else if (!url) {
            //<debug>
            Ext.Error.raise('Error initializing PollingProvider, no url configured.');
            //</debug>
        }
    },

    /**
     * Disconnect from the server-side and stop the polling process. The disconnect
     * event will be fired on a successful disconnect.
     */
    disconnect: function(){
        var me = this;
        
        if (me.pollTask) {
            Ext.TaskManager.stop(me.pollTask);
            delete me.pollTask;
            me.fireEvent('disconnect', me);
        }
    },

    // private
    onData: function(opt, success, response){
        var me = this, 
            i = 0, 
            len,
            events;
        
        if (success) {
            events = me.createEvents(response);
            for (len = events.length; i < len; ++i) {
                me.fireEvent('data', me, events[i]);
            }
        } else {
            me.fireEvent('data', me, new Ext.direct.ExceptionEvent({
                data: null,
                code: Ext.direct.Manager.exceptions.TRANSPORT,
                message: 'Unable to connect to the server.',
                xhr: response
            }));
        }
    }
});