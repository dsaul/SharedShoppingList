
from flask import Flask
from flask_restful import Api, Resource, request
import db
from flask_cors import CORS

app = Flask(__name__)
app.debug = True
CORS(app)
api = Api(app)
dbh = db.get_database(app)

class Items(Resource):
	def get(self):
		
		itemsCollection = dbh["items"]
		
		return list(itemsCollection.find(None, {"_id": 0}))
		
	def post(self):
		
		itemsCollection = dbh["items"]
		
		itemsCollection.insert_one(request.json)
		
		return { "inserted": True }
		
api.add_resource(Items, "/api/items/")

class SpecificItem(Resource):
	
	def get(self, uuid):
		
		itemsCollection = dbh["items"]
		
		return itemsCollection.find_one({"uuid": uuid}, {'_id': 0})
	
	
	
	def put(self, uuid):
		
		itemsCollection = dbh["items"]
		
		itemsCollection.update_many({"uuid": uuid}, { "$set": request.json})
		
		return { "put": True }
	def delete(self, uuid):
		
		itemsCollection = dbh["items"]
		
		itemsCollection.delete_many({"uuid": uuid})
		
		return { "deleted": True }
	pass
api.add_resource(SpecificItem, "/api/items/<string:uuid>")




def main():
	app.run(debug=True)
	pass


if __name__ == '__main__':
    main()