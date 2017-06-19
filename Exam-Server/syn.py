#!C:\Users\Tomrock\AppData\Local\Programs\Python\Python36-32\python.exe -u
import tomcgi
import cgitb
cgitb.enable()
import json
from nltk.corpus import wordnet
from itertools import chain
#Static Functions Till here

if not ("json_lol" in tomcgi.PDATA):
    print("Invalid Request")
    quit()
json_post=(tomcgi.PDATA["json_lol"])
json_data=(json.loads(json_post))
#json_data has the decoded variable keywords

syn_tupples=[]
for word in json_data:
    synonyms = wordnet.synsets(word)
    initx=set(chain.from_iterable([word.lemma_names() for word in synonyms]))
    syn_tupples.append(list(initx))
print(json.dumps(syn_tupples))
#printing the Returned synonyms in json format