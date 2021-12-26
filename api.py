from typing import Type
from flask import Flask, request, json, session, Response
from dbservice import Database, DBError

def response_f(response, status):
	return Response(
			response=json.dumps(response),
			status=status,
			mimetype='application/json'
			)

class ApiErrors:
    def __init__(self) -> None:
        pass
    @staticmethod
    def DataError(args):
        return 'Data not provided' + " ".join(args)

app = Flask(__name__)

@app.route('/items/new', methods=['POST'])
def new_item():
    json_body = request.get_json()
    try:
        name = json_body['name']
        content = json_body['content']
        autor = json_body['autor']
    except KeyError:
        return response_f({'Message':ApiErrors.DataError(['name', 'content'])},400)
    try:
        Database.new_item(name,content,autor)
    except DBError as e:
        return response_f({'Message':e}, 400)
    return response_f({'Message': 'Success'}, 200)

@app.route('/items', methods=['GET'])
def get_items():
    try:
        items = Database.get_items()
    except DBError as e:
        return response_f({'Message':e}, 400)
    return response_f(items, 200)

@app.route('/item/<id>', methods=['GET'])
def get_item(id):
    try:
        item = Database.get_item(id)
    except DBError as e:
        return response_f({'Message':e}, 400)
    return response_f(item, 200)

@app.route('/item/<id>', methods=['DELETE'])
def del_item(id):
    try:
        Database.del_item(id)
    except DBError as e:
        return response_f({'Message':e}, 400)
    return response_f({'Message': 'Success'}, 200)

@app.route('/item/<id>', methods=['PUT'])
def update_item(id):
    json_body = request.get_json()
    try:
        name = json_body['name']
        content = json_body['content']
        autor = json_body['autor']
    except KeyError:
        return response_f({'Message':ApiErrors.DataError(['name', 'content'])},400)
    try:
        Database.update_item(id,name,content,autor)
    except DBError as e:
        return response_f({'Message':e}, 400)
    return response_f({'Message': 'Success'}, 200)
