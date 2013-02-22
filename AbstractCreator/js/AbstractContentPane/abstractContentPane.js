Ext.ns('Abstract');
Ext.require(['*']);


// Define the object of the abstract-content-panel, 
// which displays the abstract as an html text
// http://docs.sencha.com/ext-js/4-0/#!/api/Ext.panel.Panel
Ext.define('AbstractPanel', {
    extend:         'Ext.panel.Panel',
    store:          undefined,
    constructor: function(config){
        this.callParent(arguments);
    },
    getPrismasById:     function(id){
        
        //retrieve all prismas from the store of this panel 
        //which match the given prisma id
        var prismas = this.store.queryBy(function(record,contentId){
                return (record.get('prismaReference') == id);
        },this);

        return prismas;        
    }
     
});

//Create the panel that displays the text of the abstract
Abstract.panel = Ext.create('AbstractPanel', {
        width:          200,
        id:		'abstractContent',
        html:           "", //this will contain the html text that is displayed
        store:          Abstract.Store //assign the data store that holds the
                                       //relations between prisma items and html elements
                                       //in this abstract html dom tree
});

//When the Abstract is rendered, listen if any prisma item is added to
//the abstract, if yes, then add it to the content pane.
Abstract.panel.on("render",function(){
   
   Bus.MessageBus.on('orToBePopulated_Populator', function(message){
        
        //Here, insert an html dom element in front of the given html element
        //The html element that is inserted will contain an "or" text node.
        //http://docs.sencha.com/ext-js/4-0/#!/api/Ext.DomHelper
        var connectorHtmlElement = Ext.DomHelper.insertBefore(
            Ext.get(message.node),
            {tag:'span',html:' or ', id:Ext.get(),class:'connector dataToBeEnteredDirectly'}
        );            
        
   });
   
   //This is triggered if there is a prisma to be populated in the abstract.
   Bus.MessageBus.on('prismaToBePopulated_Populator', function(message){
       
       //Get the id of the parent node into which the new html element is added.
        var parentElementId = message.parentNode;
        
        //check if the parent node actually exists in the dom tree
        if(!Ext.get(parentElementId)){
            throw "ParentElementNotFound";
            return;
        }

        //Add the html string as an html child element into the parent html element.
        var htmlElement            = Ext.get(parentElementId).createChild(message.html);
        
        //if there is a placeholder in front of the prisma item that was just added,
        //then remove it from the abstract.
        if(htmlElement.prev() && htmlElement.prev().hasCls("PlaceHolder")){
                htmlElement.prev().remove();
        }
        
        //Fire event that the prisma has been populated in the abstract
        Bus.MessageBus.fireEvent('prismaPopulated_AbstractPane',{
                node:                   htmlElement,
                prisma:                 message.prisma,
                parentNode:             parentElementId
        }); 
         
   });


  
   //if the text of a prisma item in the prisma grid is changed, also change
   //the text in all prisma content items in the abstract
   Bus.MessageBus.on('prismaTextChanged_PrismaGrid', function(message){
 
       var prismaReference = message.PrismaThatIsJustEdited.getId();  
       
       //get all the content elements that are in the abstract for this prisma item
       var prismasInAbstract = Abstract.panel.getPrismasById(prismaReference);
        
        
        Ext.each(prismasInAbstract.items, function(prisma, index) {
            Ext.get('abstractContent').un("DOMNodeRemoved",function(){});
            //replace the text of the dom element with the text in the input field
            //that was typed into the prisma grid
            Ext.get(prisma.getId()).dom.innerHTML = message.valueInInputField;
           
        }); 
        
   }, 
   this);
  
    //This highlights all html dom elements that are connected to a prisma, 
    //just before the prisma is about to be edited.
   Bus.MessageBus.on('prismaAboutToBeEdited_PrismaGrid', function(message){
 
       var prismaReference = message.prisma.getId();  
       if(prismaReference==undefined){
           throw 'prismaNotFound';
       }
       //get all the content elements that are in the abstract for this prisma item
       var prismasInAbstract = Abstract.panel.getPrismasById(prismaReference);

        Ext.each(prismasInAbstract.items, function(prisma, index) {
            Ext.get(prisma.getId()).setStyle('background', '#8FD8D8');;
        }); 
        
   }, 
   this); 
   
    //if the text of a prisma is edited, reset the background color of each
    //prisma in the abstract back to white
   Bus.MessageBus.on('afterPrismaEdited_PrismaGrid', function(message){
 
       var prismaReference = message.prisma.getId();  
       if(prismaReference==undefined){
           throw 'prismaNotFound';
       }
       //get all the content elements that are in the abstract for this prisma item
       var prismasInAbstract = Abstract.panel.getPrismasById(prismaReference);

        Ext.each(prismasInAbstract.items, function(prisma, index) {  
            Ext.get(prisma.getId()).setStyle('background', '#ffffff');
        }); 
        
   }, 
   this);    
   
   
   //This function is triggered if the author clicks somewhere into the abstract
   //html dom tree.
   Ext.get('abstractContent').on('click', function(e, t){

        t = Ext.get(t);
        //if the element that was clicked at has 
        //a class named dataToBeEnteredDirectly
        if(t.hasCls('dataToBeEnteredDirectly')){
                t.setStyle('background', '#FF0000');
                t.setStyle('color', '#FFFFFF');
                
                //then fire the event that data is about to be 
                //directly entered into the dom html text
                Bus.MessageBus.fireEvent('dataEnteredDirectly_AbstractPane',{elementToBeEdited: t});
        }
    }); 
 
   //This function is triggered if the author clicks somewhere into the abstract
   //html dom tree.
    Ext.get('abstractContent').on('click', function(e, t){
        
        //if the item that the user clicked on was not an html that allows
        //data to be entered, 
        t = Ext.get(t);
        Bus.MessageBus.fireEvent('clickInto_AbstractPane',{target: t});
    }); 
    
     
     /**
      * If the editor window is closed, then reset the style of the item that was
      * edited!
      */
    Bus.MessageBus.on('WindowHidden_AbstractEditor', function(message){
       message.elementEdited.setStyle('background',     '#FFFFFF');
       message.elementEdited.setStyle('color',          '#000000');
       message.elementEdited.setStyle('border-bottom',  '1px solid green');
   }, 
   this);     
   
   
   
   //if the the deletion rules indicate that a dom element has to be removed from the 
   //content pane, then this function will remove it.
   Bus.MessageBus.on('ElementsToBeRemoved_Deleter', function(message){
       
       //go through all html elements that should be removed
       Ext.each(message.elementsToBeRemoved,function(el,index,length){
           
           //get all html elements that are within the html that is removed (descendants)
           var descendants  = el.select("*").elements;
           var el           = el;
           el.remove(); //remove the html element from the panel
           
           //fire an event that contains html elements that were removed.
           //this includes the element itself and also the descendants that
           //were removed with it.
           
           Bus.MessageBus.fireEvent('DomElementsRemoved_AbstractPane',{
                el:                     el,
                descendants:            descendants
           }); 
           
       }); 
       
   }, 
   this);      
   
})

