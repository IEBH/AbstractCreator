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


PrismaToAbstract.rules.Outcome = [
        function(prismaItem){
                    var id = Ext.id();
                    return {

                        parentNode:'titleOutcomes',
                        html:"<span id=\""+id+"\" class=\"contentPaneText dataToBeEnteredDirectly\">&nbsp;&nbsp;</span>",
                        relations:[{
                            id: id,
                            prismaReference: prismaItem.getId(),
                            parentNodeId: 'titleOutcomes'
                        }]
                    }
        },
        function(prismaItem){
                    var id = Ext.id();
                    return {

                        parentNode:'objectiveOutcome',
                        html:"<span id=\""+id+"\" class=\"contentPaneText dataToBeEnteredDirectly\">&nbsp;&nbsp;</span>",
                        relations:[{
                            id: id,
                            prismaReference: prismaItem.getId(),
                            parentNodeId: 'objectiveOutcome'
                        }]
                    }
        },
        
        function(prismaItem){
            
            var html = "";
            
            var interventions = Prisma.grid.getStore().queryBy(function(record,id){
                return (record.get('group_id') == "Intervention");
            },this);
           
            var isInterventionExistent = (interventions.getCount()>=1 && interventions.first().get("isDummy")==false);
            
            var relations = [];
            if(isInterventionExistent){
                Ext.each(interventions.items,function(record,index){
                    var interventionId   = Ext.id();
                    var outcomeId        = Ext.id();

                    relations.push({
                            id: interventionId,
                            prismaReference: record.getId(),
                            parentNodeId: 'results_effects'
                    }); 

                    relations.push({
                            id: outcomeId,
                            prismaReference: prismaItem.getId(),
                            parentNodeId: 'results_effects'
                    });

                    html = 
                        html + 
                        "<p><span id=\""+interventionId+"\" class=\"contentPaneText dataToBeEnteredDirectly\">"+
                        record.get("displayText")+"</span>"+
                        "<span class=\"givenText dataToBeEnteredDirectly\">reduced </span><span id=\""+outcomeId+"\"></span>"+
                        "<span class=\"givenText dataToBeEnteredDirectly\"> (12 studies, 13 participants, risk ratio pr 0.83 bla bla)</span></p>";

                });
            }
               
            
            return {
                parentNode:'results_effects',
                html:html,
                relations:relations                
            }
        } 
        
    ]