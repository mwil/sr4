<?php
session_start();
# phpinfo();

$command  = $_POST["command"];
$username = $_POST["username"];
$password = $_POST["password"];


$mysqli = mysqli_connect("localhost", "mwil4321_sr4adm" , "3XGVw4egNAEU", "mwil4321_sr4");

if (mysqli_connect_errno($mysqli)) {
	echo "Failed to connect to MySQL: ".mysqli_connect_error();
}

switch ($command) {
	case "login":
		# users table: uid, username, password, email, salt, salt2
		if ($login_stmt = $mysqli->prepare("SELECT uid, password FROM users WHERE username=? LIMIT 1")) {
			$login_stmt->bind_param("s", $username);
			$login_stmt->bind_result($uid, $pw);
			$login_stmt->execute();
			$login_stmt->fetch();
			$login_stmt->close();
		}

		if($pw == $password) {
			if (!isset($_SESSION["username"])) {
				$_SESSION["username"] = $username;
				$_SESSION["group"] = "devel";
			}
			echo "ok:login:success\n";
			echo "username=".$username."\n";
			echo "uid=".$uid;

		} else {
			echo "err:login:failure\n";
			echo "Username '".$username."' is unknown, please register first!";
		}
		break;

	case "logout":
		session_destroy();

		echo "ok:logout:success";
		break;

	default:
		echo "err:".$command.':unknown\n';
		echo "The specified command '".$command."' is not known!";
		break;
}

$mysqli->close();
?>
