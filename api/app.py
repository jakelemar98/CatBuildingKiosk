#import all flask modules needed for api
from flask import Flask, jsonify, request, abort, make_response
from flask_bcrypt import Bcrypt
from flask_restful import Api, Resource
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine
from flask_marshmallow import Marshmallow
from flask_jwt_extended import JWTManager, create_access_token, create_refresh_token, jwt_required, jwt_refresh_token_required, get_jwt_identity, get_raw_jwt
#import db model Classes & ClassesSchema
from models.classes import Classes, ClassesSchema
from models.users import User, UsersSchema
from models.teachers import Teachers, TeachersSchema
from models.classrooms import Classrooms, ClassroomsSchema

import os
# init flask application
app = Flask(__name__)
api = Api(app)
bcrypt = Bcrypt(app)
CORS(app, resources={r"*": {"origins": "*"}})
#set base directory to the current path
basedir = os.path.abspath(os.path.dirname(__file__))
# Database
dbUri = 'sqlite:///' + os.path.join(basedir, 'db.sqlite')
engine = create_engine(dbUri)

app.config['SQLALCHEMY_DATABASE_URI'] = dbUri
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'kiosk-app'

# Init db
db = SQLAlchemy(app)
# Init ma
ma = Marshmallow(app)
# Init JWT
jwt = JWTManager(app)

# class Classes(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     class_id = db.Column(db.String(10), nullable = False)
#     class_name = db.Column(db.String(80), nullable=False)
#     teacher = db.Column(db.String(120), nullable=False)
#     section = db.Column(db.String(10), nullable=False)
#     classroom = db.Column(db.String(100), nullable=False)
#     days = db.Column(db.String(10), nullable=False)
#     time = db.Column(db.String(25), nullable=False)

#     def __init__(self, class_id, class_name, teacher, section, classroom, days, time):
#         self.class_id = class_id
#         self.class_name = class_name
#         self.teacher = teacher
#         self.section = section
#         self.classroom = classroom
#         self.days = days
#         self.time = time

# class Classrooms(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     classroom_name = db.Column(db.String(80), nullable=False)
#     floor = db.Column(db.Integer, nullable=False)
#     building =db.Column(db.String(100), nullable=False)

#     def __init__(self, classroom_name, floor, building):
#         self.class_name = classroom_name
#         self.floor = floor
#         self.building = building

# class Teachers(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     first_name = db.Column(db.String(80), nullable=False)
#     last_name = db.Column(db.String(120), nullable=False)
#     department = db.Column(db.String(100), nullable=False)

#     def __init__(self, first_name, last_name, department):
#         self.first_name = first_name
#         self.last_name = last_name
#         self.department = department

# class User(db.Model):
#     __tablename__ = 'users'
#     id = db.Column(db.Integer, primary_key = True)
#     username = db.Column(db.String(32), index = True)
#     password_hash = db.Column(db.String(128))
#     is_admin = db.Column(db.Boolean())

#     def __init__(self, username, password_hash, admin):
#         self.username = username
#         self.password_hash = password_hash
#         self.is_admin = admin
# Classes Resources

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
        class_id = request.json['class_id']
        class_name = request.json['class_name']
        teacher = request.json['teacher']
        section = request.json['section']
        classroom = request.json['classroom']
        days = request.json['days']
        time = request.json['time']

        new_class = Classes(class_id, class_name, teacher, section, classroom, days, time)

        db.session.add(new_class)
        
        try:
            db.session.commit()
        except:
            db.session.rollback()
        finally:
            db.session.close()
        
        return class_schema.jsonify(new_class)


    # update by ID
    def put(self, id):
        requested_class = Classes.query.get(id)

        class_id = request.json['class_id']
        class_name = request.json['class_name']
        teacher = request.json['teacher']
        section = request.json['section']
        classroom = request.json['classroom']
        days = request.json['days']
        time = request.json['time']

        requested_class.class_id = class_id
        requested_class.class_name = class_name
        requested_class.teacher = teacher
        requested_class.section = section
        requested_class.classroom = classroom
        requested_class.days = days
        requested_class.time = time

        try: 
            db.session.commit()
        except:
            db.session.rollback()
        finally:
            db.session.close()

        return class_schema.jsonify(requested_class)

    # delete by ID
    def delete(self, id):
        requested_class = Classes.query.get(id)
        local_object = db.session.merge(requested_class)
        db.session.delete(local_object)
        db.session.commit()
        db.session.close()

        return class_schema.jsonify(requested_class)



# Users Resources

# sets schema for the classes with Marshmallow
user_schema = UsersSchema(strict=True)
users_schema = UsersSchema(many=True, strict=True)

class User_Api(Resource):
    # get all users
    def get(self):
        all_users = User.query.all()
        result = users_schema.dump(all_users)
        return jsonify(result.data)

    def post(self):
        username = request.json['username']
        password = request.json['password']
        user = User.query.filter_by(username = username).first()
        #user = user_schema.jsonify(user)
        if user is None:
            return("WTF") # no user

        userPass = user.password_hash
        if not bcrypt.check_password_hash(userPass, password):
            abort(401)

        return make_response(user_schema.jsonify(user), 201)


class manipulate_user(Resource):
    def post(self):
        username = request.json['username']
        password = request.json['password']
        admin = False
        if username is None or password is None:
            abort(400) # missing argumentsfirst_name
        if User.query.filter_by(username = username).first() is not None:
            abort(400) # exithis.dataSource = datasting user

        password_hash = bcrypt.generate_password_hash(password)
        new_user = User(username, password_hash, admin)

        db.session.add(new_user)

        try: 
            db.session.commit()
        except:
            db.session.rollback()
        finally:
            db.session.close()

        access_token = create_access_token(identity = username)
        refresh_token = create_refresh_token(identity = username)

        return {
                'message': 'User {} was created'.format(username),
                'access_token': access_token,
                'refresh_token': refresh_token
                }



# Teachers Resources

# sets schema for the classes with Marshmallow
teacher_schema = TeachersSchema(strict=True)
teachers_schema = TeachersSchema(many=True, strict=True)


class Teacher_Api(Resource):
    def get(self):
        all_teachers = Teachers.query.all()
        result = teachers_schema.dump(all_teachers)
        return jsonify(result.data)


    def post(self):
        first_name = request.json['first_name']
        last_name = request.json['last_name']
        department = request.json['department']

        if first_name is None or last_name is None or department is None:
            abort(400)

        new_teacher = Teachers(first_name, last_name, department)

        db.session.add(new_teacher)

        try: 
            db.session.commit()
        except:
            db.session.rollback()
        finally:
            db.session.close()

        return "success"


class manipulate_teacher(Resource):
    def put(self, id):
        requested_teacher = Teachers.query.get(id)
        
        first_name = request.json['first_name']
        last_name = request.json['last_name']
        department = request.json['department']

        requested_teacher.first_name = first_name
        requested_teacher.last_name = last_name
        requested_teacher.department = department

        try: 
            db.session.commit()
        except:
            return "error"
        finally:
            db.session.close()

        return "success"

    def delete(self, id):
        requested_teacher = Teachers.query.get(id)
        local_object = db.session.merge(requested_teacher)
        db.session.delete(local_object)

        try: 
            db.session.commit()
        except:
            db.session.rollback()
        finally:
            db.session.close()

        return teacher_schema.jsonify(requested_teacher)


# sets schema for the classes with Marshmallow
classroom_schema = ClassroomsSchema(strict=True)
classrooms_schema = ClassroomsSchema(many=True, strict=True)


class Classroom_Api(Resource):
    def post(self):
        classroom_name = request.json['classroom_name']
        floor = request.json['floor']
        building = request.json['building']

        if classroom_name is None or floor is None or building is None:
            abort(400)

        new_classroom = Classrooms(classroom_name, floor, building)

        db.session.add(new_classroom)

        try: 
            db.session.commit()
        except:
            db.session.rollback()
        finally:
            db.session.close()
        
        return make_response(classroom_schema.jsonify(new_classroom), 201)
    
    def get(self):
        all_classrooms = Classrooms.query.all()
        result = classrooms_schema.dump(all_classrooms)
        return jsonify(result.data)

class manipulate_classroom(Resource):
    def put(self, id):
        requested_classroom = Classrooms.query.get(id)

        classroom_name = request.json['classroom_name']
        floor = request.json['floor']
        building = request.json['building']

        requested_classroom.classroom_name = classroom_name
        requested_classroom.floor = floor
        requested_classroom.building = building

        try: 
            db.session.commit()
        except:
            db.session.rollback()
        finally:
            db.session.close()

        return "success"
    
    def delete(self, id):
        requested_classroom = Classrooms.query.get(id)
        local_object = db.session.merge(requested_classroom)
        db.session.delete(local_object)

        try: 
            db.session.commit()
        except:
            db.session.rollback()
        finally:
            db.session.close()

        return "success"


# routing method for RESTful Flask
api.add_resource(Class_Api, '/classes')
api.add_resource(manipulate_class, '/class','/class/<id>')
api.add_resource(User_Api, '/users')
api.add_resource(manipulate_user, '/user/add','/user/<id>')
api.add_resource(Teacher_Api, '/teachers')
api.add_resource(manipulate_teacher, '/teacher/add','/teacher/<id>')
api.add_resource(Classroom_Api, '/classrooms')
api.add_resource(manipulate_classroom, '/classrooms/<id>')

#start APP Loop
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=80)
