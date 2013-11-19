#! /usr/local/bin/python

# CGI script to interact with SR4.Datajack
# Supported options:
# - command: {list, push, pull, delete, login}
# - group:   controls sub-directory to store chars to, only 'devel' is currently available
# - cname:   character name used when pull/push characters
# - char:    JSON object with the character inside
# - auth:    token in the app that ensures that not some random scripter can exploit this script
# - user:    Username used to login to a group, should be connected with the auth token

import cgi
import cgitb

import base64
import errno
import os
import sys

cgitb.enable()
# cgi.test()

import PyGreSQL

CHAR_LIMIT = 20

def get_charlist(path):
	clist = []

	try:
		for name in os.listdir(path):
			cname, ext = os.path.splitext(name)
			clist.append(base64.urlsafe_b64decode(cname))
	except IOError:
		# problems accessing the dir list (shouldn't happen?) -> no chars
		pass

	return clist

def load_char(path, cname):
	# http://stackoverflow.com/a/295150/2699475
	char_path = os.path.join(path, base64.urlsafe_b64encode(cname)+'.txt')

	try:
		char_file = open(char_path, 'r')
		char = char_file.read()
		char_file.close()
	except IOError:
		# problems accessing the file, probably group not existing or dir not writable -> no chars
		return ''

	return char.strip()

def save_char(path, cname, char):
	char_path = os.path.join(path, base64.urlsafe_b64encode(cname.strip())+'.txt')

	if len([f for f in os.listdir(path) if f.endswith('.txt')]) > CHAR_LIMIT:
		print 'err:push:charlimit'
		return False
	else:
		try:
			char_file = open(char_path, 'w')
			char_file.write(char.strip())
			char_file.close()
			return True
		except IOError:
			print 'err:push:IOError'
			return False

def del_char(path, cname):
	char_path = os.path.join(path, base64.urlsafe_b64encode(cname.strip())+'.txt')

	try:
		os.remove(char_path)
		return True
	except OSError:
		# Error while deleting the file, probably doesn't exist anyway
		return False
	except IOError:
		return False



################################################
# Parameter handling
################################################

print "Content-Type: text/plain"
print                           # blank line, end of headers

form = cgi.FieldStorage()

# get form values and set sane defaults if missing
group   = form.getvalue('group', 'devel')
command = form.getvalue('command', 'list')
cname   = form.getvalue('cname', '')
char    = form.getvalue('char', '')
auth    = form.getvalue('auth')
user    = form.getvalue('user')

# silent fail if someone is just spamming the script ...
if auth != 'cornholio':
	print 'err:'+command+':autherr'
	sys.exit(0)
################################################



################################################
# Group handling
################################################
group_enc  = base64.urlsafe_b64encode(group)

group_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'sr4-chars', group_enc))

# create group if it currently missing    
try:
	os.mkdir(group_path)
except OSError, e:
	# don't do anything if it already exists, for other problems raise again
	if e.errno != errno.EEXIST:
		print 'err'+command+':grouperr'
################################################



################################################
# Command handling
################################################
if command == 'list':
	clist = get_charlist(group_path)

	# fake a JSON list ...
	result  = '['
	result += ', '.join([cname for cname in clist])
	result += ']'

	print result

elif command == 'push':
	if cname and char:
		if save_char(group_path, cname, char):
			print 'ok:push:saved'
			
	else:
		print "err:push:incomplete"

elif command == "pull":
	char = load_char(group_path, cname)

	if char:
		print char
	else:
		print 'err:pull:failure'

elif command == 'delete':
	if cname:
		if del_char(group_path, cname):
			print('ok:delete:deleted')
		else:
			print('err:delete:failure')
	else:
		print('err:delete:incomplete')

elif command == "login":
	if user.lower() in ("matthias", "ralf", "florian"):
		print("ok:login:"+user)
	else:
		print("err:login:failure")

else:
	print 'err:'+command+':unknown'
################################################
