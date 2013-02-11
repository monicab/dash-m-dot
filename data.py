__author__ = 'mblaylock'

import os
import webapp2

from google.appengine.ext.webapp.util import run_wsgi_app
import simplejson as json

data_dir = os.path.join(os.path.dirname(__file__), 'data')

class Handler(webapp2.RequestHandler):
    def writeJSON(self, filename):
        self.response.headers['Content-Type'] = 'application/json'
        self.response.out.write(self.readJSON(filename))

    def readJSON(self, filename):
        json_data = open(data_dir + "/" + filename)
        content = json_data.read()
        json_data.close()
        return content


class ResumeData(Handler):
    def get(self):
        self.writeJSON('resume.json')

class CoffeeData(Handler):
    def get(self):
        self.writeJSON('coffee.json')

application = webapp2.WSGIApplication(
    [('/api/data/resume.json', ResumeData), ('/api/data/coffee.json', CoffeeData)], debug=True)

def main():
    run_wsgi_app(application)

if __name__ == "__main__":
    main()


