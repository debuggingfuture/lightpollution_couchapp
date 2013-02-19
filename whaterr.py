#!/usr/bin/python
"""
Renders couchdb / erlang errors nicely. Receives the error on stdin and sends to stdout
"""

import sys
from urllib import urlopen
import json

if len(sys.argv) == 2:
    try:
        data = urlopen(sys.argv[1]).read()
    except:
        print "Couldn't download url:", sys.argv[1]
        exit()
    try:
        data = json.loads(data)
    except:
        print "Response wasn't valid json. RESPONSE:"
        print data
        exit()
    print 'ERROR:', data['error']
    print
    print 'REASON:'
    print data['reason']
else:
    print '''
Usage: %(name)s url

If you have a url that's printing you a horrble painful error message, (especially mustache errors),
this util prints it in a slightly less painful way.

eg. %(name)s http://localhost:5984/dbname/_design/designname/_list/listname/viewname
eg. %(name)s http://localhost:5984/footprint/_design/footprint/_list/products/products
''' % {'name': sys.argv[0]}
