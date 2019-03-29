# apps.members.models
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

#init db
db = SQLAlchemy()
# Init ma
ma = Marshmallow()

class Classes(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    class_id = db.Column(db.String(10), nullable = False)
    class_name = db.Column(db.String(80), nullable=False)
    teacher = db.Column(db.String(120), nullable=False)
    section = db.Column(db.String(10), nullable=False)
    classroom = db.Column(db.String(100), nullable=False)
    days = db.Column(db.String(10), nullable=False)
    time = db.Column(db.String(25), nullable=False)

    def __init__(self, class_id, class_name, teacher, section, classroom, days, time):
        self.class_id = class_id
        self.class_name = class_name
        self.teacher = teacher
        self.section = section
        self.classroom = classroom
        self.days = days
        self.time = time

class ClassesSchema(ma.Schema):
    class Meta:
        fields = ('id', 'class_id', 'class_name', 'teacher', 'section','classroom', 'days', 'time')
