from flask import Blueprint, request, jsonify, current_app
from flask_mail import Mail, Message
from typing import Dict, Any
import re
import html
from datetime import datetime

contact_bp = Blueprint('contact', __name__)

MAX_NAME_LENGTH = 100
MAX_EMAIL_LENGTH = 254
MAX_MESSAGE_LENGTH = 2000
MIN_MESSAGE_LENGTH = 10

def validate_email(email: str) -> bool:
    """Validate email format using RFC 5322 compliant regex."""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None

def sanitize_input(text: str) -> str:
    """Sanitize user input to prevent XSS."""
    return html.escape(text.strip())

def validate_contact_data(data: Dict[str, Any]) -> Dict[str, str]:
    """Validate and sanitize contact form data."""
    errors = {}
    
    name = data.get('name', '').strip()
    email = data.get('email', '').strip().lower()
    message = data.get('message', '').strip()
    
    # Name validation
    if not name:
        errors['name'] = 'Name is required'
    elif len(name) < 2:
        errors['name'] = 'Name must be at least 2 characters'
    elif len(name) > MAX_NAME_LENGTH:
        errors['name'] = f'Name must be less than {MAX_NAME_LENGTH} characters'
    elif not re.match(r'^[a-zA-Z\s.-]+$', name):
        errors['name'] = 'Name contains invalid characters'
    
    # Email validation
    if not email:
        errors['email'] = 'Email is required'
    elif len(email) > MAX_EMAIL_LENGTH:
        errors['email'] = 'Email is too long'
    elif not validate_email(email):
        errors['email'] = 'Please enter a valid email address'
    
    # Message validation
    if not message:
        errors['message'] = 'Message is required'
    elif len(message) < MIN_MESSAGE_LENGTH:
        errors['message'] = f'Message must be at least {MIN_MESSAGE_LENGTH} characters'
    elif len(message) > MAX_MESSAGE_LENGTH:
        errors['message'] = f'Message must be less than {MAX_MESSAGE_LENGTH} characters'
    
    return errors

def create_email_template(name: str, email: str, message: str) -> str:
    """Create HTML email template."""
    timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S UTC')
    
    return f"""
    <html>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #2563eb; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
                New Contact Form Submission
            </h2>
            
            <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p><strong>From:</strong> {sanitize_input(name)}</p>
                <p><strong>Email:</strong> {sanitize_input(email)}</p>
                <p><strong>Submitted:</strong> {timestamp}</p>
            </div>
            
            <div style="background: white; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
                <h3 style="color: #374151; margin-top: 0;">Message:</h3>
                <p style="white-space: pre-wrap;">{sanitize_input(message)}</p>
            </div>
            
            <div style="margin-top: 20px; padding: 15px; background: #eff6ff; border-radius: 8px; font-size: 14px; color: #1e40af;">
                <p><strong>Reply to:</strong> {sanitize_input(email)}</p>
                <p style="margin: 0;">This message was sent from your portfolio contact form.</p>
            </div>
        </div>
    </body>
    </html>
    """

@contact_bp.route('/contact', methods=['POST'])
def send_contact_message():
    """Handle contact form submission with enhanced security."""
    try:
        # Check content type
        if not request.is_json:
            return jsonify({
                'success': False,
                'error': 'Content-Type must be application/json'
            }), 400
        
        data = request.get_json()
        
        if not data:
            return jsonify({
                'success': False,
                'error': 'No data provided'
            }), 400
        
        # Validate input data
        errors = validate_contact_data(data)
        if errors:
            return jsonify({
                'success': False,
                'error': 'Validation failed',
                'errors': errors
            }), 400
        
        # Sanitize inputs
        name = sanitize_input(data['name'])
        email = sanitize_input(data['email'].lower())
        message = sanitize_input(data['message'])
        
        # Verify mail configuration
        if not current_app.config.get('MAIL_USERNAME') or not current_app.config.get('MAIL_PASSWORD'):
            current_app.logger.error('Email configuration missing')
            return jsonify({
                'success': False,
                'error': 'Email service temporarily unavailable'
            }), 503
        
        # Create and send email
        mail = Mail(current_app)
        
        # Email to you
        msg = Message(
            subject=f'Portfolio Contact: {name}',
            recipients=[current_app.config['MAIL_DEFAULT_SENDER']],
            reply_to=email,
            html=create_email_template(name, email, message)
        )
        
        # Plain text fallback
        msg.body = f"""
New contact form submission:

Name: {name}
Email: {email}
Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S UTC')}

Message:
{message}

---
Reply to: {email}
        """
        
        mail.send(msg)
        
        current_app.logger.info(f'Contact form submitted by {email}')
        
        return jsonify({
            'success': True,
            'message': 'Message sent successfully! I\'ll get back to you soon.'
        })
        
    except Exception as e:
        current_app.logger.error(f'Contact form error: {str(e)}')
        return jsonify({
            'success': False,
            'error': 'Failed to send message. Please try again later.'
        }), 500