from flask import render_template, redirect, url_for, request, flash
from flask_login import login_user, logout_user, login_required
from app.auth import auth_bp
from app.models import User

# Mock database (replace with real database in production)
users = {
    "student": User("student", "student"),
    "staff": User("staff", "staff")
}

for user in users.values():
    user.set_password("password123")

@auth_bp.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        user = users.get(username)
        
        if user and user.check_password(password):
            login_user(user)
            return redirect(url_for('main.dashboard'))
        flash('Invalid username or password')
    return render_template('auth/login.html')