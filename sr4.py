#! /usr/local/bin/python

# CGI script to interact with SR4\Datajack
# Supported options:
# - command: {list, push, pull}
# - group: sub-directory to store chars to, only 'devel' is currently available

import cgi
import cgitb

import os.path

cgitb.enable()
#cgi.test()

# list of existing groups registered in Datajack, TODO: save + fetch from file ...
groups = ['devel']


def read_charlist(path):
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


def write_charlist(clist, path):
	try:
		clist_file = open(clist_path, 'w')
		clist_file.writelines(testchars)
		clist_file.close()
	except IOError:
		# problems accessing the file, probably group not existing or dir not writable
		# TODO: respond with failure message
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
	clist = read_charlist(group_path)
	print '[', ','.join(['"%s"'%(name) for name in clist]), ']'

elif command == "push":
	testchars = ['Ginji A\n', 'Host Horst\n']
	write_charlist(testchars, clist_path)

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
