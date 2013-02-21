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


PrismaToAbstract.rules.Disease = [  
        function(prismaItem){
                    var id = Ext.id();
                    return {

                        parentNode:'objectiveDisease',
                        html:"<span id=\""+id+"\" class=\"contentPaneText dataToBeEnteredDirectly\">&nbsp;&nbsp;</span>",
                        relations:[{
                            id: id,
                            prismaReference: prismaItem.getId(),
                            parentNodeId: 'objectiveDisease'
                        }]
                    }
        },
        function(prismaItem){
                    var id = Ext.id();
                    return {

                        parentNode:'eligibilityDisease',
                        html:"<span id=\""+id+"\" class=\"contentPaneText dataToBeEnteredDirectly\">&nbsp;&nbsp;</span>",
                        relations:[{
                            id: id,
                            prismaReference: prismaItem.getId(),
                            parentNodeId: 'eligibilityDisease'
                        }]
                    }
        }        
    ];
