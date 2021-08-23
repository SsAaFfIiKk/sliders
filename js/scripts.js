const url="http://127.0.0.1:8000/get_data"
const sum_url="http://127.0.0.1:8000/save_sum"


getData();

function getData() {
    fetch(url)
        .then(res => res.json())
        .then(out => {
            data = out;
            createAuthorsTable();
        })
}


function createAuthorsTable() {
    let table=document.getElementById("authors")
    table.innerHTML = ""

    for(let name in data){
        let values = Object.values(data[name])

        let newTr = document.createElement('tr')
        let td1 = document.createElement('td')
        let td2 = document.createElement('td')

        td1.innerHTML=name
        td2.innerHTML=calculateSum(values)

        newTr.appendChild(td1)
        newTr.appendChild(td2)

        table.appendChild(newTr)
    }

}



function calculateSum(values){
    let idlst=["hirsh", "yearArticle", "numCoauthors", "numAffiliations", "keyWords", "SNA"]
    let sum = 0
    for(let i=0; i<Object.keys(values).length; i++){
        sum += values[i] * document.getElementById(idlst[i]).value
    }
    return sum.toFixed(2)
}

function updateSlider(value, id) {
    createAuthorsTable()
    setOutput(value, id)
}


function setOutput(val, id) {
    let output = document.querySelector(id)
    output.value =val
}

function send() {
    let cells = document.getElementsByTagName("td");
    let data=[];
    let formData = new FormData();

    for(let i=0; i<cells.length; i++){
        data.push(cells[i].innerHTML)
    }

    formData.append("data", data)
    try {
        const r = fetch(sum_url, {
            method: 'POST',
            body: formData,
        });
    } 
    catch (e) {
        console.log('Error:', e);
    }
}