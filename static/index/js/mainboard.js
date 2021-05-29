// https://stackoverflow.com/questions/43140467/page-with-multiple-chart-js-charts-to-pdf
// Need to check scaling and quality.

// JavaScript source code

const pdfAutoReportsFolder = "../static/index/pdf/automated-reports";
var pdf;
var now = new Date();
var currentDateTime = new Date(now.getTime() - now.getTimezoneOffset() * 60 * 1000).toISOString().split("T")[0];
var sevenDaysDate = new Date().getTime() - (7 * 24 * 60 * 60 * 1000);
var thirtyDaysDate = new Date().getTime() - (30 * 24 * 60 * 60 * 1000);


// Function to return current date and time with leading zeros.
function getFormattedDateTime(dateString){
    var day = dateString.getDate();
    var leadingZeroDay = ("0" + day).slice(-2);
    var month = dateString.getMonth() + 1;
    var leadingZeroMonth = ("0" + month).slice(-2);
    var year = dateString.getFullYear();
    var hour = dateString.getHours();
    var leadingZeroHour = ("0" + hour).slice(-2);
    var minute = dateString.getMinutes();
    var leadingZeroMinute = ("0" + minute).slice(-2);
    var second = dateString.getSeconds();
    var leadingZeroSecond = ("0" + second).slice(-2);

    return leadingZeroDay + "-" + leadingZeroMonth + "-" + year + "@" + leadingZeroHour + "_" + leadingZeroMinute + "_" + leadingZeroSecond;
}

// Global Chart Options
Chart.defaults.global.defaultFontFamily = "Ubuntu";
Chart.defaults.global.defaultFontSize = 15;
Chart.defaults.global.defaultFontColor = "#000";
Chart.defaults.global.title.display = true;
Chart.defaults.global.responsive = true;
Chart.defaults.global.title.defaultFontSize = 20;
Chart.defaults.global.elements.line.borderWidth = 2;
Chart.defaults.global.elements.line.hoverBorderWidth = 2;
Chart.defaults.global.elements.line.tension = 0;
Chart.defaults.global.elements.line.fill = false;
Chart.defaults.global.legend.display = true;
Chart.defaults.global.legend.position = "top";
Chart.defaults.global.legend.labels.fontColor = "#000";
Chart.defaults.scale.ticks.beginAtZero = true;
Chart.defaults.scale.ticks.fontSize = 12;


Chart.scaleService.updateScaleDefaults("linear", {
  ticks: {
    callback: function(value) {
      if (value % 1 === 0) {return value;}
    }
  }
});

const TFHourConfig = {
  type: "line",
  data: {
    labels: [],
    datasets: [{
      data: [], // Set initially to empty data
      label: "",
      borderColor: "#3e95cd",
      backgroundColor: "rgba(0, 121, 196, 0.6)",
      parsing: false,
      normalized: true
    },
    {
      data: [], // Set initially to empty data
      label: "",
      borderColor: "#009688",
      backgroundColor: "rgba(0, 150, 136, 0.6)",
      parsing: false,
      normalized: true
    },
    {
      data: [], // Set initially to empty data
      label: "",
      borderColor: "#808080",
      backgroundColor:"rgba(128, 128, 128, 0.6)",
      parsing: false,
      normalized: true
    }]
  },
  options: {
    scales: {
      xAxes: [{
        type: "time",
        time: {
          unit: "hour",
          displayFormats: {
            quarter: "MMM YYYY",
            millisecond: "hh:mm:ss.SSSa",
            second: "hh:mm:ssa",
            minute: "hh:mma",
            hour: "hh:mma"
          },
          tooltipFormat: "MMM DD, YYYY hh:mma",
        },
        ticks: {
          minRotation: 45,
        }
      }]
    },
    title: {
      text: "Detection Activity (24 Hours)",
    }
  }
};

const chartOne = document.querySelector("#chartOne").getContext("2d");
const TFHourChart = new Chart(chartOne, TFHourConfig);
const reportChartOne = document.querySelector("#reportChartOne").getContext("2d");
const reportTFHourChart = new Chart(reportChartOne, TFHourConfig);

const SevenDayConfig = {
  type: "line",
  data: {
    labels: [],
    datasets: [{
      data: [], // Set initially to empty data
      label: "",
      borderColor: "#3e95cd",
      backgroundColor: "rgba(0, 121, 196, 0.6)",
      parsing: false,
      normalized: true
    },
    {
      data: [], // Set initially to empty data
      label: "",
      borderColor: "#009688",
      backgroundColor: "rgba(0, 150, 136, 0.6)",
      parsing: false,
      normalized: true
    },
    {
      data: [], // Set initially to empty data
      label: "",
      borderColor: "#808080",
      backgroundColor:"rgba(128, 128, 128, 0.6)",
      parsing: false,
      normalized: true
    }]
  },
  options: {
    scales: {
      xAxes: [{
        type: "time",
        time: {
          unit: "week",
          tooltipFormat: "MMM DD, YYYY",
          displayFormats: {
            day: "MMM DD",
            week: "MMM DD",
          },
        },
        ticks: {
          minRotation: 45
        },
      }]
      
    }, 
    title: {
      text: "Detection Activity (7 Days)"
    }
  }
};

const chartTwo = document.querySelector("#chartTwo").getContext("2d");
const SevenDayChart = new Chart(chartTwo, SevenDayConfig);
const reportChartTwo = document.querySelector("#reportChartTwo").getContext("2d");
const reportSevenDayChart= new Chart(reportChartTwo, SevenDayConfig);

const ThirtyDayConfig = {
  type: "line",
  data: {
    labels: [],
    datasets: [{
      data: [], // Set initially to empty data "rgba(0, 121, 196, 0.6)", "rgba(0, 150, 136, 0.6)", "rgba(128, 128, 128, 0.6)"
      label: "",
      borderColor: "#3e95cd",
      backgroundColor: "rgba(0, 121, 196, 0.6)",
      parsing: false,
      normalized: true
    },
    {
      data: [], // Set initially to empty data
      label: "",
      borderColor: "#009688",
      backgroundColor: "rgba(0, 150, 136, 0.6)",
      parsing: false,
      normalized: true
    },
    {
      data: [], // Set initially to empty data
      label: "",
      borderColor: "#808080",
      backgroundColor:"rgba(128, 128, 128, 0.6)",
      parsing: false,
      normalized: true
    }]
  },
  options: {
    scales: {
      xAxes: [{
        type: "time",
        time: {
          unit: "week",
          displayFormats: {
            day: "MMM DD",
            week: "MMM DD"
          },
          tooltipFormat: "MMM DD, YYYY",
        },
        ticks: {
          minRotation: 45
        }
      }]
    }, 
    title: {
      text: "Detection Activity (30 Days)",
    }
  }
};

const chartThree = document.querySelector("#chartThree").getContext("2d");
const ThirtyDayChart = new Chart(chartThree, ThirtyDayConfig);
const reportChartThree = document.querySelector("#reportChartThree").getContext("2d");
const reportThirtyDayChart = new Chart(reportChartThree, ThirtyDayConfig);

const AttackConfig = {
  type: "pie",
  data: {
    labels: [],
    datasets: [{
      data: [], // Set initially to empty data 
      label: "",
      borderColor: ["#3e95cd", "#009688", "#808080"],
      backgroundColor: ["rgba(0, 121, 196, 0.6)", "rgba(0, 150, 136, 0.6)", "rgba(128, 128, 128, 0.6)"],
      parsing: false,
      normalized: true
    }]
  },
  options: { 
    title: {
      text: "Attack Type",
      display: true
    }
  }
};

const chartFour = document.querySelector("#chartFour").getContext("2d");
const AttackChart = new Chart(chartFour, AttackConfig);
const reportChartFour = document.querySelector("#reportChartFour").getContext("2d");
const reportAttackChart = new Chart(reportChartFour, AttackConfig);

const ProtocolConfig = {
  type: "bar",
  data: {
    labels: ["ICMP", "TCP", "UDP"],
    datasets: [{
      data: [], // Set initially to empty data
      label: "",
      borderWidth: 2,
      borderColor: ["#0079c4", "#009687", "#808080"],
      backgroundColor: ["rgba(0, 121, 196, 0.6)", "rgba(0, 150, 136, 0.6)", "rgba(128, 128, 128, 0.6)"],
      parsing: false,
      normalized: true
    }]
  },
  options: {  
    title: {
      text: "Protocol Type"
    },
    legend: {
      display: false
    }
  }
};

const chartFive = document.querySelector("#chartFive").getContext("2d");
const ProtocolChart = new Chart(chartFive, ProtocolConfig);
const reportChartFive = document.querySelector("#reportChartFive").getContext("2d");
const reportProtocolChart = new Chart(reportChartFive, ProtocolConfig);

const csvToTFHourChartData = csv => {
  const lines = csv.trim().split("\n");
  lines.shift(); // remove titles (first line)
  return lines.map(line => {
    const [id,protocol,source_ip,destination_ip,src_port,dst_port,payload_size,flags,date,time,duration,classification,attack_type,attack_id,attack_description] = line.split(",");
    return {
      date: date,
      x: time,
      protocol: protocol
    };
  });
}

const csvToDayChartData = csv => {
  const lines = csv.trim().split("\n");
  lines.shift(); // remove titles (first line)
  return lines.map(line => {
    const [id,protocol,source_ip,destination_ip,src_port,dst_port,payload_size,flags,date,time,duration,classification,attack_type,attack_id,attack_description] = line.split(",");
    return {
      x: date,
      protocol: protocol 
    };
  });
};

const csvToAttackChartData = csv => {
  const lines = csv.trim().split("\n");
  lines.shift(); // remove titles (first line)
  return lines.map(line => {
    const [id,protocol,source_ip,destination_ip,src_port,dst_port,payload_size,flags,date,time,duration,classification,attack_type,attack_id,attack_description] = line.split(",");
    return {
      x: attack_type,
      date: date
    };
  });
};


const fetchCSV = () => fetch("../static/index/csv/test.csv")
  .then(data => data.text())
  .then(csv => {

    //const key = [];
    var ICMPTFHourData = [], TCPTFHourData = [], UDPTFHourData = [];
    var ICMPDayData = [], TCPDayData = [], UDPDayData = [];
    var ICMPCounter = 0, UDPCounter = 0, TCPCounter = 0;
    const rawTFHourData = csvToTFHourChartData(csv);
    const rawDayData = csvToDayChartData(csv);
    const rawAttackData = csvToAttackChartData(csv);
    var TFHourICMPResults = [], TFHourTCPResults = [], TFHourUDPResults = [];
    var SevenDayICMPResults = [], SevenDayTCPResults = [], SevenDayUDPResults = [];
    var ThirtyDayICMPResults = [], ThirtyDayTCPResults = [], ThirtyDayUDPResults = [];
    var attackDataLabels = [], attackDataResults = [];

    for (data in rawTFHourData){
      if(rawTFHourData[data]["protocol"] == "ICMP"){
        ICMPTFHourData.push(rawTFHourData[data]);
        if(rawTFHourData[data]["date"] == currentDateTime){
            ICMPCounter++;
        }
      } else if(rawTFHourData[data]["protocol"] == "TCP"){
        TCPTFHourData.push(rawTFHourData[data]);
        if(rawTFHourData[data]["date"] == currentDateTime){
            TCPCounter++;
        }        
      } else if(rawTFHourData[data]["protocol"] == "UDP"){
        UDPTFHourData.push(rawTFHourData[data]);
        if(rawTFHourData[data]["date"] == currentDateTime){
            UDPCounter++;
        }          
      }
    }

    for (data in rawDayData){
      if(rawDayData[data]["protocol"] == "ICMP"){
        ICMPDayData.push(rawDayData[data]);
      } else if(rawDayData[data]["protocol"] == "TCP"){
        TCPDayData.push(rawDayData[data]);
      } else if(rawDayData[data]["protocol"] == "UDP"){
        UDPDayData.push(rawDayData[data]);
      }      
    }
    
    
    function TFHourResultProcessing(DataArray){
      return results = [...DataArray.reduce( (mp, o) => {
        o.x = moment(o.x, "hh a");
        const key = JSON.stringify([o.date, o.x, o.protocol]);
        if (!mp.has(key)) mp.set(key, { ...o, y: 0 });
        if(mp.get(key).date == currentDateTime.toString()){
          mp.get(key).y++;
        } else {
          mp.get(key).y = null;
        }
        return mp;
      }, new Map).values()];
    }

    function DayResultProcessing(DataArray, Condition){
      return results = [...DataArray.reduce( (mp, o) => {
        o.x = moment(o.x, "YYYY-MM-DD");
        const key = JSON.stringify([o.x, o.protocol]);
        if (!mp.has(key)) mp.set(key, { ...o, y: 0 });
        if(new Date(mp.get(key).x) >= Condition){
          mp.get(key).y++;
        } else {
          mp.get(key).y = null;
        }
        return mp;
      }, new Map).values()];
    }

    function AttackResultProcessing(DataArray, Condition){
      return results = [...DataArray.reduce( (mp, o) => {
        const key = JSON.stringify([o.x, o.date]);
        if (!mp.has(key)) mp.set(key, { ...o, y: 0 });
        if(mp.get(key).x != Condition && mp.get(key).date == currentDateTime.toString()){
          mp.get(key).y++;
        } else {
          mp.get(key).y = null;
        }
        return mp;
      }, new Map).values()];
    }

    function filteredArray(array){ 
        return array.filter(function( obj ) {
            return obj.y !== null;
        });
    }

    TFHourICMPResults= TFHourResultProcessing(ICMPTFHourData);
    TFHourTCPResults = TFHourResultProcessing(TCPTFHourData);
    TFHourUDPResults = TFHourResultProcessing(UDPTFHourData);
    
    var TFHourICMPResultsFiltered = filteredArray(TFHourICMPResults);
    var TFHourTCPResultsFiltered = filteredArray(TFHourTCPResults);
    var TFHourUDPResultsFiltered = filteredArray(TFHourUDPResults);

    SevenDayICMPResults = DayResultProcessing(ICMPDayData, sevenDaysDate);
    SevenDayTCPResults = DayResultProcessing(TCPDayData, sevenDaysDate);
    SevenDayUDPResults = DayResultProcessing(UDPDayData, sevenDaysDate);
    
    var SevenDayICMPResultsFiltered = filteredArray(SevenDayICMPResults);
    var SevenDayTCPResultsFiltered = filteredArray(SevenDayTCPResults);
    var SevenDayUDPResultsFiltered = filteredArray(SevenDayUDPResults);

    ThirtyDayICMPResults = DayResultProcessing(ICMPDayData, thirtyDaysDate);
    ThirtyDayTCPResults = DayResultProcessing(TCPDayData, thirtyDaysDate);
    ThirtyDayUDPResults = DayResultProcessing(UDPDayData, thirtyDaysDate);
    
    var ThirtyDayICMPResultsFiltered = filteredArray(ThirtyDayICMPResults);
    var ThirtyDayTCPResultsFiltered = filteredArray(ThirtyDayTCPResults);
    var ThirtyDayUDPResultsFiltered = filteredArray(ThirtyDayUDPResults);

    var attackData = AttackResultProcessing(rawAttackData, "---");

    var protocolCount = [ICMPCounter, TCPCounter, UDPCounter];

    TFHourChart.data.datasets[0].data = TFHourICMPResultsFiltered;
    TFHourChart.data.datasets[0].label = "ICMP";
    TFHourChart.data.datasets[1].data = TFHourTCPResultsFiltered;
    TFHourChart.data.datasets[1].label = "TCP";
    TFHourChart.data.datasets[2].data = TFHourUDPResultsFiltered;
    TFHourChart.data.datasets[2].label = "UDP";
    TFHourChart.update();
    reportTFHourChart.update();
    
    SevenDayChart.data.datasets[0].data = SevenDayICMPResultsFiltered;
    SevenDayChart.data.datasets[0].label = "ICMP";
    SevenDayChart.data.datasets[1].data = SevenDayTCPResultsFiltered;
    SevenDayChart.data.datasets[1].label = "TCP";
    SevenDayChart.data.datasets[2].data = SevenDayUDPResultsFiltered;
    SevenDayChart.data.datasets[2].label = "UDP";
    SevenDayChart.update();
    reportSevenDayChart.update();

    ThirtyDayChart.data.datasets[0].data = ThirtyDayICMPResultsFiltered;
    ThirtyDayChart.data.datasets[0].label = "ICMP";
    ThirtyDayChart.data.datasets[1].data = ThirtyDayTCPResultsFiltered;
    ThirtyDayChart.data.datasets[1].label = "TCP";
    ThirtyDayChart.data.datasets[2].data = ThirtyDayUDPResultsFiltered;
    ThirtyDayChart.data.datasets[2].label = "UDP";
    ThirtyDayChart.update();
    reportThirtyDayChart.update();

    for (data in attackData){
      if(attackData[data].x != "---" && attackData[data].y != null){
        attackDataLabels.push(attackData[data].x);
        attackDataResults.push(attackData[data].y); 
      }           
    }
    
    var attackDataResultsFiltered = filteredArray(attackDataResults);
    
    AttackChart.data.datasets[0].data = attackDataResultsFiltered;
    AttackChart.data.labels = attackDataLabels;
    AttackChart.update();
    reportAttackChart.update();

    ProtocolChart.data.datasets[0].data = protocolCount;
    ProtocolChart.update();
    reportProtocolChart.update();

    setTimeout(fetchCSV, 1000); // Repeat every 1 second

  });

fetchCSV(); // First fetch!



//https://stackoverflow.com/questions/42062939/how-to-execute-javascript-in-shell
// Need to figure out scaling and splitting charts amongst different pages.
window.jsPDF = window.jspdf.jsPDF;
function generateReport(){

    var canvasArray = document.querySelectorAll(".chart.report");

    var doc = new jsPDF("landscape");
    doc.setDrawColor(0);
    doc.setFillColor(0, 150, 136);
    doc.roundedRect(-10, -10, 600, 600, 3, 3, "FD");
    doc.setFont("Ubuntu-Regular", "normal");
    doc.setFontSize(30);
    doc.setTextColor("white");

    const img = document.querySelector("#logo");
    img.addEventListener("load", function (event) {
      const dataUrl = getDataUrl(event.currentTarget);
      console.log(dataUrl);
    });
    // Create canvas
    const canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    // Set width and height
    canvas.width = img.width;
    canvas.height = img.height;
    // Draw the image
    ctx.drawImage(img, 0, 0);
    var logoData = canvas.toDataURL("image/png", 1.0);
    doc.addImage(logoData, "PNG", 25, 35, 100, 100);

    var reportDate = moment(now).format("MMMM Do YYYY");
    var reportTime = moment(now).format("hh:mm:ssa");

    doc.text("Cyber Alert System\n", 140, 70);
    doc.setFontSize(26);
    doc.text("Live Chart Report\n", 140, 80);
    doc.setFontSize(22);
    doc.setTextColor("#0C596B");
    doc.text(reportDate + "\n" + reportTime, 140, 100);
    
    for(var i=0; i<canvasArray.length; i++){
      doc.addPage();
      ctx = canvasArray[i].getContext("2d");
      ctx.save();
      ctx.globalCompositeOperation = "destination-over";
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvasArray[i].width, canvasArray[i].height);
      var canvasImg = canvasArray[i].toDataURL("image/jpeg", 1.0);
      doc.addImage(canvasImg, "JPEG", 10, 30, 280, 140);
    }

    return doc;
}

function saveReport(){
  var pdf = generateReport();
  currentDateTime = getFormattedDateTime(now);
  // download the pdf with name format as "DD-MM-YYYY@HH_MM_SS.pdf"
  pdf.save(currentDateTime + ".pdf");
  location.reload();
}

// Automate Report Generation. - Test this function in test environment.
// function automateReport(){
    // var pdf = btoa(generateReport().output());
    // var req = new XMLHttpRequest();
    // var formData = new FormData();
    
    // currentDateTime = getFormattedDateTime(now);

    // formData.append("data", pdf);                                
    // req.open("POST", "/root/gui/web-gui/CyberAlarm/index/static/index/pdf/automated-reports/" + currentDateTime + ".pdf");
    // req.send(formData);
    // location.reload();
  
// }

// setInterval(automateReport, 10000);
