from flask import jsonify, request
from app.api import api_bp
from flask_login import login_required

@api_bp.route('/chat', methods=['POST'])
@login_required
def chat():
    user_message = request.json.get('message')
    # Simulate chatbot response - replace with actual AI logic
    response_message = f"You said: {user_message}"
    return jsonify({'response': response_message})