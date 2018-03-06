
//Short-cut entrys

    //Protocol for standard phusion PCR

    function phusionPCR(){

        var entry = pcr().enzyme('Phusion').enzymeVol(5).buffer('5X HF Buffer').bufferVol(10);

        entry.Buffer = '5X HF Buffer';
        entry.Enzyme = 'Phusion';

        entry.InitDenature = 98;
        entry.Denature = 98;
        entry.Elongation = 72;
        entry.FinalElongation = 72;

        return(entry)
    }
