 /////////////Set up dummy data for testing

var mode = 'script';

var book = LabBook;

newReagent({
    ID:'Phusion',
    Desc:'Phusion'
})
    
newReagent({
    ID:'Phusion GC Buffer',
    Desc:'Phusion GC Buffer'
})

newReagent({
    ID:'Betaine',
    Desc:'Betaine'
})

newReagent({
    ID:'MilliQ',
    Desc:'MilliQ'
})

newReagent({
    ID:'dNTPs',
    Desc:'dNTPs',
    Conc: '10mM'
})

newTube({
    ID:'B39',
    Desc:'pBBR1',
    Conc: '55ng/ul',
    Vol: '50ul'
})

newTube({
    ID:'B37',
    Desc:'pMMB67',
    Conc: '55ng/ul',
    Vol: '50ul'
})

/* mix([['B39',3],['B37',5]])
    .desc('Double Plasmid')
    .id('B40')
    .run();

incubate('B37')
    .temp(40)
    .time(30)
    .run(); */
 
pcr({
    Input: {
        FWPrimer:{ID:'B39',Vol:5},
        RVPrimer:{ID:'B37',Vol:7},
        Template:{ID:'B39'}
    }
})


printAll(LabBook)