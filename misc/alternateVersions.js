//Current Version

newProtocol({
    Name:'twopartgibson',
    Input: {
        Part1: {
            FWPrimerID:undefined,
            RVPrimerID:undefined,
            TemplateID:undefined
        },
        Part2: {
            FWPrimerID:undefined,
            RVPrimerID:undefined,
            TemplateID:undefined
        }
    },
    Parameters:{
        PCR1: {
            Tm:undefined,
            Extension: undefined
        },
        PCR2: {
            Tm:undefined,
            Extension:undefined
        }
    },
    Output:{
        FinalProduct:{
            ID:undefined,
            Conc:undefined
        }
    },
    Data:{

    },
    submethods: function(){
        
        var pcr1 = pcr({
            Input:{
                FWPrimer:{ID:this.Input.Part1.FWPrimerID},
                RVPrimer:{ID:this.Input.Part1.RVPrimerID},
                Template:{ID:this.Input.Part1.TemplateID}
            },
            Parameters:{
                Anneal: {
                    Temp:this.PCR1.Tm
                },
                Extension:{
                    Time:this.PCR1.Extension
                }
            },
            Output: {
                PCRProduct: {ID:temp()}
            }
        })

        var pcr2 = pcr({
            Input:{
                FWPrimer:{ID:this.Input.Part2.FWPrimerID},
                RVPrimer:{ID:this.Input.Part2.RVPrimerID},
                Template:{ID:this.Input.Part2.TemplateID}
            },
            Parameters:{
                Anneal: {
                    Temp:this.PCR2.Tm
                },
                Extension: {
                    Time:this.PCR2.Extension
                }
            }
        })

        var gel1 = gelRun({
            Input: pcr1.Output.PCRProduct.ID
        })

        var gel2 = gelRun({
            Input: pcr2.Output.PCRProduct.ID
        })

        var part1 = gelExtract(gel1);

        var part2 = gelExtract(gel2);

        var gibsonMix = mix({
            Input:{
                Part1: {ID:part1.Output.ID, Vol:undefined},
                Part2: {ID:part2.Output.ID, Vol:undefined},
                GibsonMM: {ID:'RochelleGibsonMix',Vol:'5ul'}
            }
        })

        incubate({
            Input: gibsonMix.Output,
            Parameters: {
                Time:'60min',
                Temp:'50C'
            }
        })

        var x = cctransform({Input:gibsonMix.Output})

        spreadPlates({Input:x.Output})


    }
})

//No separate inputs

//Submethods only 

newProtocol({
    Name: 'twopartgibson',
    submethods: function(){
        
        var pcr1 = pcr()
        var pcr2 = pcr()

        var gel1 = gelRun().input({
                Lane1:pcr1.Output,
                Lane2:pcr2.Output
        })

        var part1 = gelExtract().input(gel1.Output.Lane1);
        var part2 = gelExtract().input(gel1.Output.Lane2);

        var gibsonMix = mix().input({
                Part1: {ID:part1.Output.ID, Vol:undefined},
                Part2: {ID:part2.Output.ID, Vol:undefined},
                GibsonMM: {ID:'RochelleGibsonMix',Vol:'5ul'}
        })

        incubate().input(gibsonMix.Output).parameters({Time:'60min',Temp:'50C'})

        //incubate().Parameters.time('60min').temp('50C')

        var x = cctransform().input(gibsonMix.Output)

        spreadPlates().input(x.Output)


    }
})

//Named steps

newProtocol({
    Name: 'twopartgibson',
    submethods: function(){
        
        pcr('PCR1')
        pcr('PCR2')
        gelrun('gel1').input({
                Lane1:this.pcr1.Output,
                Lane2:this.pcr2.Output
        })
        gelextract('Extract1').input(this.gel1.Output.Lane1)
        gelextract('Extract2').input(this.gel1.Output.Lane2);
        

        mix('GibsonMix').input({
                Part1: {ID:this.Extract1.Output.ID, Vol:undefined},
                Part2: {ID:this.Extract2.Output.ID, Vol:undefined},
                GibsonMM: {ID:'RochelleGibsonMix',Vol:'5ul'}
        })

        incubate('Assembly').input(this.GibsonMix.Output).parameters({Time:'60min',Temp:'50C'})

        cctransform('Transformation').input(this.GibsonMix.Output)

        spreadPlates('SpreadPlates').input(this.Transformation.Output)


    }
})
