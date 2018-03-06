
var LabBook = []; //Array of protocols performed

var Inventory = []; //Array of containers with their properties and locations.

var ProtocolLibrary = []; //Library of Protocol

//Prototype Container

const Container = {  //Containers may be eppendorf tubes, plates etc. 
    
    //Define default methods and properties of containers here
    
}

//Prototype Protocol

const Protocol = { 

        input: function(){
            merge(this.Input,arguments[0])
            return(this)
        },
        output: function(){
            merge(this.Output,arguments[0])
            return(this)
        },
        parameters: function(){
            merge(this.Parameters,arguments[0])
            return(this)
        },
        data: function(){
            merge(this.Data,arguments[0])
            return(this)
        },
        run: function(){
    
            LabBook.push(this); //add to global LabBook
            
            this.DateLogged = Date(); //add time-stamp
    
            this.parent = parent; //Set parent of this entry
    
            parent = this; //Set the parent to be this method
            
            this.action();

            this.submethods(); //Run actions i.e submethods.
    
            parent = this.parent; //Reset to previous parent
    
        },
        
        render: function(){

            printProtocol(this)

        },

        initiate: function(){

            var entry = newEntry(this.Name); //Create a fresh instance of the protocol
            
            merge(entry,arguments[0]) //Take properties specified in the argument object and merge with the fresh entry. 

            //if(this.parent!=window){this.parent[this.Name]=entry} //Save as part of parent protocol if there is one.

            entry.render()

            return(entry);

        },

        action: function(){

            //Take Volume from Input Containers
            
            for(i in this.Input){

                if(this.Input[i].ID && this.Input[i].Vol){//If ID and volume specified take volume from the tube of that ID

                    id(this.Input[i].ID).Vol -= this.Input[i].Vol

                }
                        
            }
    
            //Make Output Containers
            if(this.parent==window){

                for(i in this.Output){

                    newContainer({
                        ID:this.Output[i].ID,
                        Desc: this.Output[i].Desc,
                        Type: this.Output[i].Type
                    })
    
                }


            }
                
        } ,

        test: function(){}, //runs in sandbox;
        note: function(){} //adds a note to the method
    }


//Creating Protocols and Containers

function newProtocol(definition){
    
    var obj = Object.create(Protocol); //Initialise default protocol

    for (var prop in definition) { obj[prop] = definition[prop];} //Add properties given in definition

    if(ProtocolLibrary.map(function(p){return(p.Name)}).includes(obj.Name)){alert('Existing Protocol with that name!')}//Check for existing name
    
    ProtocolLibrary.push(obj); //add to protocol library
    
    window[definition.Name.toLowerCase()] = function(){ //add initiator function to global scope

        return(obj.initiate.apply(obj,arguments));

    }  

    return(obj)

}

//

function newContainer(definition){

    var obj = Object.create(Container); //Initialise default container

    for (var prop in definition) { obj[prop] = definition[prop];} //Add properties in definition

    obj.DateCreated = Date();
    
    return(obj)

}

// Creating entries

function newEntry(ProtocolName){

    var Protocol = ProtocolLibrary.filter(function(p){return(p.Name==ProtocolName)})[0];

    if(!Protocol){alert('No protocol called'+ProtocolName+' found')} //Throw error if no protocol found.

    var entry = Object.create(Protocol) // Create specific instance of protocol specified

    entry.Input = clone(Protocol.Input); 
    entry.Output = clone(Protocol.Output); 
    entry.Parameters = clone(Protocol.Parameters);
    entry.Data = clone(Protocol.Data)

    return(entry)

}

//Other useful functions

function clone(original) {
    var copy, val, prop;
    copy = Array.isArray(original) ? [] : {};
    for (prop in original) {
      val = original[prop];
      copy[prop] = (typeof v === "object") ? clone(val) : val;
    }
    return copy;
}

function merge(obj,toAdd){

    for(var prop in toAdd){

        let v = toAdd[prop];

        obj[prop] = (typeof v != "object" || typeof obj[prop]==='undefined') ? v : merge(obj[prop],v);

    }

    return(obj)

}


function id(id){ //Returns object in inventory with given label, throws error if not
    
        var results = Inventory.filter(function(a){return(a.ID==id)})
    
        if(results.length>1){alert('Multiple objects with id ' + id + ' found')}
    
        if(results.length==0){alert('No object with id ' + id + ' found')}
    
        return(results[0])
}