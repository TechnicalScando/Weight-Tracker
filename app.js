let ctx = document.getElementById('weightChart').getContext('2d');
let config = {
    type: 'line',
    data: dataForYear,
    options: {
        responsive: true,
        title: {
            display: true,
            text: 'Chart.js Line Chart'
        },
        tooltips: {
            mode: 'index',
            intersect: false,
        },
        hover: {
            mode: 'nearest',
            intersect: true
        },
        scales: {
          
            yAxes: [{
                ticks: {
                   min: 120,
                   max: 185,
                   stepSize: 5
               }
            }]
        }
    }
};

let monthButtonArray = document.getElementById("monthButtonArray");
const buttonLabels = ['January', 'February', 'March', 'April', 'May', 
'June', 'July', 'August', 'September', 'October', 
'November', 'December'];
let tableDiv = document.getElementById('dataTable');
let btnClick = function buttonDataChange(){
    buttonMonth = this.textContent;
    newDataSet = getDataSetBasedOnMonth(buttonMonth);
    removeDataset();
    
    myChart.options.scales.yAxes[0].ticks.min = 
    getNewMinScale(newDataSet.data) - 5;
    myChart.options.scales.yAxes[0].ticks.max =
    getNewMaxScale(newDataSet.data) + 5;
    myChart.options.scales.yAxes[0].ticks.stepSize = .1;
    addDataSet(newDataSet);
   
}



let myChart = new Chart(ctx, config);
printBtn();
createTable();




function printBtn(){
    for (let i = 0; i < buttonLabels.length; i++){
        let btn = document.createElement("Button");
        btn.onclick = btnClick;
        let btnLabel = document.createTextNode(buttonLabels[i]);
        btn.appendChild(btnLabel);
        monthButtonArray.appendChild(btn);
    }
}

function createTable(){
    
    
    let table = document.createElement('table');
    table.border = 1;
    table.width = '100%';
    table.height = '100%';
    
    let tableBody = document.createElement('tbody');
    tableBody.width = '100%';
    tableBody.height = '100%';
    table.appendChild(tableBody);

    for (let i = 0; i < 10; i++){
        let tr = document.createElement('tr');
        tableBody.appendChild(tr);


        for(let j = 0; j < 9; j++){
            let td = document.createElement('td');
            td.width = '10px';
            td.appendChild(document.createTextNode("'Cell " + i + "," + j));
            tr.appendChild(td);
        
        }
    }
    tableDiv.appendChild(table);
}

function getDataSetBasedOnMonth(month){
    let matchingDataSets = [];
    compareMonth = "Weight Data for " + month;
    
    for(let i = 0; i < yearOfDatasets.length; i++){
        if (yearOfDatasets[i].label == compareMonth){
            let matchingDataset = yearOfDatasets[i]
            return matchingDataset;
        }
    }
}

function removeDataset() {
    config.data.datasets.splice(0, 1);
   myChart.update();
}

function addDataSet(monthDataSet) {
    var newDataset = monthDataSet;

    config.data.labels = createDaysLabel(31);
    config.data.datasets.push(newDataset);
    myChart.update();
   
}

function getNewMinScale(data){
    let min = 0;

    for(let i = 0; i < data.length; i++){
        if (data[i] > min){
            min = data[i];
        }
    }
    console.log("min is: " + min);
    return min;
}

function getNewMaxScale(data){
    let max = 0;

    for(let i = 0; i < data.length; i++){
        if (data[i] > max){
            max = data[i];
        }
    }
    console.log("max is: " + max);
    return max;
}





 



   



