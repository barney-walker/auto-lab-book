//Physical Object Definitions

newContainer({

    Name: 'Tube',
    ID: undefined,
    Desc: undefined,
    Vol: undefined,
    Conc: undefined,
    DateCreated: undefined,
    Location: undefined
    
})

newContainer({

    Name: 'AgarPlate',
    ID: undefined,
    Desc: undefined,
    DateCreated: undefined,
    Location: undefined

})

//Shortcut functions
    
function newTube(){

    var obj = Object.create(Container);  

    if(mode=='script'){Inventory.push(obj)}else{obj.render();}
    
    return(obj)
}

function newReagent(){

    var obj = Object.create(Container);

    obj.Type = 'Reagent';
    obj.Vol = Infinity;

    if(mode=='script'){Inventory.push(obj)}else{obj.render();}
    
    return(obj)

}

function newPrimer(){

    var obj = Object.create(Tube);

    obj.Type ='Primer';
    obj.Conc = '10um';

    if(mode=='script'){Inventory.push(obj)}else{obj.render();}
    
    return(obj)

}

function newAgarPlate(){}


/*

    //Constructor for Plates

    function Plate(id,contents){

        this.Type = 'Plate'
        this.ID = id;
        this.Contents = contents;
        this.DateCreated = Date();

        makeSetters(this)

    }

    //Constructor for Glyercol Stock

    function GlyercolStock(id,contents){

        this.Type = 'GlyercolStock'
        this.ID = id;
        this.Contents = contents;
        this.DateCreated = Date();

        makeSetters(this)

    }

*/