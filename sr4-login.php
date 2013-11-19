<?php
session_start();
# phpinfo();

$command  = $_POST["command"];
$username = $_POST["username"];
$password = $_POST["password"];

$link = mysql_connect("localhost", "mwil4321_sr4adm" , "3XGVw4egNAEU") 
			or die("Connection to the MySQL server could not be established!");

mysql_select_db("mwil4321_sr4", $link) 
	or die ("Database could not be selected!");

switch ($command) {
	case "login":
		$query = sprintf("SELECT uid, password FROM users WHERE username='%s' LIMIT 1",
							mysql_real_escape_string($username));
		
		$res = mysql_query($query);
		$row = mysql_fetch_object($res);

		if($row->password == $password) {
			if (!isset($_SESSION["username"])) {
				$_SESSION["username"] = $username;
				$_SESSION["group"] = "devel";
			}
			echo "ok:login:success\n";
			echo "username=".$username."\n";
			echo "uid=".$row->uid;

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

mysql_close();
?>
