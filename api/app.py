#import all flask modules needed for api
from flask import Flask, jsonify, request, abort
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_restful import Resource, Api
from flask_cors import CORS
from flask_bcrypt import Bcrypt


# other imports
from passlib.apps import custom_app_context as pwd_context

#import db model Classes & ClassesSchema
from models.classes import Classes, ClassesSchema
from models.users import User, UsersSchema

# OS modules for python
import os

# init flask application
app = Flask(__name__)
api = Api(app)
bcrypt = Bcrypt(app)
CORS(app, support_credentials=True)

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

# sets schema for the classes with Marshmallow
user_schema = UsersSchema(strict=True)
users_schema = UsersSchema(many=True, strict=True)

class User_Api(Resource):
    # get all classes
    def get(self):
        all_users = User.query.all()
        result = users_schema.dump(all_users)
        return jsonify(result.data)

    def post(self):
        username = request.json['username']
        password = request.json['password']
        user = User.query.filter_by(username = username).first()
        user = user_schema.jsonify(user)
        if user is None:
            abort(401) # no user

        userPass = user.json['password_hash']
        if not bcrypt.check_password_hash(userPass, password):
            abort(401)


        return user.json['id']


class manipulate_user(Resource):
    def post(self):
        username = request.json['username']
        password = request.json['password']

        if username is None or password is None:
            abort(400) # missing arguments
        if User.query.filter_by(username = username).first() is not None:
            abort(400) # existing user

        password_hash = bcrypt.generate_password_hash(password)
        new_user = User(username, password_hash)

        db.session.add(new_user)
        db.session.commit()
        return user_schema.jsonify(new_user)


# routing method for RESTful Flask
api.add_resource(Class_Api, '/classes')
api.add_resource(manipulate_class, '/class','/class/<id>')
api.add_resource(User_Api, '/users')
api.add_resource(manipulate_user, '/user/add','/user/<id>')


#start APP Loop
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=80)
