/*
 *Examples for viewport and regions: http://dev.sencha.com/deploy/ext-4.0.0/examples/layout/border.html
 */

/*Load the abstract creator namespace*/
Ext.ns('AbstractCreator');

/*Load the extjs framework*/
Ext.require(['*']);
    
AbstractCreator.Viewport        = function Viewport(){

    this.render = function(){
        var viewport = Ext.create('Ext.Viewport', {
            layout: {
                //use a border layout
                type: 'border',
                
                //the space between border and content
                padding: 5
            },
            defaults: {
                split: true
            },

            //the areas within the viewport
            items: [{
                //the prisma grid (currently on the left)
                region:             'west',
                layout:             'fit',
                collapsible:        true,
                split:              true,
                width:              '30%',
                minWidth:           100,
                minHeight:          140,
                items: [  
                    Prisma.grid //include the prisma grid
                ]
            },{
                //the abstract content pane, currently on the right
                region:             'center',
                title:              'Your Abstract',
                minHeight:          80,
                layout:             'fit',
                items: [     
                    Abstract.panel //include the abstract panel
                ]
            }]
        });   
    }
}
