<?php
if(isset($_POST['sent_lol'])){
	$sent_lol=str_replace("\"","^\"",$_POST['sent_lol']);
	echo shell_exec("sent_token.py \"".$sent_lol."\"");
}
else {echo "##";exit();}
?>