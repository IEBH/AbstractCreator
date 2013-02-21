/**
 * A documentation is available under 
 * http://crebp.myjetbrains.com/youtrack/issue/IT_SUP-12
 * 
 * Prisma stands for preferred reporting items of systematic reviews and meta analysis .
 * 
 * This file extends the prismaGrid
 * This file includes prismaRowActions such as delete.
 * This file includes prismaGroupActions such as adding a new item to a specific group.
 */


Ext.ns('Prisma');

Ext.require(['*']);

Prisma.rowActions = [
{ 
    iconCls: 'icon-delete', 
    qtip: 'Delete', 
    callback: function(grid, prisma, action, idx, col, e, target) { 
        
        var prismaStore = Prisma.grid.getStore();
        
        //If the row action delete is triggered for a prisma, 
        //get the collection of prisma items which are in the same group
        //as the item that is going to be deleted
        
        var group = prismaStore.getGroups(prisma.get('groupDisplayText'));

        //if there is only one row in this group,
        //add an empty dummy record into this group before deleting the prisma.
        //This is done because a group can not exist without a 
        //data row.
        
        if(group.children.length==1){
            var dummyRecord = Ext.ModelManager.create({
                    displayText:        'In order to add '+prisma.get('group_id')+'s, click the green +',
                    groupDisplayText:   prisma.get('groupDisplayText'),
                    id:                 Ext.id(),
                    group_id:           prisma.get('group_id'),
                    isDummy:            true
                }, 'prismaModel');      
            //add the abstract item to the data store of the grid
            prismaStore.add(dummyRecord);                                
        }

        //now delete the actual prisma
        prismaStore.remove(prisma);
        Prisma.grid.getView().refresh();
        
        //fire an event on the message bus, that a prisma item was added
        Bus.MessageBus.fireEvent('prismaItemRemoved_PrismaGrid',{
            "prisma":               prisma
        });        
        
    } 
}//,{thisCouldBeAnotherRowActionAsAbove}   
]


//This array contains actions that are triggered per group
Prisma.groupActions = [
    { 
        //This iconClas has to be the same one as in the 
        //html of the button used in the grid.
        //This is the html of the add button in the grid
        //<div data-qtip="Action on Group" style="" 
        //class="ux-grow-action-item ux-action-right icon-grid qtip-target">
        //</div>
        iconCls: 'icon-grid', 
        qtip: 'Action on Group', 

        callback: function(grid, records, action, groupValue) { 
                     
            //get the data store of the Prisma grid
            var store = Prisma.grid.getStore();

            //Get the collection of prisma items into which the new item will be added
            var prismaItems = store.getGroups(groupValue);
            
            if(
                prismaItems.children !== undefined &&
                prismaItems.children instanceof Array &&
                prismaItems.children.length > 0 &&
                prismaItems.children[0].get('groupDisplayText') !== undefined &&
                prismaItems.children[0].get('group_id') !== undefined
            ){
                    
                //create a new prisma item record
                var prisma = Ext.ModelManager.create({
                        displayText:        '',
                        groupDisplayText:   prismaItems.children[0].get('groupDisplayText'),
                        group_id:           prismaItems.children[0].get('group_id'),
                        isDummy:            false,
                        id:                 Ext.id()
                }, 'prismaModel');       

                //if the there is a dummy element within this prisma group, delete it.
                if( prismaItems.children.length==1 && prismaItems.children[0].get('isDummy')==true ){
                    store.remove(prismaItems.children[0]);
                }
                    
                //add the prisma item to the grid
                store.add(prisma);
                
                //refresh the view of the grid, so that it shows the new prisma
                Prisma.grid.getView().refresh();
                
                //expand the group in which the prisma item was just added
                grid.features[0].expand(groupValue,true);

                //fire an event on the message bus, that a prisma item was added
                Bus.MessageBus.fireEvent('prismaItemAdded_PrismaGrid',{
                    "prisma":               prisma
                });

                //automatically start the edit function for the prisma that was
                //just added, so that a new displayText can be entered
                Prisma.prismaEditingPlugin.startEditByPosition({
                        row: store.indexOf(prisma),
                        column: 0
                });    
                
                
            }else{
                throw "prisma_not_added";
            }
            
                  
                    
            
        } 
    }    
]

//register the group and row actions with the prisma grid.
Prisma.gridActions = {
    xtype:          'rowactions',
    keepSelection:  true,
    actions:        Prisma.rowActions,
    groupActions:   Prisma.groupActions
}