from flask import Flask, jsonify
from flask_restful import Resource, Api

app = Flask(__name__)
api = Api(app)

class hello_world(Resource):
    def get(self):
        return {"about" : "Hello, World!"}

class hello_jake(Resource):
    def get(self):
        return {"about" : "Hello, Jake!"}

api.add_resource(hello_world, '/')
api.add_resource(hello_jake, '/home')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=80)
