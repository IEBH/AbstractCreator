Ext.ns('PrismaToAbstract');
Ext.require(['*']);

PrismaToAbstract.deletionRules = {
    getRules:   function(){
        return this.rules;
    }
}

Ext.define('PrismaToAbstractDeletion', {
    deletionRules:        {},
    constructor:            function(config){  
         this.deletionRules = config.deletionRules;  
         Bus.MessageBus.on('prismaItemRemoved_PrismaGrid',   function(message){
               this.remove(message.prisma);        
         },this);
    },
    remove:             function(prismaItem){
        var result = {};
        Ext.each(this.deletionRules.getRules(),function(rule, index) {
            var elementsToBeRemoved = rule(prismaItem);
            Bus.MessageBus.fireEvent('ElementsToBeRemoved_Deleter',{"elementsToBeRemoved":elementsToBeRemoved}); 
        },this);       
    }   
});

PrismaToAbstract.Deletion = Ext.create('PrismaToAbstractDeletion', {
    deletionRules: PrismaToAbstract.deletionRules
});