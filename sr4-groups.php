<?php
session_start();

if(!isset($_SESSION['uid'])) {
	echo "err:".$command.":autherr";
	exit;
}

if(!isset($_SESSION['gid'])) {
	echo "err:".$command.":grouperr";
	exit;
}

$uid = $_SESSION['uid'];
$gid = $_SESSION['gid'];

$command = $_POST["command"];

$mysqli = mysqli_connect("localhost", "mwil4321_sr4adm" , "3XGVw4egNAEU", "mwil4321_sr4");

if (mysqli_connect_errno($mysqli)) {
	echo "Failed to connect to MySQL: ".mysqli_connect_error();
}

# ....

$mysqli->close();
?>
