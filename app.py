# Import necessary modules for the web application
from flask import Flask, render_template, redirect, url_for, request, abort
from flask_talisman import Talisman

# Initialize the Flask application
app = Flask(__name__)

# Application configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SECRET_KEY'] = 'MY_SECRET_KEY'
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
@app.route('/')
def index():

    return render_template('index.html')

# Run the application
if __name__ == '__main__':
    # For Production Mode
    # app.run(debug=False)

    # For Development Mode
    app.run(debug=True, ssl_context=('C:/Users/pc/Documents/FREELANCE/Aniss Cherkaoui/Tnational/cert.pem', 
                                    'C:/Users/pc/Documents/FREELANCE/Aniss Cherkaoui/Tnational/key.pem'))