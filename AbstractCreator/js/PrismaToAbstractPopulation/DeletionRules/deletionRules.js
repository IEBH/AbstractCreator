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


PrismaToAbstract.deletionRules.rules = [
        function(prismaItem){
                    
                    //this array will contain all dom nodes that have to be removed
                    var nodesToBeRemoved = [];
                    var htmlNode;
                    
                    //get all relations connected to the prisma that has to be removed
                    var prismaRelationRecords = Abstract.Store.queryBy(function(record,id){
                        return (record.get('prismaReference') == prismaItem.getId());
                    },this);
                    
                    prismaRelationRecords.each(function(record,index,length){

                        //if the dom node is in results and effects, 
                        //remove the parent item instead of the dom node itself
                        if(record.get('parentNodeId')=="results_effects"){
                             nodesToBeRemoved.push(Ext.get(record.get('id')).up(""));
                        }else{
                            //remove the dom node itself
                            htmlNode        = Ext.get(record.get('id'));
                            if(htmlNode && htmlNode.prev() && htmlNode.prev().hasCls("connector")){
                                    nodesToBeRemoved.push(htmlNode.prev());
                            }                            
                            nodesToBeRemoved.push(htmlNode);
                            htmlNode        = undefined;
                        }
                        
                        //The connector in front of a prisma should be removed, 
                        //for example "and", "or"


                    },this);
                    
                    return nodesToBeRemoved;
        }       
];