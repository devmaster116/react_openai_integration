from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash

class User(UserMixin):
    def __init__(self, username, role):
        self.username = username
        self.role = role
        self._password_hash = None
        
    def set_password(self, password):
        self._password_hash = generate_password_hash(password)
        
    def check_password(self, password):
        return check_password_hash(self._password_hash, password)
        
    def get_id(self):
        return self.username