<?php

$currentDateTime = date("DD-MM-YYYY@hh_mm_ss");

if(!empty($_POST['data'])){
    $data = $_POST['data'];
    echo '<script>';
    echo 'console.log('. json_encode( $data ) .')';
    echo '</script>';
    $fname = $currentDateTime + ".pdf"; // name the file
    $file = fopen("../static/index/pdf/automated-reports/" + $fname, 'w'); // open the file path
    fwrite($file, $data); //save data
    fclose($file);
} else {
    echo "No Data Sent";
}

?>