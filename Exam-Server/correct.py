import time
start = time.time()
import sys
import json
import nltk.data
import language_check
import jellyfish
import math
from nltk.tokenize import word_tokenize
from nltk.stem.lancaster import LancasterStemmer

st = LancasterStemmer()
tool = language_check.LanguageTool('en-IN')
tokenizer = nltk.data.load("tokenizers/punkt/english.pickle")
negativec=["neither","never","nor","not","no"]


def levouter(arg1,arg2,lev):
    count=0
    arg1=str.lower(arg1)
    arg2=str.lower(arg2)
    levout=jellyfish.levenshtein_distance(arg1,arg2)
    if math.floor(lev*len(arg1))>=levout:
        count+=1
    if st.stem(arg1)==st.stem(arg2):
        count+=1
    return count


print("Static Loading Time In Python: %f\r\n" % (time.time()-start))

seqvar=0.2
langvar=0.8
keylostvar=0.5
garbagevar1=1.5
garbagevar2=10
levertoler=0.2

print("seqvar=",seqvar)
print("langvar=",langvar)
print("keylostvar=",keylostvar)
print("garbagevar1=",garbagevar1)
print("garbagevar2=",garbagevar2)
print("levenshtein Fault tolerance=",levertoler)

#Converting into JSON DATA
qna=sys.argv[1].replace("#","\"")
qna=qna.replace("!"," ")
stdata=sys.argv[2].replace("#","\"")
stdata=stdata.replace("!"," ")

#QNA Data
qna=json.loads(qna)
#Student Answer Data
stdata=json.loads(stdata)

print("\r\nReplacing and Encoding JSON data In Python: %f\r\n" % (time.time()-start))



TotalM=100


c=len(qna['rawans'])
a=0
for x in stdata:
	a+=len(x);

b=a-garbagevar1*c;
if b>0:
	b=(b/c)*garbagevar2
	TotalM-=b


print("Calcaulating Garbage: %f\r\n" % (time.time()-start))
print("Marks After Garbage Evaluation: %f\r\n" % (TotalM))
	
	
ststrings=[]
langsent=[]
stwords=[]
for x in stdata:
	ststrings+=tokenizer.tokenize(x);
	

print("Sentance Tokenization of Student Answer : %f\r\n" % (time.time()-start))
	
	
negcount=0
neg=[]
for index,x in enumerate(ststrings):
	print("Sentance %d: %s" %(index,x))
	stwords.append(word_tokenize(x))
	langsent.append(len(tool.check(x)))
	for y in stwords[index]:
		for z in negativec:
			if y==z:
				negcount+=1
	negcount+=x.count("n't")
	neg.append(negcount%2)
	negcount=0;


print("\r\nFinding Negations of Answer String | Word Tozenizing Answers | Grammar Checking : %f\r\n" % (time.time()-start))
print("Grammar Matrix After parsing %s\r\n" % (langsent))
print("Negation Matrix After parsing %s\r\n" % (neg))	
		
	
counter=-1;
sentmax=[]
ind=0
for index,m in enumerate(qna["flags"]):
	if counter!=m[0]:
		sentmax.append(ind)
		sentmax.append(m[0])
		counter=m[0]
	ind+=1
sentmax.append(ind)
sentmax.remove(0)


print("Parsing qna keyword data into useful format : %f" % (time.time()-start))
print("Metadata to keywords %s\r\n" % (sentmax))
	

for m in qna["flags"]:
	del m[2]
	del m[0]

#print(sentmax)
topindex=-1
matching=0
currmatch=0
matrix=[]
for xs in range(0,int(len(sentmax)/2)):
	if xs==0:
		s=0
	else:
		s=xs*2-1
	f=xs*2+1

	totalflag=[]
	for sm in qna['flags'][sentmax[s]:sentmax[f]]:
		tuppleflag=[]
		print(s)
		for index,haha in enumerate(stwords):
			for h,xm in enumerate(haha):
				for xc in sm:
					if xc.count("_")>0 and h!=len(haha)-1:
						currmatch+=levouter(xc,"%s_%s"%(xm,haha[h+1],levertoler))
					else :	
						currmatch+=levouter(xc,xm)
			tuppleflag.append(currmatch and 1)
			currmatch=0
		print("Sentance Keyword %d: %s" %(index,sm))
		totalflag.append(tuppleflag)
		print("Tuppledata per Keyword: ",tuppleflag,"\r\n")
	totalflagtupple=[sum(x) for x in zip(*totalflag)]
	print("Cross Matrix: ",totalflagtupple,"\r\n\r\n")
	if len(totalflagtupple)!=0:
		max_value = max(totalflagtupple)
		max_index = totalflagtupple.index(max_value)
		max_value/=sentmax[f]-sentmax[s]
		matrix.append([sentmax[f-1],max_value,max_index])



print("matching student Answer data keywords With Stem and levenshtein\r\nGenerating Cross-Matrix result based on qna keyword data: %f\r\n" % (time.time()-start))
		
if len(matrix)==0:
	matrixm=0
else:
	matrixm=TotalM/len(matrix)
TotalM=0
seq=0
for num,gb in enumerate(matrix):
	print("cross matrix Tupple1: %s" % (gb))
	matrin=matrixm
	if qna['seq']:
		if num!=0:
			if gb[2]-matrix[num-1][2]<0:
				seq=1
	if qna['nval'][gb[0]]==neg[gb[2]]:
		if langsent[gb[2]]^0:
			matrin*=langvar
			print("Marks For This point Are Deducted: Reason-Grammar")
		if gb[1]!=1:
			matrin*=keylostvar
			print("Marks For This point Are Deducted: Reason-KeyWord-Count")
		matrin*=gb[1]
	else :
		print("Marks For This point Won't be alloted: Reason-Negation")
		matrin=0
	print("Marks for Alloted for point %d: %f\r\n" % (num,matrin))
	TotalM+=matrin

if seq>0:
		print("Not Sequential: Deducting Marks")
TotalM=TotalM-seq*seqvar*TotalM


print("Final Matrix Operations and Marks Calculation Percentage Wise")
print("Final Marks Assigned To Student For This Answer: %d\r\n" % (int(TotalM)))
print("Total Time Spent In python: %f" % (time.time()-start))



