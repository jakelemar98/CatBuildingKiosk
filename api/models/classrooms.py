from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

#init db
db = SQLAlchemy()
# Init ma
ma = Marshmallow()

class Classrooms(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    classroom_name = db.Column(db.String(80), nullable=False)
    floor = db.Column(db.Integer, nullable=False)
    building =db.Column(db.String(100), nullable=False)

    def __init__(self, classroom_name, floor, building):
        self.classroom_name = classroom_name
        self.floor = floor
        self.building = building


class ClassroomsSchema(ma.Schema):
    class Meta:
        fields = ('id', 'classroom_name', 'floor', 'building')
