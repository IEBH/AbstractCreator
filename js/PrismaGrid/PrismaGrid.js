/**
 * Prisma stands for preferred reporting items of systematic reviews and meta analysis .
 */

//Create Prisma namespace.
Ext.ns('Prisma');
Ext.require(['*']);


//This is the template used for the row action, 
//for example the delete button in the grid for each prisma element
Ext.override(Ext.ux.grid.RowActions, {
	tplRow:
		 '<div class="ux-row-action">'
		+'<tpl for="actions">'
		+'<div class="ux-row-action-item {cls} '
		+'<tpl if="text">ux-row-action-text</tpl>" style="{hide}{style}" data-qtip="{qtip}">'
		+'<tpl if="text"><span data-qtip="{qtip}">{text}</span></tpl></div>'
		+'{record}</tpl>'
		+'</div>'    
});


/**
 * Example data that can be used with the model and store below. As the data 
 * sample shows, there are 2 data records in the array under "prismas". 
 * Both records have the attributes displayText, groupDisplayText, id, group_id, 
 * isDummy.
*{
	"success":true,
	"total":3,
	"prismas":[
		{
		"displayText":"In order to add one or more patients or diseases, click the green +. ",
		"groupDisplayText":"1. Patients \/ Disease",
		"id":1,
		"group_id":"Disease",
		"isDummy":true
		},
		{
		"displayText":"In order to add one or more interventions, click the green +.",
		"groupDisplayText":"2. Interventions",
		"id":2,
		"group_id":"Intervention",
		"isDummy":true}
	]
}
*/

/*
 *The data model defines how the prisma data records look, 
 *which are loaded into the prisma grid.
 * 
 *The displayText is what is visible in the abstractCreator.
 *The groupDisplayText is the category by which abstract elements are grouped,
 *e.g. all outcomes or all diseases will be grouped.
 *The id identifies each prismaItem uniquely.
 *More here: http://docs.sencha.com/ext-js/4-0/#!/api/Ext.data.Model
*/
Ext.define('prismaModel', {
    extend: 'Ext.data.Model',
    //these are the data attributes of 
    //a prisma record (grid row) used in the grid
    fields: [
            //the text shown in the grid for each record
        'displayText', 
        
            //the grouping text shown on top of a group: 
            //2. Interventions, the grid is actually grouped by this field, not by group_id.
        'groupDisplayText', 
        
            //identifies a prisma record uniquely
        'id',
        
            //the group to which a record belongs, for example interventions.
        'group_id', 
        
            //initial records are dummy records,
            //they are used to enable the grouping.
        'isDummy'  
       
    ]
});

/*
 *The store uses the data model above to load data from an external source like
 *a json file, xml file or php file that prints json text. The store then allows
 *operations like search, sort or add and remove of prisma records.
 * See more: http://docs.sencha.com/ext-js/4-0/#!/api/Ext.data.Store
 * 
 * This store contains the prisma elements (in the currently left vertical prisma list).
 * It uses the data model previously defined in order to know how data records
 * look like (see below-> model: 'prismaModel'). 
 * 
 * Data is grouped by "groupDisplayText".
 * The remote destination from which the data is loaded is
 * specified under in the config element->   
 *      url : 'model/Prisma/getPrismaJSON.php', in the proxy. 
 *      It uses a json reader, because the data records are provided in json.   
 */ 
Prisma.Store = Ext.create('Ext.data.Store', {
    autoLoad: true,
    model: 'prismaModel',
    groupField: 'groupDisplayText',
    proxy: {
        type: 'ajax',
        url : 'model/Prisma/getPrismaJSON.php', //this is the path to the file that contains all the json data records
        reader: {
                type: 'json',
                root: 'prismas', //the name of the json attribute that 
                                //contains the data records
                totalProperty: 'total'  //the attribute that indicates 
                                        //the total number of prisma records.
        }
    },
    baseParams: {  }
});

Prisma.prismaGridGroupingFeature = Ext.create('Ext.grid.feature.Grouping',{
    groupHeaderTpl: '{name} ({rows.length})',
    startCollapsed: false
});

/**
 *This specifies that a cell can be edited by clicking once into the field.
 *http://docs.sencha.com/ext-js/4-0/#!/api/Ext.grid.plugin.CellEditing
 */
Prisma.prismaEditingPlugin  = Ext.create('Ext.grid.plugin.CellEditing', {
    clicksToEdit: 1,
    listeners: {
            //before a row with a prisma record is edited, 
            //check if it is a dummy. Dummies are not editable. 
            beforeedit: function(e,t,o){

                //dummy records are not editable
                if (t.record.get("isDummy") == true) {
                    return false;
                }
                
                //before a prisma is edited, fire the event.
                Bus.MessageBus.fireEvent('prismaAboutToBeEdited_PrismaGrid',{prisma: t.record});
                return true;
            },
            edit:       function(e,t,o){},
            afteredit:  function(e,t,o){
                Bus.MessageBus.fireEvent('afterPrismaEdited_PrismaGrid',{prisma: t.record});
            }
    }
});

/*
 * The grid panel which then views the data loaded above.
 */
Prisma.grid = Ext.create('Ext.grid.Panel', {
    preventHeader:          true,
    hideHeaders:            true,
    features:               [Prisma.prismaGridGroupingFeature],
    plugins:                [Prisma.prismaEditingPlugin],
    store:                  Prisma.Store,   //this line includes the data store above, 
                                            //which contains the prisma data records.
    height:                 400,
    width:                  600,
    viewConfig:             {stripeRows: false, trackOver:true},
    
    //The columns array defines which columns of the model/data store 
    //will be displayed in the prisma grid. 
    //The only column that is actually visible, is the display text column.
    columns: [  
        {
            text:                   'displayText',
            flex:                   1,
            preventHeader:          true,
            dataIndex:              'displayText',
            menuDisabled:           true,
            hidden:                 false,
            editor: {
                xtype: 'textfield',
                allowBlank: false,
                
                //add event listeners to this column
                listeners: {
                    //if someone types anything into a row of this column, 
                    //this function will fire an event with the MessageBus.
                    keyup:    {
                        element: 'el',
                        fn: function(event,target){ 
                            
                            //Find out which row is actually 
                            //just edited in this column
                            var PrismaThatIsJustEdited = Ext.getCmp(this.id).ownerCt.editingPlugin.context.record;
                            
                            //Get the input value that the author 
                            //just has written into this row.
                            var valueInInputField = target.value;

                            //Fire the message bus event, 
                            //so that other components can react to it.
                            Bus.MessageBus.fireEvent(
                                'prismaTextChanged_PrismaGrid',
                                {
                                    "PrismaThatIsJustEdited":   PrismaThatIsJustEdited,
                                    "valueInInputField":        valueInInputField
                                }
                            );

                        }
                    }
                }
            }             
        },

        //the group id is important when data is added for a group, since the
        //group id has to be added into a new record. This data record is used 
        //in coding, but is hidden to the user.
        {
            text: 'group_id',
            flex: 1,
            dataIndex: 'group_id',
            hidden: true
        }
        //the group display text is shown on top of a row, e.g.
        //"2. Interventions". To the end user, this row is hidden.
        ,{
            text: 'groupDisplayText',
            flex: 1,
            dataIndex: 'groupDisplayText',
            hidden: true
        },
        Prisma.gridActions
    ]
});