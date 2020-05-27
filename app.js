var ctx = document.getElementById('weightChart').getContext('2d');
var config = {
    type: 'line',
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            label: 'Monthly Weight',
            steppedLine: 'before',
            data: [10, 9, 8, 7, 6, 5, 4],
            fill: false,
        }]
    },
    options: {
        responsive: false,
        tooltips: {
            mode: 'index',
            intersect: false,
        },
        hover: {
            mode: 'nearest',
            intersect: true
        },
        scales: {
            x: {
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Month'
                }
            },
            y: {
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Value'
                }
            }
        }
    }
};
var monthButtonArray = document.getElementById("monthButtonArray");
var buttonLabels = ['January', 'February', 'March', 'April', 'May', 
'June', 'July', 'August', 'September', 'October', 
'November', 'December'];
var tableDiv = document.getElementById('dataTable');



var myChart = new Chart(ctx, config);
printBtn();
createTable();

function printBtn(){
    for (var i = 0; i < buttonLabels.length; i++){
        var btn = document.createElement("Button");
        var btnLabel = document.createTextNode(buttonLabels[i]);
        btn.appendChild(btnLabel);
        monthButtonArray.appendChild(btn);
    }
}

function createTable(){
    
    
    var table = document.createElement('table');
    table.border = 1;
    table.width = '100%';
    table.height = '100%';
    
    var tableBody = document.createElement('tbody');
    tableBody.width = '100%';
    tableBody.height = '100%';
    table.appendChild(tableBody);

    for (var i = 0; i < 10; i++){
        var tr = document.createElement('tr');
        tableBody.appendChild(tr);


        for(var j = 0; j < 9; j++){
            var td = document.createElement('td');
            td.width = '10px';
            td.appendChild(document.createTextNode("'Cell " + i + "," + j));
            tr.appendChild(td);
        
        }
    }
    tableDiv.appendChild(table);
    
}

function generateDayOfData(){
    var dayOfData = [];


}





