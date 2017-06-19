<?php
if(isset($_POST['postst'])){
	$postst=str_replace(" ","!",str_replace("\"","#",$_POST['postst']));
	
}
if(isset($_POST['subdata'])){
	$std_data=str_replace(" ","!",str_replace("\"","#",$_POST['subdata']));
	
}
$filename="Result".rand(10000,99999).".txt";
echo $filename;
//file_put_contents($filename,("correct.py ".$postst." ".$std_data));
file_put_contents($filename,shell_exec("correct.py ".$postst." ".$std_data));
?>