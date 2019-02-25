# apps.members.models
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

#init db
db = SQLAlchemy()
# Init ma
ma = Marshmallow()

class Classes(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    class_name = db.Column(db.String(80), unique=True, nullable=False)
    teacher = db.Column(db.String(120), unique=True, nullable=False)
    classroom =db.Column(db.String(100), unique=True, nullable=False)

    def __init__(self, class_name, teacher,classroom):
        self.class_name = class_name
        self.teacher = teacher
        self.classroom= classroom

class ClassesSchema(ma.Schema):
    class Meta:
        fields = ('id', 'class_name', 'teacher', 'classroom')
