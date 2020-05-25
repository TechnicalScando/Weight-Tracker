var ctx = document.getElementById('weightChart').getContext('2d');
var config = {
    type: 'line',
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            label: 'Mothly Weight',
            steppedLine: 'before',
            data: [10, 9, 8, 7, 6, 5, 4],
            fill: false,
        }]
    },
    options: {
        responsive: true,
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
var buttonLabels = ['January', 'Febuary', 'March', 'April', 'May', 
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

    var tableBody = document.createElement('tbody');
    table.appendChild(tableBody);

    for (var i = 0; i < 3; i++){
        var tr = document.createElement('tr');
        tableBody.appendChild(tr);

        for(var j = 0; j < 2; j++){
            var td = document.createElement('td');
            td.width = '75';
            td.appendChild(document.createTextNode("'Cell " + i + "," + j));
            tr.appendChild(td);
        
        }
    }
    tableDiv.appendChild(table);
    
}

