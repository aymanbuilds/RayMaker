# Import necessary modules for the web application ***************************************

# Flask & Default modules
from flask import Blueprint, render_template, redirect, url_for, g

# End Import ******************************************************************************
# *****************************************************************************************

# Initialize the blueprint
editor_blueprint = Blueprint('resume_builder', __name__)

# Editor default route
@editor_blueprint.route('/')
def editor():
    print(g.nonce)
    return render_template('editor.html', nonce=g.nonce)
