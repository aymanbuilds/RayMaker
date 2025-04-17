from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import Email, DataRequired

# Footer ******************************************************************************

# Newsletter form
class NewsletterForm(FlaskForm):
    email = StringField('Subscribe to our newsletter', validators=[
        DataRequired(message="Email is required"),
        Email(message="Please enter a valid email address")
    ])

# End Footer **************************************************************************
# *************************************************************************************