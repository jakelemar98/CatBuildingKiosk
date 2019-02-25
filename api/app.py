#import all flask modules needed for api
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_restful import Resource, Api

#import db model Classes & ClassesSchema
from models.classes import Classes, ClassesSchema

import os

# init flask application
app = Flask(__name__)
api = Api(app)

#set base directory to the current path
basedir = os.path.abspath(os.path.dirname(__file__))

# Database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'db.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Init db
db = SQLAlchemy(app)
# Init ma
ma = Marshmallow(app)

# sets schema for the classes with Marshmallow
class_schema = ClassesSchema(strict=True)
classes_schema = ClassesSchema(many=True, strict=True)

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

# class end-point that allows you to perform get request for classes
class Class_Api(Resource):
    # get all classes
    def get(self):
        all_classes = Classes.query.all()
        result = classes_schema.dump(all_classes)
        return jsonify(result.data)

# manipulate class endpoint that allows for a get post or update request
class manipulate_class(Resource):
    # get by id
    def get(self, id):
        requested_class = Classes.query.get(id)
        return class_schema.jsonify(requested_class)

    # create new class
    def post(self):
        class_name = request.json['class_name']
        teacher = request.json['teacher']
        classroom = request.json['classroom']

        new_class = Classes(class_name, teacher, classroom)

        db.session.add(new_class)
        db.session.commit()

        return class_schema.jsonify(new_class)

    # update by ID
    def put(self, id):
        requested_class = Classes.query.get(id)

        class_name = request.json['class_name']
        teacher = request.json['teacher']
        classroom = request.json['classroom']

        requested_class.class_name = class_name
        requested_class.teacher = teacher
        requested_class.classroom = classroom

        db.session.commit()

        return class_schema.jsonify(requested_class)

    # delete by ID
    def delete(self, id):
        requested_class = Classes.query.get(id)
        db.session.delete(requested_class)
        db.session.commit()

        return class_schema.jsonify(requested_class)

# routing method for RESTful Flask
api.add_resource(Class_Api, '/classes')
api.add_resource(manipulate_class, '/class','/class/<id>')

#start APP Loop
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=80)
