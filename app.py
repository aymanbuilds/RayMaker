# Import necessary modules for the web application ***************************************

# Flask & Default modules
from flask import Flask, render_template, redirect, url_for, request, abort, g
from flask_compress import Compress
from flask_talisman import Talisman
from flask_minify import Minify
import os
import secrets

# Forms Modules
from forms import NewsletterForm

# Routes
from editor.routes import editor_blueprint

# End Import ******************************************************************************
# *****************************************************************************************

# Initialize the Flask application
app = Flask(__name__)
Compress(app)
Minify(app=app, html=True, js=False, cssless=False)

def generate_nonce():
    """ Generate a random nonce. """
    return secrets.token_urlsafe(16)

@app.before_request
def set_nonce():
    """ Set nonce for each request. """
    g.nonce = generate_nonce()

app.register_blueprint(editor_blueprint, url_prefix='/resume-builder')

# Application configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')
app.config['SESSION_COOKIE_HTTPONLY'] = True
app.config['SESSION_COOKIE_SECURE'] = True

# Define Content Security Policy (CSP)
csp = {
    'default-src': ["self"],
    'script-src': ["self", "unsafe-inline", "'strict-dynamic'", "https:", "http:"],
    'style-src': ["self", "unsafe-inline", "https:"],
    'img-src': ["self", "data:", "https:"],
    'font-src': ["self", "https:"],
    'object-src': "none",
    'base-uri': "self",
    'connect-src': ["'self'", "https://127.0.0.1:5000"]
}

# Apply security heards using Talisman
talisman = Talisman(
    app,
    content_security_policy=None,
    strict_transport_security=True,
    referrer_policy='strict-origin-when-cross-origin'
)

@app.after_request
def add_csp_headers(response):
    """ Add CSP headers with the generated nonce. """
    if 'nonce' not in g:
        g.nonce = generate_nonce()
    
    csp_with_nonce = csp.copy()
    csp_with_nonce['script-src'] = csp_with_nonce['script-src'] + [f"'nonce-{g.nonce}'"]
    
    response.headers['Content-Security-Policy'] = "; ".join(
        [f"{key} {' '.join(value)}" for key, value in csp_with_nonce.items()]
    )
    return response

# List of routes to apply 1-day cache (index pages)
index_routes = ['index', 'home', 'landing'] 

@app.after_request
def add_cache_headers(response):
    """ Cache headers """
    if request.endpoint == 'static':
        # Cache static files for 1 year
        response.cache_control.max_age = 31536000  # 1 year
    elif request.endpoint in index_routes:  # Check if the request endpoint is in the list of index routes
        # Cache these pages for 1 day
        response.cache_control.max_age = 86400  # 1 day
    else:
        # Cache other pages for 1 hour
        response.cache_control.max_age = 3600  # 1 hour

    response.cache_control.public = True
    return response

# Default route (Home)
@app.route('/', methods=['GET', 'POST'])
def index():
    newsletter_form = NewsletterForm()
    return render_template('index.html', newsletter_form=newsletter_form, nonce=g.nonce)

# Run the application
if __name__ == '__main__':
    app.run(debug=True, ssl_context=('C:/Users/pc/Documents/FREELANCE/Aniss Cherkaoui/Tnational/cert.pem', 
                                    'C:/Users/pc/Documents/FREELANCE/Aniss Cherkaoui/Tnational/key.pem'))