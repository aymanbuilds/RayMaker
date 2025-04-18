# Import necessary modules for the web application ***************************************

# Flask & Default modules
from flask import Flask, render_template, redirect, url_for, request, abort
from flask_talisman import Talisman
from flask_minify import Minify
import os

# Forms Modules
from forms import NewsletterForm

# Routes
from editor.routes import editor_blueprint

# End Import ******************************************************************************
# *****************************************************************************************

# Initialize the Flask application
app = Flask(__name__)
Minify(app=app, html=True, js=False, cssless=False)

app.register_blueprint(editor_blueprint, url_prefix='/resume-builder')

# Application configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')
app.config['SESSION_COOKIE_HTTPONLY'] = True
app.config['SESSION_COOKIE_SECURE'] = True

# Define Content Security Policy (CSP)
csp = {
    'default-src': ['https:'],
    'script-src': ['https:'],
    'style-src': ['https:'],
    'img-src': ['https:'],
    'font-src': ['https:'],
    'object-src': ['none'],
    'upgrade-insecure-requests': []
}

# Apply security heards using Talisman
Talisman(app, content_security_policy=csp, strict_transport_security=True, referrer_policy='same-origin')

# Default route (Home)
@app.route('/', methods=['GET', 'POST'])
def index():
    newsletter_form = NewsletterForm()
    return render_template('index.html', newsletter_form=newsletter_form)

# Run the application
if __name__ == '__main__':
    # For Production Mode
    # app.run(debug=False)

    # For Development Mode
    app.run(debug=True, ssl_context=('C:/Users/pc/Documents/FREELANCE/Aniss Cherkaoui/Tnational/cert.pem', 
                                    'C:/Users/pc/Documents/FREELANCE/Aniss Cherkaoui/Tnational/key.pem'))