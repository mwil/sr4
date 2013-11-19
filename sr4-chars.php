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


$mysqli = mysqli_connect("localhost", "mwil4321_sr4adm" , "3XGVw4egNAEU", "mwil4321_sr4");

if (mysqli_connect_errno($mysqli)) {
	echo "Failed to connect to MySQL: ".mysqli_connect_error();
}

switch ($command) {
	case "list":
		$chars = array();
		$gid = 1;

		if ($list_stmt = $mysqli->prepare("SELECT cid, charname FROM chars WHERE gid=?;")) {
			$list_stmt->bind_param("i", $gid);
			$list_stmt->bind_result($cid, $charname);
			$list_stmt->execute();

			while ($list_stmt->fetch()) {
				$chars[$cid] = $charname;
			}

			$list_stmt->close();
		}
		
		echo "ok:list:success\n";
		echo json_encode($chars);
		break;

	case "pull":
		if ($pull_stmt = $mysqli->prepare("SELECT chardata FROM chars WHERE cid=? LIMIT 1;")) {
			$pull_stmt->bind_param("i", $cid);
			$pull_stmt->bind_result($chardata);
			$pull_stmt->execute();
			$pull_stmt->fetch();
			$pull_stmt->close();
		}

		echo "ok:pull:success\n";
		echo $chardata;
		break;

	case "push":
		$charname = $_POST["charname"];
		$chardata = $_POST["chardata"];

		# chars table: cid, charname, gid, ownerid, chardata
		if ($pull_stmt = $mysqli->prepare("INSERT INTO chars VALUES (NULL, ?, 1, 1, ?);")) {
			$pull_stmt->bind_param("ss", $charname, $chardata);
			$pull_stmt->execute();
			$pull_stmt->fetch();
			$pull_stmt->close();
		}

		echo "ok:push:success";
		break;
	
	default:
		echo "err:".$command.':unknown';
		break;
}

$mysqli->close();
?>
