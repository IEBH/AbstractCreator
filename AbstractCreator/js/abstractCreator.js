//load namespace
Ext.ns('AbstractCreator');

//include entire extjs framework.
Ext.require(['*']);

Ext.onReady(function() {

    Ext.tip.QuickTipManager.init();
    
    //instantiate the viewport into which 
    //the abstract and prisma grid will be rendered.
    var viewport = new  AbstractCreator.Viewport();    

    //Load the initial html markup tempalte
    Ext.Ajax.request({
        
        //this is the php file that returns the html
        url: 'model/contentPane/contentPaneHTML.php',
        
        //if the html could successfully loaded, triger this function.
        success: function(response, opts) {
            
            //save the html markup that the ajax request 
            //returned into the html dom tree.
            Abstract.panel.html = response.responseText;
            Bus.MessageBus.fireEvent('abstractSuccessfullyLoaded'); 
            
            //Render the viewport.
            viewport.render();
        },
        failure: function(response, opts) {
            Bus.MessageBus.fireEvent('abstractNoTSuccessfullyLoaded');
        }
    });    
    
    
});
