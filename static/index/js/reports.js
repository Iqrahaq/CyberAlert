
// Initialise report arrays.
var reports = [
    ["No.", "Date", "Time", "Download"]
];


var reportData = new Array()


// Gather Reports Data within /pdf/automated-reports/
// Extract date.
for (var i=0; i < reportExtract.length; i++){
    report = reportExtract[i].replace(/[[\]\"]/g, '').trim();
    console.log(report)
    reportData = report.toString().replace(/_/g, ':').slice(0, -4).split("@");

    // Extract location into button.
    reportData.push('<a href="../static/index/pdf/automated-reports/' + report + '" download=""><button class="btn generateReport">' + report + '<i class="fas fa-download"></i></button></a>')
    
    // Push through current report data.
    reports.push(reportData);
}


// Convert date from string to date object to allow for sorting.
for (var i = 1; i < reports.length; i++){
    var dateParts = reports[i][0].toString().split('-');
    var dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
    reports[i][0] = dateObject;

    // Sort by date.
    reports.sort(function compare(a,b){
        return b[0] - a[0];
    });
}

var number = 0;
// Number the reports and convert date back to original format.
for (var i = 1; i < reports.length; i++){
    number += 1;
    reportNumber = (number < 10 ? '0' : '') + number;
    reports[i].unshift(reportNumber);
    reports[i][1] = getFormattedDateTime(reports[i][1]).split("@")[0];
}

// Function to read reports array and generate <th> tags accordingly.
function generateReportsHTMLTable(data){
    var html = '<table id="reportsTable" class="table table-condensed table-hover table-striped">';

    if(typeof(data[0]) === 'undefined'){
        return null;
    } else {
        $.each(data, function( index, row ){
            // bind header
            if(index == 0){
                html += '<thead>';
                html += '<tr>';
                $.each(row, function(index, colData){
                    html += '<th>';
                    html += colData;
                    html +='</th>';
                });
                html += '<tr>';
                html += '</thead>';
                html += '<tbody id="reportsSearchTable">';
            } else {
                html += '<tr>';
                $.each(row, function( index, colData ){
                    html += '<td>';
                    html += colData;
                    html += '</td>';
                });
                html += '</tr>';
            }
        });
        html += '</tbody>';
        html += '</table>';
        $('#reportsTableDiv').append(html);

        // CSS Styling
        $("thead tr").each(function(){
            $("th").text(function(i, text){
                return text.replace(/_/g, ' ');
            });
        });
        $("thead tr").css("text-transform", "capitalize");
        $("thead tr th").css("color", "#3cc5b8");
        $("thead tr th").css("background-color", "#0C596B");
        $("table td").css("width", "30%");
        $("table td:nth-child(1)").css("width", "10%");
    }
}

generateReportsHTMLTable(reports);

// Function to implement search facility.
$("#reportsTableDiv").ready(function(){
    $("#reportsSearchInput").on("keyup", function(){
        var value = $(this).val().toLowerCase();
        $("#reportsSearchTable tr").filter(function(){
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
    });
});

// Test error functionality.
