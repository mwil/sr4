#! /usr/local/bin/python

# CGI script to interact with SR4\Datajack
# Supported options:
# - command: {list, push, pull}
# - group: sub-directory to store chars to, only 'devel' is currently available

import cgi
import cgitb

import base64
import os.path

cgitb.enable()
#cgi.test()

# list of existing groups registered in Datajack, TODO: save + fetch from file ...
groups = ['devel']


def load_charlist(path):
	clist = []

	try:
		clist_file = open(clist_path, 'r')

		for name in clist_file:
			clist.append(name.strip().encode('unicode_escape'))

		clist_file.close()
	except IOError:
		# problems accessing the file, probably group not existing or dir not writable -> no chars
		pass

	return clist

def save_charlist(clist, path):
	try:
		clist_file = open(clist_path, 'w')
		clist_file.savelines(testchars)
		clist_file.close()
	except IOError:
		# problems accessing the file, probably group not existing or dir not writable
		# TODO: respond with failure message
		pass


def load_char(cname):
	char = ''

	# http://stackoverflow.com/a/295150/2699475
	char_path = os.path.join(group_path, 'char001.txt')#base64.urlsafe_b64encode(cname)+'.txt')

	try:
		char_file = open(char_path, 'r')
		char = char_file.read()
		char_file.close()
	except IOError:
		# problems accessing the file, probably group not existing or dir not writable -> no chars
		pass

	return char.strip()

def save_char(chame, char):
	pass


form = cgi.FieldStorage()

# sanity-check for the desired group since it is used in path construction
if 'group' in form and form['group'].value in groups:
	group = form['group'].value
else:
	# TODO: send back error?
	group = 'devel'
	
group_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'sr4-chars', group))
clist_path = os.path.join(group_path, 'charlist.txt')

# filepath = os.path.join(group_path, "char001.txt")


print "Content-Type: text/plain"
print                           # blank line, end of headers


command = form["command"].value

if command == "list":
	clist = load_charlist(group_path)
	result = '{'

	for cname in clist:
		result += '"%s":%s,'%(cname, load_char(cname))

	# get rid of the last trailing comma
	result = result[:-1] + '}'

	print result

elif command == "push":
	testchars = ['Ginji\n', 'Host Horst\n']
	save_charlist(testchars, clist_path)

elif command == "pull":
	pass


# if mode in ("push",):
# 	f = open(filepath, "w")
# 	print >>f, form["char"].value
# 	f.close()
# elif mode in ("pull",):
# 	try:
# 		f = open(filepath, "r")
# 		print f.read()
# 		f.close()
# 	except IOError:
# 		print "{}"
