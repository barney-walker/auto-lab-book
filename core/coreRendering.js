
function printAll(book){

    for(let i=0;i<book.length;i++){

        book[i].render()

    }

}

function printTop(book){

    var toplevel = book.filter(function(a){return(a.parent==window)})

    for(let i=0;i<toplevel.length;i++){
        
                toplevel[i].render()
        
            }
}

function boldRender(instance, td, row, col, prop, value, cellProperties) 
{
            Handsontable.renderers.TextRenderer.apply(this, arguments);
            td.style.fontWeight = 'bold';
        }

function printProtocol(protocol){

    printHeader(protocol.Name,'h2')

    var groups = ['Input','Output','Parameters','Data'];

    var toPrint = [{}];

    for(let i=0;i<groups.length;i++){

        if(Object.keys(groups[i]).length>0){toPrint[0][groups[i]]=protocol[groups[i]]}
    }

    printInputTable(toPrint)

     /*   
    printHeader('Input','h3')
    printInputTable([protocol.Input])
    printHeader('Parameters','h3')
    printInputTable([protocol.Parameters])
    printHeader('Output','h3')
    printInputTable([protocol.Output])
    printHeader('Data','h3')
    printInputTable([protocol.Data]) */

}

function printInputTable(toPrint){

    if(Object.keys(toPrint[0]).length===0){return};

    var container = document.querySelector('#stream');
    var newTable = document.createElement('DIV');

    container.appendChild(newTable);

    out = {cols:[],headers:[],count:0}

    var level = 0;

    function flatten(obj,out,stem) {

        if(Object.keys(obj).length==0){return(1)};

        var maxdepth = 1;
        var depth;

        for (var p in obj) {

            var newStem = (typeof stem !== 'undefined' && stem !== '') ? stem + '.' + p : p;

            if (typeof obj[p] !== 'object' || obj[p]==null){

                out.cols.push({data: newStem});

                out.count++;

                if(out.headers.length==0){out.headers.push([])}

                out.headers[0].push({label:p,colspan:1})

                level = 1; 
                
            } else {
            
                var oldCount = out.count;

                depth = flatten(obj[p],out,newStem);

                level++;

                for(let i=0;i<depth;i++){

                    let span = out.headers[i].reduce(function(acc,curr){return(acc+curr.colspan)},0);

                    let gap = out.count - span; 

                    if(gap>0){
                        out.headers[i].push({label:'',colspan:gap})
                    }; //if there is a gap fill with blank header

                }

                if(out.headers.length<=depth){ //If haven't visited level yet create it.
                    
                    out.headers.push([]);
                    
                    var currSpan = 0;
                
                } else {

                    var currSpan = out.headers[depth].reduce(function(acc,curr){return(acc+curr.colspan)},0); //Get total colspan at current level
                    
                }
                
                var gap = oldCount-currSpan; 

                if(gap>0){
                    out.headers[depth].push({label:'',colspan:gap})
                }; //if there is a gap fill with blank header

                out.headers[depth].push({label:p,colspan:out.count-oldCount});

            }

            maxdepth = (maxdepth<level) ? level : maxdepth;

        }

        return maxdepth;
    };

    flatten(toPrint[0],out)
    
    var hot = new Handsontable(newTable, {
        data: toPrint,
        colHeaders: true,
        rowHeaders: true,
        hiddenColumns: true,
        colWidths: 60,
        nestedHeaders: out.headers.reverse(),
        columns: out.cols
    });

}


function printText(text){

    var container = document.querySelector('#stream');
    var text = document.createTextNode(text);

    container.appendChild(text);

}

function printHeader(text,type){

    var container = document.querySelector('#stream');
    var header = document.createElement(type);

    header.innerHTML = text;

    container.appendChild(header);

}

/* function printParameterTable(method){

    container = document.querySelector('#stream');
    table = document.createElement('DIV');

    container.appendChild(table);

    var tabledata = Object.keys(method.parameters).map(function(x){return({parameter:x,value:method.parameters[x]})});

    new Handsontable(table, {
    data: tabledata,
    colHeaders: ['Parameter','Value'],
    columns: [{data:'parameter',renderer: boldRender},{data:'value'}]
    });

} */

function printTable(table){

    var container = document.querySelector('#stream');
    var newTable = document.createElement('DIV');

    container.appendChild(newTable);

    new Handsontable(newTable, {
    readOnly: true,
    data: table.data,
    colHeaders: table.headers,
    columns: table.cols            

    })

}
