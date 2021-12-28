from pymongo import MongoClient
from bson.objectid import ObjectId
import certifi

class Database:
    def __init__(self):

        self.client = MongoClient(
            'mongodb+srv://admin:APISapis1@cluster0.6nrqq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
            tlsCAFile=certifi.where())
        self.db = self.client.get_database('news_db')
        self.records = self.db.news_db

    def new_item(self, name, content, author):
        new_article = {
            'name': name,
            'content': content,
            'author': author
        }
        self.records.insert_one(new_article)

    def get_items(self):
        items_list = list(self.records.find({}))
        return items_list

    def get_item(self, item_id):
        item = self.records.find_one({'_id': ObjectId(item_id)})
        return item

    def del_item(self, item_id):
        self.records.delete_one({'_id': ObjectId(item_id)})

    def del_all(self):
        self.records.delete_many({})

    def update_item(self, item_id, name, content, author):
        update = {
            'name': name,
            'content': content,
            'author': author
        }
        self.records.update_one({'_id': ObjectId(item_id)}, {'$set': update})
    class DBError:
        pass
