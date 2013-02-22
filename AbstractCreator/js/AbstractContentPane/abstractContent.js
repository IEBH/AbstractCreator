Ext.ns('Abstract');


/**
 * This data model defines the connection between a prisma item and one dom
 * node in the html abstract. 
 * The id contains the value of the id property of the dom node in the abstract.
 * The prismaReference is the id of the prisma in the prisma grid.
 * The parentNodeId is the id of the node into which the prisma node was created.
 */
Ext.define('abstractContentModel', {
    extend: 'Ext.data.Model',
    fields: [
        'id',
        'prismaReference',
        'parentNodeId'
    ]
});


/**
 * The abstract store contains records that comply with the model defined above.
 */
Ext.define('AbstractStore', {
    extend: 'Ext.data.Store',
    constructor:            function(config){
        
        this.config = config;
        this.callParent(arguments);  
        
        /*
         * If an html element is removed from the abstract,  
         * obsolete and can be removed from the abstractStore.
         */
        Bus.MessageBus.on('DomElementsRemoved_AbstractPane',   function(message){
            
            //if the html element or any of its descendants exists in the 
            //abstracts data store, remove the relations.
            
            Ext.each(message.descendants,function(descendant,index){
                if(this.find('id',descendant.id)!==-1){
                    this.removeAt(this.find('id',descendant.id));
                }
            },this);
            
            if(this.find('id',message.el.id)!==-1){
                this.removeAt(this.find('id',message.el.id));
            }
            
        },this);
        
        /*
         * When the populator has found a relations between a prisma and 
         * html nodes, then save this relation into this store.
         */
        Bus.MessageBus.on('prismaToAbstractRelationCreated_Populator', function(message){

                var PrismaToAbstractRelations = message.relations;
                Ext.each(PrismaToAbstractRelations,function(relation,index){
                    var prisma = Ext.ModelManager.create({
                            id:                         relation.id,
                            prismaReference:            relation.prismaReference,
                            parentNodeId:               relation.parentNodeId
                    }, 'abstractContentModel');  

                    //add the data record to the store     
                    this.add(prisma);  
                },this);
        },this);        
    }
});

/**
 * Create an instance of the abstract store.
 */
Abstract.Store = Ext.create('AbstractStore', {
    autoLoad: true,
    model: 'abstractContentModel',
    proxy: {
        type: 'ajax',
        url : 'model/AbstractContent/abstractContentJSON.php', //this is the path to the file that contains all the json data records
        reader: {
                type: 'json',
                root: 'content', //the name of the json attribute that contains the data records
                totalProperty: 'total'
        }
    },
    baseParams: {  }
});