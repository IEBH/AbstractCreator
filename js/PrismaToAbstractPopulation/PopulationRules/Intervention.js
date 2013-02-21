/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.ns('PrismaToAbstract');

Ext.require(['*']);


/**
 * The following object sets the permissions that indicate which prisma items
 * of certain groups are allowed to be populated in certain areas 
 * of an abstract!
 */


PrismaToAbstract.rules.Intervention = [
        function(prismaItem){
            var id = Ext.id();
            return {
                
                parentNode:'titleInterventions',
                html:"<span id=\""+id+"\" class=\"contentPaneText dataToBeEnteredDirectly\">&nbsp;&nbsp;</span>",
                relations:[{
                    id: id,
                    prismaReference: prismaItem.getId(),
                    parentNodeId: 'titleInterventions'
                }]
            }
        },
        function(prismaItem){
            var id = Ext.id();
            return {
                parentNode:'objectiveIntervention',
                html:"<span id=\""+id+"\" class=\"contentPaneText dataToBeEnteredDirectly\">&nbsp;&nbsp;</span>",
                relations:[{
                    id: id,
                    prismaReference: prismaItem.getId(),
                    parentNodeId: 'objectiveIntervention'
                }]                
            }
        },
        function(prismaItem){
            var id = Ext.id();
            return {
                parentNode:'eligibilityIntervention',
                html:"<span id=\""+id+"\" class=\"contentPaneText dataToBeEnteredDirectly\">&nbsp;&nbsp;</span>",
                relations:[{
                    id: id,
                    prismaReference: prismaItem.getId(),
                    parentNodeId: 'eligibilityIntervention'
                }]                
            }
        },
        function(prismaItem){
            
            var html        = "";
            var relations   = [];
            
            //get all outcomes
            var outcomes = Prisma.grid.getStore().queryBy(function(record,id){
                return (record.get('group_id') == "Outcome");
            },this);
             
            var isOutcomeExistent = (outcomes.getCount()>=1 && outcomes.first().get("isDummy")==false);
            
            Ext.each(outcomes.items,function(record,index){
                
               //only if an outcome is existent, we can add a relation
               if(isOutcomeExistent){
                
                //create new intervention id
                var interventionId   = Ext.id();
                //create new outcome id
                var outcomeId        = Ext.id();

                //register the intervention relation
                relations.push({
                        id: interventionId,
                        prismaReference: prismaItem.getId(),
                        parentNodeId: 'results_effects'
                }); 
                
                //register the outcome relation
                relations.push({
                        id: outcomeId,
                        prismaReference: record.getId(),
                        parentNodeId: 'results_effects'
                });
                
                //if the outcome is only a dummy, do not display the text but a placeholder                 
                var name = record.get("displayText");
                if(record.get("isDummy")=="true"){
                    name = "##Intervention##";
                }

                //concatenate the html text that will be published in the abstract
                html = 
                    html + 
                    "<p><span id=\""+interventionId+"\" class=\"contentPaneText dataToBeEnteredDirectly\">"+
                    "&nbsp;&nbsp;</span>"+
                    "<span class=\"givenText dataToBeEnteredDirectly\">reduced </span><span id=\""+outcomeId+"\">"+name+"</span>"+
                    "<span class=\"givenText dataToBeEnteredDirectly\"> (12 studies, 13 participants, risk ratio pr 0.83 bla bla)</span></p>";   
               
               }
            });
            
               
            
            return {
                parentNode:'results_effects',
                html:html,
                relations:relations                
            }
        }        
    ];