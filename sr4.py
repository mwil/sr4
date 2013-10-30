#! /usr/local/bin/python

import cgi
import cgitb

import os.path

cgitb.enable()

#cgi.test()

form = cgi.FieldStorage()


basepath = os.path.dirname(__file__)
filepath = os.path.abspath(os.path.join(basepath, "..", "sr4-chars", "char001.txt"))


print "Content-Type: text/plain"
print                               # blank line, end of headers

mode = form["mode"].value

if mode in ("push",):
	f = open(filepath, "w")
	print >>f, form["char"].value
	f.close()
elif mode in ("pull",):
	try:
		f = open(filepath, "r")
		print f.read()
		f.close()
	except:
		print "{}"
