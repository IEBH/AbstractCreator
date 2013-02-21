//Create a namespace named bus.
Ext.ns('Bus');

//Load extjs framework components.
Ext.require(['*']);

Ext.define('MessageBus', {
    
    //Extend the observable class
    //http://docs.sencha.com/ext-js/4-0/#!/api/Ext.util.Observable
    extend: 'Ext.util.Observable',
    constructor: function(config){
        
        //register events to this bus.
        this.addEvents({
            "prismaTextChanged" :   true,
            "prismaItemAdded"   :   true
        });

        // Copy configured listeners into *this* object so 
        // that the base class's constructor will add them.
        this.listeners = config.listeners;

        // Call our superclass constructor to complete
        // construction process.
        this.callParent(arguments);
    }
});

//Instantiate the Message Bus
Bus.MessageBus = new MessageBus(
    //provide a configruation object into the constructor. 
    //This contains a listener object, 
    //which the constructor above will add to the base object.
    {
        listeners: {

            abstractSuccessfullyLoaded: function(message) {
                //in these functions you could react to 
                //events inside the message bus.
                //However, the message bus should not have any business logic,
                //it should simply receive and fire events.
                //Other objects should listen to the bus and 
                //then invoke business logic themselves.
            },
            abstractNoTSuccessfullyLoaded: function(message) {

            },
            prismaTextChanged: function(message) {
                //I use this simply for debugging
                //console.log("keystroke",message.valueInInputField);
            },
            prismaItemAdded:    function(message){
                //I use this simply for debugging
                //console.log(message);
            }
        }
    }
);