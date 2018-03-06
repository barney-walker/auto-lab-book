//Protocol Definitions

//Protocol for mixing

newProtocol({    //creates new Protocol object with additional properties below 
    Name: 'Mix',
    Input: {

    },
    Parameters: {

    },
    Output: {
        Mixture: {
            ID:undefined,
            ContainerType:'Tube',
            Desc:undefined
        }
    },
    Data: {

    }
})           
            
//Protocol for incubation
    
newProtocol({
    Name: 'Incubate',
    Input: {
        ID:undefined
    },
    Parameters: {
        Time:undefined,
        Temp:undefined
    },
    Output: {

    },
    Data: {

    }
})
        
//Protocol for Thermocycling

newProtocol({
    Name: 'Thermocycle',
    Input: {

    },
    Parameters: {
        Program: undefined
    },
    Output: {

    },
    Data: {
        
    }
})
  
//Protocol for PCR

newProtocol({
    Name: 'PCR',
    Input:  {
        Enzyme: {ID:'Phusion',Vol:.01*50},
        Additive: {ID:'Betaine',Vol:.2*50},
        Buffer: {ID:'GC Buffer',Vol:.2*50},
        dNTPs: {ID:'dNTPs',Vol:.02*50},
        FWPrimer: {ID:undefined,Vol:.05*50},
        RVPrimer: {ID:undefined, Vol:.05*50},
        Template: {ID:undefined, Vol:.02*50},
        Water: {ID:'MilliQ',Vol:.45*50}
    },
    Parameters: {
        TotalVol: 50,
        InitDenature: {Temp: '98C', Time:'10s'},
        Denature: {Temp: '98C', Time:'10s'},
        Anneal: {Temp: '98C', Time:'10s'},
        Elongation: {Temp: '98C', Time:'10s'},
        FinalElongation: {Temp: '98C', Time:'10s'},
        Cycles:35
    },
    Output: {
        PCRMix: {
            ID:undefined,
            ContainerType:'Eppendorf.5',
            Desc: undefined,
            ContentType: 'UnpurifiedPCR'
        }  
    },
    Data: {

    },
    submethods: function(){

        var mixture = mix({

            Input: Object.values(this.Input),
            Output: this.Output

        })

        var program = [
            
            [1,[this.Parameters.InitDenature]],
        
            [this.Parameters.Cycles,[
                this.Parameters.Denature,
                this.Parameters.Anneal,
                this.Parameters.Elongation
            ]],
            
            [1,[this.Parameters.FinalElongation]]

        ];
   
        thermocycle({

            Input: this.Output.ID,
            
            Parameters: {
                
                Program: program.map(function(a){

                    return({
                        Cycles:a[0],
                        Incubations: a[1].map(function(b){return({Time:b[0],Temp:b[1]})})
                    })
                }) 
            }
        });
    },
});
         
//Protocol for Running Gels

newProtocol({
    Name: 'RunGel',
    Input: {

    },
    Parameters: {
        PercentAgarose: 0.8,
        Voltage: '100V',
        Time: '1hr',
        Comb: 'thin-9-well',
        Ladder: 'hyperladder1kb'
    },
    Output: {
        Gel: {
            ID: undefined,
            Type:'Gel',
            Desc:undefined,
            Lanes: undefined
        }
    },
    Data: {
        Image: undefined
    }
});

//Protocol for gel extraction
newProtocol({
    Name: 'GelExtract',
    Input: {
        Gel:{
            ID:undefined,
            Lane:undefined
        }
    },
    Parameters: {
        SliceWeight: undefined,
        Dissolution: {
            Vol: 600,
            Temp:'50C',
            Time:'5min'
        },
        Binding: {
            Speed:'2krpm',
            Time:'5min'
        },
        FirstWash: {
            Speed:'13krpm',
            Time:'1min'
        },
        SecondWash: {
            Speed:'13krpm',
            Time:'2min'
        },
        Elution: {
            Rest:'10min',
            Temp: '50C',
            Vol: '6ul',
            Speed:'13krpm',
            Time:'1min'
        }
    },
    Output: {
        ID:undefined,
        Conc:undefined,
        Vol:undefined,
        Desc:undefined,
        Type:undefined
    },
    Data: {
        
    }
});

//Protocol for electroporatation

newProtocol({
    Name: 'Electroporate',
    Input: {
        Cells: {
            ID:undefined,
            Vol:undefined,
        },
        Plasmid: {
            ID: undefined,
            Vol: undefined,
        }
    },
    Parameters: {
        Settings: '1.5kV',
        RecoveryMedia: 'LB',
        RecoveryVol: '1ml',
        RecoveryTime: '1hr',
    },
    Data: {
        tc:undefined,
    },
    Output: {
        
        RecoveredCells: {
            ID: undefined,
        }
    }
})

//Protocol for heat-shock

newProtocol({
    Name: 'HeatShock',
    Input: {
        Cells: {
            ID:undefined,
            Vol:undefined,
        },
        Plasmid: {
            ID: undefined,
            Vol: undefined,
        }
    },
    Parameters: {
        IncubationTime:'30mins',
        HeatShock: {
            Temp: '42C',
            Time: '30s'
        },
        RecoveryMedia: 'SOC',
        RecoveryVol: '1ml',
        RecoveryTime: '1hr',

    },
    Output: {
        RecoveredCells: {
            ID: undefined,
        }
    },
    Data: {
        tc:undefined,
    },
})


//Protocol for plate spreading

newProtocol({
    Name: 'SpreadPlate',
    Input: {
        Cells: {
            ID:undefined,
            Vol: '100ul'
        },
        Plate: {
            ID: undefined,
        }
    },
    Parameters: {

    },
    Output: {
        Plate: {
            ID:undefined,
        }
    },
    Data:{

    }
})

//Pick colony
newProtocol({
    Name: 'PickColony',
    Input: {
        Plate:{
            ID:undefined
        }
    },
    Parameters: {

    },
    Output: {
       Culture:{
           ID:undefined
       }
    },
    Data:{

    }
})

newProtocol({
    Name:'GlycerolStock',
    Input: {
        Culture: {
            ID:undefined
        }
    },
    Output: {
        GlycerolStock:{
            ID:undefined,
            Type:'GlycerolStock',
            Location:'-80.Box1'
        }
    }
})

newProtocol({
    Name:'Miniprep',
    Input:{
        Culture:{
            ID:undefined
        }
    },
    Parameters:{

    },
    Output:{
        PlasmidPrep:{
            ID:undefined,
            Vol:'48ul',
        }
    }
})

newProtocol({
    Name:'ZymoClean',
    Input:{
        DNA:{
            ID:undefined,
            Vol:undefined
        }
    },
    Parameters:{
        BindingBufferVol: '50ul',
        BindingSpin: {
            Speed:'13.4krpm',
            Time:'30s'
        },
        FirstWash:{
            Vol:'200ul',
            Speed:'13.4krpm',
            Time:'30s'
        },
        SecondWash:{
            Vol:'200ul',
            Speed:'13.4krpm',
            Time:'30s'
        },
        Elution:{
            Buffer:'MilliQ',
            Vol:'6ul',
            Speed:'13.4krpm',
            Time:'1min'
        },
    },
    Output:{
        DNA:{
            ID:undefined,
            Conc:undefined
        }
    },
    Data:{

    }
})

newProtocol({
    Name: 'MakePlates',
    Input: {
        Antibiotic:{
            ID:undefined
        }
    },
    Parameters:{
        Conc:undefined,
        AgarVol:undefined
    },
    Output:{
        Plate:{
            ID:undefined,
        }
    }
})

//Single Digest
newProtocol({
    Name:'Digest',
    Input:{

    },
    Parameters:{

    },
    Output:{

    },
    Data:{

    }
})

//Double Digest
newProtocol({
    Name:'DoubleDigest',
    Input:{

    },
    Parameters:{

    },
    Output:{

    },
    Data:{

    }
})

//Ligate
newProtocol({
    Name:'Ligate',
    Input:{

    },
    Parameters:{

    },
    Output:{

    },
    Data:{

    }
})

//Colony PCR
newProtocol({
    Name:'ColonyPCR',
    Input:{

    },
    Parameters:{

    },
    Output:{

    },
    Data:{

    }
})

//Gibson Assembly
newProtocol({
    Name:'GibsonAssembly',
    Input:{

    },
    Parameters:{

    },
    Output:{

    },
    Data:{

    },
    submethods: function(){

        mix();
        incubate();
        heatshock();
        spreadplates();

    }
})