

let table = document.createElement('table');
table.className ="table";
let thead = document.createElement('thead');
let tbody = document.createElement('tbody');


table.appendChild(thead);
table.appendChild(tbody);

let row_1 = document.createElement('tr');
let heading_1 = document.createElement('th');
heading_1.scope = "col"
heading_1.innerHTML = "#"

let heading_2 = document.createElement('th');
heading_2.scope = "col"
heading_2.innerHTML = "Events"


let heading_3 = document.createElement('th');
heading_3.scope = "col"
heading_3.innerHTML = "Squirrel"


row_1.appendChild(heading_1)
row_1.appendChild(heading_2)
row_1.appendChild(heading_3)
thead.appendChild(row_1)

//Correlation
let table1 = document.createElement('table');
table1.className ="table"
let thead1 = document.createElement('thead');
let tbody1 = document.createElement('tbody');

table1.appendChild(thead1);
table1.appendChild(tbody1);

let row_2 = document.createElement('tr');
let heading_1c = document.createElement('th');
heading_1c.scope = "col"
heading_1c.innerHTML = "#"

let heading_2c = document.createElement('th');
heading_2c.scope = "col"
heading_2c.innerHTML = "Event"


let heading_3c = document.createElement('th');
heading_3c.scope = "col"
heading_3c.innerHTML = "Correlation"


row_2.appendChild(heading_1c)
row_2.appendChild(heading_2c)
row_2.appendChild(heading_3c)
thead1.appendChild(row_2)





const url = "https://gist.githubusercontent.com/josejbocanegra/b1873c6b7e732144355bb1627b6895ed/raw/d91df4c8093c23c41dce6292d5c1ffce0f01a68b/newDatalog.json"

let array = [];
let datos = {};
let valores = {true:0, false:0};
let dias = 0;


function getData(callback){
	fetch(url).then(res => res.json()).then(res=>{
		callback(res);
	})
}


getData((value)=>{

	array = value;

    //Events
    for(i in array){
        let row = document.createElement('tr');
        let th = document.createElement('th');
        let td1= document.createElement('td');
        let td2= document.createElement('td');
    
        th.scope="row";
        th.innerHTML = i;
        let valor = array[i]
        let evento = ""
        even = valor["events"]


        for(y in even){
            if(even[y] in datos){
                datos[even[y]]["dia"] +=1;
                if(valor["squirrel"]){
                    datos[even[y]]["true"] +=1;
                }
                else{
                    datos[even[y]]["false"] +=1;
                }
            }
            else{
                datos[even[y]] ={"dia": 1}
                if(valor["squirrel"]){
                    datos[even[y]]["true"] =1;
                    datos[even[y]]["false"] =0;

                }
                else{
                    datos[even[y]]["false"] =1;
                    datos[even[y]]["true"] =0;

                }
            }

            

            evento += valor["events"][y] + ", "
        }
        td1.innerHTML = evento
        td2.innerHTML = valor["squirrel"]
        if(valor["squirrel"] == true){
            valores["true"] += 1            
            row.className = "table-danger";
        }
        else{
            valores["false"] += 1            
        }
        row.appendChild(th);
        row.appendChild(td1);
        row.appendChild(td2);

        tbody.appendChild(row);
    
    }
    dias =array.length;


    //Corelacion

    tp = 0;
    tn= 0
    fp = 0;
    fn= 0;
    cont = 1;

    
    correlation = []
    for (i in datos){

        tp = datos[i]["true"]
        tn = valores["false"] - datos[i]["false"]
        fp = valores["true"] -datos[i]["true"]
        fn = datos[i]["false"]
        resultado = ((tp*tn)-(fp*fn))/((tp+fp)*(tp+fn)*(tn+fp)*(tn+fn))**(1/2)
        el = [i,resultado]
        correlation.push(el);

    }
    
    correlation.sort((firstItem, secondItem) => firstItem[1] - secondItem[1])
    correlation.reverse();

    for (i in correlation){

        let row = document.createElement('tr');
        let th = document.createElement('th');
        let td1= document.createElement('td');
        let td2= document.createElement('td');

        th.scope="row";
        th.innerHTML = cont;

        td1.innerHTML = correlation[i][0];
        td2.innerHTML = correlation[i][1];
        row.appendChild(th);
        row.appendChild(td1);
        row.appendChild(td2);

        tbody1.appendChild(row);

        cont+=1;
        
    }






});

let Events = document.createElement('h2');
Events.innerHTML="Events"

document.getElementById('Events').appendChild(Events);
document.getElementById('Events').appendChild(table);

let Corr = document.createElement('h2');

Corr.innerHTML="Correlation of events";
document.getElementById('Events').appendChild(Corr);
document.getElementById('Events').appendChild(table1);






