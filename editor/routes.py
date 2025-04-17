# Import necessary modules for the web application ***************************************

# Flask & Default modules
from flask import Blueprint, render_template, redirect, url_for

# End Import ******************************************************************************
# *****************************************************************************************

# Initialize the blueprint
editor_blueprint = Blueprint('resume_builder', __name__)

# Editor default route
@editor_blueprint.route('/')
def editor():

    return render_template('editor.html')
