var Mstring;
var sarray;
var	count;
var karray=new String();
var subdata=[];
var rarray=new Object();
var postst=new Object();
notarray=["neither","never","nor","not","no"];
rarray.nval=[];
rarray.seq=false;
reds="rgb(255, 153, 153)";
gres="rgb(153, 255, 153)";
temparr=[];
var r=0;
function alerter()
{
	Mstring=document.getElementById("haha").value;
	rarray.question=document.getElementById("main_ques").value;
	if(!Mstring==""){
		if(!rarray.question==""){
	rarray.rawans=Mstring;
	Mstring=Mstring.replace(/[!$%^()\b{}?",\/\\\[\]]/g,"");
	Mstring=Mstring.replace(/[\n]/g," ");
	document.getElementById("dimScreen").style.zIndex = "5";
	document.getElementById("dimScreen").style.visibility="visible";
	$.post("sent_token.py", { sent_lol:Mstring },function( data ) { document.getElementById("LMAO").value=data;
		document.getElementById("dimScreen").style.zIndex = "-5";
		document.getElementById("dimScreen").style.visibility="hidden";
		wresult();r=0;
	});
	}}
	

}
function wresult()
{	
if(r==0){sarray=JSON.parse(document.getElementById("LMAO").value);r=1;}
	var x="<table  border=1 id='p456'><tr><th>Sent No</th><th>Add Sent</th><th>Del Sent</th><th>Sentance String</th></tr>"+
				"<tr>"+
					"<td> 1. </td>"+
					"<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>"+
					"<td>"+
						"<button onclick='lerase(0);'  >Delete</button>"+
					"</td>"+
					"<td>"+sarray[0]+"</td>"+
				"</tr>";
	
	m=sarray.length;
	for(i=1;i<m;i++){
						x=x+"<tr>"+
							"<td> "+(i+1)+". </td>"+
							"<td><button onclick='lconcat("+i+");'  >+ "+i+"</button></td>"+
							"<td><button onclick='lerase("+i+");'  >Delete</button></td>"+
							"<td>"+sarray[i]+"</td>"+
						"</tr>";
					}
	x=x+"</table><a href='#f2' ><button onclick='xkey();'>Go</button></a>"+
	"&nbsp;Invokes:xkey()->negativc()->lkey();"+
	" (+)Invokes:lconcat()->lerase();"+
	" (Delete)Invokes:lerase()";
	document.getElementById("result").innerHTML=x;
	

}
function lconcat(p2){
	sarray[p2-1]=sarray[p2-1].concat(" "+sarray[p2]);
	lerase(p2);
}
function lerase(p1){
	sarray.splice(p1,1);
	wresult();
}
function xkey()
{	
	rarray.nval=[];
	if(!karray==""){
	m=sarray.length;
	for(i=0;i<m;i++)
	{	sarray[i]=sarray[i].replace(/(.)\./g, "$1");
		karray[i]=sarray[i].split(" ");
		nvalx=negativec(karray[i],i);
		rarray.nval[i]=nvalx
	}
	lkey();}
	
}
function lkey()
{	
	rarray.flags=[];
	var x="<table id='p457' border=1><tr><th>Sent No.</th><th style='text-align:center;'>Word Tokens</th></tr>";
	for(i=0;i<m;i++)
	{   
		x=x.concat("<tr><td >"+i+". </td><td>");
		arrval=karray[i].length;
		
		x=x+"<span class='wordy' id='w"+i+"p"+0+"' onclick='lcolr(0,"+i+",this);'>"+karray[i][0]+"</span>"
		for(j=1;j<arrval;j++)
		{
			x=x+"<span class='spacey' onclick='lcolrx("+j+","+i+",this);'>&nbsp+&nbsp;</span>"+
			"<span id='w"+i+"p"+j+"' class='wordy' onclick='lcolr("+j+","+i+",this);'>"+karray[i][j]+"</span>";
		}
		x=x+"</td></tr>";
	}
	var x=x+"</table><a href='#f3'><button onclick='skey();'>Go</button></a>&nbsp;&nbsp;Invokes:skey()->syma->Raster()->Raster_get()->fillsyns;&nbsp;&nbsp; (+)Invokes->lcolrx;&nbsp;&nbsp; (wordclick)Invokes->lcolr";
	document.getElementById("keys").innerHTML=x;
	
}
function lcolrx(a2,a1,b)
{	
	if(karray[a1][a2-1]!=""){
	karray[a1][a2-1]=karray[a1][a2-1]+"_"+karray[a1][a2];
	karray[a1][a2]="";
	b.outerHTML="";
	keyvar1="w"+a1+"p"+(a2-1);
	keyvar2="w"+a1+"p"+a2;
	document.getElementById(keyvar1).innerHTML=karray[a1][a2-1];
	document.getElementById(keyvar2).outerHTML="";
	}
}
function lcolr(s1,s2,docid){
    var y=document.getElementById(docid.id).style.backgroundColor;
	
	if(y==""){document.getElementById(docid.id).style.backgroundColor=reds;}
	else if(y==reds){document.getElementById(docid.id).style.backgroundColor=gres}
	else if(y==gres){document.getElementById(docid.id).style.backgroundColor=""}
}

function skey(){
	rarray.flags=[];
	for(i=0;i<m;i++)
	{
		arrval=karray[i].length;
		for(j=0;j<arrval;j++)
		{
		if(karray[i][j]!=""){
		zc=document.getElementById("w"+i+"p"+j).style.backgroundColor;
		

		if(zc==reds)
		{		zd=document.getElementById("w"+i+"p"+j).innerHTML;
			rarray.flags.push([i,zd,0]);}
		else if(zc==gres){
			zd=document.getElementById("w"+i+"p"+j).innerHTML;
			rarray.flags.push([i,zd,1]);//syn();
		}
			
		}
	}
	}
	if(!rarray.flags.length==0)
	{syma();}

}

	function syma()	
{	
	
	count=0;
	var x="";

	var y="<table id='p458' border=1>"+
				"<tr>"+
					"<th>Word</th>"+
					"<th>Synonyms</th>"+
					"<th>Sugested Synonyms</th>"+
				"</tr>";
	yl=rarray.flags.length;
	temparr=[];
	for(i=0;i<yl;i++)
	{
		
		if(rarray.flags[i][2]==1){
				y=y+"<tr>"+
						"<td>"+rarray.flags[i][1]+"</td>"+
						"<td >"+
							"<input type='text' style='width:300px;' name='"+i+"' id='w"+count+"' ></input>"+
						"</td>"+
						"<td width='400px' id='syn"+count+"'>"+
						"</td>"+
					"</tr>";
					Raster(rarray.flags[i][1]);
				count++;
			}
	}

	Raster_get();
	y=y+"</table>";
			x=x+"<a href='#f4'><button onclick='commits();'>Commit Data</button></a>&nbsp;Invokes:commits(), Suggested Syn click Invokes->addsyn()";
			if(!count==0){x=y+x;}
	document.getElementById("syns").innerHTML=x;
}
	

function seqs(a3)
{
	rarray.seq=document.getElementById(a3).checked;
}

function commits()
{    rarray.syn=[];
	for(i=0;i<count;i++)
	{  
		syna=document.getElementById("w"+i).value;
		syna=syna.replace(/ /g,"");
		rarray.syn.push(syna.split(","));
		synl=rarray.syn[i].length;
		if(rarray.syn[i][synl-1]==""){rarray.syn[i].splice(synl-1,1);}
		rarray.syn[i].push(document.getElementById("w"+i).name);
	}
		
		
		writeform();
	
}

function writeform()
{	var a,b,c,i,x="",f,y="",j,k,z="";
	postst="";
	postst=JSON.parse(JSON.stringify(rarray));
	delete postst.syn;
	if(rarray.seq==1)
	{ a="Yes";}else {a="No";}
	for(i=0;i<rarray.flags.length;i++)
	{ 
		y=y+"<tr><td>"+i+".</td><td>Sentance No:"+rarray.flags[i][0]+
									"<br>Word:"+rarray.flags[i][1]+"</td><td>";
									if(rarray.flags[i][2]==1){
										for(j=0;j<rarray.syn.length;j++)
										{	if(i==rarray.syn[j][rarray.syn[j].length-1])
											{for(k=0;k<(rarray.syn[j].length-1);k++){
												if(postst.flags[i][1]!=rarray.syn[j][k]){
													y=y+rarray.syn[j][k]+", ";
												postst.flags[i].push(rarray.syn[j][k]);}
											}}
										}
									}
		y=y+"</td></tr>";
	}
	var l="";
	for(i=0;i<rarray.nval.length;i++)
	{
		l=l+"Negative["+i+"]:"+rarray.nval[i]+"<br>";
	}
	x=x+"<table id='p459'  border=1><tr><th colspan=3>Question and Answer Data with Synonyms</th></tr>"+
	"<tr><td>Question</td><td colspan='2'>"+rarray.question+"</td></tr>"+
	"<tr><td>Answer:String</td><td colspan='2'>"+rarray.rawans+"</td></tr>"+
	"<tr><td>Sequential?</td><td colspan='2'>"+a+"</td></tr>"+
	"<tr><td>Sentance Negative Status</td><td colspan='2'>"+l+"</td></tr>";
	x=x+y+"</table><button onclick='FinalCommit();'>Send Data Data</button>&nbsp;Invokes:FinalCommit()";
	document.getElementById("ssubmit").innerHTML=x;
}

function FinalCommit(){
	var answer = confirm("Save Question And Answer Object Data?")
	if (answer) {
		document.getElementById("xquestion").innerHTML=postst.question;
		document.getElementById("xanswer").innerHTML=postst.rawans;
	document.getElementById("stickytypeheader").style.zIndex = "15";
	document.getElementById("stickytypeheader").style.visibility="visible";
	//document.getElementById("Lol").innerHTML="";
	}
	else {
		//
	}
}

function negativec(a,b)
{ 
	var county=0;
	var m=a.length;
	for(x=0;x<a.length;x++){
	for(j=0;j<notarray.length;j++){
		if(notarray[j]==a[x]){county++;}
	}
	
	}
    count1 = (sarray[b].match(/n't/g) || []).length;
	county+=count1;
	console.log(county+" "+b);
	county=county%2;
	return county;
}
function Raster(b){
	temparr[temparr.length]=b;
}
function Raster_get(){
	json_syns=JSON.stringify(temparr);
	document.getElementById("dimScreen").style.zIndex = "5";
	document.getElementById("dimScreen").style.visibility="visible";
	$.post("syn.py", { json_lol:json_syns },function( data ) {
		if($.trim(data)!="[\'[]\']")
		{fillsyns(data);}
		document.getElementById("dimScreen").style.zIndex = "-5";
		document.getElementById("dimScreen").style.visibility="hidden";
	});
	
}
function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

function fillsyns(a){
	gh=0;
	ab=JSON.parse(a);
	for(k=0;k<ab.length;k++){
		x="";
	for(xd=0;xd<ab[k].length;xd++){
		counta=(ab[k][xd].match(/_/g) || []).length
		if(ab[k][xd].length<19&&counta<2)
		{x+="<button id=\"lol"+gh+"\" onclick='addsyn("+k+",\""+ab[k][xd]+"\",\"lol"+gh+"\");'>"+ab[k][xd]+"</button> ";gh++;}
	}
	document.getElementById("syn"+k).innerHTML=x;	
	}
	//
}
function addsyn(a,b,c){
	document.getElementById("w"+a).value+=b+",";
	document.getElementById(c).outerHTML="";
}

function new_text(a){
	document.getElementById("add_new").outerHTML="<textarea rows='3' cols='100' id='ans"+(a+1)+"' ></textarea>"+
	"<button onclick='document.getElementById(\"ans"+(a+1)+"\").outerHTML=\"\";this.outerHTML=\"\";'>Delete point</button>"+
	"<br><br><button id='add_new' onclick=\"new_text("+(a+1)+");\">Add New Point</button>";
}

function get_answer_json(){
	data_json=document.getElementById("main-answer").getElementsByTagName("textarea");
	subdata=[];
	
	for(dj=0;dj<data_json.length;dj++){
		rambo=data_json[dj].value.replace(/[!$%^()\n\t\b\r{}?,"\/\\\[\]]/g,"");
		//console.log(rambo);
		if(rambo!=""){
			
			subdata[subdata.length]=rambo;
		}
	}
	x="<table border=1><tr><th width=\"50px\">Sent No</th><th>Sentance String</th></tr>"
	for(j=0;j<subdata.length;j++){
		x+="<tr><td width=\"50px\">"+j+".</td><td>"+subdata[j]+"</td></tr>";
	}
	x+="</table><br><button onclick='final_sumbit();'>Final Sumbit Answer For Evaluation</button><br>final_submit();"
	document.getElementById("answer_data").innerHTML=x;
	console.log(JSON.stringify(subdata));
	console.log(JSON.stringify(postst));
}

function final_sumbit(){
		var answer = confirm("Do You Want To Submit this answer?");
	if (answer) {
	$.post("answerC.php",{postst: JSON.stringify(postst), subdata: JSON.stringify(subdata)},function( data ) {alert("File Stored At: "+data);	
		var answer1 = confirm("Do You Want To open the Report?");
		if (answer1){location.href=$.trim(data);}
	});}


}
