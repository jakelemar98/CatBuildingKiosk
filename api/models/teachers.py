from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

#init db
db = SQLAlchemy()
# Init ma
ma = Marshmallow()

class Teachers(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(80), nullable=False)
    last_name = db.Column(db.String(120), nullable=False)
    department = db.Column(db.String(100), nullable=False)

    def __init__(self, first_name, last_name, department):
        self.first_name = first_name
        self.last_name = last_name
        self.department = department

class TeachersSchema(ma.Schema):
    class Meta:
        fields = ('id', 'first_name', 'last_name', 'department')
