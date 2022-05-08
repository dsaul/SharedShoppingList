import os

def get_database():
	from pymongo import MongoClient
	import pymongo
	
	MONGO_USERNAME = os.environ['MONGO_USERNAME']
	MONGO_PASSWORD = os.environ['MONGO_PASSWORD']
	MONGO_HOST = os.environ['MONGO_HOST']
	MONGO_PORT = os.environ['MONGO_PORT']
	MONGO_DATABASE = os.environ['MONGO_DATABASE']
	
	# Provide the mongodb atlas url to connect python to mongodb using pymongo
	CONNECTION_STRING = "mongodb://{MONGO_USERNAME}:MONGO_PASSWORD@{MONGO_HOST}:{MONGO_PORT}/".format(
		MONGO_USERNAME = MONGO_USERNAME,
		MONGO_PASSWORD = MONGO_PASSWORD,
		MONGO_HOST = MONGO_HOST,
		MONGO_PORT = MONGO_PORT,
	)
	
	print("CONNECTION_STRING:"+CONNECTION_STRING)
	
	# Create a connection using MongoClient. You can import MongoClient or use pymongo.MongoClient
	from pymongo import MongoClient
	client = MongoClient(CONNECTION_STRING)
	
	# Create the database for our example (we will use the same database throughout the tutorial
	return client[MONGO_DATABASE]