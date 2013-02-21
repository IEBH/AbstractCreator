/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.ns('PrismaToAbstract');

Ext.require(['*']);

PrismaToAbstract.rules = {
    getRules:   function(prismaItemGroup){
        return this[prismaItemGroup];
    }
}

Ext.define('PrismaToAbstractPopulation', {
    populationRules:        {},
    constructor:            function(config){
        
         this.populationRules = config.populationRules;
         Bus.MessageBus.on('prismaItemAdded_PrismaGrid',   function(message){
             this.populate(message.prisma);
         },this);
 
          Bus.MessageBus.on('prismaPopulated_AbstractPane',   function(message){
                
            var rules = this.populationRules.getRules("Or");
            
            var orShouldBePopulated = rules[0](message.node,message.prisma,message.parentNode);
            
            if(orShouldBePopulated){
                Bus.MessageBus.fireEvent('orToBePopulated_Populator',message);
            }  
                        
         },this);
                 
    },
    
    populate:         function(prismaItem){
        var result = {}
        var group_id = prismaItem.get("group_id");

        Ext.each(this.populationRules.getRules(group_id),function(rule, index) {
            result = rule(prismaItem); 
            Bus.MessageBus.fireEvent('prismaToBePopulated_Populator',{
                parentNode:             result.parentNode,
                html:                   result.html,
                prisma:                 prismaItem
            });  

            Bus.MessageBus.fireEvent('prismaToAbstractRelationCreated_Populator',{
                relations: result.relations
            }); 
        });
    }
   
});



//Create the panel that displays the text of the abstract
PrismaToAbstract.Populator = Ext.create('PrismaToAbstractPopulation', {
    populationRules: PrismaToAbstract.rules
});