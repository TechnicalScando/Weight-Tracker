const monthLabels = ["January","February","March","April","May","June","July",
"August","September","October","November","December"];
const weekLabels = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const weekTitle = ["This is a week of data"];
const daysInMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];


let yearOfDatasets = makeYearOfDatasets();
let yearOfData = makeData(createDaysLabel(daysInMonth[0]),yearOfDatasets);
let dataSetForYear = makeDataSetforYear(yearOfDatasets);
let dataSetsForYear = [];
dataSetsForYear.push(dataSetForYear);
let dataForYear = makeData(monthLabels,dataSetsForYear);
console.log(dataForYear);


function makeDataSet(label, steppedLine, data, fill){
  let dataSet = {
    label: 'BLANK DATASET',
    steppedLine: 'false',
    data: ['BLANK DATA'],
    fill: 'false'
  }

  dataSet.label = label;
  dataSet.steppedLine = steppedLine;
  dataSet.data = data;
  dataSet.fill = fill;

  return dataSet;
}

function makeData(labels, dataSets){
  let data = {
    labels: 'BLANK LABEL',
    datasets: 'BLANK DATASETS'
  }

  data.labels = labels;
  data.datasets = dataSets;

  return data;
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function makeArrayOfWeights(index,starting,ending){
  let weightArray = [];
  
  for(let i = 0; i < index; i++){
    let weight = round(randomNumber(starting,ending), 1);
    weightArray.push(weight);
  }

  return weightArray;
  
}

function round(value, precision) {
  let multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
}

function makeDatasetForMonth(name, days, starting, ending){
   let label = "Weight Data for " + name;
   let data = makeArrayOfWeights(days, starting, ending);
   let monthDataSet = makeDataSet(label, false, data, false );
   return monthDataSet; 

}

function createDaysLabel(days){
  let daysLabelArray = [];
  for(let i = 1; i <= days; i++ ){
    daysLabelArray.push(i);
  }
  return daysLabelArray;
}

function createRowTableData(){
  let tableData = {
    dayOfTheWeek: 'DAYOFTHEWEEK',
    month: 'MONTH',
    withInGoalRange: 'FALSE',
    differenceFromGoal: '0.0',
    date: 'DATE',
    weight: 'WEIGHT',
    goal: 'GOAL',
    goalLow: 'GOALLOW',
    goalHigh: 'GOALHIGH'
  }
}

function makeYearOfDatasets(){
  let trendingWeight = 180;
  let yearOfDataSets = [];
    for(let i = 0; i < monthLabels.length; i++){
      let monthDataset = makeDatasetForMonth(monthLabels[i],
        daysInMonth[i],
        trendingWeight,
        trendingWeight - 5);
      
        trendingWeight -= 5;
        yearOfDataSets.push(monthDataset);
    }

    return yearOfDataSets;
}

function getLastDayOfDataSet(newDataSet){
  let lastDay;
  data = newDataSet.data;
  lastDay = data[data.length - 1];
  return lastDay;
}

function makeDataSetforYear(yearOfDataSets){
  let dataForYear = [];
  let dataSetForYear;
  for(let i = 0; i < yearOfDataSets.length; i++){
      dataForYear.push(getLastDayOfDataSet(yearOfDataSets[i]));
  }
    dataSetForYear = makeDataSet('Year Of Data',false,dataForYear,false);
    return dataSetForYear;
  }





