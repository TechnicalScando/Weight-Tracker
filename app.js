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


var myChart = new Chart(ctx, config);
printBtn();


var monthButtonArray = document.getElementById("monthButtonArray");
var buttonLabels = ['January', 'Febuary', 'March', 'April', 'May', 
'June', 'July', 'August', 'September', 'October', 
'November', 'December'];

function printBtn(){
    for (var i = 0; i < buttonLabels.length; i++){
        var btn = document.createElement("Button");
        var btnLabel = document.createTextNode(buttonLabels[i]);
        btn.appendChild(btnLabel);
        monthButtonArray.appendChild(btn);
    }
}



