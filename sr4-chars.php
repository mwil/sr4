<?php
session_start();

if(!isset($_SESSION['username'])) {
	echo "err:".$command.":autherr";
	exit;
}

if(!isset($_SESSION['group'])) {
	echo "err:".$command.":grouperr";
	exit;
}

$username = $_SESSION['username'];
$group    = $_SESSION['group'];

$command  = $_POST["command"];
$cid	  = $_POST["cid"];

#$mysql = mysql_connect("localhost", "mwil4321_sr4adm" , "3XGVw4egNAEU") 
#		 	or die("Connection to the MySQL server could not be established!");

#mysql_select_db("mwil4321_sr4") 
#	or die ("Database could not be selected!"); 

$mysqli = mysqli_connect("localhost", "mwil4321_sr4adm" , "3XGVw4egNAEU", "mwil4321_sr4");

if (mysqli_connect_errno($mysqli)) {
    echo "Failed to connect to MySQL: ".mysqli_connect_error();
}

switch ($command) {
	case "list":
		$chars = array();

		# $query = "SELECT cid, charname FROM chars WHERE gid=1"; 
		# $res = mysql_query($query);

		$res = $mysqli->query("SELECT cid, charname FROM chars WHERE gid=1");

		while ($row = $res->fetch_assoc()) {
			$chars[$row["cid"]] = $row["charname"];
		}

		echo "ok:list:success\n";
		echo json_encode($chars);
		break;

	case "pull":
		$query = sprintf("SELECT chardata FROM chars WHERE cid=%u LIMIT 1",
							mysql_real_escape_string($cid));

		$res = mysql_query($query);
		$row = mysql_fetch_object($res);

		echo "ok:pull:success\n";
		echo $row->chardata;
		break;

	case "push":
		$charname = $_POST["charname"];
		$chardata = $_POST["chardata"];

		$query = sprintf("'%s', '%s'",
							mysql_real_escape_string($charname),
							mysql_real_escape_string($chardata));

		break;
	
	default:
		echo "err:".$command.':unknown';
		break;
}

mysql_close();
?>
