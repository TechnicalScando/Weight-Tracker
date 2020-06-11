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
        },
        legend: {
            display:false
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
    let newDataSets = [];
    newDataSets.push(newDataSet);
    let newTableDataset = parseDatasetsIntoTableRows(newDataSets);
   removeDataset();
    
    myChart.options.scales.yAxes[0].ticks.min = 
    getNewMinScale(newDataSet.data) - 5;
    myChart.options.scales.yAxes[0].ticks.max =
    getNewMaxScale(newDataSet.data) + 5;
    myChart.options.scales.yAxes[0].ticks.stepSize = .1;
    addDataSet(newDataSet);
    
    $('#example').dataTable().fnClearTable();
 $('#example').dataTable().fnAddData(newTableDataset);
    
}



let myChart = new Chart(ctx, config);
printBtn();
let tableDataSet = yearOfDatasets;
let tableData = parseDatasetsIntoTableRows(tableDataSet);
$(document).ready(function() {
    $.fn.dataTable.moment("MMM Do YYYY");
    $('#example').DataTable( {
        data: tableData,
        columns: [
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
    let compareMonth = "Weight Data for " + month;
    
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
    return min;
}

function getNewMaxScale(data){
    let max = 0;

    for(let i = 0; i < data.length; i++){
        if (data[i] > max){
            max = data[i];
        }
    }
    return max;
}

function parseDatasetsIntoTableRows(dataSetToParse){
let date;
let weight;

let dataForTable = [];

    for (let i = 0; i < dataSetToParse.length; i++){
        for(let j = 0; j < dataSetToParse[i].data.length; j++){
            let tableRow = [];
            let month = 0;
           
            month = getMonthOfDataSet(dataSetToParse[i]);
            let stringForMoment = (month + 1) + " " + (j + 1) + " " + 2020 ; 
            date =  moment(stringForMoment,"MM Do YY")
            date = moment(date).format("MMM Do YYYY");
            weight = yearOfDatasets[month].data[j];
            tableRow = createRowTableData(date,weight);
            dataForTable.push(tableRow);
        }
    }

    return dataForTable;
}

function createRowTableData(date,weight){
let tableRow = [];

    
    tableRow[0] = date;
    tableRow[1] = weight;
    

    return tableRow;
  }

  function getMonthOfDataSet(compareDataSet){
    
    for(let i = 0; i < yearOfDatasets.length; i++){
        if (yearOfDatasets[i] == compareDataSet){
            return i;
        }
    }
    return 0;
}

function switchBlocksInArray(array,firstIndex,secondIndex){
    let switchedIndex;
    let newArray = array;

    switchedIndex = newArray[firstIndex];
    newArray[firstIndex] = newArray[secondIndex];
    newArray[secondIndex] = switchedIndex;

    return newArray;

}

  


 



   



