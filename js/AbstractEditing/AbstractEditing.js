Ext.ns('AbstractEditing');
Ext.require(['*']);

//This window is used to edit the abstract if the author clicks directly 
//into the abstract.
Ext.define('AbstractEditor.Window', {
    extend: 'Ext.window.Window',
    elementToBeEdited:  undefined,
    constructor: function(config) {
        
        this.initConfig(config);
        var parentScope = this;
        this.items = [
            //This object is the textarea that is displayed inside the window
            {
                xtype:      'textarea',
                id:         'msgBoxInputTextArea',
                fieldLabel: '',
                hideLabel:  true,
                name:       'msg',
                style:      'margin:0',
                flex: 1,    // Take up all *remaining* vertical space
                //this is the listener that is triggered when someone types text
                //into the textarea of the window
                listeners: {
                    keyup:    {
                        element:    'el',
                        fn:         function(event,target){
                            //overwrite the text in the abstract with the text 
                            //that was entered into the textarea of the window.
                            parentScope.elementToBeEdited.dom.innerHTML  = target.value;
                        }
                    }
                }
            }
        ]       
         
        
        //if the user wants to enter data directly into the abstract
        Bus.MessageBus.on('dataEnteredDirectly_AbstractPane',function(message){
            //if a user clicks on an item that should be edited by this window
            //then remember this element in this window
            this.elementToBeEdited = message.elementToBeEdited;
            //and save the html of the element (on which the user clicked) 
            //into the textbox of the window
            this.items.items[0].setValue(message.elementToBeEdited.dom.innerHTML);
            //then show the window
            this.show();
            this.alignTo(message.elementToBeEdited, "bl?");

        },this)
 
         Bus.MessageBus.on('clickInto_AbstractPane',function(message){
             //if the user clicks somewhere in the abstract, and it is not an html
             //element that should be edited by this window, then close this window
             if(!(message.target.hasCls('dataToBeEnteredDirectly'))){
                if(this.isVisible()){
                    this.close();
                    
                }                 
             }
        },this)
        
        this.listeners = config.listeners;
        this.callParent(arguments);
        return this;
    }
});

AbstractEditing.Window = Ext.create('AbstractEditor.Window', {
    width:                  300,
    height:                 100,
    minWidth:               300,
    minHeight:              100,
    layout:                 'fit',
    closeAction:            'hide',
    closable:               false  //the window is still cloasable manually, 
                                    //but the close button on the right 
                                    //upper corner of the window is hidden.
});

AbstractEditing.Window.on("hide",function(){
    Bus.MessageBus.fireEvent('WindowHidden_AbstractEditor',{elementEdited: this.elementToBeEdited});
});