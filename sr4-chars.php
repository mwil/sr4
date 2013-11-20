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

# get POST arguments that are required to appear
$command = $_POST["command"];

$mysqli = mysqli_connect("localhost", "mwil4321_sr4adm" , "3XGVw4egNAEU", "mwil4321_sr4");

if (mysqli_connect_errno($mysqli)) {
	echo "Failed to connect to MySQL: ".mysqli_connect_error();
}

switch ($command) {
	case "list":
		$chars = array();

		if ($list_stmt = $mysqli->prepare("SELECT cid, charname FROM chars WHERE gid=?")) {
			$list_stmt->bind_param("i", $gid);
			$list_stmt->bind_result($cid, $charname);
			$list_stmt->execute();
			$list_stmt->store_result();

			while ($list_stmt->fetch()) {
				$chars[$cid] = $charname;
			}

			echo "ok:list:success\n";
			echo json_encode($chars);

			$list_stmt->close();

		} else { # prepare failed
			echo "err:list:mysql_statement_error\n";
			echo "MySQL error: ".$list_stmt->error;
		}
		
		break;

	case "pull":
		$cid = $_POST["cid"];

		if ($pull_stmt = $mysqli->prepare("SELECT chardata, last_modified FROM chars WHERE cid=? AND gid=? LIMIT 1")) {
			$pull_stmt->bind_param("ii", $cid, $gid);
			$pull_stmt->bind_result($chardata, $modified);
			$pull_stmt->execute();
			$pull_stmt->store_result();
			$pull_stmt->fetch();

			if ($chardata) {
				echo "ok:pull:success\n";
				echo $chardata."\n";
				echo "cid=".$cid;
				echo "last_modified=".$modified;
			} else { 
				echo "err:pull:no_char_found\n";
				echo "MySQL error: ".$pull_stmt->error;
			}

			$pull_stmt->close();

		}  else { # prepare failed
			echo "err:pull:mysql_statement_error\n";
			echo "MySQL error: ".$mysqli->error;
		}
		
		break;

	case "push":
		if (isset($_POST['cid'])) {
			$cid = $_POST["cid"];
		} else {
			$cid = -1;
		}
		
		if (isset($_POST["charname"]) AND isset($_POST["chardata"])) {
			$charname = $_POST["charname"];
			$chardata = $_POST["chardata"];
		} else {
			echo "err:push:missing_data";
			exit;
		}

		# Check if char is already in table, then update!
		if ($check_stmt = $mysqli->prepare("SELECT cid FROM chars WHERE cid=? OR (gid=? AND charname=?)")) {
			$check_stmt->bind_param("iis", $cid, $gid, $charname);
			$check_stmt->bind_result($res_cid);
			$check_stmt->execute();
			$check_stmt->store_result();
			$check_stmt->fetch();

			if ($check_stmt->num_rows > 0) {
				$check_stmt->close();

				# character already exists, update instead of insert! (do this only for the current group, selected above may not be affected!)
				if ($update_stmt = $mysqli->prepare("UPDATE chars SET charname=?, chardata=? WHERE gid=? AND cid=?")) {
					$update_stmt->bind_param("ssii", $charname, $chardata, $gid, $res_cid);
					$update_stmt->execute();

					if ($update_stmt->affected_rows == 1) {
						echo "ok:push:success\n";
						echo "cid=".$res_cid;
					} else if ($update_stmt->affected_rows == 0) {
						echo "ok:push:nothing_changed\n";
						echo "cid=".$res_cid;
					}
					
					$update_stmt->close();

				} else { # prepare failed
					echo "err:push:mysql_statement_error:check\n";
					echo "MySQL error: ".$update_stmt->error;
				}
			} else {
				$check_stmt->close();

				# chars table: cid, charname, gid, ownerid, chardata
				# here: generate new character entry with unique cid
				$ins_stmt = $mysqli->stmt_init();

				if ($ins_stmt = $mysqli->prepare("INSERT INTO chars(charname, gid, ownerid, chardata) VALUES (?, ?, ?, ?)")) {
					$ins_stmt->bind_param("siis", $charname, $gid, $uid, $chardata);
					$ins_stmt->execute();

					if ($ins_stmt->affected_rows == 1) {
						echo "ok:push:success";
					} else {
						echo "err:push:wrong_number_affected:ins\n";
						echo "MySQL error: ".$ins_stmt->error;
					}
					
					$ins_stmt->close();
				} else {
					echo "err:push:mysql_statement_error:ins\n";
					echo "MySQL error: '".$mysqli->error."'.";
				}
			}

		} else { # prepare failed
			echo "err:push:mysql_statement_error:check\n";
			echo "MySQL error: ".$check_stmt->error;
		}

		break;

	case "delchar":
		$cid = $_POST["cid"];

		if (!$cid) {
			echo "err:delchar:missing_cid";
			exit;
		}

		if ($del_stmt = $mysqli->prepare("DELETE FROM chars WHERE cid=? AND ownerid=? AND gid=?")) {
			$del_stmt->bind_param("iii", $cid, $uid, $gid);
			$del_stmt->execute();
			
			if ($del_stmt->affected_rows == 1) {
				echo "ok:delchar:deleted";
			} else {
				echo "err:delchar:wrong_affected\n";
				echo "Number of affected rows: ".$del_stmt->affected_rows.", are you the owner?";
			}
			
			$del_stmt->close();

		} else {
			echo "err:delchar:mysql_statement_error\n";
			echo "MySQL error: ".$del_stmt->error;
		}

		break;
	
	default:
		echo "err:".$command.':unknown';
		break;
}

$mysqli->close();
?>
