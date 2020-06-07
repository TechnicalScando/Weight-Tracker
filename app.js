let ctx = document.getElementById('weightChart').getContext('2d');
let config = {
    type: 'line',
    data: dataForYear,
    options: {
        responsive: true,
        title: {
            display: true,
            text: 'Weight Chart'
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
let tableDataSet = yearOfDatasets;
let tableData = parseDatasetsIntoTableRows(tableDataSet);
$(document).ready(function() {
    $('#example').DataTable( {
        data: tableData,
        columns: [
            { title: "Day of The Week" },
            { title: "Month" },
            { title: "Date" },
            { title: "Weight" }
            
        ]
    } );
} );



function printBtn(){
    for (let i = 0; i < buttonLabels.length; i++){
        let btn = document.createElement("Button");
        btn.onclick = btnClick;
        let btnLabel = document.createTextNode(buttonLabels[i]);
        btn.appendChild(btnLabel);
        monthButtonArray.appendChild(btn);
    }
}

function createTable(data){
    
    
    let table = document.createElement('table');
    table.border = 1;
    table.width = '100%';
    table.height = '100%';
    
    let tableBody = document.createElement('tbody');
    tableBody.width = '100%';
    tableBody.height = '100%';
    table.appendChild(tableBody);

    for (let i = 0; i < data.length; i++){
        let tr = document.createElement('tr');
        tableBody.appendChild(tr);


        for(let j = 0; j < data[i].length; j++){
            let td = document.createElement('td');
            td.width = '10px';
            tableRow = data[i]
            td.appendChild(document.createTextNode(tableRow[j]));
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
    let min = 300;

    for(let i = 0; i < data.length; i++){
        if (data[i] < min){
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

function parseDatasetsIntoTableRows(dataSet){
let date;
let weight;

let dataForTable = [];

    for (let i = 0; i < dataSet.length; i++){
        for(let j = 0; j < dataSet[i].data.length; j++){
            let tableRow = [];
            date = new Date(2020, i, j + 1);
            weight = yearOfDatasets[i].data[j];
            tableRow = createRowTableData(date,weight);
            dataForTable.push(tableRow);
        }
    }

    return dataForTable;
}

function createRowTableData(date,weight){
let tableRow = [];

    let stringDate = date.toDateString();
    splitDate = stringDate.split(" ");
    let shortMonth = splitDate[1];
    tableRow[0] = weekLabels[date.getDay()];
    tableRow[1] = shortMonth;
    tableRow[2] = stringDate;
    tableRow[3] = weight;

    return tableRow;
  }

  


 



   



