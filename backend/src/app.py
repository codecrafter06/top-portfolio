from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_mail import Mail
from dotenv import load_dotenv
import os
import logging
from datetime import datetime, timedelta
from collections import defaultdict

from routes.contact import contact_bp

load_dotenv()

# Simple rate limiting
rate_limit_storage = defaultdict(list)
RATE_LIMIT_REQUESTS = 5
RATE_LIMIT_WINDOW = 300  # 5 minutes

def is_rate_limited(ip: str) -> bool:
    """Check if IP is rate limited."""
    now = datetime.now()
    cutoff = now - timedelta(seconds=RATE_LIMIT_WINDOW)
    
    # Clean old requests
    rate_limit_storage[ip] = [
        req_time for req_time in rate_limit_storage[ip] if req_time > cutoff
    ]
    
    # Check if over limit
    if len(rate_limit_storage[ip]) >= RATE_LIMIT_REQUESTS:
        return True
    
    # Add current request
    rate_limit_storage[ip].append(now)
    return False

def create_app() -> Flask:
    """Flask application factory."""
    app = Flask(__name__)
    
    # Configuration
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dev-secret-key')
    app.config['MAIL_SERVER'] = os.getenv('MAIL_SERVER', 'smtp.gmail.com')
    app.config['MAIL_PORT'] = int(os.getenv('MAIL_PORT', '587'))
    app.config['MAIL_USE_TLS'] = os.getenv('MAIL_USE_TLS', 'True').lower() == 'true'
    app.config['MAIL_USE_SSL'] = os.getenv('MAIL_USE_SSL', 'False').lower() == 'true'
    app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
    app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')
    app.config['MAIL_DEFAULT_SENDER'] = os.getenv('MAIL_DEFAULT_SENDER')
    app.config['MAX_CONTENT_LENGTH'] = int(os.getenv('MAX_CONTENT_LENGTH', '16777216'))
    
    # Logging
    if not app.debug:
        logging.basicConfig(level=logging.INFO)
    
    # Initialize extensions
    allowed_origins = [
        'http://localhost:3000',
        'https://localhost:3000',
        os.getenv('FRONTEND_URL', 'https://sagar-portfolio.vercel.app'),
    ]
    # Add Vercel preview URLs
    if os.getenv('VERCEL_URL'):
        allowed_origins.append(f"https://{os.getenv('VERCEL_URL')}")
    
    CORS(app, origins=allowed_origins, methods=['GET', 'POST'], allow_headers=['Content-Type'], supports_credentials=False)
    Mail(app)
    
    # Rate limiting middleware
    @app.before_request
    def rate_limit():
        if request.endpoint == 'contact.send_contact_message':
            client_ip = request.environ.get('HTTP_X_FORWARDED_FOR', request.remote_addr)
            if is_rate_limited(client_ip):
                return jsonify({
                    'success': False,
                    'error': 'Rate limit exceeded. Please try again later.'
                }), 429
    
    # Register blueprints
    app.register_blueprint(contact_bp, url_prefix='/api')
    
    @app.route('/health')
    def health_check():
        """Health check endpoint."""
        return {'status': 'healthy', 'message': 'Sagar Portfolio API is running'}
    
    @app.errorhandler(413)
    def request_entity_too_large(error):
        return jsonify({
            'success': False,
            'error': 'Request too large'
        }), 413
    
    return app

if __name__ == '__main__':
    app = create_app()
    port = int(os.getenv('PORT', 5000))
    debug = os.getenv('FLASK_ENV') != 'production'
    app.run(debug=debug, host='0.0.0.0', port=port)