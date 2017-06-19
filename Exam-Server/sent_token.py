#!C:\Users\Tomrock\AppData\Local\Programs\Python\Python36-32\python.exe -u
import tomcgi
import cgitb
cgitb.enable()
import json
if not ("sent_lol" in tomcgi.PDATA):
    print("Invalid Request")
    quit()
sent=(tomcgi.PDATA["sent_lol"])
import nltk.data
tokenizer = nltk.data.load("tokenizers/punkt/english.pickle")
print(json.dumps(tokenizer.tokenize(sent)))