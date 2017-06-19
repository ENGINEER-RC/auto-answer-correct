import sys
import json
from nltk.corpus import wordnet
from itertools import chain
json_lol=(sys.argv[1])
json_lol=json_lol.replace("#","\"")
json_data=(json.loads(json_lol))
haha=[]
for word in json_data:
    synonyms = wordnet.synsets(word)
    initx=set(chain.from_iterable([word.lemma_names() for word in synonyms]))
    if len(initx)==0:
        initx="{}"
    haha.append(initx);
hahalol=('%s' % (haha))
hahalol=hahalol.replace("'{}'","[]");
hahalol=hahalol.replace("[,","");
hahalol=hahalol.replace(", ]","]");
hahalol=hahalol.replace(", ,",",");
hahalol=hahalol.replace("{'","{\"");
hahalol=hahalol.replace(", '",",\"");
hahalol=hahalol.replace("',","\",");
hahalol=hahalol.replace("'}","\"}");
hahalol=hahalol.replace(", ",",");
hahalol=hahalol.replace("{","[");
hahalol=hahalol.replace("}","]");

print(hahalol);