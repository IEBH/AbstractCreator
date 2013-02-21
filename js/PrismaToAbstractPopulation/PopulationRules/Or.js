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


PrismaToAbstract.rules.Or = [
    function(node,prisma,parentNode){
       
        var id = Ext.id();
        var shouldBePopulated  = true;
        
        if(parentNode=="results_effects"){
            
            shouldBePopulated = false;
        }else{
            
            var prismaSiblings = Prisma.grid.getStore().queryBy(function(record,id){
                return (record.get('group_id') == prisma.get('group_id'));
            },this); 
            
            //if there are more prismas of the same group, publish an or
             if(prismaSiblings.getCount()>1){
                shouldBePopulated =  true;
            }else{
                shouldBePopulated = false;
            }
            
        }
        
        return shouldBePopulated;
    }
]