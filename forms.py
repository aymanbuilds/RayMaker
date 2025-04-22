# Import necessary modules for the web application ************************************

from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import Email, DataRequired
from wtforms import HiddenField

# End Import **************************************************************************
# *************************************************************************************

# Footer ******************************************************************************

# Newsletter form
class NewsletterForm(FlaskForm):
    email = StringField('Subscribe to our newsletter', validators=[
        DataRequired(message="Email is required"),
        Email(message="Please enter a valid email address")
    ])

# End Footer **************************************************************************
# *************************************************************************************

# Temlpate mode form ******************************************************************

class ModeForm(FlaskForm):
    csrf_token = HiddenField()

# End Temlpate mode form **************************************************************
# *************************************************************************************