async function createTableHeader(table){
    let tr=document.createElement("tr");
    let sno=document.createElement("th");sno.appendChild(document.createTextNode("S.No"));
    let conuntry=document.createElement("th");conuntry.appendChild(document.createTextNode("Countries"));
    let capital=document.createElement("th");capital.appendChild(document.createTextNode("Capital"));
    tr.append(sno);tr.append(conuntry);tr.append(capital);
    table.append(tr);
}
async function createTableRow(table,row,i){
    let tr=document.createElement("tr");
    let sno=document.createElement("td");sno.appendChild(document.createTextNode(i));
    let conuntry=document.createElement("td");conuntry.appendChild(document.createTextNode(row.Country));
    let capital=document.createElement("td");capital.appendChild(document.createTextNode(row.Capital));
    tr.append(sno);tr.append(conuntry);tr.append(capital);
    table.append(tr);
}

async function createSelectMap(jsonURL){
    const optionsMap=new Map();
    const { pathname } = new URL(jsonURL);

    const resp = await fetch(pathname);
    optionsMap.set("all","All Countries");optionsMap.set("asia","Asia");optionsMap.set("europe","Europe");optionsMap.set("africa","Africa");optionsMap.set("america","America");optionsMap.set("australia","Australia");
    const select=document.createElement('select');
    select.id = "region";
    select.name="region";
    optionsMap.forEach((val,key) => {
        const option = document.createElement('option');
        option.textContent = val;
        option.value = key;
        select.append(option);
      });
     
     const div=document.createElement('div'); 
     div.classList.add("region-select");
     div.append(select);
    return div;
}
async function createTable(jsonURL,val) {

    let  pathname = null;
    if(val){
        pathname=jsonURL;
    }else{
        pathname= new URL(jsonURL);
    }
    
    const resp = await fetch(pathname);
    const json = await resp.json();
    console.log("=====JSON=====> {} ",json);
    
    const table = document.createElement('table');
    createTableHeader(table);
    json.data.forEach((row,i) => {

        createTableRow(table,row,(i+1));

      
    });
    
    return table;
}    

export default async function decorate(block) {
    const countries = block.querySelector('a[href$=".json"]');
    const parientDiv=document.createElement('div');
    parientDiv.classList.add('contries-block');

    if (countries) {
        // parientDiv.append(await createSelectMap(countries.href));
        parientDiv.append(await createTable(countries.href,null));
        countries.replaceWith(parientDiv);
        
    }
    // const dropdown=document.getElementById('region');
    //   dropdown.addEventListener('change', () => {
    //     let url=countries.href;
    //     if(dropdown.value!='all'){
    //         url=countries.href+"?sheet="+dropdown.value;
    //     }
    //     const tableE=parientDiv.querySelector(":scope > table");
    //     let promise = Promise.resolve(createTable(url,dropdown.value));
    //     promise.then(function (val) {
    //         tableE.replaceWith(val);
    //     });
    //   });
  }
