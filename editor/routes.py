# Import necessary modules for the web application ***************************************

# Flask & Default modules
from flask import Blueprint, render_template, redirect, url_for, g, request, jsonify
import bleach
from forms import ModeForm

# End Import ******************************************************************************
# *****************************************************************************************

# Initialize the blueprint
editor_blueprint = Blueprint('resume_builder', __name__)

# Editor default route
@editor_blueprint.route('/')
def editor():
    mode_form = ModeForm()
    return render_template('editor.html', nonce=g.nonce, mode_form=mode_form)

# Select Template mode on free plan
@editor_blueprint.route('/set-mode', methods=['POST'])
def set_mode():
    data = request.get_json()

    raw_mode = data.get('mode', '')
    clean_mode = bleach.clean(raw_mode, tags=[], strip=True)

    if not clean_mode:
        return jsonify({'message': 'Invalid input'}), 400

    if clean_mode.lower() == 'ats':
        rendered_html = render_template('template_mode/ats/ats1.html')
        return jsonify({
            'message': f'Mode set to: {clean_mode}',
            'html': rendered_html
        })

    return jsonify({'message': f'Mode set to: {clean_mode}'})