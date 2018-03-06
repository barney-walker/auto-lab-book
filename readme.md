# Auto-LabBook

In science it is incredibly important to keep detailed records of exactly what was done in the lab, both for the sake of reproducibility and for figuring out why something didn't work.

However, there is a fundamental trade-off between the amount of detail you record, the time you spend writing in your lab book and the clarity of the record. You can use short-hand notation to write a lot of information fast but then it is almost unintelligible to anyone else trying to work out what it means (often including yourself). 

The aim of this project is to overcome this trade-off and allow me to keep a complete and detailed record of what I've done in the lab without having to spend hours writing in a labbook. It will do this by rendering short-hand scripts (comprised of protocol functions called with specific parameters) as nicely formatted HTML using pre-defined templates. 

Since it's inception the scope of the project has expanded in several natural directions:

* Storage of protocol parameters (and where possible results) in a structured format such that it will be possible in the future to do perform queries in order to generate insight (i.e. show me the backbone to insert ratios for all successful gibson assemblies vs unsuccessful assemblies).

* Tracking of inputs and outputs of protocols allowing the system to double as an inventory, such that the lineage of samples can be traced back to the source materials and relevant information such as concentration and remaining volume of samples can be stored and used in automatic calculations.

* Using the system to automatically perform routine calculations such as molar ratios, master mixes and volume scalings.

The system needs to make it as easy as possible both to record specific protocols performed and write new protocols.

## Implementation

There are two main object types: Protocols and Containers.

### Protocols

Generic Protocols are stored in an array called ProtocolLibrary.

Specific instances of a Protocol performed (Entries) are stored in an array called LabBook.

There is prototype Protocol which contains a number of methods inherited by all Protocols.

* The initiate method creates a new instance of the Protocol (i.e an Entry) with specific properties specified by an object given as the first argument. 
* The input, parameters, output, and data methods allow the Input, Parameters, Output and Data fields to be modified by an object given as the first argument.
* The action method performs any changes to the Inventory as a result of the protocol.
* The run method adds the Protocol to the LabBook with a date stamp, runs the action method and also runs any submethods.
* The render method provides the default way to render any Protocol in HTML (just a table with Inputs, Parameters, Outputs and Data)

New protocols can be easily created using the newProtocol function:

* A new Protocol object is intialised.
* Custom properties given by a single 'definition' object are added.
    * These should consist of at least Name, Input, Parameters, Output and Data.
    * Optionally a submethods function can be provided. This is like a mini script of other protocols that gets run when the parent protocol is run. For example, a PCR consists of a 'mix' protocol and a 'thermocycle' protocol.
* The protocol is added to the ProtocolLibrary.
* A lower case version of the 'Name' property is added as a function to the global scope which calls the 'initiate' method on the Protocol. This function is used for more inituative writing of scripts and submethods.


### Containers

Containers can be anything from reagents to DNA samples to enzymes.

A list of active containers is stored in an array called Inventory.

New containers can be easily created using the newContainer function which initialises a new Container object based on the Container prototype object, takes a 'definition' object, applies those as properties to the new Container and saves to the Inventory with a date-stamp.


### Rendering

The default rendering method for a protocol given by the printProtocol function is to print a table of all the Input, Parameter, Output and Data properties.

For now, this is done using an external library (Handsontable). 

The table is editable allowing parameters to be easily set and changed.  

## Next Steps

* Implement a 'Log' button for each rendered Protocol table which makes it ReadOnly and saves it to the LabBook.
* Think about best ways to export and store the data.