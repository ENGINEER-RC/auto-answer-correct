<?php
if(isset($_POST['json_lol'])){
	$json_lol=$_POST['json_lol'];
	$json_lol=str_replace("\"","#",$_POST['json_lol']);
	echo shell_exec("syn.py ".$json_lol);
}
else {echo "##";exit();}
?>