from flask import render_template
from flask_login import login_required
from app.main import main_bp

@main_bp.route('/')
def index():
    return redirect(url_for('auth.login'))

@main_bp.route('/dashboard')
@login_required
def dashboard():
    return render_template('main/dashboard.html')

@main_bp.route('/essay-structure')
@login_required
def essay_structure():
    return render_template('main/essay_structure.html')