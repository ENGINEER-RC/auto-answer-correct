import sys
sent=(sys.argv[1])
import nltk.data
def jsonparse(hahalol):
	hahalol=hahalol.replace("',","\",")
	hahalol=hahalol.replace(", '",",\"")
	hahalol=hahalol.replace("']","\"]")
	hahalol=hahalol.replace("['","[\"")
	return hahalol;
	

tokenizer = nltk.data.load("tokenizers/punkt/english.pickle")
print(jsonparse("%s" % (tokenizer.tokenize(sent))))
