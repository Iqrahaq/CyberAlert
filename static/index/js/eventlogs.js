// JavaScript source code -> https://www.js-tutorials.com/jquery-tutorials/reading-csv-file-using-jquery/

// CONSIDER SORTING BY TIME.

// Function to implement search facility.
$("#eventLogsTableDiv").ready(function(){
    $("#eventLogsSearchInput").on("keyup", function(){
        var value = $(this).val().toLowerCase();
        $("#eventLogsSearchTable tr").filter(function(){
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
    });
});

var data;
$.ajax({
    type: "GET",
    url: "../static/index/csv/test.csv",
    dataType: "text",
    success: function(response)
    {
        data = $.csv.toArrays(response);
        generateEventLogsHTMLTable(data);
    }
});

// Function to read CSV file and generate <th> tags accordingly.
function generateEventLogsHTMLTable(data){
    var html = '<table id="eventLogsTable" class="table table-condensed table-hover table-striped">';

    var todaysData = [];

    todaysData.push(data[0]);

    for (var i=0; i < data.length; i++){
        if (data[i][8] == currentDateTime.toString()){
            todaysData.push(data[i]);
        }
    }
    

    if(typeof(data[0]) === 'undefined'){
        return null;
    } else {
        $.each(todaysData, function( index, row ){
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
                html += '<tbody id="eventLogsSearchTable">';
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
        $('#eventLogsTableDiv').append(html);

        // CSS & JQuery Header Styling
        $("thead tr").css("text-transform", "capitalize");
        $("thead tr").each(function(){
            $("th").text(function(i, text){
                text = text.replace(/_/g, ' ');
                let words = text.split(' ');
                for (let i = 0; i < words.length; i++){
                    if(words[i].length < 3){
                        temp = text.slice(-2).toUpperCase();
                        text = text.slice(0, -2).concat(temp);
                    }
                }
                return text;
            });
        });
        $("thead tr th").css("color", "#3cc5b8");
        $("thead tr th").css("background-color", "#0C596B");

        // CSS & JQuery Column (Date & Time) Styling
        $("#eventLogsSearchTable > tr > td:nth-child(9)").each(function(){
            let eventLogsDate = new Date($(this).text());
            $(this).text(getFormattedDateTime(eventLogsDate).split('@')[0]);
        });
    }
}

// Function to implement sort facility on headers.

// Function to implement sort by facility via drop down.
