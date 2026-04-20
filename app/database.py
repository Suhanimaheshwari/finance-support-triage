from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

mongo_uri = os.getenv("MONGO_URI")
print("DEBUG MONGO_URI:", mongo_uri) 

client = MongoClient(mongo_uri)
db = client["finance_ai"]
collection = db["tickets"]