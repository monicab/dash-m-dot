__author__ = 'mblaylock'

import os
import webapp2

from webapp2_extras import jinja2
from google.appengine.ext.webapp.util import run_wsgi_app

template_dir = os.path.join(os.path.dirname(__file__), 'templates')

from jinja2 import Environment, FileSystemLoader
jinja_env = Environment(loader=FileSystemLoader(template_dir), autoescape=True)


class Handler(webapp2.RequestHandler):
    def jinja2(self):
        return jinja2.get_jinja2(app=self.app)

    def write(self, *a, **kw):
        self.response.out.write(*a, **kw)

    def render_str(self, template, **params):
        t = jinja_env.get_template(template)
        return t.render(params)

    def render(self, template, **kw):
        self.write(self.render_str(template, **kw))


class HomePage(Handler):
    def get(self):
        self.render("home.html", section = 'home')


application = webapp2.WSGIApplication(
    [('/', HomePage)], debug=True)

def main():
    run_wsgi_app(application)

if __name__ == "__main__":
    main()



