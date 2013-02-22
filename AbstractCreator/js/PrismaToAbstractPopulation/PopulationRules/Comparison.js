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


PrismaToAbstract.rules.Comparison=[
        function(prismaItem){
                    var id = Ext.id();
                    return {
                        parentNode:'titleComparisons',
                        html:"<span id=\""+id+"\" class=\"contentPaneText dataToBeEnteredDirectly\">&nbsp;&nbsp;</span>",
                        relations:[{
                            id: id,
                            prismaReference: prismaItem.getId(),
                            parentNodeId: 'titleComparisons'
                        }]
                    }
        },
        function(prismaItem){
                    var id = Ext.id();
                    return {

                        parentNode:'objectiveComparison',
                        html:"<span id=\""+id+"\" class=\"contentPaneText dataToBeEnteredDirectly\">&nbsp;&nbsp;</span>",
                        relations:[{
                            id: id,
                            prismaReference: prismaItem.getId(),
                            parentNodeId: 'objectiveComparison'
                        }]
                    }
        },        
        function(prismaItem){
                    var id = Ext.id();
                    return {

                        parentNode:'eligibilityComparison',
                        html:"<span id=\""+id+"\" class=\"contentPaneText dataToBeEnteredDirectly\">&nbsp;&nbsp;</span>",
                        relations:[{
                            id: id,
                            prismaReference: prismaItem.getId(),
                            parentNodeId: 'eligibilityComparison'
                        }]
                    }
        }        
    ];