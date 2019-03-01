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

    def __init__(self, username, password_hash):
        self.username = username
        self.password_hash = password_hash

class UsersSchema(ma.Schema):
    class Meta:
        fields = ('id', 'username', 'password_hash')
