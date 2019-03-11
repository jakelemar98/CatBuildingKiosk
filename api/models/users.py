# apps.members.models
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

#init db
db = SQLAlchemy()
# Init ma
ma = Marshmallow()

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String(32), index = True)
    password_hash = db.Column(db.String(128))
    is_admin = db.Column(db.Boolean())

    def __init__(self, username, password_hash, admin):
        self.username = username
        self.password_hash = password_hash
        self.is_admin = admin

class UsersSchema(ma.Schema):
    class Meta:
        fields = ('id', 'username', 'password_hash', 'is_admin')
